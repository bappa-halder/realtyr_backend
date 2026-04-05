import express from "express"
import { sendMessage } from "../controllers/contactController.js"

const contactRoute = express.Router()

contactRoute.post("/sendMessage", sendMessage)

export default contactRoute