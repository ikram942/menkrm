import { MAX_IMAGES } from "@/lib/constants";
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        ingredients: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true,
            default: 0
        },
        images: {
            type: [String],
            validate: [
                (val: string[]) => val.length <= MAX_IMAGES,
                '{PATH} exceeds the limit of ${MAX_IMAGES} images'
            ]
        },
        category: {
            type: String,
            required: true
        },
        usage: {
            type: String,
            required: true
        },
        isPack: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
