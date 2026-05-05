import connectDB from "./connect";
import Product from "./models/product";

export async function getProducts({ search, isPack }: { search?: string, isPack?: boolean }) {
    await connectDB();

    console.log(search, "search")
    const query: Record<string, any> = {}
    if (search) query.title = { $regex: search, $options: "i" };
    if (isPack !== undefined) query.isPack = isPack;

    return Product.find(query).sort({ createdAt: -1 }).lean();
}

