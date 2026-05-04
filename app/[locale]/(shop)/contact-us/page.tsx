"use client"

import { useTranslations } from "next-intl"
import Copyright from "@/components/ui/copyrght"
import { useState } from "react"
import { submitContactForm } from "@/lib/actions/contact.actions"
import { Loader2 } from "lucide-react"

export default function ContactHero() {
  const t = useTranslations("contactUs")
  const [isPending, setIsPending] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const countries = [
    { name: "Morocco", code: "+212", flag: "🇲🇦" },
    { name: "France", code: "+33", flag: "🇫🇷" },
    { name: "Spain", code: "+34", flag: "🇪🇸" },
    { name: "United States", code: "+1", flag: "🇺🇸" },
    { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
    { name: "United Arab Emirates", code: "+971", flag: "🇦🇪" },
    { name: "Saudi Arabia", code: "+966", flag: "🇸🇦" },
    { name: "Canada", code: "+1", flag: "🇨🇦" },
    { name: "Germany", code: "+49", flag: "🇩🇪" },
    { name: "Italy", code: "+39", flag: "🇮🇹" },
  ];

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const slides = [
    {
      title: t('title'),
      description: t('description'),
      buttonText: t('button'),
      image: "/ks.webp",
    },
  ]

  async function handleSubmit(formData: FormData) {
    setIsPending(true)
    setMessage(null)

    // Add selected country details to formData if not already handled by hidden inputs or form structure
    // But since we use name attributes on the selects/inputs, it should be fine.

    try {
      const result = await submitContactForm(formData)
      if (result.success) {
        setMessage({ type: "success", text: "Message sent successfully! We will get back to you soon." })
        const form = document.getElementById("contact-form") as HTMLFormElement
        form.reset()
        setSelectedCountry(countries[0])
      } else {
        setMessage({ type: "error", text: result.error || "Failed to send message." })
      }
    } catch (error) {
      setMessage({ type: "error", text: "An unexpected error occurred." })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="w-full bg-white text-gray-900 scroll-smooth">
      {/* Hero Section */}
      {slides.map((slide, index) => (
        <div key={index} className="relative w-full h-[70vh] md:h-[80vh] flex flex-col justify-end">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />

          {/* Subtle gradient at the bottom for readability */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

          {/* Content section at the bottom */}
          <div className="relative z-10 flex flex-col items-center text-center px-4 pb-12 max-w-3xl mx-auto text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight uppercase">
              {slide.title}
            </h1>

            <p className="text-base md:text-lg font-medium mb-6 leading-relaxed text-white/90">
              {slide.description}
            </p>

            <a href="#contact"
              className="bg-[#001F3F] hover:bg-[#00152b] text-white rounded-sm px-8 py-4 text-sm font-bold transition-all border-none uppercase tracking-widest"
            >
              {slide.buttonText}
            </a>
          </div>
        </div>
      ))}

      {/* Contact Form Section */}
      <section id="contact" className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-medium mb-10 text-gray-800">Get in touch</h2>

        <form id="contact-form" action={handleSubmit} className="space-y-6">
          {message && (
            <div className={`p-4 rounded-sm text-sm ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
              {message.text}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                className="w-full px-4 py-4 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full px-4 py-4 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex border border-gray-200 rounded-sm overflow-hidden focus-within:border-gray-400 transition-colors">
                <div className="relative">
                  <select
                    name="countryCode"
                    value={selectedCountry.code}
                    onChange={(e) => {
                      const country = countries.find(c => c.code === e.target.value);
                      if (country) setSelectedCountry(country);
                    }}
                    className="h-full pl-4 pr-8 py-4 bg-gray-50 border-r border-gray-200 focus:outline-none appearance-none cursor-pointer text-sm"
                  >
                    {countries.map((c, i) => (
                      <option key={i} value={c.code}>
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  required
                  className="flex-1 px-4 py-4 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <select
                name="country"
                value={selectedCountry.name}
                onChange={(e) => {
                  const country = countries.find(c => c.name === e.target.value);
                  if (country) setSelectedCountry(country);
                }}
                className="w-full px-4 py-4 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 transition-colors bg-white appearance-none cursor-pointer"
              >
                {countries.map((c, i) => (
                  <option key={i} value={c.name}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <textarea
              name="comment"
              placeholder="Comment"
              required
              rows={6}
              className="w-full px-4 py-4 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="bg-[#1a1a1a] text-white px-12 py-4 text-sm font-bold tracking-[0.2em] uppercase hover:bg-black transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
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
