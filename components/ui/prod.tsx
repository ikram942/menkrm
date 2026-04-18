"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";

export default function Prod() {
    const t = useTranslations("product");

    const products = [
        {
            id: 1,
            title: t('product1Title'),
            price: t('product1Price'),
            description: t('product1Desc'),
            image: "/creme.webp"
        },
        {
            id: 2,
            title: t('product2Title'),
            price: t('product2Price'),
            description: t('product2Desc'),
            image: "/champo.webp"
        },
        {
            id: 3,
            title: t('product3Title'),
            price: t('product3Price'),
            description: t('product3Desc'),
            image: "/gel.webp"
        },
        {
            id: 4,
            title: t('product4Title'),
            price: t('product4Price'),
            description: t('product4Desc'),
            image: "/spryt.webp"
        },
        {
            id: 5,
            title: t('product5Title'),
            price: t('product5Price'),
            description: t('product5Desc'),
            image: "/apres-champo.webp"
        },
        {
            id: 6,
            title: t('product6Title'),
            price: t('product6Price'),
            description: t('product6Desc'),
            image: "/huile.webp"
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-widest uppercase">
                        {t('nosProduits')}
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-10 md:gap-y-20">
                    {products.map((product) => (
                        <Link key={product.id} href="/product" className="group flex flex-col items-center">
                            {/* Product Card / Image Container */}
                            <div className="relative aspect-square w-full mb-4 md:mb-8 overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-[#f8f8f8] flex items-center justify-center p-4 md:p-12 transition-all duration-500 group-hover:bg-[#f3f3f3] group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] group-hover:-translate-y-2">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    width={400}
                                    height={400}
                                    className="object-contain transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                            
                            {/* Product Info */}
                            <div className="text-center px-2 md:px-4 space-y-1 md:space-y-2">
                                <h3 className="text-sm md:text-xl font-bold text-gray-900 tracking-tight leading-tight line-clamp-2">
                                    {product.title}
                                </h3>
                                <p className="text-gray-400 text-[10px] md:text-sm font-medium line-clamp-1">
                                    {product.description}
                                </p>
                                <p className="text-base md:text-2xl font-black text-black tracking-tighter pt-1 md:pt-2">
                                    {product.price}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
                
                {/* View All Button */}
                <div className="mt-24 text-center">
                    <Link 
                        href="/product"
                        className="inline-block px-12 py-4 bg-black text-white rounded-full font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#222] hover:shadow-2xl hover:-translate-y-1 active:scale-95"
                    >
                        {t('viewAll')}
                    </Link>
                </div>
            </div>
        </section>
    );
}
