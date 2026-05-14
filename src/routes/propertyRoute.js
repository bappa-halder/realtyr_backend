import express from "express"
import { addProperty, deleteProperty, getOneProperty, getOnlyIdProperty, gettAllProperty, updateProperty } from "../controllers/propertyController.js"
import { hasToken } from "../middleware/hasToken.js"
import { validateProperty } from "../middleware/propertyValidation.js"
import { propertyValidateSchema } from "../validators/propertyValidate.js"
import { upload } from "../middleware/multer.js"

const propertyRoute = express.Router()

propertyRoute.post("/addProperty", hasToken, upload.single("image"), validateProperty(propertyValidateSchema), addProperty)
propertyRoute.get("/getAll", gettAllProperty)
propertyRoute.get("/getOne/:id", hasToken, getOneProperty)
propertyRoute.get("/getOnlyId", hasToken, getOnlyIdProperty)
propertyRoute.delete("/deleteProperty/:id", hasToken, deleteProperty)
propertyRoute.put("/updateProperty/:id", hasToken, upload.single("image"), updateProperty)

export default propertyRoute