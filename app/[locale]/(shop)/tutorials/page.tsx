"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import Copyright from "@/components/ui/copyrght";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

export default function Tutorials() {
    const t = useTranslations("tutorials");

    const plugin = useRef(
        Autoplay({ delay: 2000, stopOnInteraction: false })
    );

    const images = ["/tutorials1.webp", "/tutorials2.webp"];

    const videos = [
        { id: 1, src: "/mensavil.mp4" },
    ];

    return (
        <>
            {/* Hero Section with Carousel */}
            <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full h-full"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                    opts={{
                        loop: true,
                    }}
                >
                    <CarouselContent className="h-[60vh] md:h-[80vh]">
                        {images.map((src, index) => (
                            <CarouselItem key={index} className="relative w-full h-full">
                                <Image
                                    src={src}
                                    alt={t('altCarousel', { index: index + 1 })}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                {/* Overlay: Cinematic gradient for a more premium feel */}
                <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/20 to-black/60 pointer-events-none" />

                {/* Content Overlay - Static */}
                <div className="absolute inset-0 flex flex-col items-start justify-center text-left text-white p-8 md:p-24 lg:p-32 animate-in fade-in slide-in-from-left-8 duration-1000 ease-out pointer-events-none">
                    <div className="pointer-events-auto">
                        <h1 className="text-xl md:text-3xl lg:text-5xl font-extralight mb-6 md:mb-8 tracking-[0.25em] uppercase leading-tight drop-shadow-sm max-w-4xl">
                            {t('title')}
                        </h1>

                        <div className="w-12 md:w-20 h-px bg-white/30 mb-8 md:mb-12" />

                        <p className="text-[10px] md:text-sm font-light mb-12 md:mb-16 max-w-xl drop-shadow-sm opacity-80 uppercase tracking-[0.4em] leading-relaxed">
                            {t('subtitle')}
                        </p>

                        <Link
                            href="/products"
                            className="group relative px-10 md:px-16 py-4 md:py-5 overflow-hidden inline-block"
                        >
                            <span className="relative z-10 text-[9px] md:text-xs font-light uppercase tracking-[0.4em] transition-colors duration-500 group-hover:text-black">
                                {t('allProducts')}
                            </span>
                            <div className="absolute inset-0 border border-white/40 transition-all duration-500 group-hover:border-white" />
                            <div className="absolute inset-0 bg-white translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Publications Section */}
            <section className="bg-gray-50 py-24 md:py-32 border-b border-black/5">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.2em] uppercase text-black/90 mb-6">
                            {t('publicationsTitle')}
                        </h2>
                        <div className="w-20 h-px bg-black/20 mx-auto mb-6" />
                        <p className="text-sm font-light text-black/40 uppercase tracking-[0.3em]">
                            {t('publicationsDescription')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {videos.map((video) => (
                            <div key={video.id} className="aspect-[9/16] rounded-xl overflow-hidden shadow-lg border border-black/10 bg-black hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                                <video
                                    src={video.src}
                                    controls
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* User Comments Section */}
            <section className="bg-white py-24 md:py-32">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.2em] uppercase text-black/90 mb-6">
                            {t('reviewsTitle')}
                        </h2>
                        <div className="w-20 h-px bg-black/20 mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
                        {/* Comment 1 */}
                        <div className="group relative aspect-4/5 overflow-hidden bg-gray-50 border border-black/5 shadow-sm hover:shadow-xl transition-all duration-700">
                            <Image
                                src="/comment1.webp"
                                alt={t('altReview1')}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700" />
                        </div>

                        {/* Comment 2 */}
                        <div className="group relative aspect-4/5 overflow-hidden bg-gray-50 border border-black/5 shadow-sm hover:shadow-xl transition-all duration-700">
                            <Image
                                src="/comment2.webp"
                                alt={t('altReview2')}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700" />
                        </div>
                    </div>

                    <div className="mt-20 text-center">
                        <p className="text-sm font-light text-black/40 uppercase tracking-[0.3em]">
                            {t('reviewsDescription')}
                        </p>
                    </div>
                </div>
            </section>

            <Copyright />
        </>
    )
}
