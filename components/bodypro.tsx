
"use client"

import * as React from "react"
import { useTranslations, useLocale } from "next-intl"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/components/panel"
import { useRouter } from "@/i18n/routing"

export default function CarouselDApiDemo({ products }: { products?: any[] }) {
    const t = useTranslations("bodypro")
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)
    
    const { addToCart } = useCart();
    const router = useRouter();

    const handleQuickBuy = (product: any, e: React.MouseEvent) => {
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

    React.useEffect(() => {
        if (!api) return

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    if (!products || products.length === 0) return null;

    return (
        <div className="mx-auto max-w-4xl px-4 py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 uppercase">
                    {t("heading")}
                </h2>
                <div className="w-24 h-1.5 bg-black mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="mx-auto max-w-lg md:max-w-2xl">
                <Carousel opts={{ direction: useLocale() === 'ar' ? 'rtl' : 'ltr' }} setApi={setApi} className="w-full">
                    <CarouselContent>
                        {products.map((product) => (
                            <CarouselItem key={product._id}>
                                <div className="p-2">
                                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group">
                                        <div className="flex flex-col items-center justify-center p-4 md:p-8 aspect-square relative">
                                            {/* Image du produit agrandie */}
                                            <div className="relative w-full h-full flex items-center justify-center">
                                                <img
                                                    src={product.images[0]}
                                                    alt={product.title}
                                                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>

                                            {/* Quick Buy Button */}
                                            <button
                                                onClick={(e) => handleQuickBuy(product, e)}
                                                className="absolute bottom-20 right-8 bg-black text-white p-4 rounded-full shadow-2xl transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-mauve-600 active:scale-90 z-10"
                                                title="Acheter maintenant"
                                            >
                                                <ShoppingCart className="w-6 h-6" />
                                            </button>

                                            {/* Titre du produit en bas */}
                                            <div className="mt-6 text-center w-full">
                                                <div className="flex items-center justify-center gap-3 px-4">
                                                    <h3 className="font-black text-xl md:text-2xl uppercase tracking-tighter flex-1">
                                                        {product.title}
                                                    </h3>
                                                    <button
                                                        onClick={(e) => handleQuickBuy(product, e)}
                                                        className="md:hidden shrink-0 bg-black text-white p-3 rounded-full shadow-lg active:scale-90 flex items-center justify-center"
                                                        title="Acheter"
                                                    >
                                                        <ShoppingCart className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex -left-12 border-none bg-transparent hover:bg-transparent" />
                    <CarouselNext className="hidden md:flex -right-12 border-none bg-transparent hover:bg-transparent" />
                </Carousel>

                <div className="mt-8 text-center text-xs font-bold uppercase tracking-widest text-gray-400">
                    {t("pageIndicator", { current, count })}
                </div>
            </div>
        </div>
    )
}