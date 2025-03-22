import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, budget, timeframe, projectDetails } = req.body;

  if (!name || !email || !projectDetails) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Configure SMTP transporter using environment variables
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use your email provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO, // Your receiving email
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Budget: ${budget || 'Not specified'}
        Timeframe: ${timeframe || 'Not specified'}
        Project Details: ${projectDetails}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending email', error: error.message });
  }
}
