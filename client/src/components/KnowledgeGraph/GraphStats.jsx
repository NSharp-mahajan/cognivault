import React from 'react';
import { BarChart3, Brain, Tag, User, FileText } from 'lucide-react';
import './GraphStats.css';

const GraphStats = ({ stats }) => {
  if (!stats) return null;

  const getIcon = (type) => {
    const icons = {
      Memory: <Brain size={14} />,
      Concept: <Tag size={14} />,
      Entity: <User size={14} />,
      Source: <FileText size={14} />
    };
    return icons[type] || <BarChart3 size={14} />;
  };

  return (
    <div className="graph-stats">
      <h4>
        <BarChart3 size={16} />
        Graph Statistics
      </h4>
      
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-label">Total Nodes</span>
          <span className="stat-value">{stats.total_nodes}</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-label">Total Edges</span>
          <span className="stat-value">{stats.total_edges}</span>
        </div>
      </div>

      <div className="stats-breakdown">
        <h5>Node Types</h5>
        {Object.entries(stats.nodes || {}).map(([type, count]) => (
          <div key={type} className="breakdown-item">
            <span className="breakdown-label">
              {getIcon(type)}
              {type}
            </span>
            <span className="breakdown-value">{count}</span>
          </div>
        ))}
      </div>

      <div className="stats-breakdown">
        <h5>Edge Types</h5>
        {Object.entries(stats.edges || {}).map(([type, count]) => (
          <div key={type} className="breakdown-item">
            <span className="breakdown-label edge-label">
              {type.replace(/_/g, ' ')}
            </span>
            <span className="breakdown-value">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GraphStats;
