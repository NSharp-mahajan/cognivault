import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb+srv://cognivault_user:C2eA0WHlUpoGZuom@cognivault.3l7l2bu.mongodb.net/?appName=cognivault';

async function testMongoDBAtlas() {
  console.log('🧪 Testing MongoDB Atlas Connection...\n');
  
  let client;
  
  try {
    // Step 1: Connect
    console.log('📡 Step 1: Connecting to MongoDB Atlas...');
    client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    await client.connect();
    console.log('✅ Connected successfully!\n');
    
    // Step 2: Ping
    console.log('📡 Step 2: Pinging database...');
    await client.db('admin').command({ ping: 1 });
    console.log('✅ Ping successful!\n');
    
    // Step 3: Access database
    console.log('📡 Step 3: Accessing cognivault database...');
    const db = client.db('cognivault');
    console.log('✅ Database accessed!\n');
    
    // Step 4: List collections
    console.log('📡 Step 4: Listing collections...');
    const collections = await db.listCollections().toArray();
    console.log('✅ Collections found:', collections.length);
    collections.forEach(col => console.log('   -', col.name));
    console.log();
    
    // Step 5: Create test collections if needed
    console.log('📡 Step 5: Creating required collections...');
    const requiredCollections = ['source_files', 'chunks', 'users'];
    
    for (const collectionName of requiredCollections) {
      const exists = await db.listCollections({ name: collectionName }).hasNext();
      if (!exists) {
        await db.createCollection(collectionName);
        console.log(`   ✅ Created collection: ${collectionName}`);
      } else {
        console.log(`   ✓ Collection exists: ${collectionName}`);
      }
    }
    console.log();
    
    // Step 6: Create indexes
    console.log('📡 Step 6: Creating indexes...');
    await db.collection('chunks').createIndex({ user_id: 1 });
    await db.collection('chunks').createIndex({ file_id: 1 });
    await db.collection('chunks').createIndex({ neo4j_node_id: 1 });
    await db.collection('source_files').createIndex({ user_id: 1 });
    console.log('✅ Indexes created!\n');
    
    // Step 7: Test write operation
    console.log('📡 Step 7: Testing write operation...');
    const testDoc = {
      _id: 'test_doc_' + Date.now(),
      user_id: 'test_user',
      test: true,
      timestamp: new Date(),
      message: 'MongoDB Atlas connection test'
    };
    
    await db.collection('users').insertOne(testDoc);
    console.log('✅ Write test successful!\n');
    
    // Step 8: Test read operation
    console.log('📡 Step 8: Testing read operation...');
    const readDoc = await db.collection('users').findOne({ _id: testDoc._id });
    console.log('✅ Read test successful!');
    console.log('   Document:', JSON.stringify(readDoc, null, 2));
    console.log();
    
    // Step 9: Test delete operation
    console.log('📡 Step 9: Cleaning up test document...');
    await db.collection('users').deleteOne({ _id: testDoc._id });
    console.log('✅ Cleanup successful!\n');
    
    // Step 10: Get database stats
    console.log('📡 Step 10: Database statistics...');
    const stats = await db.stats();
    console.log('✅ Database Stats:');
    console.log('   Database:', stats.db);
    console.log('   Collections:', stats.collections);
    console.log('   Data Size:', (stats.dataSize / 1024).toFixed(2), 'KB');
    console.log('   Storage Size:', (stats.storageSize / 1024).toFixed(2), 'KB');
    console.log();
    
    console.log('🎉 ALL TESTS PASSED! MongoDB Atlas is working perfectly!\n');
    
  } catch (error) {
    console.error('❌ TEST FAILED:', error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('🔒 Connection closed.');
    }
  }
}

// Run the test
testMongoDBAtlas().catch(console.error);
