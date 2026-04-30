import { useTranslations } from "next-intl";

export default function AdminOverviewPage() {
    const t = useTranslations("admin");

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t("overview")}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stats Cards */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Total Sales</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">1,240 MAD</p>
                </div>
                
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Active Orders</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">42</p>
                </div>
                
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Total Products</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">22</p>
                </div>
            </div>

            <div className="mt-8 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 dark:border-slate-800">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h3>
                </div>
                <div className="p-6">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">No recent activity to show.</p>
                </div>
            </div>
        </div>
    );
}