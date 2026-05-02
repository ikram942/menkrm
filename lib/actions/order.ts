"use server";

import connectDB from "@/lib/connect";
import Order from "@/lib/models/order";

export async function createOrder(orderData: any) {
    try {
        await connectDB();
        const newOrder = new Order(orderData);
        const savedOrder = await newOrder.save();
        return { success: true, orderId: savedOrder._id.toString() };
    } catch (error: any) {
        console.error("Error creating order:", error);
        return { success: false, error: error.message };
    }
}
