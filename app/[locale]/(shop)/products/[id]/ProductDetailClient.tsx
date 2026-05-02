"use client"

import * as React from "react"
import Image from "next/image"
import { Droplets, Sparkles, Wand2 } from "lucide-react"
import { useCart } from "@/components/panel";
import { useTranslations } from "next-intl";

interface ProductDetailClientProps {
    product: any;
    price: string;
}

export default function ProductDetailClient({ product, price }: ProductDetailClientProps) {
    const [activeImage, setActiveImage] = React.useState(product.images?.[0] || "")
    const t = useTranslations("product");
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({
            _id: product._id,
            title: product.title,
            price: product.price,
            image: product.images[0]
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left: Product Image & Gallery */}
            <div className="flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                <div className="relative aspect-square w-full bg-[#f8f8f8] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden p-8 md:p-20 flex items-center justify-center">
                    <Image
                        src={activeImage}
                        alt={product.title}
                        fill
                        className="object-contain p-12 md:p-24 transition-all duration-500"
                        priority
                    />
                </div>

                {/* Thumbnails */}
                <div className="flex gap-4 px-2 overflow-x-auto pb-2 scrollbar-hide">
                    {product.images?.map((img: string, index: number) => (
                        <button
                            key={index}
                            onClick={() => setActiveImage(img)}
                            className={`relative w-20 md:w-24 aspect-square rounded-2xl md:rounded-3xl overflow-hidden bg-[#f8f8f8] border-2 transition-all ${activeImage === img ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        >
                            <Image
                                src={img}
                                alt={`${product.title} view ${index + 1}`}
                                fill
                                className="object-contain p-3"
                            />
                        </button>
                    ))}
                </div>
            </div>

            {/* Right: Product Info */}
            <div className="flex flex-col space-y-10 md:space-y-16 animate-in fade-in slide-in-from-right-12 duration-1000 delay-200">
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase leading-none">
                        {product.title}
                    </h1>
                    <p className="text-2xl md:text-4xl font-black text-black tracking-tighter">
                        {price}
                    </p>
                    <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed max-w-xl">
                        {product.description}
                    </p>
                </div>

                {/* Details Sections */}
                <div className="space-y-12">
                    {/* Ingredients */}
                    <div className="space-y-4 border-l-2 border-black/5 pl-8">
                        <div className="flex items-center space-x-3 text-black">
                            <Droplets className="w-5 h-5" />
                            <h3 className="text-sm font-bold uppercase tracking-[0.2em]">{t('ingredientsLabel') || "Composition"}</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed italic">
                            {product.ingredients}
                        </p>
                    </div>

                    {/* Usage */}
                    <div className="space-y-4 border-l-2 border-black/5 pl-8">
                        <div className="flex items-center space-x-3 text-black">
                            <Wand2 className="w-5 h-5" />
                            <h3 className="text-sm font-bold uppercase tracking-[0.2em]">{t('usageLabel') || "Conseils d'utilisation"}</h3>
                        </div>
                        <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                            {product.usage}
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="pt-8">
                    <button
                        onClick={handleAddToCart}
                        className="w-full md:w-auto px-16 py-5 bg-black text-white font-bold text-xs uppercase tracking-[0.3em] transition-all duration-300 hover:bg-[#222] hover:shadow-2xl hover:-translate-y-1 active:scale-95"
                    >
                        {t('addToCart') || "Commander Maintenant"}
                    </button>
                </div>

                {/* Benefits Icons */}
                <div className="flex items-center space-x-12 pt-8 opacity-40">
                    <div className="flex flex-col items-center space-y-2">
                        <Sparkles className="w-6 h-6" />
                        <span className="text-[10px] uppercase font-bold tracking-widest text-center">Premium Quality</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <Droplets className="w-6 h-6" />
                        <span className="text-[10px] uppercase font-bold tracking-widest text-center">Natural Ingredients</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
