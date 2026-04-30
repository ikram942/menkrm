import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import Copyright from "@/components/ui/copyrght";

export default function Tutorials() {
    const t = useTranslations("tutorials");

    return (
        <>
            <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
                {/* Hero Image */}
                <Image
                    src="/kr.jpeg"
                    alt="Hair Tutorials"
                    fill
                    className="object-cover"
                    priority
                />

                {/* Overlay: Cinematic gradient for a more premium feel */}
                <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/20 to-black/60" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col items-start justify-center text-left text-white p-8 md:p-24 lg:p-32 animate-in fade-in slide-in-from-left-8 duration-1000 ease-out">
                    <h1 className="text-xl md:text-3xl lg:text-5xl font-extralight mb-6 md:mb-8 tracking-[0.25em] uppercase leading-tight drop-shadow-sm max-w-4xl">
                        {t('title')}
                    </h1>

                    <div className="w-12 md:w-20 h-px bg-white/30 mb-8 md:mb-12" />

                    <p className="text-[10px] md:text-sm font-light mb-12 md:mb-16 max-w-xl drop-shadow-sm opacity-80 uppercase tracking-[0.4em] leading-relaxed">
                        {t('subtitle') || "Style your hair like never before!"}
                    </p>

                    <Link
                        href="/product"
                        className="group relative px-10 md:px-16 py-4 md:py-5 overflow-hidden"
                    >
                        <span className="relative z-10 text-[9px] md:text-xs font-light uppercase tracking-[0.4em] transition-colors duration-500 group-hover:text-black">
                            {t('allProducts') || "ALL PRODUCTS"}
                        </span>
                        <div className="absolute inset-0 border border-white/40 transition-all duration-500 group-hover:border-white" />
                        <div className="absolute inset-0 bg-white translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0" />
                    </Link>
                </div>
            </div>

            <Copyright />
        </>
    )
}
