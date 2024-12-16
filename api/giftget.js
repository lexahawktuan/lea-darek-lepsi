import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { userName, email } = req.body;

  try {
    console.log(`🎉 Button clicked by: ${userName} (${email})`);

    // Debug: Log environment variables
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('NOTIFICATION_EMAIL:', process.env.NOTIFICATION_EMAIL);

    // Send notification email
    await sendEmailNotification(userName, email);

    res.status(200).json({ message: 'Click recorded and notification sent!' });
  } catch (error) {
    console.error('Error sending notification email:', error.message);
    res.status(500).json({
      message: 'Error processing the click',
      error: error.message, // Send error details for debugging
    });
  }
}

async function sendEmailNotification(userName, email) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.NOTIFICATION_EMAIL,
    subject: `🎉 ${userName} clicked the birthday button!`,
    text: `The user with email ${email} has clicked the "Reveal Gift" button!`,
    html: `<h2>🎉 Birthday Click Alert 🎉</h2>
           <p>User <strong>${userName}</strong> (<strong>${email}</strong>) clicked the button!</p>
           <p>Send some money now: <strong>4585915043/0800</strong> 😄</p>`,
  };

  await transporter.sendMail(mailOptions);
  console.log('📧 Email sent successfully!');
}