import Image from "next/image";
import { Link } from "@/i18n/routing";
import Copyright from "@/components/ui/copyrght";
import { getTranslations } from "next-intl/server";
import { getProducts } from "@/lib/products";
import { ProductCard } from "@/components/products/product-card";

export default async function ProductPage() {
    const t = await getTranslations("product");
    const products = await getProducts()

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-10 md:py-20">
                {/* Header Section */}
                <div className="mb-12 md:mb-20">
                    <h1 className="text-3xl md:text-5xl font-black mb-4 text-gray-900 tracking-tighter uppercase leading-none">
                        {t('title')}
                    </h1>
                    <p className="text-gray-400 text-sm md:text-xl font-medium max-w-2xl leading-relaxed">
                        {t('guarantee')}
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-10 md:gap-y-20">
                    {products.map((product: any) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
            <Copyright />
        </div>
    )
}
