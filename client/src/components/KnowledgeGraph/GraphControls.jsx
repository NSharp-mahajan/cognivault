import React from 'react';
import {
  Search,
  Filter,
  Layers,
  Eye,
  EyeOff,
  Grid3x3,
  Circle,
  Shuffle
} from 'lucide-react';
import './GraphControls.css';

const GraphControls = ({
  searchQuery,
  setSearchQuery,
  onSearch,
  depthLevel,
  setDepthLevel,
  filterType,
  setFilterType,
  layoutMode,
  setLayoutMode,
  showLabels,
  setShowLabels
}) => {
  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="graph-controls">
      <div className="control-group search-group">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search nodes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleSearchKeyPress}
          className="search-input"
        />
        <button onClick={onSearch} className="search-btn">
          Search
        </button>
      </div>

      <div className="control-group">
        <label>
          <Layers size={16} />
          Depth:
        </label>
        <input
          type="range"
          min="1"
          max="5"
          value={depthLevel}
          onChange={(e) => setDepthLevel(parseInt(e.target.value))}
          className="depth-slider"
        />
        <span className="depth-value">{depthLevel}</span>
      </div>

      <div className="control-group">
        <label>
          <Filter size={16} />
          Filter:
        </label>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Nodes</option>
          <option value="memory">Memories</option>
          <option value="concept">Concepts</option>
          <option value="entity">Entities</option>
          <option value="source">Sources</option>
        </select>
      </div>

      <div className="control-group">
        <label>Layout:</label>
        <div className="layout-buttons">
          <button
            onClick={() => setLayoutMode('force')}
            className={`layout-btn ${layoutMode === 'force' ? 'active' : ''}`}
            title="Force Layout"
          >
            <Shuffle size={16} />
          </button>
          <button
            onClick={() => setLayoutMode('circular')}
            className={`layout-btn ${layoutMode === 'circular' ? 'active' : ''}`}
            title="Circular Layout"
          >
            <Circle size={16} />
          </button>
          <button
            onClick={() => setLayoutMode('grid')}
            className={`layout-btn ${layoutMode === 'grid' ? 'active' : ''}`}
            title="Grid Layout"
          >
            <Grid3x3 size={16} />
          </button>
        </div>
      </div>

      <div className="control-group">
        <button
          onClick={() => setShowLabels(!showLabels)}
          className="toggle-btn"
          title="Toggle Labels"
        >
          {showLabels ? <Eye size={18} /> : <EyeOff size={18} />}
          {showLabels ? 'Hide' : 'Show'} Labels
        </button>
      </div>
    </div>
  );
};

export default GraphControls;
