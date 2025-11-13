# 🚀 CogniVault - Setup and Testing Guide

Complete guide to set up and test your CogniVault Knowledge Graph.

---

## ⚡ Quick Start (3 Steps)

### Step 1: Setup MongoDB Atlas
```bash
# One-time configuration
chmod +x setup-mongodb-atlas.sh
./setup-mongodb-atlas.sh
```

**Important:** If you get connection errors, whitelist your IP in MongoDB Atlas:
1. Go to https://cloud.mongodb.com/
2. **Network Access** → **Add IP Address** → **Allow Access from Anywhere**
3. Wait 2-3 minutes

### Step 2: Start Services
```bash
# Option A: Use run script
./run.sh

# Option B: Manual start
# Terminal 1
cd server && npm install && npm run dev

# Terminal 2
cd client && npm install && npm run dev
```

### Step 3: Test Knowledge Graph
1. Open http://localhost:5173/knowledge-graph
2. Login/Signup with Firebase
3. Click **"Mock Data"** button
4. Watch graph populate with ~40 nodes

✅ **Success!** Your Knowledge Graph is working!

---

## 🧪 Testing Checklist

### Database Connection
```bash
# Test MongoDB Atlas
node test-mongodb-atlas.js
```
Expected: All ✅ green checkmarks

### Backend Health
```bash
# Check backend is running
curl http://localhost:5000/api/health
```
Expected: `{"status":"ok",...}`

### Mock Data
```bash
# Initialize test data via API
curl -X POST http://localhost:5000/api/graph/mock/initialize \
  -H "Content-Type: application/json" \
  -d '{"user_id":"demo_user"}'
```
Expected: `{"success":true,...}`

---

## 🎮 Knowledge Graph Features to Test

### Basic Navigation
- ✅ **Zoom:** Scroll mouse wheel
- ✅ **Pan:** Click and drag background
- ✅ **Click Node:** View details in right panel
- ✅ **Drag Node:** Reposition nodes

### Search & Filter
- ✅ **Search:** Type "AI" and press Enter
- ✅ **Depth Slider:** Change from 1-5
- ✅ **Filter Dropdown:** Select "Memories" or other types

### Layout Modes
- ✅ **Force Layout:** Physics-based (default)
- ✅ **Circular Layout:** Nodes in a circle
- ✅ **Grid Layout:** Organized grid

### Controls
- ✅ **Toggle Labels:** Show/hide node text
- ✅ **Fullscreen:** Expand graph view
- ✅ **Refresh:** Reload graph data

### Visual Verification
- ✅ Green nodes = Memories
- ✅ Blue nodes = Concepts
- ✅ Orange nodes = Entities
- ✅ Purple nodes = Sources
- ✅ Lines connect related nodes
- ✅ Statistics panel shows counts

---

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Check if port 5000 is in use
lsof -ti:5000 | xargs kill -9

# Reinstall dependencies
cd server
rm -rf node_modules
npm install
npm run dev
```

### MongoDB Connection Error
```bash
# Verify .env exists
cat server/.env | grep MONGODB_URI

# Should show: mongodb+srv://cognivault_user:...

# Re-run setup
./setup-mongodb-atlas.sh
```

### Mock Data Button Does Nothing
```bash
# Check browser console (F12) for errors
# Verify backend is running
curl http://localhost:5000/api/health

# Try manual API call
curl -X POST http://localhost:5000/api/graph/mock/initialize \
  -H "Content-Type: application/json" \
  -d '{"user_id":"demo_user"}'
```

### Graph Stays Empty
```bash
# Check if data exists
curl "http://localhost:5000/api/graph/stats?user_id=demo_user"

# Should show: total_nodes > 0
# If zero, reinitialize mock data
```

---

## 📊 Expected Behavior

### After Mock Data Loads:
- **Notifications:** Blue "Initializing..." → Green "Success!" → Green "Loaded X nodes"
- **Graph Display:**
  - ~10 green Memory nodes
  - ~15 blue Concept nodes
  - ~8 orange Entity nodes
  - ~2-3 purple Source nodes
  - ~35 connecting edges
- **Statistics Panel:** Total Nodes: ~40, Total Edges: ~35

### Interactive Features:
- Click any node → Right panel shows details
- Search "AI" → Focuses on AI-related nodes
- Change depth to 3 → Shows extended connections
- Filter to "Memories" → Only green nodes visible
- Switch to Circular layout → Nodes arrange in circle

---

## 🎯 Success Criteria

Your setup is complete if:

- [ ] `node test-mongodb-atlas.js` passes all tests
- [ ] Backend starts with "✅ Successfully connected to MongoDB Atlas"
- [ ] Frontend loads at localhost:5173
- [ ] Can login with Firebase
- [ ] Knowledge Graph page loads without errors
- [ ] Mock Data button shows green success notifications
- [ ] Graph populates with colored nodes
- [ ] Statistics show counts > 0
- [ ] All interactive features work (zoom, pan, search, filter)
- [ ] No errors in browser console (F12)

---

## 📚 Additional Resources

- **README.md** - Project overview and setup
- **KNOWLEDGE_GRAPH_DOCUMENTATION.md** - Technical architecture details
- **KNOWLEDGE_GRAPH_DETAILED_TESTING.md** - Comprehensive feature testing (50+ steps)

---

## 🔄 Daily Usage

After initial setup, just run:

```bash
# Start everything
./run.sh

# Or manually:
# Terminal 1: cd server && npm run dev
# Terminal 2: cd client && npm run dev

# Access at: http://localhost:5173/knowledge-graph
```

No need to run setup again unless you change configuration!

---

## 📞 Need Help?

1. Check browser console (F12) for JavaScript errors
2. Check backend terminal for server errors
3. Verify MongoDB Atlas IP is whitelisted
4. Try `node test-mongodb-atlas.js` to diagnose database issues
5. See **KNOWLEDGE_GRAPH_DETAILED_TESTING.md** for step-by-step instructions

---

**Happy exploring your digital memory vault! 🧠✨**
