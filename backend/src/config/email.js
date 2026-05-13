import nodemailer from 'nodemailer'

/**
 * Email Service Configuration
 * Handles sending emails via Gmail SMTP
 */

const emailConfig = {
  service: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
}

const transporter = nodemailer.createTransport(emailConfig)

/**
 * Verify email connection
 */
export const verifyEmailConnection = async () => {
  try {
    await transporter.verify()
    console.log('✓ Email connection established')
    return true
  } catch (error) {
    console.error('✗ Email connection failed:', error.message)
    return false
  }
}

/**
 * Send contact form email to admin
 */
export const sendContactEmail = async (name, email, subject, message) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to admin
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent:', info.messageId)
    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}

/**
 * Send confirmation email to user
 */
export const sendConfirmationEmail = async (recipientEmail, name) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: 'Message Received - Portfolio Contact',
      html: `
        <h2>Thank You for Reaching Out</h2>
        <p>Hi ${name},</p>
        <p>I received your message and will get back to you soon.</p>
        <p>Best regards,<br/>Your Portfolio</p>
      `
    }

    await transporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error('Error sending confirmation email:', error)
    return false
  }
}
