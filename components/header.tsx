"use client"
import { SearchIcon, ShoppingCartIcon } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "@/components/menu";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { useCurrency } from "@/components/CurrencyContext";

export function Header() {
    const [searchOpen, setSearchOpen] = useState(false);
    const toggleSearch = () => setSearchOpen((isSeachOpen) => !isSeachOpen);
    const c = useTranslations("common");
    const { currency, setCurrency } = useCurrency();

    return (
        <header className="bg-white border-b border-gray-100">
            {/* MOBILE HEADER */}
            <div className="md:hidden flex justify-between items-center p-2 px-4">
                <Menu />
                <h1 className="text-2xl">Mensavil</h1>

                <div className="flex justify-center items-center gap-4">
                    <LanguageSwitcher />
                    <SearchIcon onClick={toggleSearch} className="w-5 h-5 cursor-pointer" />
                    <Sheet>
                        <SheetTrigger><ShoppingCartIcon className="w-5 h-5" /></SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle className="text-2xl">Cart</SheetTitle>
                            </SheetHeader>
                            <SheetDescription className="text-xl">Your cart is empty</SheetDescription>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            {/* DESKTOP HEADER */}
            <div className="hidden md:block px-8 py-4">
                {/* Top Row: Country | Logo | Icons */}
                <div className="flex justify-between items-center mb-4">
                    {/* Country Selector */}
                    <div className="flex-1">
                        <Select value={currency} onValueChange={(val: any) => setCurrency(val)}>
                            <SelectTrigger className="w-[180px] border-none bg-transparent shadow-none hover:bg-mauve-200">
                                <SelectValue placeholder={c('country')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="MAD">{c('countryMA')}</SelectItem>
                                    <SelectItem value="EUR">{c('countryFR')}</SelectItem>
                                    <SelectItem value="USD">{c('countryUS')}</SelectItem>
                                    <SelectItem value="AED">{c('countryAE')}</SelectItem>
                                    <SelectItem value="CAD">{c('countryCA')}</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Logo (Centered) */}
                    <div className="flex-1 text-center">
                        <h1 className="text-4xl font-serif tracking-tight text-gray-900">Mensavil</h1>
                    </div>

                    {/* Icons (Right) */}
                    <div className="flex-1 flex justify-end items-center gap-6">
                        <LanguageSwitcher />
                        <SearchIcon onClick={toggleSearch} className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
                        <Sheet>
                            <SheetTrigger><ShoppingCartIcon className="w-5 h-5 hover:scale-110 transition-transform" /></SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle className="text-2xl">Cart</SheetTitle>
                                </SheetHeader>
                                <SheetDescription className="text-xl">Your cart is empty</SheetDescription>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>

                {/* Bottom Row: Navigation Links (Centered) */}
                <div className="flex justify-center border-t border-gray-50 pt-4">
                    <Menu />
                </div>
            </div>

            {/* SEARCH OVERLAY */}
            {searchOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20" onClick={toggleSearch}>
                    <div className="bg-white p-6 rounded-lg w-full max-w-2xl mx-4" onClick={(e) => e.stopPropagation()}>
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full text-2xl border-b-2 border-mauve-400 outline-none pb-2"
                            autoFocus
                        />
                    </div>
                </div>
            )}
        </header>
    );
}