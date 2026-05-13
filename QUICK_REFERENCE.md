# 🚀 Personal Portfolio - QUICK REFERENCE CARD

## ⚡ FASTEST START (2 minutes)

```bash
# 1. Navigate to project
cd personal-portfolio

# 2. Run auto-setup
./setup.sh                    # macOS/Linux
setup.bat                     # Windows

# 3. Configure environment
# Edit frontend/.env.local and backend/.env

# 4. Start backend (Terminal 1)
cd backend && npm run dev

# 5. Start frontend (Terminal 2)  
cd frontend && npm run dev

# 6. Open browser
http://localhost:3000
```

---

## 📚 DOCUMENTATION QUICK LINKS

| Document | Purpose | When to Use |
|----------|---------|------------|
| [README.md](README.md) | Project overview | First time reading |
| [QUICKSTART.md](QUICKSTART.md) | 5-minute setup | Get running fast |
| [docs/SETUP.md](docs/SETUP.md) | Complete guide | Detailed setup |
| [docs/API.md](docs/API.md) | API reference | API endpoints & examples |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Production deploy | Deploy to AWS/Heroku |
| [COMMANDS.md](COMMANDS.md) | All commands | Reference cheat sheet |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Full details | Complete overview |
| [PROJECT_STRUCTURE.txt](PROJECT_STRUCTURE.txt) | File tree | Project organization |

---

## 🔑 KEY FILES TO CUSTOMIZE

```
frontend/src/pages/Home.jsx          Update your name, bio, skills
frontend/src/components/Navbar.jsx   Add your social links
backend/.env                         Add email & GitHub credentials
frontend/.env.local                  Add GitHub username & token
```

---

## 🌐 IMPORTANT URLS

```
Frontend Dev:    http://localhost:3000
Backend API:     http://localhost:5000
API Health:      http://localhost:5000/health
MongoDB Local:   mongodb://localhost:27017/portfolio
MongoDB Atlas:   mongodb+srv://user:pass@cluster.mongodb.net/portfolio
```

---

## 🛠️ ENVIRONMENT VARIABLES

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:5000/api
VITE_GITHUB_USERNAME=your_username
VITE_GITHUB_API_TOKEN=your_token
```

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
FRONTEND_URL=http://localhost:3000
```

---

## 📦 WHAT'S INCLUDED

✅ **4 Pages**: Home, Projects, Blog, Contact  
✅ **6 Components**: Navbar, Footer + page components  
✅ **11 API Endpoints**: Full CRUD for blogs & contact  
✅ **2 Database Models**: Blog & Contact schemas  
✅ **CI/CD Pipeline**: GitHub Actions automated deployment  
✅ **Responsive Design**: Mobile-first, works everywhere  
✅ **Documentation**: 6 comprehensive guides  
✅ **Setup Scripts**: Automated setup for all platforms  

---

## 🔄 API ENDPOINTS

### Blogs
```
GET    /api/blogs              List all blogs
GET    /api/blogs/:id          Get single blog
POST   /api/blogs              Create blog
PUT    /api/blogs/:id          Update blog
DELETE /api/blogs/:id          Delete blog
```

### Contact
```
POST   /api/contact            Submit form
GET    /api/contact            List messages (admin)
GET    /api/contact/:id        Get message
PATCH  /api/contact/:id/read   Mark as read
DELETE /api/contact/:id        Delete message
```

---

## 🚀 QUICK DEPLOY

### Frontend to AWS S3
```bash
cd frontend
npm run build
aws s3 sync dist/ s3://your-bucket/
```

### Backend to Heroku
```bash
cd backend
heroku login
git push heroku main
```

### MongoDB Setup
```bash
# Option A: Local
mongod

# Option B: Cloud Atlas
# Sign up: mongodb.com/cloud/atlas
# Add connection string to .env
```

---

## 🐛 COMMON FIXES

| Issue | Fix |
|-------|-----|
| Port 3000 in use | `lsof -ti:3000 \| xargs kill -9` |
| Port 5000 in use | `lsof -ti:5000 \| xargs kill -9` |
| MongoDB error | Start MongoDB: `mongod` |
| CORS error | Check `FRONTEND_URL` in .env |
| Email not sending | Verify Gmail app password |
| GitHub repos empty | Add `VITE_GITHUB_USERNAME` |

---

## 📋 SETUP CHECKLIST

- [ ] Clone/download project
- [ ] Run setup script: `./setup.sh` or `setup.bat`
- [ ] Copy `.env.example` files to `.env`
- [ ] Update environment variables
- [ ] Start backend: `cd backend && npm run dev`
- [ ] Start frontend: `cd frontend && npm run dev`
- [ ] Open http://localhost:3000
- [ ] Test contact form (check email)
- [ ] Create test blog post (if MongoDB setup)
- [ ] Customize Home page with your info

---

## 💡 COMMON TASKS

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
3. Check your email inbox for message + confirmation

### View All Endpoints
```bash
curl http://localhost:5000/health
curl http://localhost:5000/api/blogs
```

---

## 📞 TECH STACK AT A GLANCE

```
Frontend:        React 18 + Vite + Axios
Backend:         Express + Mongoose
Database:        MongoDB
Email:           Nodemailer (Gmail)
APIs:            GitHub v3
Deployment:      AWS S3, CloudFront, Heroku
CI/CD:           GitHub Actions
```

---

## 🎯 NEXT STEPS

1. **Immediate**: Run setup, configure env, start servers
2. **Soon**: Customize homepage, add your info, test features
3. **Later**: Deploy to production, setup domain, add analytics

---

## 📞 NEED HELP?

1. **Quick Start**: Read [QUICKSTART.md](QUICKSTART.md)
2. **Full Guide**: Read [docs/SETUP.md](docs/SETUP.md)
3. **API Docs**: See [docs/API.md](docs/API.md)
4. **Commands**: Check [COMMANDS.md](COMMANDS.md)
5. **Troubleshoot**: See [docs/SETUP.md#troubleshooting](docs/SETUP.md)

---

## 📊 FILE COUNTS

| Folder | Files | Purpose |
|--------|-------|---------|
| frontend/src | 15+ | React app files |
| backend/src | 10+ | Express server files |
| docs/ | 3 | Documentation |
| .github/ | 1 | CI/CD pipeline |
| Root | 10+ | Config & guides |

**Total: 45+ production-ready files**

---

## ✅ YOU'RE ALL SET!

This is a **complete, production-ready** portfolio website with:
- ✅ Modern frontend
- ✅ Full backend API
- ✅ Database integration
- ✅ Email functionality
- ✅ GitHub integration
- ✅ Automated deployment
- ✅ Full documentation
- ✅ Setup automation

**Start building!** 🚀

---

*Last Updated: April 24, 2026*  
*Version: 1.0.0*  
*Status: ✅ Production-Ready*
