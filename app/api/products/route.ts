import connectDB from "@/lib/connect";
import product from "@/lib/models/product";

export async function GET() {
    await connectDB();
    const products = await product.find();

    return Response.json(products);
}