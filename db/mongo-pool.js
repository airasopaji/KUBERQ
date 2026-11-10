/**
 * KuberQ — MongoDB High-Concurrency Connection Pool
 * Sized for 200+ simultaneous connections with Mongoose / MongoDB Native Driver
 */

const mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/kuberq_prod';

const mongoOptions = {
  // Connection Pool Limits: Sized for high concurrency without socket exhaustion
  maxPoolSize: parseInt(process.env.MONGO_MAX_POOL_SIZE || '50', 10),
  minPoolSize: parseInt(process.env.MONGO_MIN_POOL_SIZE || '10', 10),

  // Timeouts
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,

  // Write Concern for B2B Financial Orders (Receipt guaranteed on primary node)
  w: 'majority',
  wtimeoutMS: 5000,
  readPreference: 'primaryPreferred',

  autoIndex: process.env.NODE_ENV !== 'production' // Don't build indexes at runtime in prod; use migration script
};

async function connectMongo() {
  try {
    await mongoose.connect(mongoUri, mongoOptions);
    console.log('[Mongo Pool] Connected with maxPoolSize: 50, minPoolSize: 10');
  } catch (err) {
    console.error('[Mongo Pool Fatal] Failed to connect to MongoDB:', err.message);
    process.exit(1);
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
