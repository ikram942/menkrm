import { useTranslations } from "next-intl";

export default function AdminOrdersPage() {
    const t = useTranslations("admin");

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t("orders")}
            </h1>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 dark:bg-slate-800/50 text-gray-500 dark:text-gray-400 font-medium border-b border-gray-200 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-slate-800">
                            <tr className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">#ORD-001</td>
                                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">John Doe</td>
                                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">Oct 24, 2026</td>
                                <td className="px-6 py-4 text-gray-900 dark:text-white">150.00 MAD</td>
                                <td className="px-6 py-4">
                                    <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded-full text-xs font-medium">Processing</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-mauve-600 hover:text-mauve-700 dark:text-mauve-400 font-medium">View</button>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">#ORD-002</td>
                                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">Jane Smith</td>
                                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">Oct 23, 2026</td>
                                <td className="px-6 py-4 text-gray-900 dark:text-white">85.00 MAD</td>
                                <td className="px-6 py-4">
                                    <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full text-xs font-medium">Delivered</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-mauve-600 hover:text-mauve-700 dark:text-mauve-400 font-medium">View</button>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">#ORD-003</td>
                                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">Michael Johnson</td>
                                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">Oct 21, 2026</td>
                                <td className="px-6 py-4 text-gray-900 dark:text-white">220.00 MAD</td>
                                <td className="px-6 py-4">
                                    <span className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-1 rounded-full text-xs font-medium">Pending</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-mauve-600 hover:text-mauve-700 dark:text-mauve-400 font-medium">View</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
