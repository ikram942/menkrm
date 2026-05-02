import { Menu } from "@/components/menu";
import { HeaderIcons, HeaderCurrencySelect } from "./HeaderActions";

export function Header() {
    return (
        <header className="bg-white border-b border-gray-100">
            {/* MOBILE HEADER */}
            <div className="md:hidden flex justify-between items-center p-2 px-4">
                <Menu />
                <h1 className="text-2xl font-serif">Mensavil</h1>

                <div className="flex justify-center items-center gap-4">
                    <HeaderIcons />
                </div>
            </div>

            {/* DESKTOP HEADER */}
            <div className="hidden md:block px-8 py-4">
                {/* Top Row: Country | Logo | Icons */}
                <div className="flex justify-between items-center mb-4">
                    {/* Country Selector */}
                    <div className="flex-1">
                        <HeaderCurrencySelect />
                    </div>

                    {/* Logo (Centered) */}
                    <div className="flex-1 text-center">
                        <h1 className="text-4xl font-serif tracking-tight text-gray-900">Mensavil</h1>
                    </div>

                    {/* Icons (Right) */}
                    <div className="flex-1 flex justify-end items-center gap-6">
                        <HeaderIcons />
                    </div>
                </div>

                {/* Bottom Row: Navigation Links (Centered) */}
                <div className="flex justify-center border-t border-gray-50 pt-4">
                    <Menu />
                </div>
            </div>
        </header>
    );
}
