#!/bin/bash

# Service Status Checker

echo "🔍 CogniVault Services Status Check"
echo "====================================="

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check Backend
echo -e "\n${YELLOW}1. Checking Backend (Port 5000)...${NC}"
if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend is running${NC}"
    curl -s http://localhost:5000/api/health | jq '.' 2>/dev/null || echo ""
else
    echo -e "${RED}❌ Backend is NOT running${NC}"
    echo "   Start it with: cd server && npm run dev"
fi

# Check Frontend
echo -e "\n${YELLOW}2. Checking Frontend (Port 5173)...${NC}"
if curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend is running${NC}"
else
    echo -e "${RED}❌ Frontend is NOT running${NC}"
    echo "   Start it with: cd client && npm run dev"
fi

# Check Neo4j
echo -e "\n${YELLOW}3. Checking Neo4j (Port 7687)...${NC}"
if nc -z localhost 7687 2>/dev/null; then
    echo -e "${GREEN}✅ Neo4j is running (or port is open)${NC}"
else
    echo -e "${YELLOW}⚠️  Neo4j is not running (using mock mode)${NC}"
    echo "   Start it with: docker-compose up -d neo4j"
    echo "   Or: neo4j start (if installed locally)"
fi

# Check MongoDB
echo -e "\n${YELLOW}4. Checking MongoDB (Port 27017)...${NC}"
if nc -z localhost 27017 2>/dev/null; then
    echo -e "${GREEN}✅ MongoDB is running${NC}"
else
    echo -e "${YELLOW}⚠️  MongoDB is not running (using mock mode)${NC}"
    echo "   Start it with: docker-compose up -d mongodb"
    echo "   Or: mongod (if installed locally)"
fi

# Summary
echo -e "\n${YELLOW}====================================="
echo "Summary:"
echo -e "=====================================${NC}"

if curl -s http://localhost:5000/api/health > /dev/null 2>&1 && curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Core services are running!${NC}"
    echo -e "\nYou can access:"
    echo -e "  Frontend: ${GREEN}http://localhost:5173${NC}"
    echo -e "  Backend:  ${GREEN}http://localhost:5000${NC}"
    echo -e "  Graph:    ${GREEN}http://localhost:5173/knowledge-graph${NC}"
else
    echo -e "${RED}❌ Some required services are not running${NC}"
    echo -e "\nQuick start:"
    echo -e "  ${YELLOW}./run.sh${NC}"
fi

echo ""
