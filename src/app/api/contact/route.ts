import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Email to site owner
    await transporter.sendMail({
      from: `"RaishaHost Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL || process.env.GMAIL_USER,
      replyTo: email,
      subject: `[Contact Form] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #e2e8f0; padding: 32px; border-radius: 12px; border: 1px solid #1e293b;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #05CCF7; font-size: 24px; margin: 0;">New Contact Message</h1>
            <p style="color: #64748b; margin: 8px 0 0;">via raishahost.com contact form</p>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e293b; color: #64748b; width: 100px;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e293b; color: #f1f5f9; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e293b; color: #64748b;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e293b;">
                <a href="mailto:${email}" style="color: #05CCF7; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e293b; color: #64748b;">Subject</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e293b; color: #f1f5f9;">${subject}</td>
            </tr>
          </table>
          <div style="margin-top: 24px;">
            <p style="color: #64748b; margin-bottom: 12px;">Message:</p>
            <div style="background: #0f172a; border: 1px solid #1e293b; border-radius: 8px; padding: 16px; color: #f1f5f9; line-height: 1.7; white-space: pre-wrap;">${message}</div>
          </div>
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #1e293b; text-align: center;">
            <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(to right, #05CCF7, #0284c7); color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold;">Reply to ${name}</a>
          </div>
        </div>
      `,
    });

    // Confirmation email to the sender
    await transporter.sendMail({
      from: `"RaishaHost" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `We received your message — RaishaHost`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #e2e8f0; padding: 32px; border-radius: 12px; border: 1px solid #1e293b;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #05CCF7; font-size: 26px; margin: 0;">RaishaHost</h1>
            <p style="color: #64748b; margin: 4px 0 0; font-size: 13px;">Your trusted hosting partner</p>
          </div>
          <h2 style="color: #f1f5f9; font-size: 20px; margin-bottom: 12px;">Hi ${name}, we got your message!</h2>
          <p style="color: #94a3b8; line-height: 1.7; margin-bottom: 20px;">
            Thank you for reaching out to us. We have received your inquiry and our team will get back to you within <strong style="color: #05CCF7;">2–4 hours</strong> during business hours (10am – 8pm).
          </p>
          <div style="background: #0f172a; border: 1px solid #1e293b; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <p style="color: #64748b; font-size: 12px; margin: 0 0 8px;">Your message:</p>
            <p style="color: #f1f5f9; margin: 0; font-style: italic; line-height: 1.6;">"${message}"</p>
          </div>
          <p style="color: #94a3b8; line-height: 1.7;">
            If you need urgent support, please call us at <a href="tel:+8801711380679" style="color: #05CCF7; text-decoration: none;">+880 1711 380 679</a>.
          </p>
          <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #1e293b; text-align: center;">
            <p style="color: #475569; font-size: 12px; margin: 0;">
              © 2025 RaishaHost · Bangladesh<br>
              <a href="https://www.raishahost.com" style="color: #05CCF7; text-decoration: none;">www.raishahost.com</a>
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
  }
}
