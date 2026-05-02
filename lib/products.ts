import connectDB from "./connect";
import Product from "./models/product";

export async function getProducts() {
    await connectDB();
    return Product.find().sort({ createdAt: -1 }).lean();
}

