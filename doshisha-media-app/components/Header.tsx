'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category } from "@/types/database";
import { getCategoryLabel } from "@/lib/utils";
import SearchBar from "./SearchBar";

export default function Header() {
    const pathname = usePathname();
    
    const categories: Array<{ value: "all" | Category; label: string }> = [
        { value: "all", label: "全て" },
        { value: "news", label: getCategoryLabel("news") },
        { value: "column", label: getCategoryLabel("column") },
        { value: "interview", label: getCategoryLabel("interview") },
        { value: "survey", label: getCategoryLabel("survey") },
    ];

    const isActiveCategory = (categoryValue: "all" | Category): boolean => {
        if (categoryValue === "all") {
            return pathname === "/";
        }
        return pathname === `/category/${categoryValue}`;
    };

    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* メインヘッダー */}
                <div className="flex justify-between items-center py-6">
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="text-2xl font-bold text-doshisha-purple-600"
                        >
                            同志社メディア
                        </Link>
                    </div>

                    {/* 検索バー */}
                    <div className="hidden md:block">
                        <SearchBar />
                    </div>
                </div>

                {/* カテゴリナビゲーション */}
                <nav className="border-t border-gray-200">
                    <div className="flex space-x-6 sm:space-x-8 overflow-x-auto py-4 scrollbar-hide">
                        {categories.map((category) => {
                            const isActive = isActiveCategory(category.value);
                            return (
                                <Link
                                    key={category.value}
                                    href={
                                        category.value === "all"
                                            ? "/"
                                            : `/category/${category.value}`
                                    }
                                    className={`whitespace-nowrap text-sm font-medium pb-2 border-b-2 transition-colors ${
                                        isActive
                                            ? "text-doshisha-purple-600 border-doshisha-purple-600"
                                            : "text-gray-500 border-transparent hover:text-doshisha-purple-400 hover:border-doshisha-purple-400"
                                    }`}
                                >
                                    {category.label}
                                </Link>
                            );
                        })}
                        <Link
                            href="/aboutus"
                            className={`whitespace-nowrap text-sm font-medium pb-2 border-b-2 transition-colors ${
                                pathname === "/aboutus"
                                    ? "text-doshisha-purple-600 border-doshisha-purple-600"
                                    : "text-gray-500 border-transparent hover:text-doshisha-purple-400 hover:border-doshisha-purple-400"
                            }`}
                        >
                            About Us
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}
