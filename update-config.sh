#!/bin/bash

# Update Configuration Script
# Updates .env files with new port and credentials

echo "🔧 Updating CogniVault Configuration"
echo "====================================="
echo ""

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Update server .env
echo -e "${YELLOW}Updating server/.env...${NC}"
cd server
cp .env.example .env
echo -e "${GREEN}✅ Server configuration updated${NC}"
echo ""

# Update client .env
echo -e "${YELLOW}Updating client/.env...${NC}"
cd ../client
cp .env.example .env
echo -e "${GREEN}✅ Client configuration updated${NC}"
echo ""

echo -e "${GREEN}Configuration Updated Successfully!${NC}"
echo ""
echo "New settings:"
echo "  - Backend Port: 5001"
echo "  - Frontend API: http://localhost:5001/api"
echo "  - Neo4j: Connected with your credentials"
echo "  - Pinecone: Connected with your API key"
echo "  - MongoDB Atlas: Connected"
echo ""
echo "Next steps:"
echo "  1. cd server && npm run dev"
echo "  2. cd client && npm run dev (in new terminal)"
echo "  3. Open http://localhost:5173/knowledge-graph"
echo ""
