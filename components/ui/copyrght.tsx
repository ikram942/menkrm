"use client";

import { useTranslations } from "next-intl";
import {
    SiVisa, SiMastercard, SiAmericanexpress,
    SiPaypal, SiApplepay, SiGooglepay
} from "react-icons/si";

export default function Copyright() {
    const t = useTranslations("common");

    return (
        <footer className="w-ful p-6 md:px-16 border-t border-gray-50 mt-20 flex flex-col sm:flex-row justify-between items-center gap-4">

            {/* Top Row: Copyright & Country */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                {/* Copyright */}
                <p className="text-gray-400 text-[13px] font-medium tracking-wide order-2 md:order-2">
                    © 2026, Menscrafted. All rights reserved.
                </p>
            </div>

            {/* Bottom Row: Payment Methods - Neatly boxed like premium stores */}
            <div className="flex justify-center md:justify-end">
                <div className="flex items-center gap-2 md:gap-3 flex-wrap justify-center opacity-70 hover:opacity-100 transition-all duration-500">
                    <div className="bg-white border border-gray-100 px-2 py-1 rounded shadow-sm hover:shadow-md transition-shadow">
                        <SiVisa className="text-[#1A1F71] text-xl md:text-2xl" />
                    </div>
                    <div className="bg-white border border-gray-100 px-2 py-1 rounded shadow-sm hover:shadow-md transition-shadow">
                        <SiMastercard className="text-[#EB001B] text-xl md:text-2xl" />
                    </div>
                    <div className="bg-white border border-gray-100 px-2 py-1 rounded shadow-sm hover:shadow-md transition-shadow">
                        <SiAmericanexpress className="text-[#007CC3] text-xl md:text-2xl" />
                    </div>
                    <div className="bg-white border border-gray-100 px-2 py-1 rounded shadow-sm hover:shadow-md transition-shadow">
                        <SiPaypal className="text-[#003087] text-xl md:text-2xl" />
                    </div>
                    <div className="bg-white border border-gray-100 px-2 py-1 rounded shadow-sm hover:shadow-md transition-shadow">
                        <SiApplepay className="text-black text-xl md:text-2xl" />
                    </div>
                    <div className="bg-white border border-gray-100 px-2 py-1 rounded shadow-sm hover:shadow-md transition-shadow">
                        <SiGooglepay className="text-[#4285F4] text-xl md:text-2xl" />
                    </div>
                </div>
            </div>

            {/* </div> */}
        </footer>
    );
}
