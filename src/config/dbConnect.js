import mongoose from "mongoose";
import dotenv from "dotenv/config";

export async function dbConnect(){
    try {
        await mongoose.connect(process.env.URL)
        console.log("Database Connected")
    } catch (error) {
        console.log("Data base not Connected")
    }
}