import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Copyright from "@/components/ui/copyrght";
import { ChevronLeft } from "lucide-react";
import connectDB from "@/lib/connect";
import Product from "@/lib/models/product";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import mongoose from "mongoose";

interface Props {
    params: Promise<{ id: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    await connectDB();

    let product = null;
    product = await Product.findById(id).lean();

    if (!product) return { title: "Product Not Found" };

    return {
        title: `${product.title} | Mensavil`,
        description: product.description,
        openGraph: {
            title: product.title,
            description: product.description,
            images: product.images && product.images[0] ? [{ url: product.images[0] }] : [],
        }
    };
}

export default async function ProductDetail({ params }: Props) {
    const { id } = await params;
    const t = await getTranslations("product");

    if (!mongoose.Types.ObjectId.isValid(id)) notFound();

    await connectDB();
    const product = await Product.findById(id).lean();

    if (!product) notFound();

    const serializedProduct = JSON.parse(JSON.stringify(product));
    const priceString = `${product.price} Dh`;

    const translations = {
        viewAll: t('viewAll'),
        ingredientsLabel: t('ingredientsLabel'),
        usageLabel: t('usageLabel'),
        addToCart: t('addToCart'),
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Navigation Header */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <Link
                    href="/products"
                    className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors group"
                >
                    <ChevronLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                    {translations.viewAll}
                </Link>
            </div>

            <main className="max-w-7xl mx-auto px-4 pb-24">
                <ProductDetailClient
                    product={serializedProduct}
                    price={priceString}
                />
            </main>

            <Copyright />
        </div>
    );
}
