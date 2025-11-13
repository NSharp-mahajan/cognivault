import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';

dotenv.config();

let pineconeClient;
let index;

export async function initPinecone() {
  try {
    // For development/testing, we'll use mock mode if API key is not provided
    if (!process.env.PINECONE_API_KEY || process.env.PINECONE_API_KEY === 'mock') {
      console.log('🔧 Running Pinecone in mock mode for development');
      return createMockPinecone();
    }
    
    pineconeClient = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY
    });
    
    const indexName = process.env.PINECONE_INDEX_NAME || 'cognivault';
    
    // Check if index exists
    const indexes = await pineconeClient.listIndexes();
    const indexExists = indexes.indexes?.some(idx => idx.name === indexName);
    
    if (!indexExists) {
      console.log(`Creating Pinecone index: ${indexName}`);
      await pineconeClient.createIndex({
        name: indexName,
        dimension: 768, // Dimension for text-embedding-004
        metric: 'cosine',
        spec: {
          serverless: {
            cloud: 'aws',
            region: 'us-east-1'
          }
        }
      });
    }
    
    index = pineconeClient.index(indexName);
    console.log('Pinecone initialized successfully');
    
  } catch (error) {
    console.error('Pinecone initialization error:', error);
    console.log('Falling back to mock mode');
    return createMockPinecone();
  }
}

// Mock Pinecone for development
function createMockPinecone() {
  const mockData = new Map();
  
  index = {
    upsert: async (vectors) => {
      vectors.forEach(v => mockData.set(v.id, v));
      return { upsertedCount: vectors.length };
    },
    query: async ({ vector, topK = 10, filter }) => {
      // Return mock similar vectors
      const mockResults = [];
      let count = 0;
      
      for (const [id, data] of mockData.entries()) {
        if (filter && data.metadata?.user_id !== filter.user_id) continue;
        
        mockResults.push({
          id,
          score: Math.random() * 0.3 + 0.7, // Random score between 0.7 and 1.0
          metadata: data.metadata
        });
        
        count++;
        if (count >= topK) break;
      }
      
      return { matches: mockResults };
    },
    delete: async (ids) => {
      ids.forEach(id => mockData.delete(id));
    }
  };
  
  pineconeClient = { index: () => index };
  return pineconeClient;
}

export function getPineconeIndex() {
  if (!index) {
    throw new Error('Pinecone not initialized. Call initPinecone() first.');
  }
  return index;
}

export { pineconeClient };
