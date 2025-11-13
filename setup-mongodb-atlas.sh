#!/bin/bash

# MongoDB Atlas Setup Script for CogniVault

echo "🌩️  MongoDB Atlas Setup for CogniVault"
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# MongoDB Atlas connection string
MONGODB_URI="mongodb+srv://cognivault_user:C2eA0WHlUpoGZuom@cognivault.3l7l2bu.mongodb.net/?appName=cognivault"

echo -e "${BLUE}Step 1: Checking server directory...${NC}"
if [ ! -d "server" ]; then
    echo -e "${RED}❌ Error: server directory not found!${NC}"
    echo "   Please run this script from the CogniVault root directory"
    exit 1
fi
echo -e "${GREEN}✅ Server directory found${NC}"
echo ""

echo -e "${BLUE}Step 2: Creating/Updating .env file...${NC}"
cd server

# Create .env from template if it doesn't exist
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo -e "${GREEN}✅ Created .env from .env.example${NC}"
    else
        echo -e "${YELLOW}⚠️  .env.example not found, creating new .env${NC}"
        touch .env
    fi
else
    echo -e "${YELLOW}⚠️  .env already exists, will update MongoDB URI${NC}"
fi
echo ""

echo -e "${BLUE}Step 3: Updating MongoDB Atlas connection string...${NC}"

# Check if MONGODB_URI already exists in .env
if grep -q "^MONGODB_URI=" .env; then
    # Update existing line
    sed -i.bak "s|^MONGODB_URI=.*|MONGODB_URI=${MONGODB_URI}|" .env
    rm -f .env.bak
    echo -e "${GREEN}✅ Updated existing MONGODB_URI${NC}"
else
    # Add new line
    echo "" >> .env
    echo "# MongoDB Atlas Configuration" >> .env
    echo "MONGODB_URI=${MONGODB_URI}" >> .env
    echo -e "${GREEN}✅ Added MONGODB_URI to .env${NC}"
fi
echo ""

echo -e "${BLUE}Step 4: Verifying .env configuration...${NC}"
if grep -q "$MONGODB_URI" .env; then
    echo -e "${GREEN}✅ MongoDB Atlas URI configured correctly${NC}"
else
    echo -e "${RED}❌ Error: MongoDB URI not found in .env${NC}"
    exit 1
fi
echo ""

echo -e "${BLUE}Step 5: Ensuring other required variables...${NC}"
# Add other variables if missing
if ! grep -q "^PORT=" .env; then
    echo "PORT=5000" >> .env
    echo -e "${GREEN}✅ Added PORT=5000${NC}"
fi

if ! grep -q "^PINECONE_API_KEY=" .env; then
    echo "PINECONE_API_KEY=mock" >> .env
    echo -e "${GREEN}✅ Added PINECONE_API_KEY=mock${NC}"
fi

if ! grep -q "^GEMINI_API_KEY=" .env; then
    echo "GEMINI_API_KEY=mock" >> .env
    echo -e "${GREEN}✅ Added GEMINI_API_KEY=mock${NC}"
fi
echo ""

echo -e "${BLUE}Step 6: Testing MongoDB Atlas connection...${NC}"
cd ..
if [ -f "test-mongodb-atlas.js" ]; then
    node test-mongodb-atlas.js
    TEST_RESULT=$?
    
    if [ $TEST_RESULT -eq 0 ]; then
        echo ""
        echo -e "${GREEN}╔════════════════════════════════════════════╗${NC}"
        echo -e "${GREEN}║                                            ║${NC}"
        echo -e "${GREEN}║   ✅ MongoDB Atlas Setup Complete! ✅     ║${NC}"
        echo -e "${GREEN}║                                            ║${NC}"
        echo -e "${GREEN}╚════════════════════════════════════════════╝${NC}"
        echo ""
        echo -e "${YELLOW}Next Steps:${NC}"
        echo "  1. Start the backend:  cd server && npm run dev"
        echo "  2. Start the frontend: cd client && npm run dev"
        echo "  3. Open: http://localhost:5173/knowledge-graph"
        echo "  4. Click 'Mock Data' button to test"
        echo ""
        echo -e "${BLUE}📚 See KNOWLEDGE_GRAPH_DETAILED_TESTING.md for full testing guide${NC}"
    else
        echo ""
        echo -e "${RED}❌ MongoDB Atlas connection test failed${NC}"
        echo ""
        echo -e "${YELLOW}Possible issues:${NC}"
        echo "  1. IP address not whitelisted in MongoDB Atlas"
        echo "  2. Network/firewall blocking connection"
        echo "  3. Incorrect credentials"
        echo ""
        echo -e "${YELLOW}To fix:${NC}"
        echo "  1. Go to: https://cloud.mongodb.com/"
        echo "  2. Click 'Network Access' → 'Add IP Address'"
        echo "  3. Select 'Allow Access from Anywhere' or add your IP"
        echo "  4. Wait 2-3 minutes and run this script again"
        echo ""
        echo -e "${BLUE}📚 See MONGODB_ATLAS_SETUP.md for detailed troubleshooting${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  test-mongodb-atlas.js not found, skipping connection test${NC}"
    echo -e "${GREEN}✅ .env file configured with MongoDB Atlas URI${NC}"
    echo ""
    echo -e "${YELLOW}Next Steps:${NC}"
    echo "  1. Test connection: node test-mongodb-atlas.js"
    echo "  2. Start backend: cd server && npm run dev"
    echo "  3. Check for MongoDB connection success message"
fi

echo ""
