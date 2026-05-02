import connectDB from "./connect";
import Product from "./models/product";

export async function getProducts({ search }: { search?: string }) {
    await connectDB();

    console.log(search, "search")
    const query: Record<string, any> = {}
    if (search) query.title = { $regex: search, $options: "i" };

    return Product.find(query).sort({ createdAt: -1 }).lean();
}

