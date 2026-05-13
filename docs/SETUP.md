# Complete Setup Guide

## Prerequisites

- **Node.js** v16+ and **npm/yarn**
- **MongoDB** (local installation or MongoDB Atlas cloud)
- **Git** for version control
- **Gmail Account** (for email functionality - with app password)
- **GitHub Account** (for GitHub API token)

## Step 1: Clone and Setup Project Structure

```bash
# Navigate to project
cd personal-portfolio

# Create environment files
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

## Step 2: Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment variables
# Edit frontend/.env.local:
# VITE_API_URL=http://localhost:5000/api
# VITE_GITHUB_USERNAME=your_github_username
# VITE_GITHUB_API_TOKEN=your_github_token (optional, for private repos)

# Start development server
npm run dev

# Server runs on http://localhost:3000
```

## Step 3: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit backend/.env with:
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
FRONTEND_URL=http://localhost:3000
GITHUB_TOKEN=your_github_token

# Start development server
npm run dev

# Server runs on http://localhost:5000
```

## Step 4: MongoDB Setup

### Option A: Local MongoDB

```bash
# macOS with Homebrew
brew install mongodb-community
brew services start mongodb-community

# Linux (Ubuntu)
sudo apt-get install mongodb
sudo systemctl start mongodb

# Windows
# Download from https://www.mongodb.com/try/download/community
# Run installer and follow instructions
```

### Option B: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create cluster
4. Get connection string
5. Update `MONGODB_URI` in backend/.env:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```

## Step 5: Email Configuration (Gmail)

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Factor Authentication
3. Create App Password for Gmail
4. Copy the 16-character password
5. Update backend/.env:
```
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=16_character_app_password
```

## Step 6: GitHub API Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Create new token with `public_repo` scope
3. Copy token
4. Update environment files:
```
# frontend/.env.local
VITE_GITHUB_API_TOKEN=ghp_xxxxxxxxxxxxx

# backend/.env
GITHUB_TOKEN=ghp_xxxxxxxxxxxxx
```

## Step 7: Running the Full Stack

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Output: Server running on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Output: Local: http://localhost:3000
```

## Step 8: Test the Application

1. Open browser: `http://localhost:3000`
2. Navigate through pages:
   - **Home**: Hero section with skills
   - **Projects**: GitHub repos (if token configured)
   - **Blog**: Empty initially
   - **Contact**: Send test message

## API Endpoints Reference

See [API.md](API.md) for complete endpoint documentation.

## Production Build

### Frontend
```bash
cd frontend
npm run build
# Generates dist/ folder
```

### Backend
```bash
cd backend
npm start
# Runs production server
```

## Troubleshooting

### MongoDB Connection Error
- Verify MongoDB is running
- Check `MONGODB_URI` in .env
- For Atlas, whitelist your IP address

### Email Not Sending
- Verify Gmail 2FA is enabled
- Confirm app password is correct (16 chars)
- Check EMAIL_USER and EMAIL_PASSWORD in .env

### GitHub API Returns 401
- Verify token is valid
- Check token hasn't expired
- Ensure token has `public_repo` scope

### CORS Errors
- Verify `FRONTEND_URL` in backend/.env matches frontend URL
- Check both servers are running
- Clear browser cache and restart servers

### Port Already in Use
```bash
# Kill process on port 5000 (macOS/Linux)
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

## Next Steps

1. **Customize Content**: Update Home.jsx with your information
2. **Add Authentication**: Implement JWT for admin endpoints
3. **Deploy**: Use AWS S3/CloudFront for frontend, Heroku/Railway for backend
4. **CI/CD**: Setup GitHub Actions pipeline (see DEPLOYMENT.md)
5. **Analytics**: Add Google Analytics or similar

## Project Structure

```
personal-portfolio/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API calls
│   │   ├── styles/         # CSS files
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env.example
├── backend/
│   ├── src/
│   │   ├── config/         # Database & email config
│   │   ├── models/         # MongoDB schemas
│   │   ├── controllers/    # Business logic
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   └── index.js        # Server entry
│   ├── package.json
│   └── .env.example
├── docs/
│   ├── SETUP.md            # This file
│   ├── API.md              # API documentation
│   └── DEPLOYMENT.md       # Deployment guide
└── README.md
```

## Support & Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com/manual)
- [Vite Documentation](https://vitejs.dev)

## License

MIT License - Free to use and modify
