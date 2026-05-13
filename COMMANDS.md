#!/usr/bin/env bash
# Personal Portfolio - Common Commands Reference

# ═══════════════════════════════════════════════════════════════════
# 🚀 INITIAL SETUP
# ═══════════════════════════════════════════════════════════════════

# Option 1: Automated Setup (macOS/Linux)
./setup.sh

# Option 2: Automated Setup (Windows)
setup.bat

# Option 3: Manual Setup
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
cd frontend && npm install && cd ..
cd backend && npm install && cd ..

# ═══════════════════════════════════════════════════════════════════
# 👨‍💻 DEVELOPMENT COMMANDS
# ═══════════════════════════════════════════════════════════════════

# Start Backend Server (Terminal 1)
cd backend
npm run dev
# Runs on http://localhost:5000

# Start Frontend Server (Terminal 2)
cd frontend
npm run dev
# Runs on http://localhost:3000

# ═══════════════════════════════════════════════════════════════════
# 🏗️ BUILD COMMANDS
# ═══════════════════════════════════════════════════════════════════

# Build frontend for production
cd frontend
npm run build
# Output: frontend/dist/

# ═══════════════════════════════════════════════════════════════════
# 🐛 TROUBLESHOOTING COMMANDS
# ═══════════════════════════════════════════════════════════════════

# Kill process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000 (macOS/Linux)
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Check if MongoDB is running (macOS with Homebrew)
brew services list

# Start MongoDB (macOS with Homebrew)
brew services start mongodb-community

# Stop MongoDB (macOS with Homebrew)
brew services stop mongodb-community

# ═══════════════════════════════════════════════════════════════════
# 📝 API TESTING COMMANDS (cURL)
# ═══════════════════════════════════════════════════════════════════

# Health Check
curl http://localhost:5000/health

# Get All Blogs
curl http://localhost:5000/api/blogs

# Get Single Blog
curl http://localhost:5000/api/blogs/{blog_id}

# Create Blog Post
curl -X POST http://localhost:5000/api/blogs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "excerpt": "A brief summary",
    "content": "Full markdown content here",
    "category": "General",
    "tags": ["web", "development"],
    "published": true
  }'

# Update Blog
curl -X PUT http://localhost:5000/api/blogs/{blog_id} \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "published": true
  }'

# Delete Blog
curl -X DELETE http://localhost:5000/api/blogs/{blog_id}

# Submit Contact Form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Collaboration Request",
    "message": "I would like to discuss a project..."
  }'

# Get All Messages (Admin)
curl http://localhost:5000/api/contact

# Get Single Message
curl http://localhost:5000/api/contact/{message_id}

# Mark Message as Read
curl -X PATCH http://localhost:5000/api/contact/{message_id}/read

# Delete Message
curl -X DELETE http://localhost:5000/api/contact/{message_id}

# ═══════════════════════════════════════════════════════════════════
# 📦 DEPENDENCY MANAGEMENT
# ═══════════════════════════════════════════════════════════════════

# Update all dependencies
cd frontend && npm update && cd ..
cd backend && npm update && cd ..

# Check for security vulnerabilities
cd frontend && npm audit && cd ..
cd backend && npm audit && cd ..

# Fix security vulnerabilities
cd frontend && npm audit fix && cd ..
cd backend && npm audit fix && cd ..

# Install specific package
npm install package-name

# Uninstall package
npm uninstall package-name

# ═══════════════════════════════════════════════════════════════════
# 🗄️ MONGODB COMMANDS
# ═══════════════════════════════════════════════════════════════════

# Connect to local MongoDB
mongosh

# View all databases
show dbs

# Use portfolio database
use portfolio

# View all collections
show collections

# View all blog posts
db.blogs.find()

# Count blog posts
db.blogs.countDocuments()

# View all contact messages
db.contacts.find()

# Delete all blogs
db.blogs.deleteMany({})

# ═══════════════════════════════════════════════════════════════════
# 🚀 DEPLOYMENT COMMANDS
# ═══════════════════════════════════════════════════════════════════

# Deploy frontend to AWS S3
aws s3 sync frontend/dist s3://your-bucket-name/

# Invalidate CloudFront
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"

# Deploy to Heroku
heroku login
git push heroku main

# Check Heroku logs
heroku logs --tail

# Railway Deploy
railway login
railway up

# ═══════════════════════════════════════════════════════════════════
# 🐳 DOCKER COMMANDS (Optional)
# ═══════════════════════════════════════════════════════════════════

# Build Docker image
docker build -t portfolio-backend .

# Run Docker container
docker run -p 5000:5000 portfolio-backend

# Docker Compose up
docker-compose up

# Docker Compose down
docker-compose down

# ═══════════════════════════════════════════════════════════════════
# 📚 GIT COMMANDS
# ═══════════════════════════════════════════════════════════════════

# Clone repository
git clone https://github.com/username/personal-portfolio.git

# Create new branch
git checkout -b feature/new-feature

# Stage changes
git add .

# Commit changes
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/new-feature

# Create pull request (GitHub CLI)
gh pr create --title "Feature: New Feature" --body "Description"

# ═══════════════════════════════════════════════════════════════════
# 🧪 TESTING COMMANDS
# ═══════════════════════════════════════════════════════════════════

# Run frontend tests (if configured)
cd frontend && npm test && cd ..

# Run backend tests (if configured)
cd backend && npm test && cd ..

# Lint frontend code
cd frontend && npm run lint && cd ..

# ═══════════════════════════════════════════════════════════════════
# 📊 PERFORMANCE & MONITORING
# ═══════════════════════════════════════════════════════════════════

# Build size analysis
npm install -g webpack-bundle-analyzer
cd frontend && npm run build:analyze && cd ..

# Check npm package size
npm size

# Monitor backend performance
npm install -g clinic
clinic doctor -- node src/index.js

# ═══════════════════════════════════════════════════════════════════
# 🔍 DEBUGGING
# ═══════════════════════════════════════════════════════════════════

# Debug backend with Node.js inspector
node --inspect src/index.js

# Debug in VS Code
# Add to .vscode/launch.json:
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Backend",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/backend/src/index.js"
    }
  ]
}

# ═══════════════════════════════════════════════════════════════════
# 📧 EMAIL TESTING
# ═══════════════════════════════════════════════════════════════════

# Test email locally with Mailtrap or MailHog
# Update backend .env with test credentials

# Or use Gmail:
# 1. Enable 2FA on Gmail
# 2. Generate app password
# 3. Add to .env:
#    EMAIL_USER=your_email@gmail.com
#    EMAIL_PASSWORD=generated_app_password

# ═══════════════════════════════════════════════════════════════════
# 📝 ENVIRONMENT SETUP
# ═══════════════════════════════════════════════════════════════════

# Frontend .env.local
VITE_API_URL=http://localhost:5000/api
VITE_GITHUB_USERNAME=your_github_username
VITE_GITHUB_API_TOKEN=your_github_token

# Backend .env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
FRONTEND_URL=http://localhost:3000
GITHUB_TOKEN=your_github_token

# ═══════════════════════════════════════════════════════════════════
# 🌐 USEFUL LINKS
# ═══════════════════════════════════════════════════════════════════

# Local Dev Servers:
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# API Health: http://localhost:5000/health

# MongoDB:
# Local: mongodb://localhost:27017/portfolio
# Atlas: mongodb+srv://username:password@cluster.mongodb.net/portfolio

# GitHub:
# Get Personal Token: https://github.com/settings/tokens
# View Repos: https://github.com/username?tab=repositories

# Gmail:
# Get App Password: https://myaccount.google.com/apppasswords

# ═══════════════════════════════════════════════════════════════════
# 💡 TIPS & TRICKS
# ═══════════════════════════════════════════════════════════════════

# Parallel terminal execution (macOS):
npm run dev & npm run dev

# Open default browser on server start:
# Add to vite.config.js:
server: {
  open: true
}

# Quick restart servers:
Ctrl+C to stop, then up arrow to re-run

# Clear npm cache if having issues:
npm cache clean --force

# Update Node.js to latest LTS:
nvm install --lts
nvm use --lts

# ═══════════════════════════════════════════════════════════════════
# 📞 GETTING HELP
# ═══════════════════════════════════════════════════════════════════

# See documentation:
cat README.md
cat QUICKSTART.md
cat docs/SETUP.md
cat docs/API.md
cat docs/DEPLOYMENT.md

# Check project summary:
cat PROJECT_SUMMARY.md

# View project structure:
cat PROJECT_STRUCTURE.txt

# ═══════════════════════════════════════════════════════════════════

# For more information, refer to the documentation files in the /docs folder
