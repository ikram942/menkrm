"use client"
import { SearchIcon, ShoppingCartIcon, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { useSession, signOut } from "next-auth/react";
import { useCurrency } from "@/components/CurrencyContext";
import { ConnectedUser } from "@/components/connected-user";

export function HeaderCurrencySelect() {
    const c = useTranslations("common");
    const { currency, setCurrency } = useCurrency();
    
    return (
        <Select value={currency} onValueChange={(val: any) => setCurrency(val)}>
            <SelectTrigger className="w-[180px] border-none bg-transparent shadow-none hover:bg-gray-50 focus:ring-0">
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
    )
}

export function HeaderIcons({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
    const { data: session } = useSession();
    const [searchOpen, setSearchOpen] = useState(false);
    const toggleSearch = () => setSearchOpen((isSeachOpen) => !isSeachOpen);

    return (
        <>
            {variant === "desktop" && <ConnectedUser />}
            
            {variant === "mobile" && session && (
                <button onClick={() => signOut()} className="text-gray-500 hover:text-black transition-colors" title="Sign Out">
                    <LogOut className="w-5 h-5" />
                </button>
            )}

            <LanguageSwitcher />
            
            <SearchIcon onClick={toggleSearch} className={`w-5 h-5 cursor-pointer ${variant === "desktop" ? "hover:scale-110 transition-transform" : ""}`} />
            
            <Sheet>
                <SheetTrigger><ShoppingCartIcon className={`w-5 h-5 ${variant === "desktop" ? "hover:scale-110 transition-transform cursor-pointer" : ""}`} /></SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle className="text-2xl">Cart</SheetTitle>
                    </SheetHeader>
                    <SheetDescription className="text-xl">Your cart is empty</SheetDescription>
                </SheetContent>
            </Sheet>

            {/* SEARCH OVERLAY */}
            {searchOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20" onClick={toggleSearch}>
                    <div className="bg-white p-6 rounded-lg w-full max-w-2xl mx-4" onClick={(e) => e.stopPropagation()}>
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full text-2xl border-b-2 border-gray-400 outline-none pb-2 focus:border-black transition-colors"
                            autoFocus
                        />
                    </div>
                </div>
            )}
        </>
    )
}
