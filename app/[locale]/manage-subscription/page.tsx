import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { SignInForm } from "@/components/sign-in-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import GoogleButton from "@/components/google-boutton";

export default async function ManageSubscription() {
    const session = await auth();

    if (session) {
        redirect("/");
    }

    const t = await getTranslations("manageSubscription");

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
                <GoogleButton />

                {/* Divider - Ultra Luxe Style */}
                <div className="relative flex items-center gap-6 mb-8">
                    <div className="grow h-px bg-gray-100"></div>
                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-[0.3em]">{t('or')}</span>
                    <div className="grow h-px bg-gray-100"></div>
                </div>

                {/* Email Form */}
                <SignInForm />

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
