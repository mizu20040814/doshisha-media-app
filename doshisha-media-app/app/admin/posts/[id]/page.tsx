"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function EditPostPage() {
    // パラメータからID取得
    const params = useParams();
    const id = params.id as string;

    // 状態管理
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState<
        "news" | "column" | "interview" | "survey"
    >("news");
    const [status, setStatus] = useState<"draft" | "published">("draft");
    const [loading, setLoading] = useState(true); // 初期値true（データ取得中）
    const [saving, setSaving] = useState(false); // 保存中の状態
    const [error, setError] = useState<string | null>(null);
    
    // 元のデータを保持（placeholder用）
    const [originalData, setOriginalData] = useState<{
        title: string;
        content: string;
        category: string;
        status: string;
    } | null>(null);

    const { data: session, status: authStatus } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (authStatus === "unauthenticated") {
            router.push("/admin/login");
        }
    }, [authStatus, router]);

    useEffect(() => {
        const fetchPost = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const response = await fetch(`/api/posts/${id}`);

                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error("記事が見つかりません");
                    }
                    throw new Error("記事の取得に失敗しました");
                }

                const data = await response.json();
                
                // 元のデータを保存
                setOriginalData({
                    title: data.title || "",
                    content: data.content || "",
                    category: data.category || "news",
                    status: data.status || "draft"
                });
                
                // 取得したデータをフォームにセット
                setTitle(data.title || "");
                setContent(data.content || "");
                setCategory(data.category || "news");
                setStatus(data.status || "draft");
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "エラーが発生しました"
                );
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // バリデーション
        if (!title || !content || !category) {
            setError("すべての項目を入力してください");
            return;
        }

        setSaving(true);
        setError(null);

        try {
            const response = await fetch(`/api/posts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    content,
                    category,
                    status,
                }),
            });

            if (!response.ok) {
                throw new Error("記事の更新に失敗しました");
            }

            // 成功したらダッシュボードにリダイレクト
            router.push("/admin");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "予期しないエラーが発生しました"
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-gray-500">記事を読み込み中...</p>
                    </div>
                </div>
            </div>
        );
    }

    // エラー表示
    if (error && !title) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="bg-red-50 p-4 rounded-md">
                        <p className="text-red-600">{error}</p>
                        <Link
                            href="/admin"
                            className="text-blue-600 mt-4 inline-block"
                        >
                            ダッシュボードに戻る
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // メインのフォーム（new/page.tsxとほぼ同じ）
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* ヘッダー - タイトルを「記事編集」に変更 */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        記事編集
                    </h1>
                    <Link
                        href="/admin"
                        className="text-blue-600 hover:text-blue-800"
                    >
                        ダッシュボードに戻る
                    </Link>
                </div>

                {/* エラーメッセージ */}
                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
                        {error}
                    </div>
                )}

                {/* フォーム - 新規作成ページと同じ構造 */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-lg shadow p-6"
                >
                    {/* フォーム要素は新規作成ページからコピー */}
                    {/* ただし、ボタンのテキストを変更 */}
                    {/* Title */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            タイトル <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder={originalData ? `元のタイトル: ${originalData.title}` : "記事のタイトルを入力"}
                        />
                    </div>
                    {/* Category */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            カテゴリ <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as any)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="news">ニュース</option>
                            <option value="column">コラム</option>
                            <option value="interview">インタビュー</option>
                            <option value="survey">アンケート企画</option>
                        </select>
                    </div>
                    {/* Markdown Editor */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            内容 <span className="text-red-500">*</span>
                        </label>
                        <div data-color-mode="light">
                            <MDEditor
                                value={content}
                                onChange={(value) => setContent(value || "")}
                                preview="live"
                                height={400}
                                data-color-mode="light"
                            />
                        </div>
                    </div>
                    {/* Status */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            ステータス
                        </label>
                        <div className="flex gap-4">
                            <label className="flex items-center text-gray-700">
                                <input
                                    type="radio"
                                    value="draft"
                                    checked={status === "draft"}
                                    onChange={(e) =>
                                        setStatus(
                                            e.target.value as
                                                | "draft"
                                                | "published"
                                        )
                                    }
                                    className="mr-2 text-indigo-600 focus:ring-indigo-500"
                                />
                                下書き
                            </label>
                            <label className="flex items-center text-gray-700">
                                <input
                                    type="radio"
                                    value="published"
                                    checked={status === "published"}
                                    onChange={(e) =>
                                        setStatus(
                                            e.target.value as
                                                | "draft"
                                                | "published"
                                        )
                                    }
                                    className="mr-2 text-indigo-600 focus:ring-indigo-500"
                                />
                                公開
                            </label>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                        >
                            {saving ? "更新中..." : "更新"}
                        </button>
                        <Link
                            href="/admin"
                            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        >
                            キャンセル
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
