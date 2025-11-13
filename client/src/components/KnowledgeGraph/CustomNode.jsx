import React from 'react';
import { Handle, Position } from 'reactflow';
import { Brain, Tag, User, FileText, Circle } from 'lucide-react';
import './CustomNode.css';

const CustomNode = ({ data, type, selected }) => {
  const getIcon = () => {
    switch (type) {
      case 'memory':
        return <Brain size={16} />;
      case 'concept':
        return <Tag size={16} />;
      case 'entity':
        return <User size={16} />;
      case 'source':
        return <FileText size={16} />;
      default:
        return <Circle size={16} />;
    }
  };

  const getClassName = () => {
    let className = 'custom-node';
    className += ` node-${type}`;
    if (selected) className += ' selected';
    return className;
  };

  return (
    <div className={getClassName()}>
      <Handle type="target" position={Position.Top} />
      
      <div className="node-content">
        <div className="node-icon">
          {getIcon()}
        </div>
        {data.showLabels && (
          <div className="node-label">
            {data.label || data.name || data.id}
          </div>
        )}
      </div>
      
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default CustomNode;
