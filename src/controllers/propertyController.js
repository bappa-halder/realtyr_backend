import propertySchema from "../models/propertySchema.js"

export const addProperty = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required or upload failed"
            });
        }
        const imageUrl = req.file?.path;

        if (!imageUrl) {
            return res.status(400).json({
                success: false,
                message: "Image upload failed"
            });
        }
        const data = await propertySchema.create({
            ...req.body, image: imageUrl, userId: req.userId
        })
        return res.status(200).json({
            success: true,
            message: "Property added successfully",
            data
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}





export const gettAllProperty = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 6;

        const skip = (page - 1) * limit;

        const total = await propertySchema.countDocuments();

        const data = await propertySchema
            .find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            success: true,
            message: "Data fetched successfully",
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            data
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getOneProperty = async (req, res) => {
    try {
        const { id } = req.params
        const data = await propertySchema.findById(id)
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Data not fetched"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Data fetched successfully",
            data
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteProperty = async (req, res) => {
    try {
        const { id } = req.params
        const data = await propertySchema.findById(id)
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Data not found"
            })
        }
        await propertySchema.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: "Data deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const updateProperty = async (req, res) => {
    try {
        const { title, price, bedroom, bathroom, area, location, purpose } = req.body
        const { id } = req.params
        const data = await propertySchema.findById(id)
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Data not found"
            })
        }

        if (title) data.title = title
        if (price) data.price = price
        if (bedroom) data.bedroom = bedroom
        if (bathroom) data.bathroom = bathroom
        if (area) data.area = area
        if (location) data.location = location
        if (purpose) data.purpose = purpose
        if (req.file && req.file.path) {
            data.image = req.file.path;
        }
        data.updatedAt = Date.now()
        await data.save()
        return res.status(200).json({
            success: true,
            message: "Data updated succesfully",
            data
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}