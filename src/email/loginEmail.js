// import nodemailer from "nodemailer"
// import dotenv from "dotenv/config"

// export const loginEmail = async (email, userName, role) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: process.env.EMAIL,
//                 pass: process.env.PASSWORD
//             }
//         })
//         const mailConfig = {
//             from: `"RealTyr Support Team" <${process.env.EMAIL}>`,
//             to: email,
//             subject: "New Login to Your Account",
//             html: `
//         <p>Hi ${userName},</p>

//         <p>You have successfully logged in to your account.</p>

//         <p><strong>Account details:</strong></p>
//         <ul>
//           <li><strong>Username:</strong> ${userName}</li>
//           <li><strong>Role:</strong> ${role}</li>
//           <li><strong>Login time:</strong> ${new Date().toLocaleString()}</li>
//         </ul>

//         <p>If this login wasn’t you, please reset your password immediately.</p>

//         <p>Best regards,<br/>RealTyr Support Team</p>
//       `,
//         }
//         const info = await transporter.sendMail(mailConfig)
//         console.log("Email sent:", info.response)
//     } catch (error) {
//         console.error("Error sending email:", error.message)
//         throw error
//     }

// }




import nodemailer from "nodemailer";
import dotenv from "dotenv/config";

export const loginEmail = async (email, userName, role) => {
    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        await transporter.verify();

        console.log("✅ Mail server ready");

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
        };

        const info = await Promise.race([
            transporter.sendMail(mailConfig),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Mail timeout")), 10000)
            ),
        ]);

        console.log("✅ Login email sent:", info.response);

        return info;

    } catch (error) {

        console.error("❌ Error sending login email:", error.message);

        return null;
    }
};