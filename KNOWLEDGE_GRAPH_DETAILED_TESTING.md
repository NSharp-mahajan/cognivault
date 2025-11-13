# 🧠 Knowledge Graph - Ultra-Detailed Testing Guide

This is a **step-by-step, screenshot-worthy** guide to test every aspect of the Knowledge Graph feature.

---

## 📋 Prerequisites Checklist

Before starting, verify:

- [ ] MongoDB Atlas connection tested and working (see MONGODB_ATLAS_SETUP.md)
- [ ] alled (Node.js instcheck: `node --version`)
- [ ] npm installed (check: `npm --version`)
- [ ] Terminal/Command line access
- [ ] Modern web browser (Chrome, Firefox, Safari, Edge)

---

## 🚀 PHASE 1: Start the Backend Server

### Step 1.1: Navigate to Server Directory

```bash
cd /Users/rakshitjindal/Downloads/CogniVault/cognivault/server
```

### Step 1.2: Install Dependencies (if not done)

```bash
npm install
```

**Expected output:**
```
added 150 packages, and audited 151 packages in 15s
```

### Step 1.3: Verify .env File Exists

```bash
ls -la .env
```

**If it doesn't exist:**
```bash
cp .env.example .env
```

**Then edit it with your MongoDB Atlas URL:**
```bash
nano .env
```

Make sure it contains:
```env
MONGODB_URI=mongodb+srv://cognivault_user:C2eA0WHlUpoGZuom@cognivault.3l7l2bu.mongodb.net/?appName=cognivault
```

Save and exit (Ctrl+X, Y, Enter).

### Step 1.4: Start the Backend

```bash
npm run dev
```

**Expected console output:**
```
🚀 Initializing services...
⚠️  Neo4j not available, using mock mode: Connection refused
✅ Successfully connected to MongoDB Atlas
✅ Database and collections initialized
✅ Pinecone initialized
🎉 Services initialized (mock mode available)
🌟 CogniVault server running on http://localhost:5000
```

**✅ SUCCESS INDICATORS:**
- ✅ You see "Successfully connected to MongoDB Atlas"
- ✅ Server is running on port 5000
- ✅ No crash or exit

**❌ IF YOU SEE ERRORS:**
- Red error messages about MongoDB → Check MONGODB_ATLAS_SETUP.md
- Port 5000 already in use → Kill existing process: `lsof -ti:5000 | xargs kill -9`
- Module not found → Run `npm install` again

**⚠️ IMPORTANT:** Keep this terminal window open! The backend must stay running.

---

## 🎨 PHASE 2: Start the Frontend

### Step 2.1: Open a NEW Terminal Window/Tab

Keep the backend running in the first terminal!

### Step 2.2: Navigate to Client Directory

```bash
cd /Users/rakshitjindal/Downloads/CogniVault/cognivault/client
```

### Step 2.3: Install Dependencies (if not done)

```bash
npm install
```

**Expected output:**
```
added 200 packages, and audited 201 packages in 20s
```

### Step 2.4: Start the Frontend

```bash
npm run dev
```

**Expected console output:**
```
VITE v5.0.0  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

**✅ SUCCESS INDICATORS:**
- ✅ "ready in XXX ms"
- ✅ Local URL shown: http://localhost:5173/
- ✅ No errors

**⚠️ IMPORTANT:** Keep this terminal open too!

---

## 🌐 PHASE 3: Access the Application

### Step 3.1: Open Your Web Browser

Open Chrome, Firefox, Safari, or Edge.

### Step 3.2: Navigate to the Application

Type in the address bar:
```
http://localhost:5173
```

Press Enter.

### Step 3.3: What You Should See

**Landing Page:**
- CogniVault logo/branding
- Hero section with "Your Mind. Remembered Forever" or similar
- Navigation bar with Login/Signup buttons
- Beautiful particle background (optional)
- Features grid
- Call-to-action buttons

**✅ SUCCESS:** The page loads without errors.

**❌ IF PAGE DOESN'T LOAD:**
- Check if frontend is running (Step 2.4)
- Try hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Check browser console (F12) for errors

---

## 🔐 PHASE 4: Login/Signup

### Step 4.1: Click "Login" or "Sign Up" Button

### Step 4.2: Sign Up (if new user)

1. Click **"Sign Up"**
2. Enter your email (e.g., `test@example.com`)
3. Enter a password (at least 6 characters)
4. Click **"Sign Up"** or **"Create Account"**

**Expected:** 
- Firebase authentication processes
- Redirected to Dashboard
- Welcome message or loading animation

### Step 4.3: Login (if existing user)

1. Click **"Login"**
2. Enter your credentials
3. Click **"Login"**

**Expected:**
- Successfully authenticated
- Redirected to Dashboard

**✅ SUCCESS:** You're now on the Dashboard page.

---

## 📊 PHASE 5: Access the Knowledge Graph

### Step 5.1: You Should See the Dashboard

**Dashboard Components:**
- Left sidebar with items: Memories, Chat, **Graph**, Insights
- Card grid showing different features
- One card titled **"Knowledge Graph"**

### Step 5.2: Navigate to Knowledge Graph (Two Methods)

**Method 1 - Via Sidebar:**
1. Look at the left sidebar
2. Click on **"Graph"**

**Method 2 - Via Card:**
1. Look at the card grid
2. Find the **"Knowledge Graph"** card (has 🕸️ icon)
3. Click on the card
4. Or click the **"Explore Graph"** button if visible

**Expected:**
- Page transitions smoothly (animation)
- URL changes to: `http://localhost:5173/knowledge-graph`
- Knowledge Graph interface loads

### Step 5.3: What You Should See

**Knowledge Graph Interface:**

**Header (Top):**
- 🧠 "Knowledge Graph" title
- **"Mock Data"** button (top-right)
- Refresh button (🔄 icon)
- Fullscreen button (expand icon)

**Control Panel (Below Header):**
- Search box with placeholder "Search nodes..."
- **"Search"** button
- **Depth slider** (shows 1-5)
- **Filter dropdown** (says "All Nodes")
- Layout buttons: Force (🔀), Circular (⭕), Grid (⊞)
- **"Hide Labels"** toggle button

**Main Canvas (Center):**
- Large empty graph area
- Gray background
- "No data" or empty state message

**Statistics Panel (Bottom-Left):**
- Total Nodes: 0
- Total Edges: 0
- Breakdown sections (empty)

**MiniMap (Bottom-Right):**
- Small overview window

**✅ SUCCESS:** Knowledge Graph interface is fully loaded and visible.

---

## 🎲 PHASE 6: Initialize Mock Data (CRITICAL TEST)

This is where the magic happens!

### Step 6.1: Open Browser Developer Tools

Press **F12** or right-click → Inspect

Go to the **Console** tab. Keep it open to see what's happening.

### Step 6.2: Click the "Mock Data" Button

Click the **"Mock Data"** button in the top-right corner.

### Step 6.3: Watch for Notifications (Top-Right of Screen)

You should see a sequence of notifications:

**First Notification (Blue/Info):**
```
ℹ️ Initializing mock data...
```
- Appears immediately
- Blue color
- Stays for ~3 seconds

**Second Notification (Green/Success):**
```
✅ Mock data loaded successfully! 🎉
```
- Appears after 2-4 seconds
- Green color
- Confirms data creation

**Third Notification (Green/Success):**
```
✅ Loaded 40 nodes and 35 edges
```
- Appears immediately after
- Shows actual counts
- Green color

### Step 6.4: Watch the Graph Populate

**What Happens:**
1. Loading spinner appears briefly
2. Colored circles (nodes) start appearing
3. Lines (edges) connect the nodes
4. Graph auto-arranges itself
5. Animation settles after 1-2 seconds

### Step 6.5: Verify the Graph Contents

**You Should Now See:**

**Nodes (Colored Circles):**
- **~10 Green nodes** 🟢 - Memory nodes
  - Labeled with: "AI research", "Quantum computing", etc.
  
- **~15 Blue nodes** 🔵 - Concept/Tag nodes
  - Labeled with: "AI", "Quantum", "Technology", etc.
  
- **~8 Orange nodes** 🟠 - Entity nodes
  - Labeled with: "Einstein", "OpenAI", "MIT", etc.
  
- **~2-3 Purple nodes** 🟣 - Source nodes
  - Labeled with: "Research Papers", "Notes", etc.

**Edges (Lines):**
- **Solid blue lines** - TAGGED_WITH relationships
- **Dashed green lines** (animated) - SIMILAR_TO relationships
- **Solid orange lines** - MENTIONS relationships
- **Solid purple lines** - DERIVED_FROM relationships

**Statistics Panel (Bottom-Left) Should Show:**
```
Total Nodes: 40
Total Edges: 35

Nodes by Type:
  Memory: 10
  Concept: 15
  Entity: 8
  Source: 3

Edges by Type:
  SIMILAR_TO: 5
  TAGGED_WITH: 20
  MENTIONS: 8
  DERIVED_FROM: 2
```

**✅ SUCCESS CRITERIA:**
- [x] Notifications appeared in correct sequence
- [x] Graph populated with colored nodes
- [x] Nodes are connected by lines
- [x] Statistics show numbers > 0
- [x] Graph is interactive (can zoom/pan)

**❌ IF MOCK DATA FAILS:**

**Problem: Red error notification appears**

**Error Message:** "Backend server not reachable..."
**Solution:**
```bash
# Check if backend is running
curl http://localhost:5000/api/health

# If not responding, restart backend
cd server
npm run dev
```

**Error Message:** "MongoDB connection error..."
**Solution:** Check MONGODB_ATLAS_SETUP.md and verify:
1. IP address whitelisted in Atlas
2. Correct credentials in .env
3. Run `node test-mongodb-atlas.js` to diagnose

**Problem: No error, but graph stays empty**

**Check Browser Console (F12):**
Look for red error messages.

**Check Backend Terminal:**
Look for errors in the server console.

**Manual API Test:**
```bash
# Test mock data endpoint directly
curl -X POST http://localhost:5000/api/graph/mock/initialize \
  -H "Content-Type: application/json" \
  -d '{"user_id":"demo_user"}'

# Should return:
# {"success":true, "message":"Mock data initialized", ...}
```

**Check Graph Stats:**
```bash
curl "http://localhost:5000/api/graph/stats?user_id=demo_user"

# Should return counts > 0
```

**Problem: Graph appears but no colors/styling**

**Solution:** Hard refresh the page (Cmd+Shift+R or Ctrl+Shift+R)

---

## 🎮 PHASE 7: Test Interactive Features

Now let's test every feature of the Knowledge Graph!

### Feature 7.1: Zoom and Pan

**Test Zoom:**
1. **Scroll mouse wheel up** → Graph zooms IN
2. **Scroll mouse wheel down** → Graph zooms OUT
3. Nodes should get larger/smaller

**Test Pan:**
1. **Click and hold** on empty space (not on a node)
2. **Drag** in any direction
3. Graph should move with your cursor
4. Release to stop

**✅ Success:** Graph responds smoothly to zoom and pan.

---

### Feature 7.2: Node Interaction

**Test Node Click:**
1. **Click on any green node** (Memory)
2. Watch what happens:
   - Node should highlight (border or glow)
   - **Right panel appears** with node details
   - Graph may re-center on that node
   - Related nodes might highlight

**Right Panel Should Show:**
- Node Type: Memory
- Summary: (text description)
- Created: (timestamp)
- Character count: (number)
- Tags: (list of tags)

**Test Another Node:**
1. **Click on a blue node** (Concept)
2. Right panel updates with concept details
3. Shows concept name and relationships

**✅ Success:** Clicking nodes shows their details.

---

### Feature 7.3: Node Hover

**Test Hover:**
1. **Move mouse over any node** (don't click)
2. Node should:
   - Change appearance (highlight, glow, or scale up)
   - Connected edges might highlight
   - Cursor changes to pointer

2. **Move mouse away**
3. Node returns to normal

**✅ Success:** Hover effects work smoothly.

---

### Feature 7.4: Node Dragging

**Test Drag:**
1. **Click and hold** on any node
2. **Drag** it to a new position
3. **Release** mouse button
4. Node stays in new position
5. Connected edges stretch/move with it

**✅ Success:** Nodes can be repositioned.

---

### Feature 7.5: Search Functionality

**Test Search:**

**Search Test 1 - "AI":**
1. Click in the **search box** (top-left)
2. Type: `AI`
3. Press **Enter** or click **Search** button

**Expected Result:**
- Graph focuses on nodes containing "AI"
- Relevant nodes highlight or come to center
- Other nodes may fade or move to periphery
- Notification: "Search completed" or similar

**Search Test 2 - "quantum":**
1. Clear search box
2. Type: `quantum`
3. Press Enter

**Expected Result:**
- Graph shows quantum-related nodes
- Memory about quantum computing highlights
- Related concepts and entities appear

**Search Test 3 - "Einstein":**
1. Type: `Einstein`
2. Search

**Expected Result:**
- Orange entity node "Einstein" highlights
- Connected memories appear
- Graph centers on Einstein node

**Clear Search:**
1. Clear the search box
2. Press Enter or Search
3. Graph shows all nodes again

**✅ Success:** Search finds and highlights relevant nodes.

---

### Feature 7.6: Depth Control

**Test Depth Slider:**

1. Find the **Depth slider** (shows 1-5)
2. Current setting should be **2**

**Set to Depth 1:**
1. Drag slider to **1**
2. Graph updates:
   - Shows only nodes directly connected
   - Fewer nodes visible
   - More sparse graph

**Set to Depth 3:**
1. Drag slider to **3**
2. Graph expands:
   - More nodes appear
   - Extended connections shown
   - Denser graph

**Set to Depth 5:**
1. Drag slider to **5**
2. Maximum depth:
   - All possible connections
   - Most nodes visible
   - Complex network

**Reset to Depth 2:**
1. Set back to **2**
2. Balanced view returns

**✅ Success:** Depth control changes visible connections.

---

### Feature 7.7: Filter by Node Type

**Test Filter Dropdown:**

1. Find **Filter dropdown** (says "All Nodes")
2. Click it to open

**Options shown:**
- All Nodes
- Memories
- Concepts
- Entities
- Sources

**Filter to Memories Only:**
1. Select **"Memories"**
2. Graph updates:
   - Only **green nodes** visible
   - All other colors disappear
   - Edges between memories remain
   - Statistics update

**Filter to Concepts Only:**
1. Select **"Concepts"**
2. Only **blue nodes** visible
3. Tag/concept network shown

**Filter to Entities Only:**
1. Select **"Entities"**
2. Only **orange nodes** visible
3. Entity network shown

**Filter to Sources Only:**
1. Select **"Sources"**
2. Only **purple nodes** visible
3. Source documents shown

**Reset to All:**
1. Select **"All Nodes"**
2. All colors return
3. Full graph visible

**✅ Success:** Filter controls which node types are visible.

---

### Feature 7.8: Layout Modes

**Test Layout Switching:**

**Force Layout (Default):**
1. Should already be active
2. Click **Force layout button** (🔀 shuffle icon)
3. Nodes arrange using physics simulation
4. Organic, natural-looking layout
5. Nodes repel each other
6. Connected nodes attract

**Circular Layout:**
1. Click **Circular layout button** (⭕ circle icon)
2. Watch animation:
   - Nodes move smoothly
   - Arrange in circular pattern
   - Evenly distributed around circle
   - Center area clear
3. Good for overview

**Grid Layout:**
1. Click **Grid layout button** (⊞ grid icon)
2. Nodes rearrange:
   - Organized in rows and columns
   - Neat, structured appearance
   - Equal spacing
   - Professional look

**Switch Between Layouts:**
1. Click Force → Circular → Grid → Force
2. Watch smooth transitions
3. Each layout maintains connections

**✅ Success:** All three layout modes work and transition smoothly.

---

### Feature 7.9: Label Toggle

**Test Label Visibility:**

**Hide Labels:**
1. Click **"Hide Labels"** button
2. Text on nodes disappears
3. Only icons and colors visible
4. Button text changes to **"Show Labels"**
5. Cleaner, less cluttered view

**Show Labels:**
1. Click **"Show Labels"** button
2. Node text reappears
3. Labels readable
4. Button reverts to **"Hide Labels"**

**✅ Success:** Labels can be toggled on/off.

---

### Feature 7.10: Statistics Panel

**Test Statistics Display:**

1. Look at **bottom-left panel**
2. Should show:
   - **Total Nodes:** ~40
   - **Total Edges:** ~35

3. Expand to see breakdown:
   - **Nodes by Type:**
     - Memory: 10
     - Concept: 15
     - Entity: 8
     - Source: 3
   
   - **Edges by Type:**
     - SIMILAR_TO: 5
     - TAGGED_WITH: 20
     - MENTIONS: 8
     - DERIVED_FROM: 2

**Test Statistics Update:**
1. Filter to "Memories Only"
2. Statistics update to show only Memory counts
3. Reset filter to "All Nodes"
4. Statistics return to full counts

**✅ Success:** Statistics accurately reflect graph contents.

---

### Feature 7.11: MiniMap Navigation

**Test MiniMap:**

1. Look at **bottom-right corner**
2. Small overview of entire graph visible
3. Your current viewport shown as rectangle

**Use MiniMap:**
1. **Zoom in** on main graph (scroll wheel)
2. You're now viewing only part of graph
3. MiniMap shows where you are
4. Rectangle represents your viewport

**Navigate with MiniMap:**
1. **Click** anywhere on the minimap
2. Main graph jumps to that area
3. Quick way to navigate large graphs

**✅ Success:** MiniMap shows graph overview and enables navigation.

---

### Feature 7.12: Fullscreen Mode

**Test Fullscreen:**

**Enter Fullscreen:**
1. Click **fullscreen button** (⛶ expand icon, top-right)
2. Graph expands to fill entire screen
3. Controls remain accessible
4. Immersive view

**Exit Fullscreen:**
1. Click fullscreen button again (⛶ compress icon)
2. Or press **Esc** key
3. Graph returns to normal size

**✅ Success:** Fullscreen mode works.

---

### Feature 7.13: Refresh Graph

**Test Refresh:**

1. Click **refresh button** (🔄 icon, top-right)
2. Graph reloads from database
3. Brief loading indicator
4. Graph repopulates
5. Notification confirms refresh

**✅ Success:** Refresh reloads graph data.

---

### Feature 7.14: Multi-Node Selection (Advanced)

**Test Selection:**

1. **Click on a Memory node**
2. Note its details in right panel
3. **Click on another node**
4. Details update to new node
5. Previous selection deselects

**✅ Success:** Node selection works properly.

---

## 🎯 PHASE 8: Performance Testing

### Test 8.1: Rapid Interactions

**Test:**
1. Click multiple nodes rapidly (5-10 times)
2. Zoom in and out quickly
3. Pan around vigorously
4. Switch layouts rapidly

**Expected:**
- No lag or freezing
- Smooth animations
- No crashes
- Responsive controls

**✅ Success:** Graph handles rapid interactions smoothly.

---

### Test 8.2: Multiple Graph Operations

**Test Sequence:**
1. Load mock data
2. Search for "AI"
3. Change to depth 3
4. Filter to Memories
5. Switch to Circular layout
6. Toggle labels off
7. Click a node
8. Refresh graph
9. Reset all filters

**Expected:**
- Each operation completes
- No conflicts between operations
- State maintained correctly

**✅ Success:** Multiple operations work together.

---

## 🐛 PHASE 9: Error Handling Tests

### Test 9.1: Backend Disconnect

**Test:**
1. Stop the backend server (Ctrl+C in server terminal)
2. In browser, click "Mock Data" button
3. Wait for response

**Expected:**
- Red error notification appears
- Message: "Backend server not reachable..."
- Helpful instructions shown
- No crash or white screen

**Recovery:**
1. Restart backend: `npm run dev`
2. Click "Mock Data" again
3. Should work now

**✅ Success:** Graceful error handling when backend unavailable.

---

### Test 9.2: Network Error Simulation

**Test:**
1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Select **"Offline"** (throttling dropdown)
4. Try to refresh graph or search

**Expected:**
- Error notification appears
- Clear error message
- No crash

**Recovery:**
1. Select **"Online"** in Network tab
2. Retry operation
3. Works normally

**✅ Success:** Handles network errors gracefully.

---

## 📸 PHASE 10: Visual Verification Checklist

Take screenshots or visually verify:

- [ ] Graph has 4 distinct node colors (green, blue, orange, purple)
- [ ] Edges are visible and properly connected
- [ ] Node labels are readable (when shown)
- [ ] Icons appear on nodes
- [ ] Animations are smooth (no jitter)
- [ ] UI is responsive (no layout issues)
- [ ] Notifications appear correctly
- [ ] Statistics panel is readable
- [ ] MiniMap shows graph overview
- [ ] Controls are accessible and styled
- [ ] Dark theme applied (if using dark mode)
- [ ] No visual glitches or overlapping elements

---

## ✅ FINAL VERIFICATION CHECKLIST

**Backend:**
- [ ] Backend server starts without errors
- [ ] MongoDB Atlas connection successful
- [ ] Health endpoint returns 200 OK
- [ ] Console shows green success messages

**Frontend:**
- [ ] Frontend server starts on port 5173
- [ ] Application loads in browser
- [ ] Authentication works (login/signup)
- [ ] Dashboard displays correctly
- [ ] Knowledge Graph page loads

**Mock Data:**
- [ ] "Mock Data" button clickable
- [ ] Notifications appear (blue, then green)
- [ ] Graph populates with ~40 nodes
- [ ] Statistics show correct counts
- [ ] All 4 node colors present

**Interactions:**
- [ ] Zoom works (mouse wheel)
- [ ] Pan works (click and drag background)
- [ ] Nodes clickable (shows details)
- [ ] Node dragging works
- [ ] Search finds relevant nodes
- [ ] Depth slider changes visible connections
- [ ] Filter dropdown works for all types
- [ ] All 3 layouts work (Force, Circular, Grid)
- [ ] Labels can be toggled
- [ ] MiniMap navigation works
- [ ] Fullscreen mode works
- [ ] Refresh button reloads graph

**Error Handling:**
- [ ] Backend disconnect shows error message
- [ ] Network errors handled gracefully
- [ ] No console errors in browser
- [ ] Application doesn't crash

**Performance:**
- [ ] Rapid clicks don't cause lag
- [ ] Layout switching is smooth
- [ ] Search is responsive (< 1 second)
- [ ] Graph renders in < 2 seconds

---

## 🎉 Success!

If you've completed all phases and checked all boxes, your Knowledge Graph is **fully functional**!

**You now have:**
- ✅ Working MongoDB Atlas cloud database
- ✅ Functional backend API
- ✅ Beautiful React Flow visualization
- ✅ Interactive graph with all features
- ✅ Error handling and notifications
- ✅ Mock data for testing

---

## 📊 What Data is in MongoDB Atlas?

After running mock data, your MongoDB Atlas database contains:

**Database:** `cognivault`

**Collections:**
1. **users** - User test document
2. **chunks** - Text chunks with metadata (10 entries)
3. **source_files** - Source document references (3 entries)

**To view in Atlas:**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click "Browse Collections"
3. Select `cognivault` database
4. View data in each collection

---

## 🚀 Next Steps

After successful testing:

1. **Keep Exploring:**
   - Try different searches
   - Experiment with layouts
   - Play with depth levels

2. **Document Findings:**
   - Note any issues
   - Suggest improvements
   - Identify desired features

3. **Next Development Phase:**
   - Implement file upload
   - Add chat interface
   - Create Memories page

---

## 🆘 Getting Help

**If anything doesn't work:**

1. **Check Console Logs:**
   - Backend terminal
   - Browser console (F12)
   - Look for red error messages

2. **Verify Services:**
   ```bash
   ./check-services.sh
   ```

3. **Test MongoDB Atlas:**
   ```bash
   node test-mongodb-atlas.js
   ```

4. **Restart Everything:**
   ```bash
   # Stop backend and frontend (Ctrl+C)
   # Then restart:
   cd server && npm run dev
   # New terminal:
   cd client && npm run dev
   ```

5. **Review Documentation:**
   - MONGODB_ATLAS_SETUP.md
   - FIX_AND_TEST_INSTRUCTIONS.md
   - KNOWLEDGE_GRAPH_DOCUMENTATION.md

---

**🎊 Congratulations on testing the Knowledge Graph! Your CogniVault is working! 🧠✨**
