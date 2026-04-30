"use client"

import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import Copyright from "@/components/ui/copyrght"

export default function ContactHero() {
  const t = useTranslations("contactUs")

  const slides = [
    {
      title: t('title'),
      description: t('description'),
      buttonText: t('button'),
      image: "/ks.webp",
    },
  ]

  return (
    <div className="w-full bg-white text-gray-900">
      {/* Hero Section */}
      {slides.map((slide, index) => (
        <div key={index} className="relative w-full h-[70vh] md:h-[80vh] flex flex-col justify-end">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />

          {/* Subtle gradient at the bottom for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Content section at the bottom */}
          <div className="relative z-10 flex flex-col items-center text-center px-4 pb-12 max-w-3xl mx-auto text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight uppercase">
              {slide.title}
            </h1>

            <p className="text-base md:text-lg font-medium mb-6 leading-relaxed text-white/90">
              {slide.description}
            </p>

            <Button
              className="bg-[#001F3F] hover:bg-[#00152b] text-white rounded-sm px-8 py-4 text-sm font-bold transition-all border-none uppercase tracking-widest"
            >
              {slide.buttonText}
            </Button>
          </div>
        </div>
      ))}

      {/* Contact Form Section */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-medium mb-10 text-gray-800">Get in touch</h2>

        <form className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-4 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-4 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>
          <div>
            <input
              type="tel"
              placeholder="Phone number"
              className="w-full px-4 py-4 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>
          <div>
            <textarea
              placeholder="Comment"
              rows={6}
              className="w-full px-4 py-4 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="bg-[#1a1a1a] text-white px-12 py-4 text-sm font-bold tracking-[0.2em] uppercase hover:bg-black transition-colors"
          >
            Send Message
          </button>
        </form>

        <p className="mt-8 text-sm text-gray-500 leading-relaxed">
          This site is protected by hCaptcha and the hCaptcha <a href="#" className="underline">Privacy Policy</a> and <a href="#" className="underline">Terms of Service</a> apply.
        </p>

        {/* Contact Info Footer */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-gray-100">
          <div>
            <h3 className="text-xl font-medium mb-4 text-gray-800">Email Us</h3>
            <p className="text-gray-600">savilmen@gmail.com</p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-4 text-gray-800">Call Us</h3>
            <p className="text-gray-600">+212 600000000</p>
          </div>
        </div>
      </section>
      <Copyright />
    </div>
  )
}
