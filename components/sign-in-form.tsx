"use client"
import { signIn } from "next-auth/react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { Loader2, Mail, CheckCircle2, AlertCircle } from "lucide-react"

export function SignInForm() {
    const t = useTranslations("manageSubscription");
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const resendAction = async (formData: FormData) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const email = formData.get("email") as string;
            const result = await signIn("resend", { 
                email, 
                redirect: false,
                callbackUrl: "/" 
            });

            if (result?.error) {
                setError(result.error);
            } else {
                setIsSent(true);
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    if (isSent) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 p-8 bg-green-50/50 border-2 border-green-100 rounded-2xl text-center animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Check your email</h3>
                <p className="text-gray-600 max-w-[280px]">
                    We've sent a magic link to your inbox. Click it to sign in.
                </p>
                <button 
                    onClick={() => setIsSent(false)}
                    className="text-sm font-semibold text-green-600 hover:text-green-700 underline underline-offset-4"
                >
                    Try another email
                </button>
            </div>
        )
    }

    return (
        <form action={resendAction} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="email-resend" className="text-sm font-semibold text-gray-700 ml-1">
                    Email Address
                </label>
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors">
                        <Mail size={18} />
                    </div>
                    <input 
                        type="email"
                        required
                        placeholder={t('email')}
                        id="email-resend" 
                        name="email" 
                        disabled={isLoading}
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-xl outline-none font-medium text-gray-900 placeholder:text-gray-400 focus:border-black focus:ring-4 focus:ring-gray-100 transition-all disabled:opacity-50" 
                    />
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg animate-in slide-in-from-top-2">
                    <AlertCircle size={16} />
                    <span>{error === "Configuration" ? "Resend API key is invalid or not configured." : error}</span>
                </div>
            )}

            <button 
                disabled={isLoading}
                className="group relative w-full overflow-hidden py-4 bg-black text-white rounded-xl font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
            >
                {/* Shimmer effect */}
                {!isLoading && (
                    <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                )}

                <span className="relative flex items-center justify-center gap-2">
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        t('continue')
                    )}
                </span>
            </button>
        </form>
    )
}