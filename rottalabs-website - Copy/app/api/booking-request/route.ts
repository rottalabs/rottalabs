import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, message, serviceName, preferredDateTime } = body

    // Validate required fields
    if (!name || !phone || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Create transporter for sending emails
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,       // TLS port
        secure: false,   // false za 587 + STARTTLS
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,  // App password
        }
      });

    // Email to you (admin notification)
    const adminEmailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Booking Request - ${serviceName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
            .info-box { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #667eea; }
            .message-box { background: #e3f2fd; padding: 15px; border-radius: 5px; border: 1px solid #bbdefb; }
            .datetime-box { background: #fff3cd; padding: 15px; border-radius: 5px; border: 1px solid #ffeaa7; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            h2 { margin: 0; font-size: 24px; }
            h3 { color: #667eea; margin-top: 20px; }
            .label { font-weight: bold; color: #555; }
            .value { margin-left: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>📅 New Booking Request Received</h2>
          </div>
          <div class="content">
            <div class="info-box">
              <div class="label">🎯 Service:</div>
              <div class="value">${serviceName}</div>
            </div>
            <div class="info-box">
              <div class="label">👤 Name:</div>
              <div class="value">${name}</div>
            </div>
            <div class="info-box">
              <div class="label">📞 Phone:</div>
              <div class="value">${phone}</div>
            </div>
            <div class="info-box">
              <div class="label">📧 Email:</div>
              <div class="value">${email}</div>
            </div>
            <div class="info-box">
              <div class="label">📅 Preferred Date & Time:</div>
              <div class="value">${preferredDateTime || '/'}</div>
            </div>
            <h3>💬 Message:</h3>
            <div class="message-box">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div class="footer">
            <p>This email was sent from your Rottalabs website booking form.</p>
          </div>
        </body>
        </html>
      `,
    }

    // Email to customer (confirmation)
    const customerEmailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Booking Request Confirmation - Rottalabs',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .success-box { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
            .info-box { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #667eea; }
            .message-box { background: #e3f2fd; padding: 15px; border-radius: 5px; border: 1px solid #bbdefb; }
            .datetime-box { background: #fff3cd; padding: 15px; border-radius: 5px; border: 1px solid #ffeaa7; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
            .contact-info { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
            h2 { margin: 0; font-size: 28px; }
            h3 { color: #667eea; margin-top: 20px; }
            .label { font-weight: bold; color: #555; }
            .value { margin-left: 10px; }
            .emoji { font-size: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>📅 Thank you for your booking request!</h2>
          </div>
          <div class="content">
            <p>Dear <strong>${name}</strong>,</p>
            
            <div class="success-box">
              <div class="emoji">✅</div>
              <h3>Booking Request Successfully Received!</h3>
              <p>We have received your booking request for <strong>${serviceName}</strong>, we will get back to you as soon as possible to confirm the schedule.</p>
            </div>
            
            <h3>📋 Your Booking Details:</h3>
            <div class="info-box">
              <div class="label">🎯 Service:</div>
              <div class="value">${serviceName}</div>
            </div>
            <div class="info-box">
              <div class="label">📞 Phone:</div>
              <div class="value">${phone}</div>
            </div>
            <div class="info-box">
              <div class="label">📧 Email:</div>
              <div class="value">${email}</div>
            </div>
            <div class="info-box">
              <div class="label">📅 Preferred Date & Time:</div>
              <div class="value">${preferredDateTime || '/'}</div>
            </div>
            <h3>💬 Your Message:</h3>
            <div class="message-box">
              ${message.replace(/\n/g, '<br>')}
            </div>
            
            <div class="message-box">
              <h3>📞 Need Immediate Assistance?</h3>
              <p>If you have any urgent questions, feel free to contact us directly at <strong>rottalabs@gmail.com</strong></p>
            </div>
            
            <p>We appreciate your interest in our services and look forward to working with you!</p>
            
            <p>Best regards,<br>
            <strong>Rottalabs Team</strong><br>
            <em>Engineering & Design Solutions</em></p>
          </div>
          <div class="footer">
            <p>This is an automated confirmation email. Please do not reply to this email.</p>
            <p>© 2024 Rottalabs. All rights reserved.</p>
          </div>
        </body>
        </html>
      `,
    }

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminEmailOptions),
      transporter.sendMail(customerEmailOptions)
    ])

    return NextResponse.json(
      { message: 'Booking request submitted successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error sending booking request:', error)
    return NextResponse.json(
      { error: 'Failed to send booking request' },
      { status: 500 }
    )
  }
}
