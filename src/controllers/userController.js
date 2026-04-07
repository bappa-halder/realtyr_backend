import dotenv from "dotenv/config"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userSchema from "../models/userSchema.js"
import { verificationEmail } from "../email/verificationEmail.js"
import { loginEmail } from "../email/loginEmail.js"

// Register //

export const registerUser = async (req, res) => {
    try {
        const { userName, phone, email, password, role } = req.body
        if (!userName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All required fields missing"
            })
        }

        const existingUser = await userSchema.findOne({ email })
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User alredy exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        let avatarUrl
        if (req.file) {
            const allowedType = ["image/jpeg", "image/png"]
            if (!allowedType.includes(req.file.mimetype)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid image type"
                })
            }
            if (req.file && req.file.path) {
                avatarUrl = req.file.path;
            }
        }

        const user = await userSchema.create({
            userName, phone, email, password: hashedPassword, role, avatar: avatarUrl
        })

        const token = jwt.sign({ id: user._id }, process.env.secretkey, { expiresIn: "5m" })
        await verificationEmail(token, email)
        user.token = token
        await user.save()
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// LOGIN //

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userSchema.findOne({ email: email })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unathorized access"
            })
        }
        else {
            const passwordCheck = await bcrypt.compare(password, user.password)
            if (!passwordCheck) {
                return res.status(401).json({
                    success: false,
                    message: "Incorrect password"
                })
            }
            else if (passwordCheck && user.verified === true) {
                const accessToken = jwt.sign(
                    { id: user.id },
                    process.env.secretkey,
                    { expiresIn: "10days" }
                )
                const refreshToken = jwt.sign(
                    { id: user.id },
                    process.env.secretkey,
                    { expiresIn: "30days" }
                )


                user.isLoggedIn = true
                await user.save()
                // loginEmail(user.email, user.userName, user.role)
                return res.status(200).json({
                    success: true,
                    message: "User login successfully",
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    data: user
                })
            }
            else {
                return res.status(400).json({
                    message: "Complete email verification then login"
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// LOGOUT //

export const logoutUser = async (req, res) => {
    try {
        const userId = req.userId
        const user = await userSchema.findById(userId)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }


        user.isLoggedIn = false
        await user.save()
        return res.status(200).json({
            success: true,
            message: "User logut successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// EDIT PROFILE //

export const updateUser = async (req, res) => {
    try {
        const userId = req.userId
        const { userName, avatar } = req.body
        const user = await userSchema.findById(userId)
        if (userName) user.userName = userName
        if (req.file) {
            const allowedType = ["image/jpeg", "image/png"]
            if (!allowedType.includes(req.file.mimetype)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid image type"
                })
            }

            if (req.file && req.file.path) {
                user.avatar = req.file.path;
            }
        }
        user.updatedAt = Date.now()
        await user.save()
        return res.status(200).json({

            success: true,
            message: "User update successfully",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}