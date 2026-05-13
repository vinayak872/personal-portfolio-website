# Quick Start Guide

Get the portfolio running in 5 minutes.

## 🚀 Super Fast Setup

### 1. Prerequisites Check
```bash
node --version  # Should be v16+
npm --version
# If MongoDB needed: mongod
```

### 2. Clone & Setup
```bash
cd personal-portfolio
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

### 3. Install Dependencies
```bash
# Frontend
cd frontend && npm install && cd ..

# Backend
cd backend && npm install && cd ..
```

### 4. Configure Environment

**frontend/.env.local:**
```
VITE_API_URL=http://localhost:5000/api
VITE_GITHUB_USERNAME=your_username
```

**backend/.env:**
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio
```

### 5. Start Servers (Open 2 terminals)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# ✓ Running on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# ✓ Running on http://localhost:3000
```

### 6. Open Browser
```
http://localhost:3000
```

---

## 📝 First Steps

1. **Update your info** in `frontend/src/pages/Home.jsx`
2. **Add GitHub token** in `.env.local` to see your repos
3. **Setup MongoDB** (local or Atlas)
4. **Configure email** for contact form
5. **Test contact form** - should send email

---

## ⚡ Common Tasks

### Add a Blog Post
```bash
curl -X POST http://localhost:5000/api/blogs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Post",
    "excerpt": "Summary",
    "content": "Full content",
    "published": true
  }'
```

### Test Contact Form
1. Go to http://localhost:3000/contact
2. Fill form and submit
3. Check your email inbox

### View API
```
http://localhost:5000/api/blogs
http://localhost:5000/health
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 3000 in use | `lsof -ti:3000 \| xargs kill -9` |
| Port 5000 in use | `lsof -ti:5000 \| xargs kill -9` |
| MongoDB error | Start MongoDB: `mongod` |
| Email not sending | Check .env EMAIL settings |
| CORS error | Verify both servers running |

---

## 📚 Documentation

- [Full Setup Guide](docs/SETUP.md)
- [API Reference](docs/API.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

---

## 🎯 Next Steps

1. Customize homepage with your info
2. Add your GitHub repos (with token)
3. Create first blog post
4. Test contact form
5. Deploy to production

Enjoy! 🚀
