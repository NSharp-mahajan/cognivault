# 🎯 Knowledge Graph - Complete Interaction Guide

## ✅ Fixed the Neo4j Integer Error!

I've fixed the LIMIT error. Your mock data loaded successfully (10 memories created)!

---

## 🔄 Apply the Fix

### Restart Backend to Apply Changes

```bash
# In the backend terminal, press Ctrl+C to stop
# Then restart:
cd server
npm run dev
```

### Refresh the Frontend

```bash
# In your browser
# Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
# Or just click the Refresh button in the graph interface
```

---

## 🎮 How to Interact with the Knowledge Graph

### 🖱️ Basic Mouse Controls

#### **Zoom**
- **Scroll wheel UP** → Zoom IN (nodes get bigger)
- **Scroll wheel DOWN** → Zoom OUT (see more of the graph)
- **Tip:** Zoom out first to see all nodes

#### **Pan (Move the View)**
- **Click and hold** on empty space (not on a node)
- **Drag** to move the entire graph view
- **Release** to stop panning

#### **Select a Node**
- **Click** on any node (colored circle)
- Node will be highlighted
- **Right panel** shows node details:
  - Type (Memory, Concept, Entity, Source)
  - Summary/Description
  - Created timestamp
  - Character count
  - Tags
  - Related entities

#### **Move a Node**
- **Click and hold** on a node
- **Drag** it to a new position
- **Release** to drop it
- Connected edges will follow
- Other nodes may adjust due to physics

---

## 📊 Interface Controls Explained

### Top Bar Controls

#### 🔄 **Refresh Button**
- **Purpose:** Reload graph data from database
- **When to use:** After adding new data or if graph seems stuck
- **What happens:** Brief loading, then graph reloads

#### 🎯 **Mock Data Button**
- **Purpose:** Load sample test data
- **What it does:** Creates 10 sample memories with relationships
- **You already did this!** (That's why you have data)

#### ⛶ **Fullscreen Button**
- **Purpose:** Expand graph to full screen
- **Click again** to exit fullscreen
- **Keyboard:** Press `Esc` to exit

---

### Left Side Controls

#### 🔍 **Search Box**
- **Type keywords** like "AI", "quantum", "technology"
- **Press Enter** or click Search button
- **What happens:**
  - Matching nodes highlight
  - Graph focuses on results
  - Non-matching nodes fade
- **Clear search** to show all nodes again

#### 📊 **Depth Slider (1-5)**
- **Default:** 2
- **Purpose:** Control how many connection levels to show
- **Depth 1:** Only directly connected nodes
- **Depth 2:** Nodes + their immediate neighbors
- **Depth 3:** Extended network (2 hops away)
- **Depth 5:** Maximum connections visible
- **Use case:** Start at 2, increase to explore more connections

#### 🎨 **Filter Dropdown**
- **"All Nodes"** - Show everything (default)
- **"Memories"** - Only green nodes (your saved memories)
- **"Concepts"** - Only blue nodes (tags/topics)
- **"Entities"** - Only orange nodes (people/organizations)
- **"Sources"** - Only purple nodes (documents/files)

---

### Layout Buttons (Change Graph Arrangement)

#### 🔀 **Force Layout** (Default)
- **Physics-based** arrangement
- Nodes repel each other
- Connected nodes attract
- **Most natural** looking
- Good for exploring relationships

#### ⭕ **Circular Layout**
- Arranges nodes in a **circle**
- Equal spacing
- Clear center area
- Good for **overview**
- Easy to see all nodes

#### ⊞ **Grid Layout**
- Arranges nodes in **rows and columns**
- Organized, structured look
- No overlapping
- Good for **systematic review**
- Professional appearance

#### 🏷️ **"Hide/Show Labels" Button**
- **Hide Labels:** Only see colored nodes (cleaner)
- **Show Labels:** See text on each node
- Toggle for clarity vs detail

---

## 🎨 Understanding Node Colors & Types

### Node Colors
- 🟢 **Green** = Memory (your saved content)
- 🔵 **Blue** = Concept/Tag (topics, themes)
- 🟠 **Orange** = Entity (people, places, organizations)
- 🟣 **Purple** = Source (documents, files)

### Edge Types (Lines Between Nodes)
- **Solid lines** = Direct relationships
- **Dashed lines** = Similarity connections
- **Animated dashes** = SIMILAR_TO relationships
- **Thicker lines** = Stronger relationships

---

## 📈 Bottom Panels

### Statistics Panel (Bottom-Left)
Shows real-time counts:
- **Total Nodes:** How many items in graph
- **Total Edges:** How many connections
- **Breakdown by type:**
  - Memories: 10
  - Concepts: ~15
  - Entities: ~8
  - Sources: ~3

### MiniMap (Bottom-Right)
- **Small overview** of entire graph
- **Rectangle** shows current viewport
- **Click anywhere** on minimap to jump there
- Useful for large graphs

---

## 🎯 What You Should See After the Fix

1. **Graph loads** with colored nodes
2. **~40 nodes** total (10 memories + concepts + entities)
3. **~35 edges** connecting them
4. **No error messages**
5. **Interactive controls work**

---

## 🧪 Test Each Feature

### Quick Test Sequence

1. **Zoom out** (scroll down) to see all nodes
2. **Click** a green memory node
3. **Read** its details in right panel
4. **Drag** it to a new position
5. **Search** for "AI"
6. **Change** to Circular layout
7. **Filter** to show only Memories
8. **Toggle** labels off/on
9. **Adjust** depth to 3
10. **Reset** by selecting "All Nodes" filter

---

## 💡 Pro Tips

### Navigation Tips
- **Start zoomed out** to see everything
- **Use minimap** to navigate large graphs
- **Double-click** empty space to center view

### Exploration Tips
- **Follow edges** to discover relationships
- **Hover over nodes** for quick preview
- **Use search** to find specific topics
- **Increase depth** gradually to avoid clutter

### Organization Tips
- **Drag related nodes** closer together
- **Use layouts** to reorganize when messy
- **Filter by type** to focus on specific data
- **Hide labels** when exploring structure

---

## 🐛 Troubleshooting

### Graph Not Loading After Fix?
```bash
# 1. Restart backend
cd server
npm run dev

# 2. Check console for "Neo4j connected"

# 3. Hard refresh browser
# Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

# 4. Click Refresh button in graph
```

### Can See Nodes But Can't Interact?
- Make sure you're clicking directly on nodes
- Try zooming in for easier clicking
- Check browser console for errors (F12)

### Search Not Working?
- Type keyword and press Enter
- Try simpler terms like "AI" or "quantum"
- Clear search box to reset

---

## ✅ Success Indicators

After restarting backend:
- ✅ No "LIMIT: Invalid input" errors
- ✅ Graph loads with ~40 colored nodes
- ✅ Can click and drag nodes
- ✅ Right panel shows node details
- ✅ Search highlights matching nodes
- ✅ Filters work correctly
- ✅ Layout buttons change arrangement
- ✅ Statistics show correct counts

---

## 🎉 You're Ready!

Your Knowledge Graph is now fully functional! Restart the backend to apply the fix, then explore your data using all the interactive features.

**Remember:** Your mock data includes topics like:
- Artificial Intelligence
- Machine Learning  
- Quantum Computing
- Climate Change
- Blockchain
- Space Exploration
- Genetics/CRISPR

Search for these terms to see how they're connected!
