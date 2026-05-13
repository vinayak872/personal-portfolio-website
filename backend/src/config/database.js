import mongoose from 'mongoose'

/**
 * MongoDB Connection Configuration
 */

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI)

    console.log(`✓ MongoDB connected: ${conn.connection.host}`)
    return conn
  } catch (error) {
    console.error(`✗ MongoDB connection error: ${error.message}`)
    process.exit(1)
  }
}
