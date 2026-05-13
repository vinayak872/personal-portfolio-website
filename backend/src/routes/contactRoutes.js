import express from 'express'
import { body } from 'express-validator'
import {
  submitContact,
  getAllMessages,
  getMessage,
  markAsRead,
  deleteMessage
} from '../controllers/contactController.js'
import { validationErrorHandler } from '../middleware/errorHandler.js'

const router = express.Router()

/**
 * Contact Routes
 * Public submission, admin management endpoints
 */

// Submit contact form
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().notEmpty().withMessage('Message is required')
  ],
  validationErrorHandler,
  submitContact
)

// Admin: Get all messages
router.get('/', getAllMessages)

// Admin: Get single message
router.get('/:id', getMessage)

// Admin: Mark as read
router.patch('/:id/read', markAsRead)

// Admin: Delete message
router.delete('/:id', deleteMessage)

export default router
