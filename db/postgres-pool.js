/**
 * KuberQ — PostgreSQL High-Concurrency Connection Pool
 * Sized for 200+ simultaneous connections (100 merchants + 100 customers)
 * Prevents exhausting PostgreSQL server max_connections while maintaining sub-millisecond query latency.
 */

const { Pool } = require('pg');

// Parse database configuration from environment
const connectionString = process.env.DATABASE_URL || 'postgresql://kuberq_user:password@localhost:5432/kuberq_prod';

// Production Pool Configuration for Render / Cloud Managed PostgreSQL
const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' && !process.env.DISABLE_DB_SSL ? { rejectUnauthorized: false } : false,

  // Sizing limits per worker process:
  // With PM2 cluster mode (e.g. 4 CPU workers):
  // 4 workers * 20 max connections = 80 total connections (comfortably within Render's 100 max limit)
  max: parseInt(process.env.DB_POOL_MAX || '20', 10),

  // Keep 4 warm connections ready per worker so incoming queries execute with 0ms handshake lag
  min: parseInt(process.env.DB_POOL_MIN || '4', 10),

  // Close idle clients after 30 seconds to release memory and database locks
  idleTimeoutMillis: 30000,

  // Return an error if a connection cannot be acquired within 5000ms rather than hanging indefinitely
  connectionTimeoutMillis: 5000,

  // Statement timeout (max query execution time: 10s) to prevent runaway lockups
  statement_timeout: 10000,

  // Query queue limit in application memory
  maxUses: 7500 // Periodically recycle connections to prevent driver memory leaks
});

pool.on('error', (err, client) => {
  console.error('[DB Pool Error] Unexpected error on idle client:', err.message);
});

pool.on('connect', (client) => {
  // Enforce session timezone and query timeout
  client.query("SET timezone = 'Asia/Kolkata'; SET statement_timeout = '10000';").catch(() => {});
});

/**
 * Execute parameterized query with connection pooling & telemetry
 * @param {string} text - SQL Query
 * @param {Array} params - Query Parameters
 */
async function query(text, params) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  if (duration > 200) {
    console.warn(`[Slow Query Warning] (${duration}ms): ${text.slice(0, 100)}`);
  }
  return res;
}

/**
 * Acquire client for transactional integrity (e.g., placing orders + deducting stock)
 */
async function getClient() {
  const client = await pool.connect();
  const query = client.query;
  const release = client.release;

  // Timeout guard for leaked transactions
  const timeout = setTimeout(() => {
    console.error('[Transaction Leak Warning] Client checked out for >10s without release!');
  }, 10000);

  client.release = () => {
    clearTimeout(timeout);
    client.query = query;
    client.release = release;
    return release.apply(client);
  };
  return client;
}

/**
 * Gracefully close pool during shutdown
 */
async function closePool() {
  console.log('[DB Pool] Draining database connection pool...');
  await pool.end();
  console.log('[DB Pool] Pool closed.');
}

module.exports = {
  pool,
  query,
  getClient,
  closePool
};
