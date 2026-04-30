import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function AdminProductsPage() {
    const t = useTranslations("admin");

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
                            <tr className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">KS Hair Cream</td>
                                <td className="px-6 py-4">
                                    <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full text-xs font-medium">Active</span>
                                </td>
                                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">124 in stock</td>
                                <td className="px-6 py-4 text-gray-900 dark:text-white">70.00 MAD</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-mauve-600 hover:text-mauve-700 dark:text-mauve-400 font-medium">Edit</button>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">KS Strengthening Shampoo</td>
                                <td className="px-6 py-4">
                                    <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full text-xs font-medium">Active</span>
                                </td>
                                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">85 in stock</td>
                                <td className="px-6 py-4 text-gray-900 dark:text-white">100.00 MAD</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-mauve-600 hover:text-mauve-700 dark:text-mauve-400 font-medium">Edit</button>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">KS Styling Gel</td>
                                <td className="px-6 py-4">
                                    <span className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-1 rounded-full text-xs font-medium">Draft</span>
                                </td>
                                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">0 in stock</td>
                                <td className="px-6 py-4 text-gray-900 dark:text-white">85.00 MAD</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-mauve-600 hover:text-mauve-700 dark:text-mauve-400 font-medium">Edit</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}