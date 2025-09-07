'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category } from "@/types/database";
import { getCategoryLabel } from "@/lib/utils";

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
                            className="text-2xl font-bold text-indigo-600"
                        >
                            同志社メディア
                        </Link>
                    </div>

                    <nav className="hidden md:flex space-x-8">
                        <Link
                            href="/"
                            className="text-gray-700 hover:text-indigo-600"
                        >
                            ホーム
                        </Link>
                        <Link
                            href="/about"
                            className="text-gray-700 hover:text-indigo-600"
                        >
                            概要
                        </Link>
                    </nav>
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
                                            ? "text-indigo-600 border-indigo-600"
                                            : "text-gray-500 border-transparent hover:text-indigo-600 hover:border-indigo-600"
                                    }`}
                                >
                                    {category.label}
                                </Link>
                            );
                        })}
                    </div>
                </nav>
            </div>
        </header>
    );
}
