import express from 'express'
import { body } from 'express-validator'
import {
  getAllBlogs,
  getBlogById,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog
} from '../controllers/blogController.js'
import { validationErrorHandler } from '../middleware/errorHandler.js'

const router = express.Router()

/**
 * Blog Routes
 * All public routes (no authentication required for this demo)
 */

// Get all blogs
router.get('/', getAllBlogs)

// Get blog by ID
router.get('/:id', getBlogById)

// Get blog by slug
router.get('/slug/:slug', getBlogBySlug)

// Create blog
router.post(
  '/',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('excerpt').trim().notEmpty().withMessage('Excerpt is required'),
    body('content').trim().notEmpty().withMessage('Content is required'),
    body('category').optional().trim()
  ],
  validationErrorHandler,
  createBlog
)

// Update blog
router.put(
  '/:id',
  [
    body('title').optional().trim(),
    body('excerpt').optional().trim(),
    body('content').optional().trim(),
    body('category').optional().trim()
  ],
  validationErrorHandler,
  updateBlog
)

// Delete blog
router.delete('/:id', deleteBlog)

export default router
