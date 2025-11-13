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

## Knowledge Graph Setup

### Prerequisites
1. **Neo4j Database** (Optional - will use mock if not available)
   - Download from https://neo4j.com/download/
   - Create database with username `neo4j`
   
2. **MongoDB** (Optional - will use in-memory if not available)
   - Download from https://www.mongodb.com/try/download/community

### Quick Setup
```bash
# Run the setup script
chmod +x setup.sh
./setup.sh

# Start both frontend and backend
./run.sh
```

### Manual Setup
```bash
# Backend setup
cd server
npm install
cp .env.example .env
npm run dev

# Frontend (in new terminal)
cd client
npm install
npm run dev
```

### Accessing the Knowledge Graph
1. Navigate to http://localhost:5173/knowledge-graph
2. Click "Mock Data" to initialize sample data
3. Interact with the graph:
   - Search nodes by keywords
   - Click nodes to explore connections
   - Adjust depth level (1-5)
   - Filter by node type (Memory, Concept, Entity, Source)
   - Switch between layout modes (Force, Circular, Grid)
   - Toggle labels on/off

Key scripts (client/package.json)
- dev: start Vite dev server
- build: production build
- preview: preview production build locally
- lint: run eslint (if configured)

Project structure (client/)
- src/
  - App.jsx — app shell, routing, global loader
  - main.jsx — React root, Router, global styles
  - pages/
    - LandingPage.jsx — cinematic homepage
  - components/
    - Navbar.jsx — logo, links, theme toggle
    - HeroSection.jsx — hero copy, parallax card; uses assets/home.jpeg
    - HowItWorks.jsx — interactive 3‑card flow
    - ExperienceSection.jsx — split view with live chat preview
    - FeatureGrid.jsx — feature tiles with capability tags
    - TestimonialsCarousel.jsx — animated carousel with controls
    - ParticleBackground.jsx — subtle network particles
    - PageLoader.jsx — route/initial loader
    - Footer.jsx — brand footer and links
  - contexts/
    - ThemeContext.jsx — day/night theme provider
  - styles/
    - global.css — variables, utilities, base layout
    - landing.css — section styling and animations
    - navbar.css, footer.css, loader.css, particles.css — component styles

Brand theming
- Night (default) and Day themes are driven by CSS variables in src/styles/global.css.
- Core palette:
  - Deep Indigo #0A0B1A, Charcoal #12131F
  - Neon Cyan #00E0D1 (accents)
  - Magenta #FF5F9E and Soft Purple #9B8CFF (glows)
- Toggle with the sun/moon control in the navbar (ThemeContext persists choice).

Assets
- Place hero/brand images under client/src/assets.
- The hero image is imported in HeroSection.jsx as:
  import heroImage from "../assets/home.jpeg";
  Update that file if you change the asset name or path.
- You can also supply a background video in public/assets (see commented example in HeroSection.jsx).

Routing
- BrowserRouter wraps the app in main.jsx.
- Routes are defined in App.jsx (e.g., "/" → LandingPage, "/dashboard" → Dashboard).

Loader behavior
- Initial load and route transitions show a branded loader for 1 second.
- Controlled in App.jsx (isLoading) and PageLoader.jsx (fade‑out).

Accessibility
- High color contrast, focusable controls, and reduced‑motion friendly animations.
- Use semantic markup in future content additions.

Contributing
- Use descriptive, readable names and match existing formatting.
- Keep comments concise and focused on non‑obvious rationale.
- Prefer small, composable components and keep styles in src/styles.

License
- Proprietary — CogniVault 
**Your Mind. Remembered Forever.**

A powerful AI-powered digital memory vault with an interactive knowledge graph visualization.. All rights reserved.
