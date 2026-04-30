import Image from "next/image";
import { Link } from "@/i18n/routing";
import Copyright from "@/components/ui/copyrght";
import { getTranslations } from "next-intl/server";
import connectDB from "@/lib/connect";
import Product from "@/lib/models/product";

export default async function ProductPage() {
    const t = await getTranslations("product");
    
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 }).lean();

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
                        <Link 
                            key={product._id.toString()} 
                            href={`/products/${product._id.toString()}`} 
                            className="group flex flex-col"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-square w-full mb-4 md:mb-8 overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-[#f8f8f8] border border-gray-50 flex items-center justify-center p-4 md:p-12 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group-hover:bg-white">
                                {product.images && product.images[0] ? (
                                    <Image
                                        src={product.images[0]}
                                        alt={product.title}
                                        width={500}
                                        height={500}
                                        className="object-contain transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="text-gray-300 italic">No image</div>
                                )}
                                
                                {/* Hover "View Details" overlay for premium feel */}
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="bg-white text-black text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        View Details
                                    </span>
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="text-center px-1 md:px-4 space-y-1 md:space-y-2">
                                <h3 className="text-xs md:text-lg lg:text-xl font-bold text-gray-900 tracking-tight leading-tight line-clamp-2 min-h-[2em] md:min-h-0 uppercase">
                                    {product.title}
                                </h3>
                                <p className="text-gray-400 text-[10px] md:text-sm font-medium line-clamp-1 italic">
                                    {product.category}
                                </p>
                                <p className="text-base md:text-2xl font-black text-black tracking-tighter">
                                    {product.price} <span className="text-[10px] md:text-sm font-bold text-gray-400">Dh</span>
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <Copyright />
        </div>
    )
}
