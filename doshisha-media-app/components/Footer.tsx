import Link from "next/link";
import { getCategoryLabel } from "@/lib/utils";

const categories = ["news", "column", "interview", "survey"] as const;

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* サイト情報 */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">
                            同志社メディア
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            同志社大学の学生生活に関する最新情報をお届けする
                            学生向けウェブメディアです。
                        </p>
                    </div>

                    {/* カテゴリーリンク */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">
                            カテゴリー
                        </h4>
                        <nav className="space-y-2">
                            {categories.map((category) => (
                                <Link
                                    key={category}
                                    href={`/category/${category}`}
                                    className="block text-gray-400 hover:text-white transition-colors text-sm"
                                >
                                    {getCategoryLabel(category)}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* SNSリンク・お問い合わせ */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">
                            フォロー
                        </h4>
                        <div className="flex space-x-4">
                            {/* Twitter/X */}
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label="Twitter"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            {/* Instagram */}
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label="Instagram"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                                </svg>
                            </a>
                            {/* Facebook */}
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label="Facebook"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                        </div>
                        <div className="mt-6">
                            <Link
                                href="/contact"
                                className="text-gray-400 hover:text-white transition-colors text-sm"
                            >
                                お問い合わせ
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 下部コピーライト */}
                <div className="mt-8 pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            © {currentYear} 同志社メディア. All rights reserved.
                        </p>
                        <div className="mt-4 md:mt-0 flex space-x-6">
                            <Link
                                href="/privacy"
                                className="text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                プライバシーポリシー
                            </Link>
                            <Link
                                href="/terms"
                                className="text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                利用規約
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}