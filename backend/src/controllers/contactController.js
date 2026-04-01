const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    // 1. Save to Database
    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    // 2. Setup Email Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // 3. Email to Admin
    const adminMailOptions = {
      from: `"Jyoti Foundation" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // Foundation email
      subject: `New Inquiry: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #ee580c; border-radius: 10px; padding: 20px;">
          <h2 style="color: #ee580c;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #fdf2f0; padding: 15px; border-radius: 8px;">${message}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <small style="color: #888;">Submitted at: ${new Date().toLocaleString()}</small>
        </div>
      `,
    };

    // 4. Confirmation Email to User
    const userMailOptions = {
      from: `"Jyoti Foundation" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `We've received your message - Jyoti Foundation`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px;">
          <h2 style="color: #ee580c;">Hello ${name},</h2>
          <p>Thank you for reaching out to **Jyoti Foundation**.</p>
          <p>We have received your message regarding your inquiry. Our team will review it and get back to you as soon as possible.</p>
          <div style="background: #fdf2f0; padding: 15px; border-radius: 8px; margin: 20px 0;">
             <p style="margin: 0; font-weight: bold; color: #ee580c;">Your Message:</p>
             <p style="margin: 10px 0 0 0; font-style: italic;">"${message}"</p>
          </div>
          <p>Best regards,</p>
          <p><strong>Jyoti Foundation Team</strong></p>
          <small style="color: #888;">This is an automated response. Please do not reply to this email.</small>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
};


exports.getContactSubmissions = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching submissions' });
  }
};
