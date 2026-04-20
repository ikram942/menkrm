"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function ManageSubscription() {
    const t = useTranslations("manageSubscription");

    return (
        <div className="min-h-screen bg-[#f4f4f4] flex flex-col items-center justify-center p-4">

            <div className="w-full max-w-[440px] bg-white rounded-xl shadow-sm p-8 md:p-12 mb-10">

                {/* Logo / Brand Style Luxe */}
                <div className="text-center mb-12">
                    <h1 className="text-xl text-gray-400 font-bold uppercase tracking-[0.6em] mb-10">
                        MenSavil
                    </h1>
                </div>

                {/* Header Section */}
                <div className="mb-10">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-2 leading-none">
                        {t('title')}
                    </h2>
                    <p className="text-gray-400 text-sm font-medium tracking-tight">
                        {t('description')}
                    </p>
                </div>

                {/* Social Auth Button */}
                <div className="mb-6">
                    <button className="group relative w-full overflow-hidden py-4 bg-[#6344ff] text-white rounded-xl font-bold transition-all duration-500 hover:shadow-[0_0_30px_rgba(99,68,255,0.4)] hover:scale-[1.02] active:scale-[0.98]">
                        <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>

                        <div className="relative flex items-center justify-center gap-2 text-sm tracking-wide">
                            <span className="opacity-80">Continue with</span>
                            <span className="font-black italic">Gmail</span>
                        </div>
                    </button>
                </div>

                {/* Divider - Ultra Luxe Style */}
                <div className="relative flex items-center gap-6 mb-8">
                    <div className="grow h-px bg-gray-100"></div>
                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-[0.3em]">{t('or')}</span>
                    <div className="grow h-px bg-gray-100"></div>
                </div>

                {/* Email Form */}
                <div className="space-y-4">
                    <div className="relative">
                        <input
                            type="email"
                            placeholder={t('email')}
                            className="w-full px-4 py-4 bg-white border-2 border-gray-900 rounded-xl outline-none font-medium text-gray-900 placeholder:text-gray-400 focus:ring-4 focus:ring-gray-100 transition-all"
                        />
                    </div>

                    {/* Continue Button with Luxe Animation */}
                    <button className="group relative w-full overflow-hidden py-4 bg-black text-white rounded-xl font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-[0.98]">
                        {/* Shimmer effect */}
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>

                        <span className="relative">{t('continue')}</span>
                    </button>
                </div>

                {/* Checkbox */}
                <div className="mt-6 flex items-start gap-3">
                    <input
                        type="checkbox"
                        id="newsletter"
                        className="mt-1 w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                    />
                    <label htmlFor="newsletter" className="text-sm text-gray-700 cursor-pointer select-none">
                        {t('newsletter')}
                    </label>
                </div>

                {/* Terms */}
                <div className="mt-8 text-center text-xs text-gray-400">
                    By continuing, you agree to our{" "}
                    <Link href="#" className="underline hover:text-gray-600 transition-colors">
                        Terms of service
                    </Link>
                </div>
            </div>

            {/* Bottom Link */}
            <div className="text-sm font-medium text-gray-500">
                <Link href="#" className="hover:text-black transition-colors">
                    {t('privacy')}
                </Link>
            </div>
        </div>
    );
}
