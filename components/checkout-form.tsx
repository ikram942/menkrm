"use client";

import { useState } from "react";
import { useCart } from "@/components/panel";
import { useCurrency } from "@/components/CurrencyContext";
import { useTranslations } from "next-intl";
import { createOrder } from "@/lib/actions/order";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import { Loader2 } from "lucide-react";

export function CheckoutForm() {
    const { cart, clearCart } = useCart();
    const { currency } = useCurrency();
    const t = useTranslations("checkout");
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cart.length === 0) {
            toast.error(t('empty'));
            return;
        }

        setLoading(true);
        const orderData = {
            customer: formData,
            items: cart.map(item => ({
                productId: item._id,
                title: item.title,
                price: item.price,
                quantity: item.quantity,
                image: item.image
            })),
            total,
            currency,
        };

        const result = await createOrder(orderData);

        if (result.success) {
            toast.success(t('success'));
            clearCart();
            router.push("/");
        } else {
            toast.error(t('error') + " : " + result.error);
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-4">{t('name')}</label>
                    <input
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ahmed"
                        className="w-full bg-[#f8f8f8] border-none rounded-3xl px-8 py-4 focus:ring-2 focus:ring-black transition-all outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-4">{t('email')}</label>
                    <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="mensavil@gmail.com"
                        className="w-full bg-[#f8f8f8] border-none rounded-3xl px-8 py-4 focus:ring-2 focus:ring-black transition-all outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-4">{t('phone')}</label>
                    <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+212 600 000000"
                        className="w-full bg-[#f8f8f8] border-none rounded-3xl px-8 py-4 focus:ring-2 focus:ring-black transition-all outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-4">{t('city')}</label>
                    <input
                        required
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Berrechid"
                        className="w-full bg-[#f8f8f8] border-none rounded-3xl px-8 py-4 focus:ring-2 focus:ring-black transition-all outline-none"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-4">{t('address')}</label>
                <input
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Rue 123, Quartier..."
                    className="w-full bg-[#f8f8f8] border-none rounded-3xl px-8 py-4 focus:ring-2 focus:ring-black transition-all outline-none"
                />
            </div>

            <div className="pt-8">
                <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-black text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs transition-all hover:bg-[#222] hover:shadow-2xl hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>{t('confirm')} — {total} {currency === 'MAD' ? 'Dh' : currency}</span>}
                </button>
            </div>
        </form>
    );
}
