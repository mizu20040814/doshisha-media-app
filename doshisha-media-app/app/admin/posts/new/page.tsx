"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Category } from "@/types/database";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function NewPostPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState<
        "news" | "column" | "interview" | "survey"
    >("news");
    const [status, setStatus] = useState<"draft" | "published">("draft");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 認証チェック
    const { data: session, status: authStatus } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (authStatus === "unauthenticated") {
            router.push("/admin/login");
        }
    }, [authStatus, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content || !category) {
            setError("すべての項目を入力してください");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/posts", {
                method: "POST",
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
                throw new Error("記事の作成に失敗しました");
            }

            // 成功したら管理画面にリダイレクト
            router.push("/admin");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "予期しないエラーが発生しました"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Header part */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">新規記事作成</h1>
                <Link href="/admin" className="text-blue-600 hover:text-blue-800">← ダッシュボードに戻る</Link>
            </div>
            {/* Error message */}
            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
                    {error}
                </div>
            )}
            {/* Form part */}
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow p-6"
            >
                {/* Title */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        タイトル <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-doshisha-purple-400 focus:border-doshisha-purple-400"
                        placeholder="記事のタイトルを入力"
                    />
                </div>
                {/* Category */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        カテゴリ <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as Category)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-doshisha-purple-400 focus:border-doshisha-purple-400"
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
                            previewOptions={{
                                className: "markdown-content"
                            }}
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
                                    setStatus(e.target.value as "draft" | "published")
                                }
                                className="mr-2 text-doshisha-purple-600 focus:ring-doshisha-purple-400"
                            />
                            下書き
                        </label>
                        <label className="flex items-center text-gray-700">
                            <input
                                type="radio"
                                value="published"
                                checked={status === "published"}
                                onChange={(e) =>
                                    setStatus(e.target.value as "draft" | "published")
                                }
                                className="mr-2 text-doshisha-purple-600 focus:ring-doshisha-purple-400"
                            />
                            公開
                        </label>
                    </div>
                </div>
                {/* Submit Button */}
                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-doshisha-purple-600 text-white rounded-md hover:bg-doshisha-purple-500 disabled:opacity-50"
                    >
                        {loading ? "保存中..." : "保存"}
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
