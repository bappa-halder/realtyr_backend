import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "realtyr_user",
    required: true,
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "realtyr_property",
    required: true,
  },
}, { timestamps: true });

wishListSchema.index({ userId: 1, propertyId: 1 }, { unique: true });

export default mongoose.model("realtyr_wishlist", wishListSchema);
