import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let db;
let client;

export async function connectMongoDB() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cognivault';
    
    // MongoDB Atlas optimized connection options
    client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    await client.connect();
    
    // Verify connection
    await client.db('admin').command({ ping: 1 });
    console.log('✅ Successfully connected to MongoDB Atlas');
    
    db = client.db('cognivault');
    
    // Create collections if they don't exist
    await createCollections();
    
    console.log('✅ Database and collections initialized');
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    throw error;
  }
}

async function createCollections() {
  const collections = ['source_files', 'chunks', 'users'];
  
  for (const collectionName of collections) {
    const exists = await db.listCollections({ name: collectionName }).hasNext();
    if (!exists) {
      await db.createCollection(collectionName);
      console.log(`Created collection: ${collectionName}`);
    }
  }
  
  // Create indexes
  await db.collection('chunks').createIndex({ user_id: 1 });
  await db.collection('chunks').createIndex({ file_id: 1 });
  await db.collection('chunks').createIndex({ neo4j_node_id: 1 });
  await db.collection('source_files').createIndex({ user_id: 1 });
}

export function getDB() {
  if (!db) {
    throw new Error('MongoDB not connected. Call connectMongoDB() first.');
  }
  return db;
}

export async function closeMongoDB() {
  if (client) {
    await client.close();
  }
}
