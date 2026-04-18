
"use client"

import * as React from "react"
import { useTranslations, useLocale } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"

const myProducts = [
    {
        id: 1,
        nameKey: "product1",
        image: "pack.webp",
    },
    {
        id: 2,
        nameKey: "product2",
        image: "champo.webp",
    },
    {
        id: 3,
        nameKey: "product3",
        image: "apres-champo.webp",
    },
    {
        id: 4,
        nameKey: "product4",
        image: "huile.webp",
    },

]

export default function CarouselDApiDemo() {
    const t = useTranslations("bodypro")
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!api) return

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

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
                        {myProducts.map((product) => (
                            <CarouselItem key={product.id}>
                                <div className="p-2">
                                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group">
                                        <div className="flex flex-col items-center justify-center p-4 md:p-8 aspect-square relative">
                                            {/* Image du produit agrandie */}
                                            <div className="relative w-full h-full flex items-center justify-center">
                                                <img
                                                    src={product.image}
                                                    alt={t(product.nameKey)}
                                                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                            
                                            {/* Titre du produit en bas */}
                                            <div className="mt-6 text-center">
                                                <h3 className="font-black text-xl md:text-2xl uppercase tracking-tighter">{t(product.nameKey)}</h3>
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