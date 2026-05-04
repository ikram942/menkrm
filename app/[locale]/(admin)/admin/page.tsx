import { getTranslations } from "next-intl/server";
import connectDB from "@/lib/connect";
import Order from "@/lib/models/order";
import Product from "@/lib/models/product";
import Contact from "@/lib/models/contact";
import { ShoppingCart, Package, Users, TrendingUp, MessageSquare } from "lucide-react";

export default async function AdminOverviewPage() {
    const t = await getTranslations("admin");

    await connectDB();

    // Fetch stats
    const [totalOrders, totalProducts, totalContacts, orders] = await Promise.all([
        Order.countDocuments(),
        Product.countDocuments(),
        Contact.countDocuments(),
        Order.find().sort({ createdAt: -1 }).limit(5),
    ]);

    // Calculate total sales (sum of total field in Order)
    const salesData = await Order.aggregate([
        { $group: { _id: null, totalSales: { $sum: "$total" } } }
    ]);
    const totalSales = salesData.length > 0 ? salesData[0].totalSales : 0;

    const stats = [
        {
            label: "Total Sales",
            value: `${totalSales.toLocaleString()} MAD`,
            icon: TrendingUp,
            color: "text-green-600",
            bg: "bg-green-50"
        },
        {
            label: "Active Orders",
            value: totalOrders,
            icon: ShoppingCart,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            label: "Total Products",
            value: totalProducts,
            icon: Package,
            color: "text-purple-600",
            bg: "bg-purple-50"
        },
        {
            label: "Messages",
            value: totalContacts,
            icon: MessageSquare,
            color: "text-orange-600",
            bg: "bg-orange-50"
        }
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                    {t("overview")}
                </h1>
                <p className="text-gray-500 dark:text-slate-400 text-sm">
                    Welcome back! Here's what's happening with your store today.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className={`${stat.bg} p-3 rounded-xl`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{stat.label}</h3>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Orders */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-200 dark:border-slate-800 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Orders</h3>
                        <span className="text-xs font-medium text-mauve-600 bg-mauve-50 px-2 py-1 rounded">Last 5 orders</span>
                    </div>
                    <div className="divide-y divide-gray-100 dark:divide-slate-800">
                        {orders.length === 0 ? (
                            <div className="p-10 text-center text-gray-500 dark:text-slate-400 text-sm italic">
                                No orders yet.
                            </div>
                        ) : (
                            orders.map((order) => (
                                <div key={order._id.toString()} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{order.customer.name}</span>
                                        <span className="text-xs text-gray-500 dark:text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-bold text-gray-900 dark:text-white">{order.total} {order.currency}</span>
                                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                                order.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                                    'bg-blue-100 text-blue-700'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Quick Actions or More Info */}
                <div className="bg-linear-to-br from-mauve-600 to-mauve-800 rounded-2xl p-8 text-white flex flex-col justify-between shadow-lg relative overflow-hidden group">
                    <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <TrendingUp className="w-64 h-64" />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-2">Store Performance</h3>
                        <p className="text-mauve-100 text-sm leading-relaxed mb-6">
                            Your store is growing! Check your products and orders regularly to stay on top of your business.
                        </p>
                        <div className="flex flex-col gap-3">
                            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                                <div className="text-xs text-mauve-200 uppercase font-bold tracking-widest mb-1">Top Selling Category</div>
                                <div className="text-lg font-bold">Hair Care</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                                <div className="text-xs text-mauve-200 uppercase font-bold tracking-widest mb-1">Monthly Growth</div>
                                <div className="text-lg font-bold">+12.5%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}