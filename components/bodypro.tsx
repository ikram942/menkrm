
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
        image: "pack.jpg",
    },
    {
        id: 2,
        nameKey: "product2",
        image: "champo.png",
    },
    {
        id: 3,
        nameKey: "product3",
        image: "apres-champo.png",
    },
    {
        id: 4,
        nameKey: "product4",
        image: "huile.png",
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
        <div className="mx-auto max-w-xl px-4 py-10">
            <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tighter text-slate-900 uppercase">
                    {t("heading")}
                </h2>
                <div className="w-16 h-1 bg-black mx-auto mt-2"></div>
            </div>

            <div className="mx-auto max-w-sm">
                <Carousel opts={{ direction: useLocale() === 'ar' ? 'rtl' : 'ltr' }} setApi={setApi} className="w-full">
                    <CarouselContent>

                        {myProducts.map((product) => (
                            <CarouselItem key={product.id}>
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex flex-col items-center justify-center p-6 aspect-square">

                                            <img
                                                src={product.image}
                                                alt={t(product.nameKey)}
                                                className="w-32 h-32 object-contain mb-4"
                                            />

                                            <h3 className="font-bold text-lg">{t(product.nameKey)}</h3>

                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>

                <div className="py-2 text-center text-sm text-muted-foreground">
                    {t("pageIndicator", { current, count })}
                </div>
            </div>
        </div>
    )
}