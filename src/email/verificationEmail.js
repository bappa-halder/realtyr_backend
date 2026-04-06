import nodemailer from "nodemailer";
import dotenv from "dotenv/config";

export const verificationEmail = async (token, email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.email,
        pass: process.env.password,
      },
    });

    const mailConfig = {
      from: `"RealTyr" <${process.env.email}>`,
      to: email,
      subject: "Email Verification",
      html: `
        <h2>Email Verification</h2>
        <p>Click the button below to verify your email:</p>

        <a 
          href="https://realtyr-realestate.vercel.app/verify?token=${token}"
          style="
            padding:10px 15px;
            background:#4f46e5;
            color:white;
            text-decoration:none;
            border-radius:5px;
            display:inline-block;
          "
        >
          Verify Email
        </a>

        <p>If you didn’t request this, please ignore this email.</p>
      `,
    };

    const info = await transporter.sendMail(mailConfig);
    console.log("✅ Email sent:", info.response);

  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    throw error;
  }
};
