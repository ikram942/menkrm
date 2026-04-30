"use server";

import connectDB from "../connect";
import Product from "../models/product";
import { revalidatePath } from "next/cache";

export async function addProduct(formData: FormData) {
    try {
        await connectDB();

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const ingredients = formData.get("ingredients") as string;
        const price = Number(formData.get("price"));
        const stock = Number(formData.get("stock"));
        const category = formData.get("category") as string;
        
        // Handle images array
        const images = formData.getAll("images") as string[];

        const newProduct = new Product({
            title,
            description,
            ingredients,
            price,
            stock,
            category,
            images,
        });

        await newProduct.save();

        revalidatePath("/admin/products");
        return { success: true };
    } catch (error: any) {
        console.error("Error creating product:", error);
        return { success: false, error: error.message || "Failed to create product" };
    }
}
