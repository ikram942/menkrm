import connectDB from "@/lib/connect";
import Product from "@/lib/models/product";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;

        const foundProduct = await Product.findById(id);

        if (!foundProduct) {
            return new Response(JSON.stringify({ error: "Product not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        return Response.json(foundProduct);
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
