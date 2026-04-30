import { Link } from "@/i18n/routing";
import { Lock, Shield, User, ArrowRight } from "lucide-react";
import { signIn } from "@/auth"
import { redirect } from "next/navigation";

async function credentialsAction(formData: FormData) {
    "use server"
    await signIn("credentials", formData)
    redirect("/admin")
}

export default function AdminLogin() {
    return (
        <div className="min-h-screen bg-[#f4f4f4] flex flex-col items-center justify-center p-4 selection:bg-black selection:text-white">

            {/* Ambient Background Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none flex justify-center items-center">
                <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-black/2 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative w-full max-w-[420px] bg-white border border-gray-100 rounded-2xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] z-10">
                {/* Logo / Badge */}
                <div className="flex justify-center mb-10">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center shadow-sm">
                        <Shield className="w-8 h-8 text-black" />
                    </div>
                </div>

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Admin Portal</h1>
                    <p className="text-gray-500 text-sm font-medium">Authorized personnel only</p>
                </div>

                {/* Form */}
                <form action={credentialsAction} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors">
                                <User size={18} />
                            </div>
                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="Admin Email"
                                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-xl outline-none font-medium text-gray-900 placeholder:text-gray-400 focus:border-black focus:ring-4 focus:ring-gray-100 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors">
                                <Lock size={18} />
                            </div>
                            <input
                                type="password"
                                required
                                name="password"
                                placeholder="Password"
                                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-xl outline-none font-medium text-gray-900 placeholder:text-gray-400 focus:border-black focus:ring-4 focus:ring-gray-100 transition-all"
                            />
                        </div>
                    </div>

                    <button
                        className="group relative w-full overflow-hidden mt-4 py-4 bg-black text-white rounded-xl font-bold uppercase tracking-widest text-[11px] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <span className="relative flex items-center justify-center gap-2">
                            Access Dashboard
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <Link href="/" className="text-xs text-gray-500 hover:text-black transition-colors font-medium underline underline-offset-4 decoration-transparent hover:decoration-black">
                        &larr; Return to Store
                    </Link>
                </div>
            </div>

            <div className="fixed bottom-6 text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold z-10">
                MenSavil Security
            </div>
        </div>
    )
}
