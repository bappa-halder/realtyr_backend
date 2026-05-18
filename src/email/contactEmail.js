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






// import nodemailer from "nodemailer";
// import dotenv from "dotenv/config";

// export const sendEmail = async (
//     firstName,
//     lastName,
//     email,
//     phone,
//     message
// ) => {

//     try {

//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: process.env.EMAIL,
//                 pass: process.env.PASSWORD
//             }
//         });

//         await transporter.verify();

//         console.log("✅ Mail server ready");

//         const mailConfig = {
//             from: `"RealTyr Contact" <${process.env.EMAIL}>`,
//             replyTo: email,
//             to: process.env.EMAIL,
//             subject: "RealTyr New Query",
//             html: `
//                 <h3>New Message from Contact Form</h3>

//                 <p><b>Name:</b> ${firstName} ${lastName}</p>

//                 <p><b>Email:</b> ${email}</p>

//                 <p><b>Phone:</b> ${phone}</p>

//                 <p><b>Message:</b> ${message}</p>
//             `
//         };

//         const info = await Promise.race([
//             transporter.sendMail(mailConfig),
//             new Promise((_, reject) =>
//                 setTimeout(() => reject(new Error("Mail timeout")), 10000)
//             )
//         ]);

//         console.log("✅ Contact email sent:", info.response);

//         return info;

//     } catch (error) {

//         console.error("❌ Contact email error:", error.message);

//         return null;
//     }
// };