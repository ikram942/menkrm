"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { LayoutDashboard, ShoppingBag, ShoppingCart, Mail, LogOut, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import LanguageSwitcher from "../LanguageSwitcher";
import { signOut } from "next-auth/react";

export function AdminSidebar() {
    const t = useTranslations("admin");
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false); // Mobile state
    const [isCollapsed, setIsCollapsed] = useState(false); // Desktop state
    const locale = useLocale();
    const isRTL = locale === "ar";

    // Close mobile sidebar on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const links = [
        { href: "/admin", label: t("overview"), icon: LayoutDashboard, exact: true },
        { href: "/admin/products", label: t("products"), icon: ShoppingBag, exact: false },
        { href: "/admin/orders", label: t("orders"), icon: ShoppingCart, exact: false },
        { href: "/admin/contacts", label: t("contacts"), icon: Mail, exact: false },
    ];

    return (
        <>
            {/* Mobile Header with Toggle */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between px-4 z-40 shadow-sm">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <h1 className="ml-4 text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    {t("title")}
                </h1>

                <LanguageSwitcher />
            </div>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed md:sticky top-0 left-0 z-50 h-screen bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 flex flex-col shadow-2xl md:shadow-none transition-all duration-300 ease-in-out",
                // Mobile visibility
                isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
                // Desktop width
                isCollapsed ? "md:w-20" : "w-64"
            )}>
                {/* Desktop Collapse Toggle */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={cn("hidden md:flex absolute top-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full p-1 shadow-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white z-50", isRTL ? "-left-3" : "-right-3")}
                >
                    {(isCollapsed && !isRTL) || (!isCollapsed && isRTL) ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>

                <div className={cn(
                    "h-16 flex items-center px-6 border-b border-gray-200 dark:border-slate-800",
                    isCollapsed ? "justify-center px-0" : "justify-between"
                )}>
                    {!isCollapsed && (
                        <h1 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider truncate">
                            {t("title")}
                        </h1>
                    )}
                    {isCollapsed && (
                        <h1 className="text-lg font-bold text-gray-900 dark:text-white uppercase">
                            {t("title").charAt(0)}
                        </h1>
                    )}

                    <LanguageSwitcher />
                </div>

                <nav className="flex-1 py-6 flex flex-col gap-2 px-3 overflow-y-auto overflow-x-hidden">
                    {links.map((link) => {
                        const isActive = link.exact
                            ? pathname === link.href || pathname === `/en${link.href}` || pathname === `/fr${link.href}` || pathname === `/ar${link.href}`
                            : pathname.includes(link.href);

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                title={isCollapsed ? link.label : undefined}
                                className={cn(
                                    "flex items-center rounded-lg text-sm font-medium transition-all duration-200 group relative",
                                    isCollapsed ? "justify-center p-3" : "gap-3 px-3 py-3",
                                    isActive
                                        ? "bg-mauve-100 text-mauve-900 dark:bg-mauve-900 dark:text-mauve-100"
                                        : "text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white"
                                )}
                            >
                                <link.icon className={cn("shrink-0", isCollapsed ? "w-6 h-6" : "w-5 h-5")} />
                                {!isCollapsed && <span className="truncate">{link.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-3 border-t border-gray-200 dark:border-slate-800">
                    <button
                        title={isCollapsed ? t("logout") : undefined}
                        className={cn(
                            "flex items-center rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors duration-200 w-full",
                            isCollapsed ? "justify-center p-3" : "gap-3 px-3 py-3"
                        )}
                        onClick={() => signOut()}
                    >
                        <LogOut className={cn("shrink-0", isCollapsed ? "w-6 h-6" : "w-5 h-5")} />
                        {!isCollapsed && <span className="truncate">{t("logout")}</span>}
                    </button>
                </div>
            </aside>
        </>
    );
}
