"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCategoryLabel, getCategoryColor } from "@/lib/utils";
import { AdminPost } from "@/types/database";

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [posts, setPosts] = useState<AdminPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        }
    }, [status, router]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/posts");
            if (!response.ok) {
                throw new Error("記事の取得に失敗しました");
            }
            const data = await response.json();
            setPosts(data);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "不明なエラーが発生しました",
            );
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("本当に削除しますか？")) return;

        try {
            const response = await fetch(`/api/posts/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("削除に失敗しました");
            }
            await fetchPosts();
        } catch (err) {
            alert(
                err instanceof Error
                    ? err.message
                    : "削除中にエラーが発生しました",
            );
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getStatusBadge = (status: string) => {
        if (status === "published") {
            return (
                <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                    公開
                </span>
            );
        }
        return (
            <span className="px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200">
                下書き
            </span>
        );
    };

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-gray-500">読み込み中...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <h1 className="text-xl font-bold text-gray-900">
                                    管理画面
                                </h1>
                            </div>
                            <nav className="ml-8">
                                <div className="flex space-x-4">
                                    <span className="text-doshisha-purple-600 px-3 py-2 font-medium text-sm border-b-2 border-doshisha-purple-600">
                                        記事管理
                                    </span>
                                </div>
                            </nav>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Link
                                href="/"
                                className="bg-gray-100 text-gray-700 px-4 py-2 text-sm font-medium hover:bg-gray-200 transition-colors flex items-center"
                            >
                                <svg
                                    className="w-4 h-4 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                </svg>
                                サイトを見る
                            </Link>
                            <Link
                                href="/admin/posts/new"
                                className="bg-doshisha-purple-600 text-white px-4 py-2 text-sm font-medium hover:bg-doshisha-purple-700 transition-colors flex items-center"
                            >
                                <svg
                                    className="w-4 h-4 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                                新規作成
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        記事管理
                    </h2>
                    <p className="text-gray-600">
                        記事の作成、編集、削除を行えます
                    </p>
                </div>

                {error && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
                        <div className="flex">
                            <svg
                                className="w-5 h-5 text-red-400 mr-2 mt-0.5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <p className="text-red-700 font-medium">{error}</p>
                        </div>
                    </div>
                )}

                <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                                        タイトル
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                                        カテゴリ
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                                        ステータス
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                                        更新日
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wide">
                                        操作
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {posts.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-16 text-center"
                                        >
                                            <div className="flex flex-col items-center">
                                                <svg
                                                    className="w-12 h-12 text-gray-400 mb-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1}
                                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                    />
                                                </svg>
                                                <p className="text-gray-500 font-medium">
                                                    記事がありません
                                                </p>
                                                <p className="text-gray-400 text-sm mt-1">
                                                    新規記事を作成して始めましょう
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    posts.map((post) => (
                                        <tr
                                            key={post.id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900 line-clamp-2">
                                                    {post.title}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 border text-xs font-medium ${getCategoryColor(
                                                        post.category,
                                                    )}`}
                                                >
                                                    {getCategoryLabel(
                                                        post.category,
                                                    )}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {getStatusBadge(post.status)}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {formatDate(post.updated_at)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <Link
                                                        href={`/admin/posts/${post.id}`}
                                                        className="text-doshisha-purple-600 hover:text-doshisha-purple-700 p-2 hover:bg-doshisha-purple-50 transition-colors"
                                                        title="編集"
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
                                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                            />
                                                        </svg>
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                post.id,
                                                            )
                                                        }
                                                        className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 transition-colors"
                                                        title="削除"
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
                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
