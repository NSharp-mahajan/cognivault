# 🚀 Start CogniVault with Updated Configuration

## ✅ Configuration Updated

Your CogniVault has been configured with:
- **Port:** 5001 (changed from 5000)
- **Neo4j:** Connected with your credentials
- **Pinecone:** Connected with your API key (gcp-starter)
- **MongoDB Atlas:** Connected

---

## 🎯 Quick Start (3 Commands)

### Step 1: Update Environment Files

```bash
# From project root
chmod +x update-config.sh
./update-config.sh
```

This will copy the updated `.env.example` files to `.env` with your credentials.

---

### Step 2: Start Backend

```bash
# Terminal 1
cd server
npm run dev
```

**Expected Output:**
```
🚀 Initializing services...
✅ Neo4j connected
✅ Successfully connected to MongoDB Atlas
✅ Database and collections initialized
✅ Pinecone initialized
🎉 Services initialized
🌟 CogniVault server running on http://localhost:5001
```

**✅ Success Indicators:**
- ✅ "Neo4j connected" (not "Neo4j not available")
- ✅ "MongoDB Atlas" connected
- ✅ "Pinecone initialized" (not mock mode)
- ✅ Server running on port **5001**

---

### Step 3: Start Frontend

```bash
# Terminal 2 (new terminal window)
cd client
npm run dev
```

**Expected Output:**
```
VITE v5.0.0  ready in 500 ms

➜  Local:   http://localhost:5173/
```

---

### Step 4: Test Knowledge Graph

1. Open browser: **http://localhost:5173**
2. **Login/Signup** with Firebase
3. Navigate to **Dashboard**
4. Click **"Knowledge Graph"** or **"Graph"** in sidebar
5. Click **"Mock Data"** button (top-right)
6. Watch for notifications:
   - Blue: "Initializing mock data..."
   - Green: "Mock data loaded successfully! 🎉"
   - Green: "Loaded X nodes and Y edges"
7. Graph should populate with colored nodes!

---

## 🔍 Verify Everything is Working

### Check Backend Health

```bash
curl http://localhost:5001/api/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "...",
  "services": {
    "neo4j": "connected",
    "mongodb": "connected",
    "pinecone": "initialized"
  }
}
```

### Test Mock Data API

```bash
curl -X POST http://localhost:5001/api/graph/mock/initialize \
  -H "Content-Type: application/json" \
  -d '{"user_id":"demo_user"}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Initialized 10 mock memories",
  "stats": {
    "total_nodes": 40,
    "total_edges": 35,
    ...
  }
}
```

---

## 📊 What's Different Now

### Before (Port 5000)
- ❌ Port conflict
- ❌ Neo4j in mock mode
- ❌ Pinecone in mock mode
- ⚠️ Limited functionality

### Now (Port 5001)
- ✅ No port conflict
- ✅ Real Neo4j connection
- ✅ Real Pinecone connection
- ✅ Full functionality
- ✅ Real vector embeddings
- ✅ Real graph database

---

## 🎮 Features Now Available

With real Neo4j and Pinecone:

1. **Graph Visualization** ✅
   - Create and view memory nodes
   - See relationships between concepts
   - Interactive graph exploration

2. **Semantic Search** ✅
   - Real vector embeddings via Pinecone
   - Similarity-based search
   - Find related memories

3. **Mock Data** ✅
   - 10 sample memories
   - ~40 nodes total
   - ~35 relationships
   - Multiple node types (Memory, Concept, Entity, Source)

4. **Graph Operations** ✅
   - Create memory nodes
   - Link concepts and entities
   - Generate similarity edges
   - Query subgraphs

---

## 🐛 Troubleshooting

### Backend won't start on port 5001

```bash
# Check if port is in use
lsof -ti:5001

# If something is using it, kill it
lsof -ti:5001 | xargs kill -9

# Or change to another port in server/.env
# PORT=5002
```

### Neo4j connection error

**Error:** "Failed to connect to server"

**Solution:**
```bash
# If using Docker Neo4j
docker ps  # Check if neo4j container is running
docker start neo4j  # Start if stopped

# If using Neo4j Aura
# Check your NEO4J_URI in server/.env
# Should be: neo4j+s://xxxxx.databases.neo4j.io
```

### Pinecone error

**Error:** "PineconeArgumentError"

**Check server/.env has:**
```env
PINECONE_API_KEY=pcsk_3nH2kM_2VhjjMfb6GafhoTmPD7EKUacHWmszdL9JhX38CXsHJYCB2quzP81YbNJnqkFR2a
PINECONE_ENVIRONMENT=gcp-starter
PINECONE_INDEX_NAME=cognivault
```

### Frontend can't connect to backend

**Error:** Network error or 404

**Solution:**
```bash
# Check client/.env has correct API URL
cat client/.env

# Should show:
# VITE_API_URL=http://localhost:5001/api

# If not, run:
cd client
cp .env.example .env
```

### Mock Data button does nothing

**Check:**
1. Backend is running (check terminal)
2. Browser console for errors (F12)
3. Backend health: `curl http://localhost:5001/api/health`

**Fix:**
```bash
# Restart backend
cd server
npm run dev

# Hard refresh browser
# Mac: Cmd+Shift+R
# Windows: Ctrl+Shift+R
```

---

## 📝 Configuration Summary

### Backend (server/.env)
```env
PORT=5001
NEO4J_URI=bolt://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=mZSIky5EFct7isnofbpDPiO4TQzxx3sabYjV76G4rIc
MONGODB_URI=mongodb+srv://cognivault_user:...
PINECONE_API_KEY=pcsk_3nH2kM_...
PINECONE_ENVIRONMENT=gcp-starter
PINECONE_INDEX_NAME=cognivault
GEMINI_API_KEY=mock
```

### Frontend (client/.env)
```env
VITE_API_URL=http://localhost:5001/api
```

---

## 🎯 Success Checklist

- [ ] Run `./update-config.sh` successfully
- [ ] Backend starts without errors
- [ ] Console shows "Neo4j connected" (not mock mode)
- [ ] Console shows "Pinecone initialized" (not mock mode)
- [ ] Server running on port 5001
- [ ] Frontend loads at localhost:5173
- [ ] Can login with Firebase
- [ ] Knowledge Graph page loads
- [ ] "Mock Data" button shows notifications
- [ ] Graph populates with colored nodes
- [ ] Statistics panel shows counts > 0
- [ ] No errors in browser console (F12)

---

## 🚀 You're Ready!

Your CogniVault is now configured with:
- ✅ Real Neo4j graph database
- ✅ Real Pinecone vector database
- ✅ MongoDB Atlas cloud database
- ✅ Port 5001 (no conflicts)

**Start testing the Knowledge Graph feature!** 🧠✨

Follow the testing guide: `KNOWLEDGE_GRAPH_DETAILED_TESTING.md`
