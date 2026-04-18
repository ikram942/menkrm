"use client"
import Link from "next/link";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTiktok, FaUser } from "react-icons/fa";

export function Menu() {
    const locale = useLocale();
    const t = useTranslations("navigation");
    const c = useTranslations("common");
    const navLinks = [
        { name: t('home'), href: '/' },
        { name: t('product'), href: '/product' },
        { name: t('tutorials'), href: '/tutorials' },
        { name: t('manageSubscription'), href: '/manage-subscription' },
        { name: t('contactUs'), href: '/contact-us' },
    ];

    return (<Sheet>
        <SheetTrigger className="menu"><MenuIcon /></SheetTrigger>
        <SheetContent side={locale === 'ar' ? 'right' : 'left'} className="bg-mauve-100">

            <SheetHeader>
                <SheetTitle>{c('menu')}</SheetTitle>
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
                    <SelectValue placeholder={c('country')} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="🇲🇦 Morocco (MAD)">{c('countryMA')}</SelectItem>
                        <SelectItem value="🇫🇷 France (EUR)">{c('countryFR')}</SelectItem>
                        <SelectItem value="🇺🇸 USA (USD)">{c('countryUS')}</SelectItem>
                        <SelectItem value="🇪🇸 Spain (EUR)">{c('countryES')}</SelectItem>
                        <SelectItem value="🇦🇪 UAE (AED)">{c('countryAE')}</SelectItem>
                        <SelectItem value="🇨🇦 Canada (CAD)">{c('countryCA')}</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            {/* Login */}
            <button className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer w-full">
                <FaUser className="w-4 h-4 text-gray-600" />
                <span className="text-base">{c('login')}</span>
            </button>

            {/* Socials */}
            <div className="flex gap-8 justify-center items-center py-3">
                <a href="https://www.facebook.com/share/1CTE4tAxzr/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
                    <FaFacebookF className="w-6 h-6 text-[#1877f2] transition-all duration-300 ease-in-out hover:text-[#f1c40f] hover:scale-125 hover:-rotate-6" style={{ filter: 'none' }} onMouseEnter={e => (e.currentTarget.style.filter = 'drop-shadow(0 0 8px #f1c40f)')} onMouseLeave={e => (e.currentTarget.style.filter = 'none')} />
                </a>
                <a href="https://www.instagram.com/savilmen?igsh=MWd6aDZpbG5mamI0bw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="w-6 h-6 text-[#e1306c] transition-all duration-300 ease-in-out hover:text-[#f1c40f] hover:scale-125 hover:-rotate-6" style={{ filter: 'none' }} onMouseEnter={e => (e.currentTarget.style.filter = 'drop-shadow(0 0 8px #f1c40f)')} onMouseLeave={e => (e.currentTarget.style.filter = 'none')} />
                </a>
                <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp className="w-6 h-6 text-[#25D366] transition-all duration-300 ease-in-out hover:text-[#f1c40f] hover:scale-125 hover:-rotate-6" style={{ filter: 'none' }} onMouseEnter={e => (e.currentTarget.style.filter = 'drop-shadow(0 0 8px #f1c40f)')} onMouseLeave={e => (e.currentTarget.style.filter = 'none')} />
                </a>
                <a href="https://www.tiktok.com/@mensavil7" target="_blank" rel="noopener noreferrer">
                    <FaTiktok className="w-6 h-6 text-[#141515] transition-all duration-300 ease-in-out hover:text-[#f1c40f] hover:scale-125 hover:-rotate-6" style={{ filter: 'none' }} onMouseEnter={e => (e.currentTarget.style.filter = 'drop-shadow(0 0 8px #f1c40f)')} onMouseLeave={e => (e.currentTarget.style.filter = 'none')} />
                </a>
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 h-12 py-3 overflow-hidden">
                <div className="marquee-wrapper whitespace-nowrap" dir="ltr">
                    <span className="marquee-text">
                        {c('footer')} &nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;
                    </span>
                    <span className="marquee-text" aria-hidden="true">
                        {c('footer')} &nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;
                    </span>
                </div>
            </div>
        </SheetContent>
    </Sheet>)
}

