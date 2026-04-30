import { getTranslations } from "next-intl/server";
import { Plus, Edit2, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/routing";
import connectDB from "@/lib/connect";
import Product from "@/lib/models/product";
import DeleteProductButton from "./DeleteProductButton";

export default async function AdminProductsPage() {
    const t = await getTranslations("admin");

    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 }).lean();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {t("products")}
                </h1>
                <Link href="/admin/products/new" className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 flex items-center gap-2 rounded-lg font-medium transition-colors text-sm">
                    <Plus className="w-4 h-4" />
                    Add Product
                </Link>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 dark:bg-slate-800/50 text-gray-500 dark:text-gray-400 font-medium border-b border-gray-200 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-4">Product Name</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Inventory</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-slate-800">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                        No products found. Click "Add Product" to create one.
                                    </td>
                                </tr>
                            ) : (
                                products.map((product: any) => (
                                    <tr key={product._id.toString()} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {product.images && product.images[0] && (
                                                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 dark:border-slate-700 shrink-0">
                                                        <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                                                    </div>
                                                )}
                                                <div className="flex flex-col">
                                                    <span className="text-gray-900 dark:text-white font-medium">{product.title}</span>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">{product.category}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                            {product.stock} in stock
                                        </td>
                                        <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">
                                            {product.price.toFixed(2)} MAD
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/products/${product._id.toString()}`}
                                                    target="_blank"
                                                    className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                                    title="View on site"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={`/admin/products/edit/${product._id.toString()}`}
                                                    className="p-2 text-mauve-600 hover:text-mauve-700 dark:text-mauve-400 transition-colors"
                                                    title="Edit product"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Link>
                                                <DeleteProductButton id={product._id.toString()} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}