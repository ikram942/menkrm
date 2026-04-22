"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Copyright from "@/components/ui/copyrght";
import { useCurrency } from "@/components/CurrencyContext";

export default function Product() {
    const t = useTranslations("product");
    const { currency } = useCurrency();

    const products = [
        {
            id: 1,
            title: t('product1Title'),
            price: t(`product1Price_${currency}`),
            image: "/creme.webp"
        },
        {
            id: 2,
            title: t('product2Title'),
            price: t(`product2Price_${currency}`),
            image: "/champo.webp"
        },
        {
            id: 3,
            title: t('product3Title'),
            price: t(`product3Price_${currency}`),
            image: "/gel.webp"
        },
        {
            id: 4,
            title: t('product4Title'),
            price: t(`product4Price_${currency}`),
            image: "/spryt.webp"
        },
        {
            id: 5,
            title: t('product5Title'),
            price: t(`product5Price_${currency}`),
            image: "/creme.webp"
        },
        {
            id: 6,
            title: t('product6Title'),
            price: t(`product6Price_${currency}`),
            image: "/champo.webp"
        }
    ];

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-10 md:py-20 bg-white min-h-screen">
                {/* Header Section */}
                <div className="mb-12 md:mb-20">
                    <h1 className="text-2xl md:text-3xl lg:text-5xl font-black mb-4 md:mb-6 text-gray-900 tracking-tighter uppercase leading-none">
                        {t('title')}
                    </h1>
                    <p className="text-gray-400 text-sm md:text-lg lg:text-xl font-medium max-w-2xl leading-relaxed">
                        {t('guarantee')}
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-10 md:gap-y-20">
                    {products.map((product) => (
                        <div key={product.id} className="group flex flex-col">
                            {/* Image Container */}
                            <div className="relative aspect-square w-full mb-4 md:mb-8 overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-[#f8f8f8] border border-gray-50 flex items-center justify-center p-4 md:p-12 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group-hover:bg-white">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    width={500}
                                    height={500}
                                    className="object-contain transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>

                            {/* Info Section */}
                            <div className="text-center px-1 md:px-4 space-y-1 md:space-y-2">
                                <h3 className="text-[12px] md:text-lg lg:text-xl font-bold text-gray-900 tracking-tight leading-tight line-clamp-2 min-h-[2em] md:min-h-0">
                                    {product.title}
                                </h3>
                                <p className="text-[16px] md:text-2xl font-black text-black tracking-tighter">
                                    {product.price}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Copyright />
        </>
    )
}
