"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Post = {
    id: string;
    title: string;
    category: string;
    status: "draft" | "published";
    published_at: string | null;
    created_at: string;
    updated_at: string;
};

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
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
                    : "不明なエラーが発生しました"
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
                    : "削除中にエラーが発生しました"
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

    const getCategoryLabel = (category: string) => {
        const labels: { [key: string]: string } = {
            news: "ニュース",
            column: "コラム",
            interview: "インタビュー",
            survey: "アンケート企画",
        };
        return labels[category] || category;
    };

    const getStatusBadge = (status: string) => {
        if (status === "published") {
            return (
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    公開
                </span>
            );
        }
        return (
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
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
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white shadow rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            記事管理
                        </h1>
                        <Link
                            href="/admin/posts/new"
                            className="bg-doshisha-purple-600 text-white px-4 py-2 rounded-md hover:bg-doshisha-purple-500 transition-colors"
                        >
                            新規記事作成
                        </Link>
                    </div>

                    {error && (
                        <div className="px-6 py-4 bg-red-50 border-b border-red-200">
                            <p className="text-red-600">{error}</p>
                        </div>
                    )}

                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        タイトル
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        カテゴリ
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ステータス
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        更新日
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        操作
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {posts.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-12 text-center text-gray-500"
                                        >
                                            記事がありません
                                        </td>
                                    </tr>
                                ) : (
                                    posts.map((post) => (
                                        <tr
                                            key={post.id}
                                            className="hover:bg-gray-100"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {post.title}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-500">
                                                    {getCategoryLabel(
                                                        post.category
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {getStatusBadge(post.status)}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {formatDate(post.updated_at)}
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm font-medium">
                                                <Link
                                                    href={`/admin/posts/${post.id}`}
                                                    className="text-doshisha-purple-600 hover:text-doshisha-purple-400 mr-4"
                                                >
                                                    編集
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(post.id)
                                                    }
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    削除
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
