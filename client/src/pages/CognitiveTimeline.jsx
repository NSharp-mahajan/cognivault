import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import {
  Brain,
  TrendingUp,
  Heart,
  Network,
  Sparkles,
  Calendar,
  Tag,
  ArrowRight,
  Loader2
} from 'lucide-react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  ReactFlowProvider
} from 'reactflow';
import 'reactflow/dist/style.css';
import './CognitiveTimeline.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function CognitiveTimeline() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [topicSpikes, setTopicSpikes] = useState({});
  const [emotionTrend, setEmotionTrend] = useState([]);
  const [knowledgeEvolution, setKnowledgeEvolution] = useState({ nodes: [], edges: [], newBranches: [] });
  const [branchTriggers, setBranchTriggers] = useState([]);
  const [insights, setInsights] = useState('');
  const [activeSection, setActiveSection] = useState('timeline');

  useEffect(() => {
    if (currentUser) {
      loadTimelineData();
    }
  }, [currentUser]);

  const loadTimelineData = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      const token = await currentUser.getIdToken();

      const [eventsRes, spikesRes, emotionRes, evolutionRes, triggersRes, insightsRes] = await Promise.all([
        axios.get(`${API_URL}/timeline/events`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/timeline/topic-spikes`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/timeline/emotion-trend`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/timeline/knowledge-evolution`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/timeline/branch-triggers`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/timeline/insights`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setEvents(eventsRes.data);
      setTopicSpikes(spikesRes.data);
      setEmotionTrend(emotionRes.data);
      setKnowledgeEvolution(evolutionRes.data);
      setBranchTriggers(triggersRes.data);
      setInsights(insightsRes.data.insights || '');
    } catch (error) {
      console.error('Error loading timeline data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="timeline-loading">
        <Loader2 className="spinner" />
        <p>Loading your cognitive journey...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="cognitive-timeline-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="timeline-header">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="timeline-title">
            <Brain className="title-icon" />
            Cognitive Timeline
          </h1>
          <p className="timeline-subtitle">Your learning evolution visualized</p>
        </motion.div>

        {insights && (
          <motion.div
            className="insights-card"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Sparkles className="insights-icon" />
            <div className="insights-content">
              <h3>AI Insights</h3>
              <p>{insights}</p>
            </div>
          </motion.div>
        )}
      </div>

      <div className="timeline-sections">
        {/* Section 1: Learning Timeline View */}
        <TimelineView events={events} />

        {/* Section 2: Topic Spike Graph */}
        <TopicSpikeGraph topicSpikes={topicSpikes} />

        {/* Section 3: Emotion Trend Line Graph */}
        <EmotionTrendGraph emotionTrend={emotionTrend} />

        {/* Section 4: Knowledge Evolution Visualization */}
        <KnowledgeEvolutionGraph knowledgeEvolution={knowledgeEvolution} />

        {/* Section 5: Branch Trigger Cards */}
        <BranchTriggerCards branchTriggers={branchTriggers} />
      </div>
    </motion.div>
  );
}

// Section 1: Learning Timeline View
function TimelineView({ events }) {
  if (events.length === 0) {
    return (
      <SectionContainer icon={<Calendar />} title="Learning Timeline" subtitle="Your learning journey over time">
        <div className="empty-state">No learning events yet. Start uploading content to see your timeline!</div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer icon={<Calendar />} title="Learning Timeline" subtitle="Chronological view of your learning">
      <div className="timeline-container">
        {events.map((event, index) => (
          <motion.div
            key={event.chunk_id || index}
            className="timeline-event"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="timeline-marker" />
            <div className="timeline-content">
              <div className="event-date">
                {new Date(event.timestamp).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
              <div className="event-summary">{event.summary || 'No summary available'}</div>
              {event.text_snippet && (
                <div className="event-snippet">{event.text_snippet}</div>
              )}
              {event.tags && event.tags.length > 0 && (
                <div className="event-tags">
                  {event.tags.slice(0, 5).map((tag, i) => (
                    <span key={i} className="tag-chip">
                      <Tag size={12} />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
}

// Section 2: Topic Spike Graph
function TopicSpikeGraph({ topicSpikes }) {
  const months = Object.keys(topicSpikes).sort();
  const allTopics = new Set();
  months.forEach(month => {
    Object.keys(topicSpikes[month]).forEach(topic => allTopics.add(topic));
  });

  const topicArray = Array.from(allTopics);
  const maxCount = Math.max(
    ...months.flatMap(month => Object.values(topicSpikes[month]))
  );

  if (months.length === 0) {
    return (
      <SectionContainer icon={<TrendingUp />} title="Topic Spikes" subtitle="Trending topics over time">
        <div className="empty-state">No topic data available yet.</div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer icon={<TrendingUp />} title="Topic Spikes" subtitle="Your learning focus over time">
      <div className="topic-spike-container">
        <div className="spike-chart">
          {months.map((month, monthIndex) => (
            <div key={month} className="spike-month">
              <div className="month-label">{month}</div>
              <div className="spike-bars">
                {topicArray.slice(0, 10).map((topic) => {
                  const count = topicSpikes[month][topic] || 0;
                  const height = maxCount > 0 ? (count / maxCount) * 100 : 0;
                  return (
                    <div
                      key={topic}
                      className="spike-bar"
                      style={{
                        height: `${height}%`,
                        backgroundColor: `hsl(${(topicArray.indexOf(topic) * 30) % 360}, 70%, 60%)`
                      }}
                      title={`${topic}: ${count}`}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="topic-legend">
          {topicArray.slice(0, 10).map((topic, i) => (
            <div key={topic} className="legend-item">
              <div
                className="legend-color"
                style={{
                  backgroundColor: `hsl(${(i * 30) % 360}, 70%, 60%)`
                }}
              />
              <span>{topic}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}

// Section 3: Emotion Trend Line Graph
function EmotionTrendGraph({ emotionTrend }) {
  if (emotionTrend.length === 0) {
    return (
      <SectionContainer icon={<Heart />} title="Emotion Trend" subtitle="Your emotional journey">
        <div className="empty-state">No emotion data available yet.</div>
      </SectionContainer>
    );
  }

  const points = emotionTrend.map((item, index) => ({
    x: index,
    y: item.score * 100,
    date: item.date,
    sentiment: item.sentiment
  }));

  const maxY = 100;
  const svgWidth = 800;
  const svgHeight = 300;
  const padding = 40;

  const pathData = points
    .map((point, i) => {
      const x = padding + (i / (points.length - 1 || 1)) * (svgWidth - 2 * padding);
      const y = svgHeight - padding - (point.y / maxY) * (svgHeight - 2 * padding);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return '#10b981';
      case 'negative': return '#ef4444';
      default: return '#6366f1';
    }
  };

  return (
    <SectionContainer icon={<Heart />} title="Emotion Trend" subtitle="Sentiment analysis over time">
      <div className="emotion-trend-container">
        <svg width="100%" height="300" viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="emotion-svg">
          <defs>
            <linearGradient id="emotionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={`${pathData} L ${padding + (svgWidth - 2 * padding)} ${svgHeight - padding} L ${padding} ${svgHeight - padding} Z`}
            fill="url(#emotionGradient)"
            className="emotion-area"
          />
          <path
            d={pathData}
            fill="none"
            stroke="#6366f1"
            strokeWidth="3"
            className="emotion-line"
          />
          {points.map((point, i) => {
            const x = padding + (i / (points.length - 1 || 1)) * (svgWidth - 2 * padding);
            const y = svgHeight - padding - (point.y / maxY) * (svgHeight - 2 * padding);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="5"
                fill={getSentimentColor(point.sentiment)}
                className="emotion-point"
              />
            );
          })}
        </svg>
        <div className="emotion-legend">
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#10b981' }} />
            <span>Positive</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#6366f1' }} />
            <span>Neutral</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#ef4444' }} />
            <span>Negative</span>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}

// Section 4: Knowledge Evolution Visualization
function KnowledgeEvolutionGraphInner({ knowledgeEvolution }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (knowledgeEvolution.nodes && knowledgeEvolution.nodes.length > 0) {
      const flowNodes = knowledgeEvolution.nodes.map((node, index) => ({
        id: node.id,
        type: 'default',
        position: {
          x: (index % 5) * 150 + 50,
          y: Math.floor(index / 5) * 150 + 50
        },
        data: {
          label: node.label,
          count: node.count
        },
        style: {
          background: '#6366f1',
          color: '#fff',
          border: '2px solid #4f46e5',
          borderRadius: '8px',
          padding: '10px',
          fontSize: '12px'
        }
      }));

      const flowEdges = knowledgeEvolution.edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#6366f1', strokeWidth: 2 }
      }));

      setNodes(flowNodes);
      setEdges(flowEdges);
    }
  }, [knowledgeEvolution, setNodes, setEdges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
      className="knowledge-flow"
    >
      <Background />
      <Controls />
      <MiniMap />
    </ReactFlow>
  );
}

function KnowledgeEvolutionGraph({ knowledgeEvolution }) {
  if (knowledgeEvolution.nodes.length === 0) {
    return (
      <SectionContainer icon={<Network />} title="Knowledge Evolution" subtitle="How your knowledge graph has grown">
        <div className="empty-state">No knowledge graph data available yet.</div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer icon={<Network />} title="Knowledge Evolution" subtitle="Your conceptual growth visualized">
      <div className="knowledge-evolution-container">
        <ReactFlowProvider>
          <KnowledgeEvolutionGraphInner knowledgeEvolution={knowledgeEvolution} />
        </ReactFlowProvider>
        {knowledgeEvolution.newBranches && knowledgeEvolution.newBranches.length > 0 && (
          <div className="new-branches-list">
            <h4>New Knowledge Branches</h4>
            {knowledgeEvolution.newBranches.slice(0, 5).map((branch, i) => (
              <div key={i} className="branch-item">
                <Sparkles size={16} />
                <span>{branch.topic}</span>
                <span className="branch-date">
                  {new Date(branch.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </SectionContainer>
  );
}

// Section 5: Branch Trigger Cards
function BranchTriggerCards({ branchTriggers }) {
  if (branchTriggers.length === 0) {
    return (
      <SectionContainer icon={<Sparkles />} title="Branch Triggers" subtitle="Moments when new topics emerged">
        <div className="empty-state">No branch triggers detected yet.</div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer icon={<Sparkles />} title="Branch Triggers" subtitle="When new knowledge branches appeared">
      <div className="branch-triggers-grid">
        {branchTriggers.map((trigger, index) => (
          <motion.div
            key={index}
            className="branch-trigger-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="trigger-date">
              {new Date(trigger.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
            <div className="trigger-content">
              <h3>New Branch Triggered</h3>
              <div className="trigger-topic">{trigger.trigger}</div>
              {trigger.ledTo && trigger.ledTo.length > 0 && (
                <div className="trigger-led-to">
                  <span>Led to:</span>
                  <div className="led-to-topics">
                    {trigger.ledTo.map((topic, i) => (
                      <span key={i} className="led-to-topic">
                        {topic}
                        {i < trigger.ledTo.length - 1 && <ArrowRight size={12} />}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
}

// Reusable Section Container
function SectionContainer({ icon, title, subtitle, children }) {
  return (
    <motion.section
      className="timeline-section"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="section-header">
        <div className="section-icon">{icon}</div>
        <div>
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>
      </div>
      <div className="section-content">{children}</div>
    </motion.section>
  );
}

