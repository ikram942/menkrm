"use client";
import { LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export function ConnectedUser() {
    const { data: session } = useSession();

    return session ? (
        <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 group">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-xs font-bold ring-2 ring-transparent group-hover:ring-gray-200 transition-all">
                {session.user?.email?.[0].toUpperCase()}
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 leading-none mb-0.5">Account</span>
                <span className="text-xs font-bold text-gray-900 hidden lg:block leading-none">
                    {session.user?.email?.split('@')[0]}
                </span>
            </div>
            <button
                onClick={() => signOut()}
                className="ml-1 p-1.5 hover:bg-white hover:shadow-sm rounded-full transition-all text-gray-400 hover:text-black"
                title="Sign Out"
            >
                <LogOut size={14} />
            </button>
        </div>
    ) : null;
}