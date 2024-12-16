import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { userName, email } = req.body;

  try {
    console.log(`🎉 Button clicked by: ${userName} (${email})`);

    // Send notification email
    await sendEmailNotification(userName, email);

    res.status(200).json({ message: 'Click recorded and notification sent!' });
  } catch (error) {
    console.error('Error sending notification email:', error);
    res.status(500).json({ message: 'Error processing the click' });
  }
}

/**
 * Function to send an email notification using Nodemailer
 */
async function sendEmailNotification(userName, email) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail email from Vercel env vars
      pass: process.env.EMAIL_PASS  // Gmail app password from Vercel env vars
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.NOTIFICATION_EMAIL, // The email to notify
    subject: `🎉 ${userName} clicked the birthday button!`,
    text: `The user with email ${email} has clicked the "Reveal Gift" button!`,
    html: `
      <h2>🎉 Birthday Click Alert 🎉</h2>
      <p>The birthday person <strong>${userName}</strong> (<strong>${email}</strong>) clicked the button!</p>
      <p>Send some money now: <strong>4585915043/0800</strong> 😄</p>
    `
  };

  // Send the email
  await transporter.sendMail(mailOptions);
  console.log('📧 Email sent successfully!');
}