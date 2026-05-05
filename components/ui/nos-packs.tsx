import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { getProducts } from "@/lib/products";
import { ProductCard } from "../products/product-card";

export default async function NosPacks() {
    const t = await getTranslations("product")
    const products = await getProducts({ isPack: true })

    if (products.length === 0) return null;

    return (
        <section className="py-24 bg-white border-t border-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-widest uppercase">
                        {t('nosPacks')}
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-10 md:gap-y-20">
                    {products.map((product: any) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>

                {/* View All Button */}
                <div className="mt-24 text-center">
                    <Link
                        href="/products"
                        className="inline-block px-12 py-4 bg-black text-white rounded-full font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#222] hover:shadow-2xl hover:-translate-y-1 active:scale-95"
                    >
                        {t('viewAll')}
                    </Link>
                </div>
            </div>
        </section>
    );
}
