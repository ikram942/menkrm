"use client"
import { signIn } from "next-auth/react";

export default function GoogleButton() {
    return (
        <div className="mb-6">
            <button onClick={() => signIn("google", { redirectTo: "/" })} className="group relative w-full overflow-hidden py-4 bg-[#6344ff] text-white rounded-xl font-bold transition-all duration-500 hover:shadow-[0_0_30px_rgba(99,68,255,0.4)] hover:scale-[1.02] active:scale-[0.98]">
                <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>

                <div className="relative flex items-center justify-center gap-2 text-sm tracking-wide">
                    <span className="opacity-80">Continue with</span>
                    <span className="font-black italic">Gmail</span>
                </div>
            </button>
        </div>
    );
}