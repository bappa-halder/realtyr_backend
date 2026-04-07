// import nodemailer from "nodemailer";
// import dotenv from "dotenv/config";

// export const verificationEmail = async (token, email) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD,
//       },
//     });

//     const mailConfig = {
//       from: `"RealTyr" <${process.env.EMAIL}>`,
//       to: email,
//       subject: "Email Verification",
//       html: `
//         <h2>Email Verification</h2>
//         <p>Click the button below to verify your email:</p>

//         <a 
//           href="https://realtyr-realestate.vercel.app/verify?token=${token}"
//           style="
//             padding:10px 15px;
//             background:#4f46e5;
//             color:white;
//             text-decoration:none;
//             border-radius:5px;
//             display:inline-block;
//           "
//         >
//           Verify Email
//         </a>

//         <p>If you didn’t request this, please ignore this email.</p>
//       `,
//     };

//     const info = await transporter.sendMail(mailConfig);
//     console.log("✅ Email sent:", info.response);

//   } catch (error) {
//     console.error("❌ Error sending email:", error.message);
//     throw error;
//   }
// };



import { Resend } from "resend";
import dotenv from "dotenv/config";

const resend = new Resend(process.env.RESEND_API_KEY);

export const verificationEmail = async (token, email) => {
  try {
    const response = await resend.emails.send({
      from: "RealTyr <onboarding@resend.dev>", // change after domain verify
      to: email,
      subject: "Email Verification",
      html: `
  <div style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
      <tr>
        <td align="center">
          
          <!-- Card -->
          <table width="100%" max-width="500px" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;padding:30px;box-shadow:0 4px 10px rgba(0,0,0,0.05);">
            
            <!-- Logo / Title -->
            <tr>
              <td align="center" style="padding-bottom:20px;">
                <h1 style="margin:0;color:#4f46e5;">RealTyr</h1>
              </td>
            </tr>

            <!-- Heading -->
            <tr>
              <td align="center">
                <h2 style="margin:0;color:#111;">Verify Your Email</h2>
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td align="center" style="padding:15px 0;color:#555;font-size:14px;line-height:1.6;">
                Thanks for signing up! Please confirm your email address by clicking the button below.
              </td>
            </tr>

            <!-- Button -->
            <tr>
              <td align="center" style="padding:20px 0;">
                <a href="https://realtyr-realestate.vercel.app/verify?token=${token}"
                   style="background:#4f46e5;color:#ffffff;padding:12px 25px;border-radius:6px;text-decoration:none;font-weight:bold;display:inline-block;">
                   Verify Email
                </a>
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td style="border-top:1px solid #eee;margin:20px 0;"></td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="font-size:12px;color:#888;padding-top:10px;">
                If you didn’t create an account, you can safely ignore this email.
              </td>
            </tr>

          </table>

          <!-- Bottom Text -->
          <table width="500" style="margin-top:15px;">
            <tr>
              <td align="center" style="font-size:12px;color:#aaa;">
                © ${new Date().getFullYear()} RealTyr. All rights reserved.
              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>
  </div>
`,
    });

    console.log("✅ Email sent:", response);

  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    throw error;
  }
};