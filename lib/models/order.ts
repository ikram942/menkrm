import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        customer: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
        },
        items: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
                title: { type: String, required: true },
                price: { type: Number, required: true },
                quantity: { type: Number, required: true },
                image: { type: String },
            },
        ],
        total: { type: Number, required: true },
        currency: { type: String, required: true, default: "MAD" },
        status: {
            type: String,
            enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
