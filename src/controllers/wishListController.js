import wishListSchema from "../models/wishListSchema.js";
import propertySchema from "../models/propertySchema.js";

export const addToWishlist = async (req, res) => {
    try {
        const { propertyId } = req.body;

        const property = await propertySchema.findById(propertyId);
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        const data = await wishListSchema.create({
            userId: req.userId,
            propertyId,
        });

        res.status(201).json({
            success: true,
            message: "Added to wishlist",
            data
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    };
}


export const getMyWishlist = async (req, res) => {
    try {
        const data = await wishListSchema
            .find({ userId: req.userId })
            .populate("propertyId");

        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
};


export const removeFromWishlist = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await wishListSchema.findOne({
            _id: id,
            userId: req.userId,
        });

        if (!data) {
            return res.status(404).json({
                message: "Wishlist item not found",
            });
        }

        await wishListSchema.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Removed from wishlist",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

export const getAllWishlist = async (req, res) => {
    try {
        const data = await wishListSchema
            .find()
            .populate("propertyId")
            .populate("userId", "userName email role");

        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}