import Link from "next/link";

export default function Header() {
    const categories = [
        { value: "all", label: "全て" },
        { value: "news", label: "ニュース" },
        { value: "column", label: "コラム" },
        { value: "interview", label: "インタビュー" },
        { value: "survey", label: "アンケート企画" },
    ];

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
                    <div className="flex space-x-8 overflow-x-auto py-4">
                        {categories.map((category) => (
                            <Link
                                key={category.value}
                                href={
                                    category.value === "all"
                                        ? "/"
                                        : `/category/${category.value}`
                                }
                                className="whitespace-nowrap text-sm font-medium text-gray-500 hover:text-indigo-600 border-b-2 border-transparent hover:border-indigo-600 pb-2"
                            >
                                {category.label}
                            </Link>
                        ))}
                    </div>
                </nav>
            </div>
        </header>
    );
}
