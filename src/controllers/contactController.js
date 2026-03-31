import { sendEmail } from "../email/contactEmail.js"
import contactSchema from "../models/contactSchema.js"

export const sendMessage = async(req, res)=>{
    try {
        const {firstName, lastName, email, phone, message} = req.body
        if(!firstName || !lastName || !email || !phone || !message){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const contactMessage = await contactSchema.create({
            firstName, lastName, email, phone, message
        })
        await sendEmail(firstName, lastName, email, phone, message)
        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: contactMessage
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}