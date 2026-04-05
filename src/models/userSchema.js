import mongoose from "mongoose"

const userSchema = new
 mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    avatar: {
        type: String,
        default: "http://localhost:3000/upload/default.png"
    },
    agencyName: {
        type: String,
        default: "RealTyr"
    },
    verified: {
        type: Boolean,
        default: false
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        default: null
    }
}, { timestamps: true })

export default mongoose.model("realtyr_user", userSchema)