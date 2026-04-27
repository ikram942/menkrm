"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Link } from "@/i18n/routing"
import Copyright from "@/components/ui/copyrght"
import { useCurrency } from "@/components/CurrencyContext"
import { ChevronLeft, Droplets, Sparkles, Wand2 } from "lucide-react"

export default function ProductDetail() {
    const t = useTranslations("product")
    const { id } = useParams()
    const { currency } = useCurrency()

    // Map ID to product data (consistent with Prod.tsx)
    const productData: Record<string, { images: string[] }> = {
        "1": { images: ["/creme.webp", "/creme1.webp"] },
        "2": { images: ["/champo.webp", "/shompo-emballage.jpg"] },
        "3": { images: ["/gel.webp", "/gel-emballage.jpg"] },
        "4": { images: ["/spryt.webp", "/sprey-emballage.jpg"] },
        "5": { images: ["/apres-champo.webp", "/apres-champo.jpg"] },
        "6": { images: ["/huile.webp", "/huile-emballage.jpg"] },
    }

    const product = productData[id as string]
    const [activeImage, setActiveImage] = React.useState(product?.images[0] || "")

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Product not found</p>
            </div>
        )
    }

    const title = t(`product${id}Title`)
    const price = t(`product${id}Price_${currency}`)
    const description = t(`product${id}Desc`)
    const ingredients = t(`product${id}Ingredients`)
    const usage = t(`product${id}Usage`)

    return (
        <div className="bg-white min-h-screen">
            {/* Navigation Header */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <Link href="/product" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors group">
                    <ChevronLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
                    {t('viewAll')}
                </Link>
            </div>

            <main className="max-w-7xl mx-auto px-4 py-12 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* Left: Product Image & Gallery */}
                    <div className="flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                        <div className="relative aspect-square w-full bg-[#f8f8f8] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden p-8 md:p-20 flex items-center justify-center">
                            <Image
                                src={activeImage}
                                alt={title}
                                fill
                                className="object-contain p-12 md:p-24 transition-all duration-500"
                                priority
                            />
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-4 px-2 overflow-x-auto pb-2 scrollbar-hide">
                            {product.images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveImage(img)}
                                    className={`relative w-20 md:w-24 aspect-square rounded-2xl md:rounded-3xl overflow-hidden bg-[#f8f8f8] border-2 transition-all ${activeImage === img ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                    <Image
                                        src={img}
                                        alt={`${title} view ${index + 1}`}
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
                                {title}
                            </h1>
                            <p className="text-2xl md:text-4xl font-black text-black tracking-tighter">
                                {price}
                            </p>
                            <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed max-w-xl">
                                {description}
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
                                    {ingredients}
                                </p>
                            </div>

                            {/* Usage */}
                            <div className="space-y-4 border-l-2 border-black/5 pl-8">
                                <div className="flex items-center space-x-3 text-black">
                                    <Wand2 className="w-5 h-5" />
                                    <h3 className="text-sm font-bold uppercase tracking-[0.2em]">{t('usageLabel') || "Conseils d'utilisation"}</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    {usage}
                                </p>
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="pt-8">
                            <button className="w-full md:w-auto px-16 py-5 bg-black text-white font-bold text-xs uppercase tracking-[0.3em] transition-all duration-300 hover:bg-[#222] hover:shadow-2xl hover:-translate-y-1 active:scale-95">
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
            </main>

            <Copyright />
        </div>
    )
}
