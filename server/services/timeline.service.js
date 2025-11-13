import { getDB } from '../config/mongodb.js';
import { getDriver } from '../config/neo4j.js';
import { getPineconeIndex } from '../config/pinecone.js';
import { generateMockEmbedding } from './embedding.service.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

// Get chronological learning events
export async function getTimelineEvents(userId) {
  console.log(`[Timeline] Fetching events for user: ${userId}`);
  
  try {
    const db = getDB();
    
    if (!db) {
      console.warn('[Timeline] MongoDB not connected, returning empty events');
      return [];
    }
    
    const chunks = await db.collection('chunks')
      .find({ user_id: userId })
      .sort({ created_at: 1 })
      .toArray();
    
    console.log(`[Timeline] Found ${chunks.length} chunks for user ${userId}`);
    
    const events = chunks.map(chunk => ({
      file_id: chunk.file_id || 'direct_input',
      user_id: chunk.user_id,
      timestamp: chunk.created_at,
      tags: chunk.tags || [],
      summary: chunk.summary || '',
      text_snippet: chunk.chunk_text ? chunk.chunk_text.split('\n').slice(0, 2).join(' ').substring(0, 200) : '',
      chunk_id: chunk.chunk_id
    }));
    
    return events.length > 0 ? events : [];
  } catch (error) {
    console.error('[Timeline] Error fetching timeline events:', error.message);
    console.error('[Timeline] Stack:', error.stack);
    return [];
  }
}

// Get topic spikes grouped by month
export async function getTopicSpikes(userId) {
  console.log(`[Timeline] Fetching topic spikes for user: ${userId}`);
  
  try {
    const db = getDB();
    
    if (!db) {
      console.warn('[Timeline] MongoDB not connected, returning empty topic spikes');
      return {};
    }
    
    const chunks = await db.collection('chunks')
      .find({ user_id: userId })
      .toArray();
    
    console.log(`[Timeline] Processing ${chunks.length} chunks for topic spikes`);
    
    const topicMap = {};
    
    chunks.forEach(chunk => {
      if (!chunk.created_at || !chunk.tags || !Array.isArray(chunk.tags)) return;
      
      const date = new Date(chunk.created_at);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!topicMap[monthKey]) {
        topicMap[monthKey] = {};
      }
      
      chunk.tags.forEach(tag => {
        const normalizedTag = tag.toLowerCase().trim();
        topicMap[monthKey][normalizedTag] = (topicMap[monthKey][normalizedTag] || 0) + 1;
      });
    });
    
    console.log(`[Timeline] Topic spikes calculated for ${Object.keys(topicMap).length} months`);
    return topicMap;
  } catch (error) {
    console.error('[Timeline] Error fetching topic spikes:', error.message);
    return {};
  }
}

// Get emotion trend over time
export async function getEmotionTrend(userId) {
  console.log(`[Timeline] Fetching emotion trend for user: ${userId}`);
  
  try {
    const db = getDB();
    
    if (!db) {
      console.warn('[Timeline] MongoDB not connected, returning empty emotion trend');
      return [];
    }
    
    const chunks = await db.collection('chunks')
      .find({ user_id: userId })
      .sort({ created_at: 1 })
      .toArray();
    
    console.log(`[Timeline] Analyzing sentiment for ${chunks.length} chunks`);
    
    const emotionData = [];
    
    // Process in batches to avoid overwhelming the API
    const batchSize = 10;
    for (let i = 0; i < chunks.length; i += batchSize) {
      const batch = chunks.slice(i, i + batchSize);
      
      await Promise.all(batch.map(async (chunk) => {
        if (!chunk.created_at || !chunk.chunk_text) return;
        
        try {
          const sentiment = await analyzeSentiment(chunk.chunk_text, chunk.summary);
          
          emotionData.push({
            date: chunk.created_at,
            sentiment: sentiment.label,
            score: sentiment.score
          });
        } catch (error) {
          console.warn(`[Timeline] Error analyzing sentiment for chunk ${chunk.chunk_id}:`, error.message);
          // Add fallback neutral sentiment
          emotionData.push({
            date: chunk.created_at,
            sentiment: 'neutral',
            score: 0.5
          });
        }
      }));
    }
    
    console.log(`[Timeline] Generated ${emotionData.length} emotion data points`);
    return emotionData;
  } catch (error) {
    console.error('[Timeline] Error fetching emotion trend:', error.message);
    return [];
  }
}

// Analyze sentiment using LLM or fallback
async function analyzeSentiment(text, summary = '') {
  const content = summary || text.substring(0, 1000);
  
  if (!genAI) {
    // Fallback: simple keyword-based sentiment
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'positive', 'success', 'achievement', 'learn', 'understand', 'insight'];
    const negativeWords = ['bad', 'difficult', 'problem', 'challenge', 'stress', 'confusion', 'error', 'fail', 'hard'];
    
    const lowerContent = content.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerContent.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerContent.includes(word)).length;
    
    if (positiveCount > negativeCount) {
      return { label: 'positive', score: Math.min(0.9, 0.5 + positiveCount * 0.1) };
    } else if (negativeCount > positiveCount) {
      return { label: 'negative', score: Math.max(0.1, 0.5 - negativeCount * 0.1) };
    } else {
      return { label: 'neutral', score: 0.5 };
    }
  }
  
  try {
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
    const prompt = `Analyze the sentiment of this text. Return ONLY a JSON object with this exact structure:
{
  "label": "positive|negative|neutral",
  "score": 0.0-1.0
}

Text: ${content.substring(0, 500)}`;
    
    const result = await model.generateContent(prompt);
    const response = result.response.text().trim();
    
    // Extract JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        label: parsed.label || 'neutral',
        score: parsed.score || 0.5
      };
    }
    
    return { label: 'neutral', score: 0.5 };
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    return { label: 'neutral', score: 0.5 };
  }
}

// Get knowledge evolution graph
export async function getKnowledgeEvolution(userId) {
  console.log(`[Timeline] Fetching knowledge evolution for user: ${userId}`);
  
  try {
    const db = getDB();
    
    if (!db) {
      console.warn('[Timeline] MongoDB not connected, returning empty knowledge evolution');
      return { nodes: [], edges: [], newBranches: [] };
    }
    
    let index;
    try {
      index = getPineconeIndex();
      console.log('[Timeline] Pinecone index available');
    } catch (error) {
      console.warn('[Timeline] Pinecone not available, continuing without it');
    }
    
    const chunks = await db.collection('chunks')
      .find({ user_id: userId })
      .sort({ created_at: 1 })
      .toArray();
    
    console.log(`[Timeline] Processing ${chunks.length} chunks for knowledge evolution`);
    
    if (chunks.length === 0) {
      return { nodes: [], edges: [], newBranches: [] };
    }
    
    // Extract unique topics from tags
    const topicSet = new Set();
    const topicToChunks = new Map();
    
    chunks.forEach(chunk => {
      if (chunk.tags && Array.isArray(chunk.tags)) {
        chunk.tags.forEach(tag => {
          const normalizedTag = tag.toLowerCase().trim();
          topicSet.add(normalizedTag);
          
          if (!topicToChunks.has(normalizedTag)) {
            topicToChunks.set(normalizedTag, []);
          }
          topicToChunks.get(normalizedTag).push(chunk);
        });
      }
    });
    
    // Create nodes for topics
    const nodes = Array.from(topicSet).map((topic, index) => ({
      id: `topic_${index}`,
      label: topic,
      type: 'topic',
      count: topicToChunks.get(topic).length,
      firstSeen: topicToChunks.get(topic)[0].created_at
    }));
    
    // Create edges based on co-occurrence
    const edges = [];
    const topicArray = Array.from(topicSet);
    
    for (let i = 0; i < topicArray.length; i++) {
      for (let j = i + 1; j < topicArray.length; j++) {
        const topic1 = topicArray[i];
        const topic2 = topicArray[j];
        
        // Count how many chunks have both topics
        const chunks1 = topicToChunks.get(topic1);
        const chunks2 = topicToChunks.get(topic2);
        const coOccurrence = chunks1.filter(c => 
          chunks2.some(c2 => c.chunk_id === c2.chunk_id)
        ).length;
        
        if (coOccurrence > 0) {
          edges.push({
            id: `edge_${i}_${j}`,
            source: `topic_${i}`,
            target: `topic_${j}`,
            weight: coOccurrence,
            type: 'related'
          });
        }
      }
    }
    
    // Detect new branches (topics that appeared later)
    const newBranches = [];
    const topicFirstSeen = new Map();
    
    chunks.forEach(chunk => {
      if (chunk.tags && Array.isArray(chunk.tags)) {
        chunk.tags.forEach(tag => {
          const normalizedTag = tag.toLowerCase().trim();
          if (!topicFirstSeen.has(normalizedTag)) {
            topicFirstSeen.set(normalizedTag, chunk.created_at);
          }
        });
      }
    });
    
    // Find topics that appeared significantly later (new branches)
    const sortedTopics = Array.from(topicFirstSeen.entries())
      .sort((a, b) => new Date(a[1]) - new Date(b[1]));
    
    if (sortedTopics.length > 3) {
      const earlyThreshold = sortedTopics[Math.floor(sortedTopics.length * 0.3)][1];
      
      sortedTopics.forEach(([topic, firstSeen]) => {
        if (new Date(firstSeen) > new Date(earlyThreshold)) {
          const relatedTopics = chunks
            .filter(c => c.tags && c.tags.map(t => t.toLowerCase().trim()).includes(topic))
            .flatMap(c => c.tags || [])
            .filter(t => t.toLowerCase().trim() !== topic)
            .filter((v, i, a) => a.indexOf(v) === i)
            .slice(0, 3);
          
          newBranches.push({
            topic,
            date: firstSeen,
            relatedTopics
          });
        }
      });
    }
    
    console.log(`[Timeline] Knowledge evolution: ${nodes.length} nodes, ${edges.length} edges, ${newBranches.length} new branches`);
    return { nodes, edges, newBranches };
  } catch (error) {
    console.error('[Timeline] Error fetching knowledge evolution:', error.message);
    console.error('[Timeline] Stack:', error.stack);
    return { nodes: [], edges: [], newBranches: [] };
  }
}

// Get branch triggers (when new knowledge branches appeared)
export async function getBranchTriggers(userId) {
  console.log(`[Timeline] Fetching branch triggers for user: ${userId}`);
  
  try {
    const db = getDB();
    
    if (!db) {
      console.warn('[Timeline] MongoDB not connected, returning empty branch triggers');
      return [];
    }
    
    let index;
    try {
      index = getPineconeIndex();
      console.log('[Timeline] Pinecone index available for similarity search');
    } catch (error) {
      console.warn('[Timeline] Pinecone not available, using mock embeddings');
    }
    
    const chunks = await db.collection('chunks')
      .find({ user_id: userId })
      .sort({ created_at: 1 })
      .toArray();
    
    console.log(`[Timeline] Processing ${chunks.length} chunks for branch triggers`);
    
    if (chunks.length < 2) {
      console.log('[Timeline] Not enough chunks for branch detection (need at least 2)');
      return [];
    }
    
    const branchTriggers = [];
    const processedChunks = [];
    
    for (let i = 0; i < chunks.length; i++) {
      const currentChunk = chunks[i];
      
      if (!currentChunk.chunk_text || !currentChunk.tags || currentChunk.tags.length === 0) continue;
      
      try {
        // Get embedding for current chunk
        const currentEmbedding = await generateMockEmbedding(currentChunk.chunk_text);
        
        // Try to use Pinecone for similarity search if available
        let maxSimilarity = 0;
        
        if (index && currentChunk.chunk_id) {
          try {
            // Query Pinecone for similar chunks
            const queryResult = await index.query({
              vector: currentEmbedding,
              topK: 5,
              filter: { user_id: userId }
            });
            
            // Find max similarity from previous chunks
            for (const match of queryResult.matches || []) {
              if (match.id !== currentChunk.chunk_id && match.score) {
                // Check if this is a previous chunk
                const isPrevious = processedChunks.some(pc => pc.chunk_id === match.id);
                if (isPrevious) {
                  maxSimilarity = Math.max(maxSimilarity, match.score);
                }
              }
            }
          } catch (pineconeError) {
            console.warn(`[Timeline] Pinecone query failed, using local similarity:`, pineconeError.message);
            // Fallback to local similarity calculation
            for (const prevChunk of processedChunks) {
              if (!prevChunk.embedding) {
                prevChunk.embedding = await generateMockEmbedding(prevChunk.chunk_text);
              }
              const similarity = cosineSimilarity(currentEmbedding, prevChunk.embedding);
              maxSimilarity = Math.max(maxSimilarity, similarity);
            }
          }
        } else {
          // Fallback: compare with previous chunks locally
          for (const prevChunk of processedChunks) {
            if (!prevChunk.embedding) {
              prevChunk.embedding = await generateMockEmbedding(prevChunk.chunk_text);
            }
            const similarity = cosineSimilarity(currentEmbedding, prevChunk.embedding);
            maxSimilarity = Math.max(maxSimilarity, similarity);
          }
        }
        
        // Check if this is a new branch (low similarity + new tags)
        if (maxSimilarity < 0.4) {
          const newTags = currentChunk.tags.filter(tag => {
            const normalizedTag = tag.toLowerCase().trim();
            return !processedChunks.some(pc => 
              pc.tags && pc.tags.map(t => t.toLowerCase().trim()).includes(normalizedTag)
            );
          });
          
          if (newTags.length > 0) {
            // Find what this branch led to (future chunks with similar tags)
            const futureChunks = chunks.slice(i + 1).filter(c => 
              c.tags && c.tags.some(t => newTags.includes(t))
            );
            
            const ledTo = futureChunks
              .flatMap(c => c.tags || [])
              .filter(tag => !newTags.includes(tag))
              .filter((v, i, a) => a.indexOf(v) === i)
              .slice(0, 5);
            
            branchTriggers.push({
              date: currentChunk.created_at,
              trigger: newTags[0],
              ledTo: ledTo.slice(0, 3)
            });
            
            console.log(`[Timeline] Branch trigger detected: ${newTags[0]} at ${currentChunk.created_at}`);
          }
        }
        
        processedChunks.push({
          ...currentChunk,
          embedding: currentEmbedding
        });
      } catch (chunkError) {
        console.warn(`[Timeline] Error processing chunk ${currentChunk.chunk_id}:`, chunkError.message);
        continue;
      }
    }
    
    console.log(`[Timeline] Found ${branchTriggers.length} branch triggers`);
    return branchTriggers;
  } catch (error) {
    console.error('[Timeline] Error fetching branch triggers:', error.message);
    console.error('[Timeline] Stack:', error.stack);
    return [];
  }
}

// Calculate cosine similarity between two vectors
function cosineSimilarity(vecA, vecB) {
  if (vecA.length !== vecB.length) return 0;
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Generate synthetic insights using LLM
export async function generateInsights(userId, events, topicSpikes, emotionTrend, knowledgeEvolution) {
  console.log(`[Timeline] Generating insights for user: ${userId}`);
  
  if (!genAI) {
    console.log('[Timeline] Gemini not available, using fallback insights');
    // Fallback insights
    const totalEvents = events.length;
    const allTopics = Object.values(topicSpikes).reduce((acc, month) => {
      Object.entries(month).forEach(([topic, count]) => {
        acc[topic] = (acc[topic] || 0) + count;
      });
      return acc;
    }, {});
    
    const topTopics = Object.entries(allTopics)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([topic]) => topic);
    
    const insight = totalEvents > 0 
      ? `You've created ${totalEvents} learning events. ${topTopics.length > 0 ? `Your top topics are: ${topTopics.join(', ')}. ` : ''}Keep exploring!`
      : 'Start uploading content to see your learning journey unfold!';
    
    return insight;
  }
  
  try {
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
    
    const prompt = `Analyze this user's learning timeline data and provide 2-3 insightful observations about their learning evolution. Be concise and encouraging.

Events: ${events.length} total learning events
Topic Spikes: ${JSON.stringify(topicSpikes).substring(0, 500)}
Emotion Trend: ${emotionTrend.length} sentiment data points
Knowledge Evolution: ${knowledgeEvolution.nodes.length} topics, ${knowledgeEvolution.newBranches.length} new branches

Provide insights in a friendly, encouraging tone. Focus on:
- Learning patterns
- Topic evolution
- Emotional journey
- Knowledge growth

Return ONLY the insights text, no JSON or formatting.`;
    
    const result = await model.generateContent(prompt);
    const insights = result.response.text().trim();
    console.log('[Timeline] AI insights generated successfully');
    return insights;
  } catch (error) {
    console.error('[Timeline] Error generating insights:', error.message);
    // Fallback
    const totalEvents = events.length;
    return totalEvents > 0 
      ? 'Your learning journey shows continuous growth. Keep exploring new topics!'
      : 'Start uploading content to see your learning journey unfold!';
  }
}

