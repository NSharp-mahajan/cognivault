# CogniVault Backend Server

## Setup Instructions

### Prerequisites
1. **Neo4j Database**
   - Download and install Neo4j Desktop from https://neo4j.com/download/
   - Create a new database with username `neo4j` and set your password
   - Start the database (default port: 7687)

2. **MongoDB**
   - Install MongoDB Community Edition from https://www.mongodb.com/try/download/community
   - Start MongoDB service (default port: 27017)

3. **Node.js**
   - Ensure Node.js v18+ is installed

### Installation

1. Install dependencies:
```bash
cd server
npm install
```

2. Configure environment:
```bash
cp .env.example .env
```

3. Update `.env` file with your credentials:
   - Set your Neo4j password
   - Add your Pinecone API key (optional - will use mock if not provided)
   - Add your Gemini API key (optional - will use mock if not provided)

### Running the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:5000`

### Testing the Knowledge Graph

1. Start the server
2. Visit the frontend at `http://localhost:5173/knowledge-graph`
3. Click "Mock Data" to initialize sample data
4. Interact with the graph:
   - Search for nodes
   - Click nodes to explore connections
   - Adjust depth level
   - Filter by node type
   - Toggle between layout modes

### API Endpoints

#### Graph Endpoints
- `GET /api/graph/full` - Get full user graph
- `GET /api/graph/subgraph` - Get subgraph around a node
- `GET /api/graph/search` - Search nodes
- `GET /api/graph/stats` - Get graph statistics
- `POST /api/graph/memory` - Create memory node
- `POST /api/graph/edges/similarity` - Create similarity edges
- `POST /api/graph/mock/initialize` - Initialize mock data
- `DELETE /api/graph/clear` - Clear user data

### Mock Mode
If API keys are not provided, the server runs in mock mode:
- Pinecone: Uses in-memory storage
- Gemini: Generates deterministic mock responses

### Troubleshooting

**Neo4j Connection Issues:**
- Ensure Neo4j is running
- Check credentials in `.env`
- Default URI: `bolt://localhost:7687`

**MongoDB Connection Issues:**
- Ensure MongoDB is running
- Check connection string in `.env`
- Default URI: `mongodb://localhost:27017/cognivault`

**Port Already in Use:**
- Change port in `.env` file
- Or kill the process using the port
