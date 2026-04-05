import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "realtyr_user",
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    bedroom: {
        type: Number,
        required: true
    },
    bathroom: {
        type: Number,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    purpose: {
        type: String,
        enum: ["rent", "sale"],
        required: true
    }
})

export default mongoose.model("realtyr_property", propertySchema)