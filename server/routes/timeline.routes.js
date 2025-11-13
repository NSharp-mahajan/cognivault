import { Router } from 'express';
import { verifyFirebaseToken } from '../config/firebaseAdmin.js';
import * as timelineService from '../services/timeline.service.js';

const router = Router();

// Middleware to verify Firebase token
async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  try {
    const decoded = await verifyFirebaseToken(token);
    req.userId = decoded.uid;
    next();
  } catch (error) {
    const statusCode = error.code === 'auth/missing-token' ? 401 : 403;
    return res.status(statusCode).json({ error: error.message });
  }
}

// GET /api/timeline/events - Get chronological learning events
router.get('/events', authenticate, async (req, res) => {
  try {
    const events = await timelineService.getTimelineEvents(req.userId);
    res.json(events);
  } catch (error) {
    console.error('Error fetching timeline events:', error);
    res.status(500).json({ error: 'Failed to fetch timeline events' });
  }
});

// GET /api/timeline/topic-spikes - Get topic spikes by month
router.get('/topic-spikes', authenticate, async (req, res) => {
  try {
    const spikes = await timelineService.getTopicSpikes(req.userId);
    res.json(spikes);
  } catch (error) {
    console.error('Error fetching topic spikes:', error);
    res.status(500).json({ error: 'Failed to fetch topic spikes' });
  }
});

// GET /api/timeline/emotion-trend - Get emotion/sentiment trend
router.get('/emotion-trend', authenticate, async (req, res) => {
  try {
    const trend = await timelineService.getEmotionTrend(req.userId);
    res.json(trend);
  } catch (error) {
    console.error('Error fetching emotion trend:', error);
    res.status(500).json({ error: 'Failed to fetch emotion trend' });
  }
});

// GET /api/timeline/knowledge-evolution - Get knowledge evolution graph
router.get('/knowledge-evolution', authenticate, async (req, res) => {
  try {
    const evolution = await timelineService.getKnowledgeEvolution(req.userId);
    res.json(evolution);
  } catch (error) {
    console.error('Error fetching knowledge evolution:', error);
    res.status(500).json({ error: 'Failed to fetch knowledge evolution' });
  }
});

// GET /api/timeline/branch-triggers - Get branch triggers
router.get('/branch-triggers', authenticate, async (req, res) => {
  try {
    const triggers = await timelineService.getBranchTriggers(req.userId);
    res.json(triggers);
  } catch (error) {
    console.error('Error fetching branch triggers:', error);
    res.status(500).json({ error: 'Failed to fetch branch triggers' });
  }
});

// GET /api/timeline/insights - Get synthetic AI insights
router.get('/insights', authenticate, async (req, res) => {
  try {
    const [events, topicSpikes, emotionTrend, knowledgeEvolution] = await Promise.all([
      timelineService.getTimelineEvents(req.userId),
      timelineService.getTopicSpikes(req.userId),
      timelineService.getEmotionTrend(req.userId),
      timelineService.getKnowledgeEvolution(req.userId)
    ]);
    
    const insights = await timelineService.generateInsights(
      req.userId,
      events,
      topicSpikes,
      emotionTrend,
      knowledgeEvolution
    );
    
    res.json({ insights });
  } catch (error) {
    console.error('Error generating insights:', error);
    res.status(500).json({ error: 'Failed to generate insights' });
  }
});

export default router;

