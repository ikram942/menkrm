import { auth } from "@/auth";
import { AdminSidebar } from "@/components/admin/sidebar";
import { ReactNode } from "react";

export default async function AdminLayout({ children }: { children: ReactNode }) {
    const session = await auth();

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-slate-950">
            {session && <AdminSidebar />}
            {/* Added top padding on mobile to account for the fixed header */}
            <main className="flex-1 overflow-y-auto pt-16 md:pt-0">
                <div className="p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
