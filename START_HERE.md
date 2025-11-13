# 🚀 CogniVault Knowledge Graph - Quick Start

Welcome! This guide will get your Knowledge Graph running in **5 minutes**.

## ✅ Prerequisites Checklist

- [ ] Node.js v18+ installed
- [ ] npm installed
- [ ] Git installed
- [ ] 4GB free RAM
- [ ] Modern browser (Chrome/Firefox/Safari)

## 🎯 Option 1: Fastest Setup (No Databases Required)

This runs everything in **mock mode** - perfect for testing!

```bash
# 1. Setup (one time only)
chmod +x setup.sh
./setup.sh

# 2. Start everything
./run.sh
```

Then open: **http://localhost:5173/knowledge-graph**

Click **"Mock Data"** button to populate the graph!

## 🔧 Option 2: Full Setup with Databases

### Using Docker (Recommended)
```bash
# 1. Start databases
docker-compose up -d

# 2. Setup and run
./setup.sh
./run.sh
```

### Manual Database Setup
1. **Install Neo4j Desktop**: https://neo4j.com/download/
   - Create new database
   - Username: `neo4j`
   - Password: Set your own
   - Start the database

2. **Install MongoDB**: https://www.mongodb.com/try/download/community
   - Start MongoDB service
   - No auth required for local development

3. **Configure Environment**
```bash
cd server
cp .env.example .env
# Edit .env with your Neo4j password
```

4. **Run Services**
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

## 🎮 Using the Knowledge Graph

### First Time Setup
1. Go to **http://localhost:5173**
2. Sign up or login with Firebase
3. Navigate to Dashboard
4. Click **"Knowledge Graph"** card or use sidebar

### Graph Controls
- **🔍 Search**: Type keywords and press Enter
- **📊 Depth**: Slide to explore more connections
- **🏷️ Filter**: Show specific node types
- **🔄 Layout**: Switch between Force/Circular/Grid
- **👁️ Labels**: Toggle text on/off
- **📤 Mock Data**: Load sample data instantly

### Interacting with Nodes
- **Click**: Focus and load connections
- **Drag**: Reposition nodes
- **Hover**: See highlighting
- **Scroll**: Zoom in/out
- **Right Panel**: View node details

## 🧪 Test the System

Run the test script to verify everything works:
```bash
chmod +x test-graph.sh
./test-graph.sh
```

Expected output:
```
✅ Backend is running
✅ Mock data initialized successfully
✅ Graph statistics retrieved
✅ Graph data retrieved successfully
✅ Search functionality working
```

## 📱 Quick Demo Flow

1. **Initialize Mock Data**
   - Click "Mock Data" button
   - Wait for "Success" notification

2. **Explore Memories**
   - Green nodes = Memory chunks
   - Click any green node to focus

3. **View Connections**
   - Blue edges = Concepts/Tags
   - Dashed lines = Similar content
   - Purple edges = Source documents

4. **Search Content**
   - Try searching: "AI", "quantum", "climate"
   - Results highlight and center

5. **Change Layouts**
   - Try Circular layout for overview
   - Grid layout for organization
   - Force layout for organic view

## 🆘 Troubleshooting

### "Backend not running"
```bash
cd server
npm install
npm run dev
```

### "Cannot connect to Neo4j"
- The app works without Neo4j (uses mock mode)
- Or start Neo4j: `neo4j start`
- Check credentials in `server/.env`

### "Graph is empty"
1. Click "Mock Data" button
2. Or run: `curl -X POST http://localhost:5000/api/graph/mock/initialize`
3. Refresh the page

### "Page not loading"
```bash
# Ensure frontend is running
cd client
npm install
npm run dev
```

## 📊 What You'll See

When everything is working:
- **10 mock memories** about various topics
- **Colorful node network** with 4 types
- **Interactive controls** at the top
- **Statistics panel** at bottom-left
- **Smooth animations** and transitions

## 🎯 Next Steps

1. **Upload Real Data**: Coming soon with file upload feature
2. **Chat Interface**: Query your knowledge naturally
3. **Insights Dashboard**: Analytics about your memory vault

## 💡 Pro Tips

- **Performance**: Keep depth ≤ 3 for smooth interaction
- **Navigation**: Use minimap for large graphs
- **Fullscreen**: Press fullscreen for immersive view
- **Export**: Screenshot the graph for sharing

## 📚 Learn More

- [Full Documentation](./KNOWLEDGE_GRAPH_DOCUMENTATION.md)
- [API Reference](./server/README.md)
- [Architecture Overview](./README.md)

## 🚨 Need Help?

Common issues and solutions:
```bash
# Reset everything
docker-compose down -v
rm -rf server/node_modules client/node_modules
./setup.sh

# Check services
lsof -i :5000  # Backend
lsof -i :5173  # Frontend
lsof -i :7687  # Neo4j

# View logs
# Backend: Check terminal running npm run dev
# Frontend: Check browser console (F12)
```

---

**Ready to explore your digital mind? Start with `./run.sh`! 🧠✨**
