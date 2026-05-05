"use client"
import { useCurrency } from "@/components/CurrencyContext";

export function ProductPrice({ price }: { price: number }) {
    const { formatPrice } = useCurrency();
    return <p className="text-base md:text-2xl font-black text-black tracking-tighter pt-1 md:pt-2">
        {formatPrice(price)}
    </p>
}