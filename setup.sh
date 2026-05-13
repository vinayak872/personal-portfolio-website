#!/bin/bash

# Personal Portfolio - Setup Script
# This script automates the initial setup process

set -e

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║        Personal Portfolio - Automated Setup Script            ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Check Node.js installation
echo "🔍 Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 16+"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✓ Node.js $NODE_VERSION found"

# Create environment files
echo ""
echo "📝 Setting up environment files..."

if [ ! -f "frontend/.env.local" ]; then
    cp frontend/.env.example frontend/.env.local
    echo "✓ Created frontend/.env.local"
else
    echo "⚠ frontend/.env.local already exists"
fi

if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo "✓ Created backend/.env"
else
    echo "⚠ backend/.env already exists"
fi

# Install frontend dependencies
echo ""
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..
echo "✓ Frontend dependencies installed"

# Install backend dependencies
echo ""
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..
echo "✓ Backend dependencies installed"

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                    Setup Complete! 🎉                         ║"
echo "╠════════════════════════════════════════════════════════════════╣"
echo "║                                                                ║"
echo "║  ✓ Environment files created                                   ║"
echo "║  ✓ Frontend dependencies installed                             ║"
echo "║  ✓ Backend dependencies installed                              ║"
echo "║                                                                ║"
echo "╠════════════════════════════════════════════════════════════════╣"
echo "║  Next Steps:                                                   ║"
echo "║                                                                ║"
echo "║  1. Configure environment variables:                           ║"
echo "║     • frontend/.env.local                                      ║"
echo "║     • backend/.env                                             ║"
echo "║                                                                ║"
echo "║  2. Start the backend:                                         ║"
echo "║     cd backend && npm run dev                                  ║"
echo "║                                                                ║"
echo "║  3. Start the frontend (new terminal):                         ║"
echo "║     cd frontend && npm run dev                                 ║"
echo "║                                                                ║"
echo "║  4. Open browser:                                              ║"
echo "║     http://localhost:3000                                      ║"
echo "║                                                                ║"
echo "║  📚 Documentation:                                              ║"
echo "║     • QUICKSTART.md - 5 minute guide                           ║"
echo "║     • docs/SETUP.md - Complete setup                           ║"
echo "║     • docs/API.md - API reference                              ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
