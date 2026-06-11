import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

export const verifyEmailConnection = async () => {
  if (!resend) {
    console.warn('! RESEND_API_KEY is not set; email sending is disabled in this environment')
    return false
  }

  console.log('✓ Resend configured')
  return true
}

export const sendContactEmail = async (
  name,
  email,
  subject,
  message
) => {
  try {
    if (!resend) {
      console.warn('! Skipping admin email because Resend is not configured')
      return false
    }

    console.log('=== SEND CONTACT EMAIL STARTED ===')

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.EMAIL_USER,
      subject: `New Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p>${message}</p>
      `
    })

    console.log('✓ Admin email sent')
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export const sendConfirmationEmail = async (
  recipientEmail,
  name
) => {
  try {
    if (!resend) {
      console.warn('! Skipping confirmation email because Resend is not configured')
      return false
    }

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: recipientEmail,
      subject: 'Thank You For Contacting Me',
      html: `
        <h2>Hello ${name}</h2>
        <p>Thank you for contacting me.</p>
        <p>Your message has been received successfully.</p>
        <p>I will get back to you soon.</p>
      `
    })

    console.log('✓ Confirmation email sent')
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
