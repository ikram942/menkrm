import { ProductPrice } from "@/components/products/product-price";
import { Link } from "@/i18n/routing";
import Image from "next/image";

export function ProductCard({ product }: { product: any }) {
    return (
        <Link key={product.id} href={`/products/${product._id}`} className="group flex flex-col items-center">
            {/* Product Card / Image Container */}
            <div className="relative aspect-square w-full mb-4 md:mb-8 overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] flex items-center justify-center transition-all duration-500 group-hover:bg-[#f3f3f3] group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] group-hover:-translate-y-2">
                <Image
                    src={product.images[0]}
                    alt={product.title}
                    width={400}
                    height={400}
                    className="object-contain transition-transform duration-700 group-hover:scale-110"
                />
                {product.isPack && (
                    <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase shadow-xl animate-in fade-in zoom-in duration-500">
                        Pack
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="text-center px-2 md:px-4 space-y-1 md:space-y-2">
                <h3 className="text-sm md:text-xl font-bold text-gray-900 tracking-tight leading-tight line-clamp-2">
                    {product.title}
                </h3>
                <p className="text-gray-400 text-[10px] md:text-sm font-medium line-clamp-1">
                    {product.description}
                </p>
                <ProductPrice price={product.price} />
            </div>
        </Link>
    )
}
