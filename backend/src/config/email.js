console.log('EMAIL USER AT LOAD:', process.env.EMAIL_USER)
console.log('EMAIL PASS AT LOAD:', !!process.env.EMAIL_PASSWORD)
import nodemailer from 'nodemailer'

/**
 * Gmail Email Configuration
 */

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER.trim(),
    pass: process.env.EMAIL_PASSWORD.trim()
  }
})

/**
 * Verify email connection
 */
export const verifyEmailConnection = async () => {
  try {
    console.log('EMAIL CONFIGURATION:')
    console.log('USER:', process.env.EMAIL_USER)
    console.log('PASSWORD EXISTS:', !!process.env.EMAIL_PASSWORD)
    console.log('PASSWORD:', process.env.EMAIL_PASSWORD)
    console.log('USER RAW:', JSON.stringify(process.env.EMAIL_USER))
    console.log('PASS RAW:', JSON.stringify(process.env.EMAIL_PASSWORD))
    await transporter.verify()

    console.log('✓ Email connection established')
    return true
  } catch (error) {
    console.error('✗ Email connection failed:')
    console.error(error)
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
      to: process.env.EMAIL_USER,
      subject: `New Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>

        <hr>

        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    }

    const info = await transporter.sendMail(mailOptions)

    console.log('✓ Admin email sent')
    console.log('Message ID:', info.messageId)

    return true
  } catch (error) {
    console.error('✗ Error sending admin email:')
    console.error(error)
    return false
  }
}

/**
 * Send confirmation email to visitor
 */
export const sendConfirmationEmail = async (recipientEmail, name) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: 'Thank You For Contacting Me',
      html: `
        <h2>Hello ${name},</h2>

        <p>Thank you for contacting me through my portfolio website.</p>

        <p>Your message has been received successfully.</p>

        <p>I will get back to you as soon as possible.</p>

        <br>

        <p>Best Regards,</p>
        <p>Vinayak Kumar</p>
      `
    }

    await transporter.sendMail(mailOptions)

    console.log('✓ Confirmation email sent')

    return true
  } catch (error) {
    console.error('✗ Error sending confirmation email:')
    console.error(error)
    return false
  }
}

export default transporter