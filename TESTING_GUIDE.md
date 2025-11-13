# 🧪 Knowledge Graph Testing Guide

## Prerequisites Check

Before testing, ensure all services are running:

```bash
# Make scripts executable
chmod +x check-services.sh run.sh test-graph.sh

# Check service status
./check-services.sh
```

You should see:
- ✅ Backend is running (port 5000)
- ✅ Frontend is running (port 5173)

## Step 1: Start the Application

### Option A: Using the run script (Recommended)
```bash
./run.sh
```

This starts both frontend and backend automatically.

### Option B: Manual start
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend  
cd client
npm run dev
```

Wait for both to fully start:
- Backend: "CogniVault server running on http://localhost:5000"
- Frontend: "Local: http://localhost:5173/"

## Step 2: Access the Knowledge Graph

1. Open your browser
2. Go to: **http://localhost:5173**
3. Login with your Firebase account (or sign up)
4. Navigate to the Knowledge Graph:
   - **Option A**: Click "Knowledge Graph" card in Dashboard
   - **Option B**: Click "Graph" in the sidebar
   - **Option C**: Direct URL: http://localhost:5173/knowledge-graph

## Step 3: Initialize Mock Data

### Visual Method (Recommended)
1. Look for the **"Mock Data"** button in the top-right corner
2. Click it
3. Watch for notifications:
   - "Initializing mock data..." (blue)
   - "Mock data loaded successfully! 🎉" (green)
   - "Loaded X nodes and Y edges" (green)

### API Method (Alternative)
```bash
# Run the test script
./test-graph.sh

# Or manually via curl
curl -X POST http://localhost:5000/api/graph/mock/initialize \
  -H "Content-Type: application/json" \
  -d '{"user_id":"demo_user"}'
```

### What You Should See
After loading mock data, the graph should display:
- **~10 green nodes** (Memories)
- **~15-20 blue nodes** (Concepts/Tags)
- **~5-10 orange nodes** (Entities)
- **~2-3 purple nodes** (Sources)
- **Multiple connecting lines** (Edges)

## Step 4: Test Interactive Features

### 4.1 Navigation
- **Zoom**: Scroll mouse wheel
- **Pan**: Click and drag background
- **Reset View**: Click the fit-to-screen button in controls

### 4.2 Node Interaction
1. **Hover over any node** → Should highlight
2. **Click a green (Memory) node** → Should:
   - Focus on that node
   - Load related connections
   - Show details in right panel
   - Update statistics

### 4.3 Search Functionality
1. Type in search box: **"AI"**
2. Press Enter or click Search
3. Expected result:
   - Graph focuses on matching nodes
   - Should find memories about Artificial Intelligence
   - Notification shows search completed

Try other searches:
- "quantum" → Should find quantum computing memories
- "climate" → Should find climate change content
- "neural" → Should find neural network content

### 4.4 Depth Control
1. Locate the **Depth slider** (shows 1-5)
2. Set to **1** → See only immediate connections
3. Set to **3** → See extended network
4. Set to **5** → See maximum depth

Watch how the graph expands/contracts!

### 4.5 Filter by Node Type
1. Find the **Filter dropdown**
2. Select **"Memories"** → Only green nodes visible
3. Select **"Concepts"** → Only blue nodes visible
4. Select **"Entities"** → Only orange nodes visible
5. Select **"All Nodes"** → Everything visible

### 4.6 Layout Modes
Try each layout:

**Force Layout** (default):
- Click the shuffle icon
- Organic, physics-based positioning
- Nodes repel each other naturally

**Circular Layout**:
- Click the circle icon
- Nodes arranged in a circle
- Good for overview

**Grid Layout**:
- Click the grid icon
- Organized in rows/columns
- Clean and structured

### 4.7 Label Toggle
- Click **"Hide Labels"** button
- Node text disappears, icons remain
- Click **"Show Labels"** to restore
- Useful for large graphs

### 4.8 Statistics Panel
Check bottom-left corner:
- **Total Nodes**: Should show ~30-40
- **Total Edges**: Should show ~20-30
- **Breakdown by type**: Memory, Concept, Entity counts

### 4.9 MiniMap
Look at bottom-right corner:
- Small overview of entire graph
- Your current viewport shown as rectangle
- Click minimap to jump to areas

## Step 5: Test Error Handling

### Test Backend Disconnect
1. Stop the backend server (Ctrl+C in server terminal)
2. Click "Mock Data" button
3. Expected: Error notification appears
   - "Error: Backend server not reachable..."
   - Displayed in red
   - Auto-dismisses after 8 seconds

### Test Empty State
1. With backend running, refresh page
2. Before clicking Mock Data
3. Expected: Warning notification
   - "No data found. Click Mock Data to initialize."

## Step 6: Performance Testing

### Load Test
1. Click "Mock Data" multiple times rapidly
2. System should:
   - Handle duplicate requests gracefully
   - Not crash or freeze
   - Show appropriate notifications

### Interaction Speed
1. Click multiple nodes rapidly
2. Should respond smoothly
3. No lag or freezing

## Step 7: Advanced Features

### Export Screenshot
1. Use browser's screenshot tool
2. Or use fullscreen mode for clean capture

### Fullscreen Mode
1. Click fullscreen icon (expand button)
2. Graph fills entire screen
3. Click again to exit

### Refresh Graph
1. Click refresh button (circular arrow)
2. Graph reloads from database
3. New notification confirms reload

## Common Issues & Solutions

### ❌ Issue: "Backend not reachable"
**Solution:**
```bash
cd server
npm run dev
# Wait for "server running" message
```

### ❌ Issue: "Mock Data button does nothing"
**Check:**
1. Open browser console (F12)
2. Look for errors
3. Run: `./check-services.sh`
4. Ensure backend is on port 5000

**Fix:**
```bash
# Restart everything
# Terminal 1
cd server
npm install
npm run dev

# Terminal 2  
cd client
npm install
npm run dev
```

### ❌ Issue: "Graph is empty after Mock Data"
**Solution:**
```bash
# Check if data was created
curl http://localhost:5000/api/graph/stats?user_id=demo_user

# Should show counts > 0
# If not, check server logs for errors
```

### ❌ Issue: "Nodes load but don't move"
**Solution:**
- Try switching layout modes
- Click refresh button
- Try clicking a node to focus

### ❌ Issue: "Search returns nothing"
**Solution:**
- Ensure mock data is loaded
- Try simpler search terms: "AI", "quantum"
- Check if graph has data (see statistics)

## Verification Checklist

After testing, verify all these work:

- [ ] Mock data loads successfully
- [ ] Nodes appear in graph (4 different colors)
- [ ] Edges connect nodes
- [ ] Clicking nodes shows details
- [ ] Search finds relevant nodes
- [ ] Depth slider works
- [ ] Filter dropdown works
- [ ] Layout modes switch correctly
- [ ] Labels toggle on/off
- [ ] Statistics show correct counts
- [ ] Notifications appear and dismiss
- [ ] Error handling works (test backend disconnect)
- [ ] Zoom and pan work smoothly
- [ ] MiniMap shows overview
- [ ] Fullscreen mode works

## API Testing (Optional)

Test backend directly:

```bash
# 1. Initialize data
curl -X POST http://localhost:5000/api/graph/mock/initialize \
  -H "Content-Type: application/json" \
  -d '{"user_id":"test_user"}'

# 2. Get full graph
curl "http://localhost:5000/api/graph/full?user_id=test_user&limit=50"

# 3. Search nodes
curl "http://localhost:5000/api/graph/search?query=AI&user_id=test_user"

# 4. Get statistics
curl "http://localhost:5000/api/graph/stats?user_id=test_user"

# 5. Get subgraph (replace mem_XXX with actual node ID)
curl "http://localhost:5000/api/graph/subgraph?node_id=mem_XXX&depth=2&user_id=test_user"
```

## Performance Benchmarks

Expected performance on modern hardware:
- Mock data initialization: **2-5 seconds**
- Graph rendering (50 nodes): **< 1 second**
- Node click response: **< 500ms**
- Search: **< 1 second**
- Layout switch: **< 500ms**

## Next Steps

After successful testing:

1. **Upload Real Data** (coming soon):
   - PDF documents
   - Text files
   - Notes

2. **Chat with Graph**:
   - Natural language queries
   - "Show me everything about AI"
   - "How are these topics connected?"

3. **Export & Share**:
   - Export graph as image
   - Share specific subgraphs

4. **Advanced Analytics**:
   - Topic clustering
   - Trending concepts
   - Knowledge gaps

## Need Help?

### Check Logs
```bash
# Backend logs
cd server
npm run dev
# Watch for errors in output

# Frontend logs
# Open browser console (F12)
# Check Console tab for errors
```

### Full Reset
```bash
# Stop everything
# Ctrl+C in all terminals

# Clear data
docker-compose down -v

# Reinstall
cd server && npm install
cd ../client && npm install

# Restart
./run.sh
```

### Report Issues
If problems persist:
1. Run `./check-services.sh` and save output
2. Check browser console for errors (F12)
3. Check server logs
4. Note exact steps to reproduce

---

**Happy Testing! 🧪🧠✨**

The Knowledge Graph should now be fully functional. Explore, search, and visualize your digital memory vault!
