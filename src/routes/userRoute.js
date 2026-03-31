import express from "express"
import { loginUser, logoutUser, registerUser, updateUser } from "../controllers/userController.js"
import { emailVerify } from "../middleware/emailVerify.js"
import { hasToken } from "../middleware/hasToken.js"
import { upload } from "../controllers/fileController.js"
import { validateUser } from "../middleware/userValidation.js"
import { userSchema } from "../validators/userValidate.js"

const userRoute = express.Router()

userRoute.post("/register", upload.single("avatar"), validateUser(userSchema), registerUser)
userRoute.get("/verify", emailVerify)
userRoute.post("/login", loginUser)
userRoute.delete("/logout", hasToken, logoutUser)
userRoute.put("/edit", upload.single("avatar"), hasToken, updateUser)
export default userRoute