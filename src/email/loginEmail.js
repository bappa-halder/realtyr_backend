import nodemailer from "nodemailer"
import dotenv from "dotenv/config"

export const loginEmail = async (email, userName, role) => {
    try {
        // const transporter = nodemailer.createTransport({
        //     service: "gmail",
        //     auth: {
        //         user: process.env.EMAIL,
        //         pass: process.env.PASSWORD
        //     }
        // })
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // Use SSL
            auth: {
                user: process.env.EMAIL, // Set in Render Dashboard
                pass: process.env.PASSWORD, // Use an App Password
            },
        });
        const mailConfig = {
            from: `"RealTyr Support Team" <${process.env.EMAIL}>`,
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