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
                    src="/spray2.jpeg"
                    alt="Hair Tutorials"
                    fill
                    className="object-cover"
                    priority
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                    <h1 className="text-4xl md:text-8xl lg:text-9xl font-black mb-4 md:mb-6 tracking-tighter uppercase leading-none drop-shadow-2xl">
                        {t('title')}
                    </h1>
                    <p className="text-sm md:text-2xl font-bold mb-8 md:mb-12 max-w-2xl drop-shadow-lg opacity-90 uppercase tracking-widest">
                        {t('subtitle') || "Style your hair like never before!"}
                    </p>

                    <Link
                        href="/product"
                        className="px-8 md:px-16 py-3 md:py-5 bg-white text-black font-black text-[10px] md:text-sm uppercase tracking-[0.3em] transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 active:scale-95 shadow-2xl"
                    >
                        {t('allProducts') || "ALL PRODUCTS"}
                    </Link>
                </div>
            </div>

            <Copyright />
        </>
    )
}
