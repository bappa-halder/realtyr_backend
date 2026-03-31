import express from "express";
import dotenv from "dotenv/config";
import cors from "cors";
import { dbConnect } from "./src/config/dbConnect.js";
import userRoute from "./src/routes/userRoute.js";
import propertyRoute from "./src/routes/propertyRoute.js";
import wishListRoute from "./src/routes/wishListRoute.js";
import contactRoute from "./src/routes/contactRoute.js";

const app = express()
const port = process.env.PORT || 3000

dbConnect()

app.use(express.json())
app.use(cors())
app.use("/upload", express.static("uploads"))
app.use("/user", userRoute)
app.use("/property", propertyRoute)
app.use("/wishList", wishListRoute)
app.use("/contact", contactRoute)

app.listen(port, () => {
    console.log(`Server running at ${port}`);
})