import neo4j from 'neo4j-driver';
import dotenv from 'dotenv';

dotenv.config();

let driver;
let session;

export async function connectNeo4j() {
  try {
    driver = neo4j.driver(
      process.env.NEO4J_URI || 'bolt://localhost:7687',
      neo4j.auth.basic(
        process.env.NEO4J_USERNAME || 'neo4j',
        process.env.NEO4J_PASSWORD || 'password'
      ),
      {
        maxConnectionPoolSize: 50,
        connectionTimeout: 5000
      }
    );
    
    // Verify connection
    const serverInfo = await driver.getServerInfo();
    console.log('Connected to Neo4j:', serverInfo);
    
    // Create constraints and indexes
    await initializeSchema();
    
    return driver;
  } catch (error) {
    console.error('Neo4j connection error:', error.message);
    driver = null;
    throw new Error(`Neo4j unavailable: ${error.message}`);
  }
}

async function initializeSchema() {
  const session = driver.session();
  
  try {
    // Create constraints for unique IDs
    const constraints = [
      'CREATE CONSTRAINT memory_id IF NOT EXISTS FOR (m:Memory) REQUIRE m.id IS UNIQUE',
      'CREATE CONSTRAINT concept_name IF NOT EXISTS FOR (c:Concept) REQUIRE c.name IS UNIQUE',
      'CREATE CONSTRAINT entity_id IF NOT EXISTS FOR (e:Entity) REQUIRE e.id IS UNIQUE',
      'CREATE CONSTRAINT source_id IF NOT EXISTS FOR (s:Source) REQUIRE s.id IS UNIQUE'
    ];
    
    for (const constraint of constraints) {
      try {
        await session.run(constraint);
      } catch (err) {
        // Constraint might already exist
        console.log('Constraint may already exist:', err.message);
      }
    }
    
    // Create indexes for performance
    const indexes = [
      'CREATE INDEX memory_user_id IF NOT EXISTS FOR (m:Memory) ON (m.user_id)',
      'CREATE INDEX concept_user_id IF NOT EXISTS FOR (c:Concept) ON (c.user_id)',
      'CREATE INDEX entity_user_id IF NOT EXISTS FOR (e:Entity) ON (e.user_id)',
      'CREATE INDEX source_user_id IF NOT EXISTS FOR (s:Source) ON (s.user_id)'
    ];
    
    for (const index of indexes) {
      try {
        await session.run(index);
      } catch (err) {
        console.log('Index may already exist:', err.message);
      }
    }
    
  } finally {
    await session.close();
  }
}

export function getDriver() {
  if (!driver) {
    throw new Error('Neo4j driver not initialized. Call connectNeo4j() first.');
  }
  return driver;
}

export async function closeNeo4j() {
  if (driver) {
    await driver.close();
  }
}
