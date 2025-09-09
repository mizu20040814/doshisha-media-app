"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        
        if (!searchQuery.trim()) return;
        
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    };

    return (
        <form onSubmit={handleSearch} className="flex">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="記事を検索..."
                className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-doshisha-purple-400 w-64 text-sm text-gray-900 placeholder-gray-500"
            />
            <button
                type="submit"
                className="px-4 py-2 bg-doshisha-purple-600 text-white rounded-r-md hover:bg-doshisha-purple-700 transition-colors flex items-center"
            >
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </button>
        </form>
    );
}
