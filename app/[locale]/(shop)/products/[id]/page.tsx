import * as React from "react"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/routing"
import Copyright from "@/components/ui/copyrght"
import { ChevronLeft } from "lucide-react"
import connectDB from "@/lib/connect"
import Product from "@/lib/models/product"
import ProductDetailClient from "./ProductDetailClient"

export default async function ProductDetail({ params }: { params: Promise<{ id: string, locale: string }> }) {
    const { id, locale } = await params;
    const t = await getTranslations("product")
    
    await connectDB();
    
    // Attempt to fetch from DB
    let product: any = null;
    
    if (id.length === 24) {
        product = await Product.findById(id).lean();
    }

    // Fallback for hardcoded products if they still exist in some links
    if (!product) {
        const hardcodedProducts: Record<string, any> = {
            "1": { title: t('product1Title'), price: 70, description: t('product1Desc'), ingredients: t('product1Ingredients'), usage: t('product1Usage'), images: ["/creme.webp", "/creme1.webp"] },
            "2": { title: t('product2Title'), price: 100, description: t('product2Desc'), ingredients: t('product2Ingredients'), usage: t('product2Usage'), images: ["/champo.webp", "/shompo-emballage.jpg"] },
            "3": { title: t('product3Title'), price: 85, description: t('product3Desc'), ingredients: t('product3Ingredients'), usage: t('product3Usage'), images: ["/gel.webp", "/gel-emballage.jpg"] },
            "4": { title: t('product4Title'), price: 95, description: t('product4Desc'), ingredients: t('product4Ingredients'), usage: t('product4Usage'), images: ["/spryt.webp", "/sprey-emballage.jpg"] },
            "5": { title: t('product5Title'), price: 150, description: t('product5Desc'), ingredients: t('product5Ingredients'), usage: t('product5Usage'), images: ["/apres-champo.webp", "/apres-champo.jpg"] },
            "6": { title: t('product6Title'), price: 120, description: t('product6Desc'), ingredients: t('product6Ingredients'), usage: t('product6Usage'), images: ["/huile.webp", "/huile-emballage.jpg"] },
        }
        product = hardcodedProducts[id];
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <p className="text-xl font-bold">Product not found</p>
                    <Link href="/products" className="text-mauve-600 hover:underline">Return to products</Link>
                </div>
            </div>
        )
    }

    // Serialize MongoDB object
    if (product._id) {
        product = JSON.parse(JSON.stringify(product));
    }

    const priceString = `${product.price} Dh`;

    // Simple t wrapper for client component
    const translations = {
        viewAll: t('viewAll'),
        ingredientsLabel: t('ingredientsLabel'),
        usageLabel: t('usageLabel'),
        addToCart: t('addToCart'),
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Navigation Header */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <Link href="/products" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors group">
                    <ChevronLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
                    {translations.viewAll}
                </Link>
            </div>

            <main className="max-w-7xl mx-auto px-4 py-12 md:py-24">
                <ProductDetailClient 
                    product={product} 
                    t={(key: string) => translations[key as keyof typeof translations]} 
                    price={priceString} 
                />
            </main>

            <Copyright />
        </div>
    )
}
