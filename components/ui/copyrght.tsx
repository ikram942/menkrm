"use client";

import { useTranslations } from "next-intl";
import {
    SiVisa, SiMastercard, SiAmericanexpress,
    SiPaypal, SiApplepay, SiGooglepay
} from "react-icons/si";

export default function Copyright() {
    const t = useTranslations("common");

    return (
        <footer className="w-full py-8 border-t border-gray-100 flex flex-col items-center gap-6 bg-white">
            {/* Copyright Text */}
            <p className="text-gray-400 text-[14px] font-medium tracking-wide">
                © 2026, Menscrafted. All rights reserved.
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-3 flex-wrap justify-center opacity-80">
                <div className="bg-white border border-gray-100 px-2 py-1 rounded shadow-sm">
                    <SiVisa className="text-[#1A1F71] text-2xl" />
                </div>
                <div className="bg-white border border-gray-100 px-2 py-1 rounded shadow-sm">
                    <SiMastercard className="text-[#EB001B] text-2xl" />
                </div>
                <div className="bg-white border border-gray-100 px-2 py-1 rounded shadow-sm">
                    <SiAmericanexpress className="text-[#007CC3] text-2xl" />
                </div>
                <div className="bg-white border border-gray-100 px-2 py-1 rounded shadow-sm">
                    <SiPaypal className="text-[#003087] text-2xl" />
                </div>
                <div className="bg-white border border-gray-100 px-2 py-1 rounded shadow-sm">
                    <SiApplepay className="text-black text-2xl" />
                </div>
                <div className="bg-white border border-gray-100 px-2 py-1 rounded shadow-sm">
                    <SiGooglepay className="text-[#4285F4] text-2xl" />
                </div>
            </div>
        </footer>
    );
}
