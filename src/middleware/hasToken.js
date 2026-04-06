import jwt from "jsonwebtoken"
import dotenv from "dotenv/config"
import userSchema from "../models/userSchema.js"

export const hasToken = async(req, res, next)=>{
    try {
        const authHeader = req.headers.authorization
        if(!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(401).json({
                success: false,
                message: "Access token missing or invalid"
            })
        }
        else{
            const token = authHeader.split(" ")[1]
            jwt.verify(token, process.env.secretkey, async(err, decoded)=>{
                if(err){
                    if(err.name === "TokenExpiredError"){
                        return res.status(400).json({
                            success: false,
                            message: "Access token has expired, use refresh token to genrate again"
                        })
                    }
                    return res.status(400).json({
                        success: false,
                        message: "Access token is missing or invalid"
                    })
                }
                else{
                    const {id} = decoded
                    const user = await userSchema.findById(id)
                    if(!user){
                        return res.status(404).json({
                            success: false,
                            message: "User not found"
                        })
                    }
                    req.userId = id
                    req.userRole = user.role;
                    next()
                }
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
