"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

export default function ContactHero() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  )

  const slides = [
    {
      title: "Contact Us",
      description: "We're here to help! Whether you have a question, feedback, or just want to say hello, we'd love to hear from you.",
      buttonText: "Send Message",
      image: "ks.jpeg", 
    },
  ]

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full h-screen min-h-150 md:h-200" 
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <div 
              className="relative w-full h-screen min-h-150 bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay: Bach tkhli l'image tban chwiya darker o lktba tban khir */}
              <div className="absolute inset-0 bg-black/30" />

              {/* Content Box */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4 max-w-2xl">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                  {slide.title}
                </h1>
                
                <p className="text-lg md:text-xl font-medium mb-8 leading-relaxed">
                  {slide.description}
                </p>

                <Button 
                  className="bg-[#2d3e50] hover:bg-[#1a2530] text-white rounded-sm px-10 py-7 text-lg font-semibold transition-all border-none"
                >
                  {slide.buttonText}
                </Button>
              </div>

              {/* Progress Indicators (Optional) */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.length > 1 && slides.map((_, i) => (
                  <div 
                    key={i}
                    className={`h-1.5 w-12 transition-all rounded-full ${index === i ? "bg-white" : "bg-white/30"}`}
                  />
                ))}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
