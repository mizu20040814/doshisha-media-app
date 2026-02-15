import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Header />

            <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24">
                <div className="max-w-lg w-full text-center">
                    {/* 404 数字 */}
                    <div className="relative mb-6">
                        <p
                            className="text-8xl sm:text-9xl font-black leading-none tracking-tight select-none"
                            style={{
                                background:
                                    "linear-gradient(135deg, #660066 0%, #8b5cf6 50%, #660066 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                opacity: 0.9,
                            }}
                        >
                            404
                        </p>
                        {/* 装飾線 */}
                        <div
                            className="mt-4 mx-auto w-24 h-1 rounded-full"
                            style={{
                                background:
                                    "linear-gradient(90deg, #660066, #8b5cf6)",
                            }}
                        />
                    </div>

                    {/* メッセージ */}
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                        ページが見つかりません
                    </h1>
                    <p className="text-gray-500 mb-10 leading-relaxed">
                        お探しのページは移動または削除された可能性があります。
                        <br className="hidden sm:block" />
                        URLをご確認のうえ、再度お試しください。
                    </p>

                    {/* ナビゲーションボタン */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/"
                            className="inline-flex items-center px-8 py-3 text-white font-medium transition-all duration-200 hover:opacity-90 hover:shadow-lg"
                            style={{
                                background:
                                    "linear-gradient(135deg, #660066, #8b5cf6)",
                            }}
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z"
                                />
                            </svg>
                            トップページへ
                        </Link>
                        <Link
                            href="/search"
                            className="inline-flex items-center px-8 py-3 border-2 border-gray-300 text-gray-700 font-medium hover:border-doshisha-purple-400 hover:text-doshisha-purple-600 transition-all duration-200"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
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
                            記事を検索
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
