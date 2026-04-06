import nodemailer from "nodemailer"
import dotenv from "dotenv/config"

export const loginEmail = async (email, userName, role) => {
    try {
        
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.email,
                pass: process.env.password,
            },
            family: 4
        });
        const mailConfig = {
            from: `"RealTyr Support Team" <${process.env.email}>`,
            to: email,
            subject: "New Login to Your Account",
            html: `
        <p>Hi ${userName},</p>

        <p>You have successfully logged in to your account.</p>

        <p><strong>Account details:</strong></p>
        <ul>
          <li><strong>Username:</strong> ${userName}</li>
          <li><strong>Role:</strong> ${role}</li>
          <li><strong>Login time:</strong> ${new Date().toLocaleString()}</li>
        </ul>

        <p>If this login wasn’t you, please reset your password immediately.</p>

        <p>Best regards,<br/>RealTyr Support Team</p>
      `,
        }
        const info = await transporter.sendMail(mailConfig)
        console.log("✅ Email sent:", info.response)
    } catch (error) {
        console.error("❌ Error sending email:", error.message)
        throw error
    }

}