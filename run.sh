#!/bin/bash

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}🌟 Starting CogniVault Services${NC}"
echo "================================"

# Function to kill processes on exit
cleanup() {
    echo -e "\n${YELLOW}Stopping services...${NC}"
    kill $SERVER_PID $CLIENT_PID 2>/dev/null
    exit
}

trap cleanup EXIT INT TERM

# Check if Neo4j is running
if ! nc -z localhost 7687 2>/dev/null; then
    echo -e "${YELLOW}⚠️  Neo4j is not running on port 7687${NC}"
    echo "Please start Neo4j before running the application"
    echo "Using mock mode for development..."
fi

# Check if MongoDB is running
if ! nc -z localhost 27017 2>/dev/null; then
    echo -e "${YELLOW}⚠️  MongoDB is not running on port 27017${NC}"
    echo "Please start MongoDB for full functionality"
    echo "Using in-memory storage for development..."
fi

# Start Backend
echo -e "\n${GREEN}Starting Backend Server...${NC}"
cd server
npm run dev &
SERVER_PID=$!

# Wait for backend to start
sleep 3

# Start Frontend
echo -e "\n${GREEN}Starting Frontend...${NC}"
cd ../client
npm run dev &
CLIENT_PID=$!

echo -e "\n${CYAN}✨ CogniVault is running!${NC}"
echo "================================"
echo -e "Frontend: ${GREEN}http://localhost:5173${NC}"
echo -e "Backend:  ${GREEN}http://localhost:5000${NC}"
echo -e "Graph:    ${GREEN}http://localhost:5173/knowledge-graph${NC}"
echo -e "\nPress ${YELLOW}Ctrl+C${NC} to stop all services"

# Wait for processes
wait
