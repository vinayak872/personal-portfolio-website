# Personal Portfolio Website

A modern, production-ready personal portfolio website built with React, Node.js, and MongoDB.

## Features

✨ **Dynamic Projects**: Automatically fetch and display GitHub repositories
📝 **Blog System**: CRUD operations for blog posts with rich content
📧 **Contact Form**: Email API integration with form validation
🎨 **Responsive UI**: Mobile-first design with modern components
🔐 **Environment Configuration**: Secure configuration management
📊 **CI/CD Pipeline**: Automated testing and deployment

## Tech Stack

**Frontend:**
- React 18
- Vite
- React Router v6
- Tailwind CSS
- Axios

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- Nodemailer (email)
- GitHub API v3
- JWT Authentication (optional)

**DevOps:**
- GitHub Actions (CI/CD)
- AWS S3 (static hosting)
- Docker (containerization)

## Project Structure

```
personal-portfolio/
├── frontend/              # React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── services/     # API services
│   │   └── styles/       # Global styles
│   ├── public/
│   ├── vite.config.js
│   └── package.json
├── backend/               # Node.js Express server
│   ├── src/
│   │   ├── models/       # MongoDB schemas
│   │   ├── routes/       # API routes
│   │   ├── controllers/  # Route handlers
│   │   ├── middleware/   # Express middleware
│   │   └── config/       # Configuration files
│   ├── .env.example
│   └── package.json
├── docs/                  # Documentation
│   ├── SETUP.md
│   ├── API.md
│   └── DEPLOYMENT.md
└── README.md
```

## Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- MongoDB (local or Atlas)
- GitHub account (for API token)

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your configuration
npm run dev
```

## Documentation

- [Setup Instructions](docs/SETUP.md) - Complete setup guide
- [API Documentation](docs/API.md) - Backend API endpoints
- [Deployment Guide](docs/DEPLOYMENT.md) - AWS & CI/CD setup

## Environment Variables

Frontend: `frontend/.env.local`
```
VITE_API_URL=http://localhost:5000
VITE_GITHUB_API_TOKEN=your_github_token
```

Backend: `backend/.env`
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
GITHUB_TOKEN=your_github_token
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

## Scripts

**Frontend:**
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run lint` - ESLint check

**Backend:**
- `npm run dev` - Development with nodemon
- `npm start` - Production start
- `npm test` - Run tests

## Contributing

See [SETUP.md](docs/SETUP.md) for development guidelines.

## License

MIT License - feel free to use for personal or commercial projects.
# personal-portfolio-website
