CogniVault
==========

Your Mind. Remembered Forever.

CogniVault is an AI‑powered memory vault built with React + Vite. It turns your notes, files, and thoughts into a living, searchable memory system with cinematic UI, day/night themes, and smooth page transitions.

Features
- **🌐 Interactive Knowledge Graph** - Visualize your memories and their connections
- Premium landing experience with neon cyan/magenta/purple brand palette
- Particle and glow backgrounds with cursor‑follow effects
- 1‑second route/page loader
- Sections: Hero, Vision, How It Works, Experience, Feature Grid, Testimonials, Footer
- Theme toggle (day/night) with soft transitions
- Framer Motion section reveals and micro‑interactions
- Responsive layout and glass/neon styling
- **🧠 AI-Powered Memory Processing** - Automatic tagging, summarization, and entity extraction
- **🔍 Semantic Search** - Find memories based on meaning, not just keywords
- **📊 Graph Analytics** - Insights into your knowledge network

Tech Stack
**Frontend:**
- React 18, Vite
- React Router
- React Flow (Knowledge Graph Visualization)
- Framer Motion
- Firebase Authentication
- CSS Modules by directory (centralized styles under src/styles)

**Backend:**
- Node.js + Express
- Neo4j (Graph Database)
- MongoDB (Document Store)
- Pinecone (Vector Database)
- Google Gemini API (AI Processing)

Monorepo layout
- client/ — React app (frontend)
- server/ — Node.js backend with APIs and graph services

Quick start
1) Install
- cd client
- npm install

2) Run dev server
- npm run dev
The app starts on http://localhost:5173 by default.

3) Build
- npm run build
- npm run preview

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ and npm
- **MongoDB Atlas** account (cloud database - free tier available)
- Modern web browser

### Quick Setup

#### 1. Configure MongoDB Atlas
```bash
# One-time setup - configures your MongoDB Atlas connection
chmod +x setup-mongodb-atlas.sh
./setup-mongodb-atlas.sh
```

**Important:** Make sure your IP is whitelisted in MongoDB Atlas:
1. Go to https://cloud.mongodb.com/
2. Navigate to **Network Access** → **Add IP Address**
3. Select **"Allow Access from Anywhere"** or add your specific IP
4. Wait 2-3 minutes for changes to take effect

#### 2. Start the Application

**Option A - Use the run script:**
```bash
./run.sh
```

**Option B - Manual start:**
```bash
# Terminal 1 - Backend
cd server
npm install
npm run dev

# Terminal 2 - Frontend
cd client
npm install
npm run dev
```

#### 3. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Knowledge Graph: http://localhost:5173/knowledge-graph

### Testing the Knowledge Graph

1. Open http://localhost:5173/knowledge-graph
2. Login/signup with Firebase
3. Click **"Mock Data"** button (top-right)
4. Watch the graph populate with sample data
5. Interact with nodes, search, filter, and explore

**For complete setup and testing guide, see:** `SETUP_AND_TESTING.md`

### Verify MongoDB Atlas Connection
```bash
# Test the database connection
node test-mongodb-atlas.js
```

Expected output: All ✅ green checkmarks

---

## 📁 Project Structure

```
CogniVault/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   │   └── KnowledgeGraph/  # Graph visualization
│   │   ├── pages/            # Page components
│   │   ├── contexts/         # React contexts (Auth, Theme)
│   │   └── styles/           # CSS files
│   └── package.json
│
├── server/                    # Node.js backend
│   ├── config/               # Database configurations
│   │   ├── mongodb.js        # MongoDB Atlas
│   │   ├── neo4j.js          # Neo4j (optional)
│   │   └── pinecone.js       # Vector database
│   ├── routes/               # API routes
│   ├── services/             # Business logic
│   │   ├── graph.service.js  # Graph operations
│   │   ├── embedding.service.js  # AI embeddings
│   │   └── mockData.service.js   # Test data
│   └── package.json
│
├── README.md                           # Main documentation
├── SETUP_AND_TESTING.md                # Setup and testing guide
├── KNOWLEDGE_GRAPH_DOCUMENTATION.md    # Technical details
├── KNOWLEDGE_GRAPH_DETAILED_TESTING.md # Comprehensive testing
├── setup-mongodb-atlas.sh              # MongoDB setup
├── run.sh                              # Start services
└── test-mongodb-atlas.js               # Database test
```

---

## 🛠️ Available Scripts

### Root Directory
```bash
./run.sh                      # Start both backend and frontend
./setup-mongodb-atlas.sh      # Configure MongoDB Atlas
node test-mongodb-atlas.js    # Test database connection
```

### Backend (server/)
```bash
npm run dev                   # Start development server
npm start                     # Start production server
```

### Frontend (client/)
```bash
npm run dev                   # Start Vite dev server
npm run build                 # Production build
npm run preview               # Preview production build
npm run lint                  # Run linting
```

---

## 🔐 Environment Variables

### Backend (.env in server/)
```env
PORT=5000
MONGODB_URI=mongodb+srv://...  # MongoDB Atlas connection
NEO4J_URI=bolt://localhost:7687  # Optional
PINECONE_API_KEY=mock  # Or real key
GEMINI_API_KEY=mock    # Or real key
```

---

## 📚 Documentation

- **README.md** - Main project documentation (this file)
- **SETUP_AND_TESTING.md** - Complete setup and testing guide
- **KNOWLEDGE_GRAPH_DOCUMENTATION.md** - Technical architecture details
- **KNOWLEDGE_GRAPH_DETAILED_TESTING.md** - Comprehensive feature testing (50+ steps)

---

## 🤝 Contributing

This is a personal memory vault project. Feel free to fork and customize for your needs!

---

## 📄 License

MIT License - Feel free to use and modify

---

**Built with ❤️ - CogniVault: Your Mind. Remembered Forever. 🧠✨**
