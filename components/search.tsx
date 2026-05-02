"use client"
import { useRouter } from "@/i18n/routing";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function Search() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const toggleSearch = () => setOpen((isSeachOpen) => !isSeachOpen);
    const router = useRouter();

    useEffect(() => {
        const submitSearch = () => {
            const searchParams = new URLSearchParams({ search })
            const url = new URL("/en/products", window.location.href)
            url.search = searchParams.toString()
            router.push(url.toString())
            setOpen(false);
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter") return submitSearch();
            if (e.key === "Escape") return setOpen(false);
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [search]);

    return (
        <>
            <SearchIcon onClick={toggleSearch} className="w-5 h-5 cursor-pointer sm:hover:scale-110 sm:transition-transform" />
            {open && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20" onClick={toggleSearch}>
                    <div className="bg-white p-6 rounded-lg w-full max-w-2xl mx-4" onClick={(e) => e.stopPropagation()}>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
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