"use client"
import { ShoppingCartIcon, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { useSession, signOut } from "next-auth/react";
import { useCurrency } from "@/components/CurrencyContext";
import { ConnectedUser } from "@/components/connected-user";
import { Search } from "@/components/search";

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

export function HeaderIcons() {
    const { data: session } = useSession();

    return (
        <>
            <ConnectedUser />

            {session && (
                <button onClick={() => signOut()} className="text-gray-500 hover:text-black transition-colors" title="Sign Out">
                    <LogOut className="w-5 h-5" />
                </button>
            )}

            <LanguageSwitcher />

            <Search />

            <Sheet>
                <SheetTrigger><ShoppingCartIcon className="w-5 h-5 sm:hover:scale-110 sm:transition-transform sm:cursor-pointer" /></SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle className="text-2xl">Cart</SheetTitle>
                    </SheetHeader>
                    <SheetDescription className="text-xl">Your cart is empty</SheetDescription>
                </SheetContent>
            </Sheet>
        </>
    )
}
