import { Contact } from '../models/Contact.js'
import { sendContactEmail, sendConfirmationEmail } from '../config/email.js'

/**
 * Contact Controller
 * Handles contact form submissions
 */

// Submit contact form
export const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body

    // Create contact record
    const contact = new Contact({
      name,
      email,
      subject,
      message
    })

    await contact.save()

    // Send email to admin
    const emailSent = await sendContactEmail(name, email, subject, message)

    // Send confirmation email to user
    if (emailSent) {
      await sendConfirmationEmail(email, name)
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully. I will get back to you soon!'
    })
  } catch (error) {
    next(error)
  }
}

// Get all messages (admin)
export const getAllMessages = async (req, res, next) => {
  try {
    const { read = null, limit = 10, skip = 0 } = req.query

    const query = read !== null ? { read: read === 'true' } : {}

    const messages = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip))

    const total = await Contact.countDocuments(query)

    res.json({
      success: true,
      data: messages,
      pagination: {
        total,
        limit: parseInt(limit),
        skip: parseInt(skip)
      }
    })
  } catch (error) {
    next(error)
  }
}

// Get single message
export const getMessage = async (req, res, next) => {
  try {
    const { id } = req.params

    const message = await Contact.findById(id)

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      })
    }

    // Mark as read
    if (!message.read) {
      message.read = true
      await message.save()
    }

    res.json({
      success: true,
      data: message
    })
  } catch (error) {
    next(error)
  }
}

// Mark message as read
export const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params

    const message = await Contact.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    )

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      })
    }

    res.json({
      success: true,
      message: 'Message marked as read',
      data: message
    })
  } catch (error) {
    next(error)
  }
}

// Delete message
export const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params

    const message = await Contact.findByIdAndDelete(id)

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      })
    }

    res.json({
      success: true,
      message: 'Message deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}
