# Deployment Guide

Comprehensive guide for deploying the portfolio to production.

## Architecture Overview

```
┌─────────────────────────────────────────┐
│     AWS CloudFront / S3                 │
│     (Static Frontend Assets)            │
└────────────────┬────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
┌───────▼────────┐  ┌─────▼──────────┐
│   Frontend     │  │   Express      │
│  (React SPA)   │  │   Backend      │
└────────────────┘  └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │   MongoDB       │
                    │   (Atlas)       │
                    └─────────────────┘
```

## Frontend Deployment (AWS S3 + CloudFront)

### Prerequisites
- AWS Account
- AWS CLI installed
- S3 bucket created
- CloudFront distribution configured

### Step 1: Build Frontend

```bash
cd frontend
npm run build

# Output: dist/ folder with optimized assets
```

### Step 2: Deploy to S3

```bash
# Configure AWS credentials
aws configure

# Sync build files to S3
aws s3 sync dist/ s3://your-bucket-name/ \
  --delete \
  --cache-control "public, max-age=31536000" \
  --exclude "index.html"

# Upload index.html with no-cache
aws s3 cp dist/index.html s3://your-bucket-name/index.html \
  --cache-control "no-cache, no-store, must-revalidate" \
  --content-type "text/html"
```

### Step 3: Invalidate CloudFront

```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

### Step 4: Update Environment Variables

In `frontend/.env.local` (production):
```
VITE_API_URL=https://api.yourdomain.com
VITE_GITHUB_USERNAME=your_username
VITE_GITHUB_API_TOKEN=your_token
```

---

## Backend Deployment (Heroku / Railway / Render)

### Option A: Heroku

#### Prerequisites
- Heroku account
- Heroku CLI installed
- GitHub connected (optional, for auto-deploy)

#### Step 1: Create Heroku App

```bash
heroku login
heroku create your-portfolio-api
```

#### Step 2: Set Environment Variables

```bash
heroku config:set \
  NODE_ENV=production \
  PORT=5000 \
  MONGODB_URI="your_mongodb_atlas_uri" \
  EMAIL_USER="your_email@gmail.com" \
  EMAIL_PASSWORD="app_password" \
  FRONTEND_URL="https://yourdomain.com" \
  GITHUB_TOKEN="your_token"
```

#### Step 3: Deploy

```bash
git push heroku main
```

#### Step 4: Monitor Logs

```bash
heroku logs --tail
```

---

### Option B: Railway

#### Step 1: Install Railway CLI

```bash
npm i -g @railway/cli
```

#### Step 2: Login & Create Project

```bash
railway login
railway init
```

#### Step 3: Add Services

```bash
# Add MongoDB from Railway marketplace
railway add --plugin mongodb

# Add Node.js service
railway up
```

#### Step 4: Set Environment Variables

```bash
railway variables set \
  NODE_ENV=production \
  MONGODB_URI="$DATABASE_URL"
```

#### Step 5: Deploy

```bash
railway up
```

---

### Option C: Render

1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Set environment variables
5. Deploy

---

## MongoDB Atlas Setup (Cloud Database)

### Step 1: Create MongoDB Atlas Account

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Sign up (free tier available)
3. Create organization and project

### Step 2: Create Cluster

1. Click "Create Deployment"
2. Select "Shared" (free tier)
3. Choose cloud provider and region
4. Create cluster (takes 5-10 minutes)

### Step 3: Configure Security

1. Go to "Network Access"
2. Add IP address:
   - Select "Allow access from anywhere" (0.0.0.0/0) for testing
   - For production, whitelist specific IPs
3. Create database user:
   - Go to "Database Access"
   - Create user with strong password

### Step 4: Get Connection String

1. Click "Connect" button
2. Select "Drivers" (Node.js)
3. Copy connection string
4. Replace `<password>` with user password
5. Update `MONGODB_URI` in backend `.env`

### Example Connection String:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

---

## Gmail App Password Setup (for Email)

### Step 1: Enable 2-Factor Authentication

1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Click "2-Step Verification"
3. Follow setup process

### Step 2: Create App Password

1. Return to Security settings
2. Find "App passwords"
3. Select App: Mail, Device: Windows/Mac/Linux
4. Google generates 16-character password
5. Copy and use in `EMAIL_PASSWORD`

### Step 3: Update Backend Env

```
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

---

## CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Portfolio

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          cd frontend && npm install
          cd ../backend && npm install
      
      - name: Build frontend
        run: cd frontend && npm run build
      
      - name: Run linter
        run: cd frontend && npm run lint

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to S3
        run: |
          cd frontend && npm install
          npm run build
          aws s3 sync dist/ s3://${{ secrets.AWS_BUCKET }} --delete
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      
      - name: Invalidate CloudFront
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_DIST_ID }} \
            --paths "/*"

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.13
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: "your-app-name"
          heroku_email: "your-email@gmail.com"
```

---

## Domain Configuration

### Custom Domain Setup

1. Purchase domain (GoDaddy, Namecheap, etc.)
2. Point DNS records to CloudFront:
   - A record: CloudFront distribution IP
   - CNAME: yourdomain.com → d111111abcdef8.cloudfront.net

3. Or use Route 53 for full AWS management

### SSL/TLS Certificate

- CloudFront: Automatic with ACM certificate
- Backend: Add SSL to Heroku/Railway dashboard

---

## Performance Optimization

### Frontend

1. **Code Splitting**
   - Already enabled in Vite
   - Routes loaded on demand

2. **Minification**
   - Automatic with `npm run build`

3. **Caching**
   - CloudFront caching enabled
   - Browser cache headers set

4. **Image Optimization**
   - Use optimized image formats (WebP)
   - Compress before upload

### Backend

1. **Database Indexing**
   ```javascript
   // In Blog.js
   blogSchema.index({ slug: 1 })
   blogSchema.index({ published: 1, createdAt: -1 })
   ```

2. **Response Compression**
   ```javascript
   import compression from 'compression'
   app.use(compression())
   ```

3. **Database Connection Pooling**
   - Mongoose handles automatically

---

## Monitoring & Logging

### Heroku Logs

```bash
heroku logs --tail
```

### CloudWatch (AWS)

1. Create CloudWatch dashboard
2. Monitor API response times
3. Set up alarms for errors

### Sentry (Error Tracking)

```bash
npm install @sentry/node
```

```javascript
import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "your_sentry_dsn",
  environment: "production"
})
```

---

## Security Checklist

- [ ] Update all dependencies: `npm audit fix`
- [ ] Remove sensitive data from code
- [ ] Enable HTTPS everywhere
- [ ] Set secure CORS headers
- [ ] Add rate limiting
- [ ] Use environment variables for secrets
- [ ] MongoDB: Whitelist production IPs only
- [ ] Regular backups of MongoDB
- [ ] Monitor for security vulnerabilities

---

## Troubleshooting

### 502 Bad Gateway
- Check if backend is running
- Verify MONGODB_URI is correct
- Check error logs: `heroku logs --tail`

### CORS Error
- Update `FRONTEND_URL` in backend env
- Verify frontend URL in CORS configuration

### Email Not Sending
- Check Gmail app password
- Verify 2FA is enabled
- Monitor Heroku logs for SMTP errors

### Database Connection Timeout
- Check MongoDB Atlas network access
- Verify connection string format
- Ensure database user has correct permissions

---

## Scaling for Production

1. **Load Balancing**
   - Heroku/Railway automatic
   - Consider Lambda for auto-scaling

2. **Database Optimization**
   - Add indexes for frequently queried fields
   - Use read replicas for high traffic

3. **Caching**
   - Redis cache layer
   - CloudFront edge locations

4. **CDN**
   - CloudFront for static assets
   - Reduces latency globally

---

## Costs Estimation (Monthly)

| Service | Tier | Cost |
|---------|------|------|
| AWS S3 | ~1GB | $0.023 |
| CloudFront | ~100GB transfer | $8.50 |
| Heroku | Eco Dyno | $7 |
| MongoDB Atlas | Shared Cluster | Free |
| **Total** | | **~$15.53** |

*Costs vary based on usage. Use AWS Calculator for accurate estimates.*

---

## Backup & Recovery

### MongoDB Backup

```bash
# Backup to local
mongodump --uri="your_connection_string" --out=./backup

# Restore
mongorestore --uri="your_connection_string" ./backup
```

### GitHub Backup

- Repository is automatically backed up
- Enable branch protection rules

---

## Next Steps

1. Set up monitoring alerts
2. Configure automated backups
3. Create disaster recovery plan
4. Schedule security audits
5. Plan for scaling infrastructure

---

## Support & Resources

- [AWS Documentation](https://docs.aws.amazon.com)
- [Heroku Deployment](https://devcenter.heroku.com)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com)
- [GitHub Actions](https://github.com/features/actions)

---

## Contact & Support

For deployment issues, refer to service documentation or open GitHub issues.
