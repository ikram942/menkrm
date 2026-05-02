import { getTranslations } from "next-intl/server";
import { CheckoutForm } from "@/components/checkout-form";
import Copyright from "@/components/ui/copyrght";

export default async function CheckoutPage() {
    const t = await getTranslations("checkout");

    return (
        <div className="bg-white min-h-screen">
            <main className="max-w-4xl mx-auto px-4 py-16 md:py-24">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase leading-none">
                        {t('title')}
                    </h1>
                    <div className="w-24 h-2 bg-black mx-auto rounded-full"></div>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-gray-100 shadow-sm">
                    <CheckoutForm />
                </div>
            </main>

            <Copyright />
        </div>
    );
}
