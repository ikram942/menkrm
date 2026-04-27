"use client";

import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  const slides = [
    {
      title: t('title1'),
      description: t('description1'),
      buttonText: t('button1'),
      image: '/krm.webp',
    },
    {
      title: t('title2'),
      description: t('description2'),
      buttonText: t('button2'),
      image: '/body.webp',
    },
  ];

  return (
    <Carousel
      opts={{ direction: isRTL ? 'rtl' : 'ltr' }}
      plugins={[plugin.current]}
      className="w-full h-150 md:h-200"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <div
              className="relative w-full h-150 md:h-200 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 text-white max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl font-medium mb-8 leading-relaxed">
                  {slide.description}
                </p>
                <div>
                  <Button
                    className="bg-[#1a1c20] hover:bg-black text-white rounded-none px-8 py-6 text-sm tracking-widest transition-all"
                  >
                    {slide.buttonText}
                  </Button>
                </div>
              </div>

              <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 w-12 transition-all ${index === i ? 'bg-white' : 'bg-white/40'}`}
                  />
                ))}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}