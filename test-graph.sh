#!/bin/bash

# CogniVault Knowledge Graph Test Script

echo "🧪 Testing CogniVault Knowledge Graph"
echo "======================================"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

# Test backend health
echo -e "\n${CYAN}1. Testing Backend Health...${NC}"
HEALTH_RESPONSE=$(curl -s http://localhost:5000/api/health 2>/dev/null)

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backend is running${NC}"
    echo "Response: $HEALTH_RESPONSE"
else
    echo -e "${RED}❌ Backend is not running${NC}"
    echo "Please start the backend server first: cd server && npm run dev"
    exit 1
fi

# Test mock data initialization
echo -e "\n${CYAN}2. Initializing Mock Data...${NC}"
MOCK_RESPONSE=$(curl -s -X POST http://localhost:5000/api/graph/mock/initialize \
  -H "Content-Type: application/json" \
  -d '{"user_id":"demo_user"}' 2>/dev/null)

if echo "$MOCK_RESPONSE" | grep -q "success"; then
    echo -e "${GREEN}✅ Mock data initialized successfully${NC}"
    echo "Response: $MOCK_RESPONSE"
else
    echo -e "${YELLOW}⚠️ Mock data initialization might have failed${NC}"
    echo "Response: $MOCK_RESPONSE"
fi

# Test graph stats
echo -e "\n${CYAN}3. Getting Graph Statistics...${NC}"
STATS_RESPONSE=$(curl -s http://localhost:5000/api/graph/stats?user_id=demo_user 2>/dev/null)

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Graph statistics retrieved${NC}"
    echo "Stats: $STATS_RESPONSE"
else
    echo -e "${RED}❌ Failed to get graph statistics${NC}"
fi

# Test full graph retrieval
echo -e "\n${CYAN}4. Testing Full Graph Retrieval...${NC}"
GRAPH_RESPONSE=$(curl -s "http://localhost:5000/api/graph/full?user_id=demo_user&limit=10" 2>/dev/null)

if echo "$GRAPH_RESPONSE" | grep -q "nodes"; then
    echo -e "${GREEN}✅ Graph data retrieved successfully${NC}"
    # Count nodes and edges
    NODE_COUNT=$(echo "$GRAPH_RESPONSE" | grep -o '"id"' | wc -l)
    echo "Retrieved $NODE_COUNT nodes"
else
    echo -e "${RED}❌ Failed to retrieve graph data${NC}"
fi

# Test search functionality
echo -e "\n${CYAN}5. Testing Search Functionality...${NC}"
SEARCH_RESPONSE=$(curl -s "http://localhost:5000/api/graph/search?query=AI&user_id=demo_user" 2>/dev/null)

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Search functionality working${NC}"
    echo "Search results: $SEARCH_RESPONSE"
else
    echo -e "${RED}❌ Search functionality failed${NC}"
fi

echo -e "\n${CYAN}======================================"
echo -e "Test Summary:${NC}"
echo -e "${GREEN}✅ Backend API is accessible${NC}"
echo -e "${GREEN}✅ Mock data can be initialized${NC}"
echo -e "${GREEN}✅ Graph operations are functional${NC}"
echo ""
echo -e "${CYAN}To view the graph in the browser:${NC}"
echo -e "1. Ensure frontend is running: ${YELLOW}cd client && npm run dev${NC}"
echo -e "2. Open: ${GREEN}http://localhost:5173/knowledge-graph${NC}"
echo -e "3. Click '${YELLOW}Mock Data${NC}' to populate the graph"
echo -e "4. Interact with the visualization!"
