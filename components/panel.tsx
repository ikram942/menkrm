"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useCurrency } from "./CurrencyContext";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

type CartItem = {
    _id: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
};

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Omit<CartItem, "quantity">) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, delta: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const t = useTranslations("product");

    // load from localStorage
    useEffect(() => {
        const stored = localStorage.getItem("cart");
        if (stored) {
            try {
                setCart(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    // save to localStorage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Omit<CartItem, "quantity">) => {
        setCart((prev) => {
            const exist = prev.find(p => p._id === product._id);
            if (exist) {
                return prev.map(p =>
                    p._id === product._id
                        ? { ...p, quantity: p.quantity + 1 }
                        : p
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        toast.success(t('addedToCart'));
    };

    const removeFromCart = (id: string) => {
        setCart(prev => prev.filter(p => p._id !== id));
    };

    const updateQuantity = (id: string, delta: number) => {
        setCart(prev => prev.map(p => {
            if (p._id === id) {
                const newQty = Math.max(1, p.quantity + delta);
                return { ...p, quantity: newQty };
            }
            return p;
        }));
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
};

import { Link } from "@/i18n/routing";

export function CartPanel({ onClose }: { onClose?: () => void }) {
    const { cart, removeFromCart, updateQuantity } = useCart();
    const t = useTranslations("product");
    const { currency } = useCurrency();

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const formatPrice = (price: number) => {
        const symbols: Record<string, string> = {
            MAD: "Dh",
            EUR: "€",
            USD: "$",
            AED: "AED",
            CAD: "CAD"
        };
        // Simple conversion for demo if needed, but here we assume price is in MAD from DB
        // and we might want to scale it. For now, let's just use the symbol.
        return `${price} ${symbols[currency] || "Dh"}`;
    };

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
                <div className="bg-mauve-50 p-6 rounded-full">
                    <ShoppingBag className="w-12 h-12 text-mauve-300" />
                </div>
                <p className="text-xl font-bold text-gray-400 uppercase tracking-widest">{t('emptyCart')}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
                <div className="space-y-6 py-6">
                    {cart.map((item) => (
                        <div key={item._id} className="flex gap-4 group">
                            <div className="relative w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden shrink-0">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h4 className="font-bold text-gray-900 leading-tight uppercase text-sm">{item.title}</h4>
                                    <p className="text-mauve-600 font-black mt-1">{formatPrice(item.price)}</p>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center border border-gray-200 rounded-full px-2 py-1 bg-white shadow-sm">
                                        <button
                                            onClick={() => updateQuantity(item._id, -1)}
                                            className="p-1 hover:text-mauve-600 transition-colors"
                                        >
                                            <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="w-8 text-center font-bold text-xs">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item._id, 1)}
                                            className="p-1 hover:text-mauve-600 transition-colors"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border-t border-gray-100 pt-8 mt-4 space-y-6">
                <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-bold uppercase tracking-widest text-xs">{t('total')}</span>
                    <span className="text-3xl font-black text-black tracking-tighter">{formatPrice(total)}</span>
                </div>
                <Link href="/checkout" className="block w-full" onClick={onClose}>
                    <button className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all hover:bg-mauve-900 hover:shadow-xl active:scale-[0.98]">
                        {t('checkout')}
                    </button>
                </Link>
            </div>
        </div>
    );
}
