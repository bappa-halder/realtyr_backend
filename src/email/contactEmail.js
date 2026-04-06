import nodemailer from "nodemailer"
import dotenv from "dotenv/config"

export const sendEmail = async (firstName, lastName, email, phone, message) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })
        const mailConfig = {
            from: email,
            to: process.env.EMAIL,
            subject: "Realtyr new query",
            html: `
            <h3>New Message from Contact Form</h3>
        <p><b>Name:</b> ${firstName} ${lastName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b> ${message}</p>
        `
        }
        await transporter.sendMail(mailConfig)
    } catch (error) {
        throw new Error("Email not sent")
    }
}