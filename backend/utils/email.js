import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Create a transporter object using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD, //Generate Gmail App Password. Go to Security > App Passwords.
  },
});

// Function to send verification email
const sendVerificationEmail = async (email, verificationCode) => {
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "Verify Your Email for HandsOn",
    text: `Welcome to HandsOn!\n\nVerify Your Email Address\n\nThank you for joining HandsOn! To complete your registration, please use the verification code below:\n\nVerification Code: ${verificationCode}\n\nThis code will expire in 10 minutes. If you didn't request this, please ignore this email.\n\n© 2023 HandsOn. All rights reserved.`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); overflow: hidden; }
    .header { background-color: #007bff; color: #ffffff; text-align: center; padding: 20px; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { padding: 20px; color: #333333; }
    .content h2 { font-size: 20px; margin-bottom: 10px; }
    .content p { font-size: 16px; line-height: 1.5; }
    .verification-code { background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; color: #007bff; border-radius: 6px; margin: 20px 0; }
    .footer { text-align: center; padding: 10px; font-size: 14px; color: #777777; background-color: #f4f4f4; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to HandsOn!</h1>
    </div>
    <div class="content">
      <h2>Verify Your Email Address</h2>
      <p>Thank you for joining HandsOn! To complete your registration, please use the verification code below:</p>
      <div class="verification-code">
        <strong>${verificationCode}</strong>
      </div>
      <p>This code will expire in 10 minutes. If you didn't request this, please ignore this email.</p>
    </div>
    <div class="footer">
      <p>&copy; 2023 HandsOn. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification code sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send verification email");
  }
};

export { sendVerificationEmail };
