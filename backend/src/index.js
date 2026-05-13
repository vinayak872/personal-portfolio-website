import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/database.js'
import { verifyEmailConnection } from './config/email.js'
import {
  errorHandler,
  requestLogger,
  notFoundHandler
} from './middleware/errorHandler.js'
import blogRoutes from './routes/blogRoutes.js'
import contactRoutes from './routes/contactRoutes.js'

// Load environment variables
dotenv.config()

// Initialize Express app
const app = express()

// Database connection
await connectDB()

// Email configuration verification
await verifyEmailConnection()

/**
 * Middleware Configuration
 */

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// Body parser middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Request logging
app.use(requestLogger)

/**
 * Health Check Route
 */
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  })
})

/**
 * API Routes
 */
app.use('/api/blogs', blogRoutes)
app.use('/api/contact', contactRoutes)

/**
 * Error Handling Middleware
 */
app.use(notFoundHandler)
app.use(errorHandler)

/**
 * Start Server
 */
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║          Portfolio Backend Server Started             ║
╠════════════════════════════════════════════════════════╣
║ URL: http://localhost:${PORT}
║ Environment: ${process.env.NODE_ENV}
║ MongoDB: ${process.env.MONGODB_URI}
╚════════════════════════════════════════════════════════╝
  `)
})

export default app
