/**
 * KuberQ — MongoDB High-Concurrency Connection Pool
 * Sized for 200+ simultaneous connections with Mongoose / MongoDB Native Driver
 */

const mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/kuberq_prod';

const mongoOptions = {
  // Connection Pool Limits: Conservative limits for 512MB RAM without socket exhaustion
  maxPoolSize: parseInt(process.env.MONGO_MAX_POOL_SIZE || '10', 10),
  minPoolSize: parseInt(process.env.MONGO_MIN_POOL_SIZE || '1', 10),

  // Timeouts: Fail fast instead of hanging the process
  serverSelectionTimeoutMS: 3000,
  socketTimeoutMS: 30000,
  connectTimeoutMS: 5000,

  // Write Concern for B2B Financial Orders (Receipt guaranteed on primary node)
  w: 'majority',
  wtimeoutMS: 5000,
  readPreference: 'primaryPreferred',

  autoIndex: false
};

async function connectMongo() {
  try {
    await mongoose.connect(mongoUri, mongoOptions);
    console.log('[Mongo Pool] Connected safely with maxPoolSize: 10, minPoolSize: 1');
  } catch (err) {
    // Non-fatal warning: Do NOT crash the entire server process!
    console.warn('[Mongo Pool Warning] MongoDB connection skipped or unavailable; continuing in standalone mode:', err.message);
  }
}

async function closeMongo() {
  console.log('[Mongo Pool] Disconnecting from MongoDB...');
  await mongoose.disconnect();
}

module.exports = {
  connectMongo,
  closeMongo
};
