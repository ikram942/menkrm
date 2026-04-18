"use client"
import Link from "next/link";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { useLocale } from "next-intl";

export function Menu() {
    const locale = useLocale();
    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/product' },
        { name: 'Tutorials', href: '/tutorials' },
        { name: 'Manage Subscription', href: '/manage-subscription' },
        { name: 'Contact Us', href: '/contact-us' },
    ];

    return (<Sheet>
        <SheetTrigger className="menu"><MenuIcon /></SheetTrigger>
        <SheetContent side="left" className="bg-mauve-100">

            <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            {/* Links */}
            <nav className="flex flex-col">
                {
                    navLinks.map((link) => {
                        const href = link.href === '/' ? `/${locale}` : `/${locale}${link.href}`;
                        return (
                            <Link key={link.href} href={href} className="px-4 h-16 border-t-2 border-mauve-200 flex items-center hover:pl-8 duration-500 hover:bg-mauve-200 text-xl">
                                {link.name}
                            </Link>
                        );
                    })
                }
            </nav>
            {/* Country */}
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Contry" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="🇲🇦 Morocco (MAD)">🇲🇦 Morocco (MAD)</SelectItem>
                        <SelectItem value="🇫🇷 France (EUR)">🇫🇷 France (EUR)</SelectItem>
                        <SelectItem value="🇺🇸 USA (USD)">🇺🇸 USA (USD)</SelectItem>
                        <SelectItem value="🇪🇸 Spain (EUR)"> 🇪🇸 Spain (EUR)</SelectItem>
                        <SelectItem value="🇦🇪 UAE (AED)">🇦🇪 UAE (AED)</SelectItem>
                        <SelectItem value="🇨🇦 Canada (CAD)">🇨🇦 Canada (CAD)</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            {/* Login */}
            <div className="login">
                <i className="far fa-user"></i>
                <span>Log in</span>
            </div>

            {/* Socials */}
            <div className="socials">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
                    <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                    <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp">
                    <i className="fab fa-whatsapp"></i>
                </a>
                <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="social-icon tiktok">
                    <i className="fab fa-tiktok"></i>
                </a>
            </div>

            {/* Footer */}
            <div className="bottom-bar">
                <footer>
                    <div className="scroll-container">
                        <p className="scroll-text">
                            © 2026 MenSavil — Tous droits réservés • Produits cosmétiques premium
                        </p>
                    </div>
                </footer>
            </div>
        </SheetContent>
    </Sheet>)
}

