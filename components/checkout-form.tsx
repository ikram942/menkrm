"use client";

import { useState } from "react";
import { useCart } from "@/components/panel";
import { useCurrency } from "@/components/CurrencyContext";
import { useTranslations } from "next-intl";
import { createOrder } from "@/lib/actions/order";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import { Loader2, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";

export function CheckoutForm() {
    const { cart, clearCart, removeFromCart } = useCart();
    const { currency, formatPrice } = useCurrency();
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

    if (cart.length === 0) {
        return (
            <div className="text-center py-12 space-y-4">
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <ShoppingCart className="text-gray-300" />
                </div>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">{t('empty')}</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col-reverse md:flex-row gap-12">
            {/* Left Side: Form */}
            <div>
                <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
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
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>{t('confirm')}</span>}
                        </button>
                    </div>
                </form>
            </div>

            {/* Right Side: Order Summary */}
            <div>
                <div className="bg-[#fcfcfc] rounded-[2.5rem] p-8 md:p-10 border border-gray-100 animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
                    <h3 className="text-xl font-black uppercase tracking-tighter mb-8">{t('summary')}</h3>
                    <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
                        {cart.map((item) => (
                            <div key={item._id} className="flex gap-4 items-center">
                                <div className="relative w-16 h-16 bg-white rounded-2xl overflow-hidden border border-gray-100 shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-contain p-2"
                                    />
                                    <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                        {item.quantity}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-gray-900 text-sm truncate uppercase">{item.title}</h4>
                                    <p className="text-xs text-gray-400 font-medium">{formatPrice(item.price)} x {item.quantity}</p>
                                </div>
                                <div className="text-sm font-black text-gray-900">
                                    {formatPrice(item.price * item.quantity)}
                                </div>
                                <button
                                    onClick={() => removeFromCart(item._id)}
                                    className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                                    title="Supprimer"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 pt-8 border-t border-gray-200 space-y-4">
                        <div className="flex justify-between items-center text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                            <span>{t('subtotal')}</span>
                            <span>{formatPrice(total)}</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                            <span>{t('shipping')}</span>
                            <span className="text-green-600 italic font-medium lowercase">{t('free')}</span>
                        </div>
                        <div className="flex justify-between items-center pt-4">
                            <span className="text-sm font-black uppercase tracking-widest">Total</span>
                            <span className="text-3xl font-black tracking-tighter">{formatPrice(total)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
