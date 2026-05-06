"use client";
import { ProductPrice } from "@/components/products/product-price";
import { Link, useRouter } from "@/i18n/routing";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/panel";
import React from "react";

export function ProductCard({ product }: { product: any }) {
    const { addToCart } = useCart();
    const router = useRouter();

    const handleQuickBuy = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({
            _id: product._id,
            title: product.title,
            price: product.price,
            image: product.images[0]
        });
        router.push('/checkout');
    };

    return (
        <Link key={product.id} href={`/products/${product._id}`} className="group flex flex-col items-center">
            {/* Product Card / Image Container */}
            <div className="relative aspect-square w-full mb-4 md:mb-8 overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] flex items-center justify-center transition-all duration-500 group-hover:bg-[#f3f3f3] group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] group-hover:-translate-y-2 bg-white border border-gray-100">
                <Image
                    src={product.images[0]}
                    alt={product.title}
                    width={400}
                    height={400}
                    className="object-contain transition-transform duration-700 group-hover:scale-110"
                />

                {/* Quick Buy Button */}
                <button
                    onClick={handleQuickBuy}
                    className="absolute bottom-4 right-4 bg-black text-white p-3 md:p-4 rounded-full shadow-2xl transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-mauve-600 active:scale-90 z-10"
                    title="Acheter maintenant"
                >
                    <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                {product.isPack && (
                    <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase shadow-xl animate-in fade-in zoom-in duration-500">
                        Pack
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="w-full text-center px-2 md:px-4 space-y-1 md:space-y-2 mt-2">
                <div className="flex items-start justify-center gap-2 px-4">
                    <h3 className="text-sm md:text-xl font-bold text-gray-900 tracking-tight leading-tight line-clamp-2 flex-1">
                        {product.title}
                    </h3>
                    <button
                        onClick={handleQuickBuy}
                        className="md:hidden shrink-0 bg-black text-white p-2.5 rounded-full shadow-lg active:scale-90 flex items-center justify-center translate-y-[-2px]"
                        title="Acheter"
                    >
                        <ShoppingCart className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-gray-400 text-[10px] md:text-sm font-medium line-clamp-1">
                    {product.description}
                </p>
                <ProductPrice price={product.price} />
            </div>
        </Link>
    )
}
