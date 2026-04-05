import express from "express";
import { hasToken } from "../middleware/hasToken.js";
import { adminOnly, userOnly } from "../middleware/roleMiddleWare.js";
import { addToWishlist, getAllWishlist, getMyWishlist, removeFromWishlist } from "../controllers/wishListController.js";

const wishListRoute = express.Router()

wishListRoute.post("/addWishList", hasToken, userOnly, addToWishlist)
wishListRoute.get("/myWishList", hasToken, userOnly, getMyWishlist)
wishListRoute.delete("/deleteWishList/:id", hasToken, userOnly, removeFromWishlist)
wishListRoute.get("/allWishList", hasToken, adminOnly, getAllWishlist)

export default wishListRoute