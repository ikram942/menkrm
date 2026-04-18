"use client"
import { SearchIcon, ShoppingCartIcon } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "@/components/menu";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useState } from "react";

export function Header() {
    const [searchOpen, setSearchOpen] = useState(false);
    const toggleSearch = () => setSearchOpen((isSeachOpen) => !isSeachOpen)

    return (
        <header className="flex justify-between items-center bg-mauve-100 p-2 px-4">
            <Menu />
            <h1 className="text-2xl md:text-4xl">Mensavil</h1>

            {/* ICONS */}
            <div className="flex justify-center items-center gap-4">
                <LanguageSwitcher />
                <SearchIcon onClick={toggleSearch} />

                <Sheet>
                    <SheetTrigger><ShoppingCartIcon /></SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle className="text-2xl">Cart</SheetTitle>
                        </SheetHeader>
                        <SheetDescription className="text-xl">Your cart is empty</SheetDescription>
                    </SheetContent>
                </Sheet>
            </div>

            {/* SEARCH OVERLAY */}
            {searchOpen && (
                <div className="search-overlay">
                    <div className="search-content">
                        <input type="text" placeholder="Search products..." />
                    </div>
                </div>
            )}
        </header>
    )
}