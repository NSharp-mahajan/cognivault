# 🧠 CogniVault Knowledge Graph Documentation

## Overview
The Knowledge Graph is a core feature of CogniVault that visualizes the relationships between your memories, concepts, entities, and documents in an interactive network visualization.

## 🏗️ Architecture

### Technology Stack
- **Frontend**: React Flow for graph visualization
- **Backend**: Node.js + Express
- **Graph Database**: Neo4j
- **Document Store**: MongoDB
- **Vector Database**: Pinecone
- **AI Processing**: Google Gemini API

### Data Flow
```
User Upload → Text Extraction → AI Processing → Graph Creation
     ↓              ↓                ↓              ↓
  Firebase      PDF Parse      Gemini API      Neo4j + MongoDB
     ↓              ↓                ↓              ↓
   Auth         Chunking      Embeddings      Visualization
```

## 📦 Node Types

### 1. Memory Node 🧠
Represents a chunk of information from your documents
- **Properties**: id, summary, user_id, created_at, char_count
- **Color**: Green (#10b981)
- **Icon**: Brain

### 2. Concept Node 🏷️
Represents tags and topics extracted from content
- **Properties**: name, user_id
- **Color**: Blue (#6366f1)
- **Icon**: Tag

### 3. Entity Node 👤
Named entities like people, organizations, technologies
- **Properties**: id, name, type, user_id
- **Color**: Orange (#f59e0b)
- **Icon**: User

### 4. Source Node 📄
Original documents and files
- **Properties**: id, file_name, user_id
- **Color**: Purple (#8b5cf6)
- **Icon**: FileText

## 🔗 Edge Types

### SIMILAR_TO
- Connects memories with semantic similarity
- Animated dashed line
- Color: Green
- Created using vector similarity (threshold: 0.75)

### TAGGED_WITH
- Connects memories to concepts
- Color: Blue
- Shows topic relationships

### MENTIONS
- Connects memories to entities
- Color: Orange
- Includes confidence score

### DERIVED_FROM
- Connects memories to source documents
- Color: Purple
- Shows document origin

## 🎮 Features & Controls

### Search & Filter
- **Search**: Find nodes by keywords
- **Filter**: Show specific node types (Memory, Concept, Entity, Source)
- **Depth Control**: Adjust exploration depth (1-5 levels)

### Layout Modes
1. **Force Layout**: Physics-based node positioning
2. **Circular Layout**: Nodes arranged in circles
3. **Grid Layout**: Organized grid structure

### Interactive Elements
- **Click Node**: Load subgraph around selected node
- **Drag**: Reposition nodes
- **Zoom/Pan**: Navigate the graph
- **Toggle Labels**: Show/hide node labels
- **Fullscreen**: Expand graph view

### Visual Indicators
- **MiniMap**: Overview navigation
- **Statistics Panel**: Real-time graph metrics
- **Node Details**: Information panel for selected nodes

## 🚀 Quick Start Guide

### 1. Setup with Docker
```bash
# Start Neo4j and MongoDB
docker-compose up -d

# Install dependencies
cd server && npm install
cd ../client && npm install

# Run both services
./run.sh
```

### 2. Manual Setup
```bash
# Backend
cd server
cp .env.example .env
# Edit .env with your credentials
npm run dev

# Frontend (new terminal)
cd client
npm run dev
```

### 3. Initialize Mock Data
```bash
# Using API
curl -X POST http://localhost:5000/api/graph/mock/initialize \
  -H "Content-Type: application/json" \
  -d '{"user_id":"demo_user"}'

# Or from UI
# Navigate to http://localhost:5173/knowledge-graph
# Click "Mock Data" button
```

## 📡 API Reference

### Graph Endpoints

#### Get Full Graph
```http
GET /api/graph/full?user_id=demo_user&limit=100
```
Returns all nodes and edges for a user

#### Get Subgraph
```http
GET /api/graph/subgraph?node_id=mem_123&depth=2&user_id=demo_user
```
Returns nodes within specified depth from target node

#### Search Nodes
```http
GET /api/graph/search?query=AI&user_id=demo_user&type=Memory
```
Search nodes by text and optional type filter

#### Create Memory
```http
POST /api/graph/memory
{
  "text": "Content text",
  "summary": "Brief summary",
  "tags": ["tag1", "tag2"],
  "entities": [{"name": "Entity", "type": "TYPE"}],
  "user_id": "user_123",
  "source_file_id": "file_123"
}
```

#### Create Similarity Edges
```http
POST /api/graph/edges/similarity
{
  "memory_id": "mem_123",
  "user_id": "user_123"
}
```

#### Get Statistics
```http
GET /api/graph/stats?user_id=demo_user
```
Returns node and edge counts by type

## 🔧 Configuration

### Environment Variables (.env)
```env
# Backend Configuration
NEO4J_URI=bolt://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=your_password
MONGODB_URI=mongodb://localhost:27017/cognivault
PINECONE_API_KEY=your_key_or_mock
GEMINI_API_KEY=your_key_or_mock

# Frontend Configuration
VITE_API_URL=http://localhost:5000/api
```

### Mock Mode
The system runs in mock mode when API keys are not provided:
- **Pinecone**: Uses in-memory vector storage
- **Gemini**: Generates deterministic mock responses
- **Perfect for development and testing**

## 📊 Performance Optimization

### Best Practices
1. **Limit Initial Load**: Use pagination (limit parameter)
2. **Depth Control**: Keep depth ≤ 3 for large graphs
3. **Lazy Loading**: Load subgraphs on demand
4. **Caching**: Browser caches rendered nodes

### Scalability
- Neo4j handles millions of nodes/edges
- Indexed queries for fast retrieval
- Async processing for heavy operations
- Background jobs for graph maintenance

## 🎨 Customization

### Styling
Edit CSS files in `/client/src/components/KnowledgeGraph/`:
- `KnowledgeGraph.css` - Main container
- `CustomNode.css` - Node appearance
- `GraphControls.css` - Control panel
- `GraphStats.css` - Statistics panel

### Node Colors
Modify in `CustomNode.css`:
```css
.node-memory { border-color: #10b981; }
.node-concept { border-color: #6366f1; }
.node-entity { border-color: #f59e0b; }
.node-source { border-color: #8b5cf6; }
```

### Layout Algorithms
Customize in `processNodes()` function:
```javascript
// Add custom layout logic
if (layoutMode === 'custom') {
  // Your layout algorithm
}
```

## 🐛 Troubleshooting

### Common Issues

#### Neo4j Connection Failed
```bash
# Check if Neo4j is running
docker ps | grep neo4j

# Verify connection
cypher-shell -u neo4j -p password
```

#### Empty Graph
```bash
# Initialize mock data
curl -X POST http://localhost:5000/api/graph/mock/initialize

# Check statistics
curl http://localhost:5000/api/graph/stats?user_id=demo_user
```

#### Performance Issues
1. Reduce node limit in queries
2. Lower depth level
3. Use filter to show fewer nodes
4. Clear browser cache

## 🔐 Security Considerations

1. **Authentication**: All endpoints require user authentication
2. **Data Isolation**: Users only see their own data
3. **Input Validation**: Sanitized queries prevent injection
4. **Rate Limiting**: Implement for production
5. **HTTPS**: Use SSL certificates in production

## 📈 Future Enhancements

### Planned Features
- [ ] Real-time collaboration
- [ ] Graph clustering algorithms
- [ ] Advanced search with filters
- [ ] Export graph as image/PDF
- [ ] Import from various sources
- [ ] Graph comparison tools
- [ ] Time-based filtering
- [ ] Community detection
- [ ] Path finding algorithms
- [ ] Graph embeddings

### Integration Ideas
- Connect with Notion API
- Import from Google Drive
- Sync with Obsidian
- WhatsApp chat import
- Email parsing

## 📚 Resources

### Documentation
- [React Flow Docs](https://reactflow.dev/)
- [Neo4j Documentation](https://neo4j.com/docs/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Pinecone Docs](https://docs.pinecone.io/)

### Tutorials
- [Graph Theory Basics](https://neo4j.com/graph-algorithms-book/)
- [Vector Embeddings Guide](https://www.pinecone.io/learn/vector-embeddings/)
- [React Flow Examples](https://reactflow.dev/examples)

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request

### Code Standards
- Use ESLint configuration
- Write descriptive commit messages
- Add JSDoc comments for functions
- Update documentation for new features

## 📞 Support

- **GitHub Issues**: Report bugs and request features
- **Documentation**: This guide and inline code comments
- **Community**: Join discussions in issues section

---

**Built with ❤️ for CogniVault - Your Mind. Remembered Forever.**
