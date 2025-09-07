import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "@/components/Header";
import RelatedPosts from "@/components/RelatedPosts";

type Post = {
    id: string;
    title: string;
    content: string;
    category: string;
    published_at: string;
    created_at: string;
};

type PageProps = {
    params: Promise<{ id: string }>;
};

async function getPost(id: string): Promise<Post | null> {
    try {
        const res = await fetch(
            `${
                process.env.NEXTAUTH_URL || "http://localhost:3000"
            }/api/public-posts/${id}`,
            { cache: "no-store" }
        );

        if (res.status === 404) {
            return null;
        }

        if (!res.ok) {
            throw new Error("Failed to fetch post");
        }

        return res.json();
    } catch (error) {
        console.error("Error fetching post:", error);
        return null;
    }
}

function PostContent({ post }: { post: Post }) {
    const getCategoryLabel = (category: string) => {
        const labels: { [key: string]: string } = {
            news: "ニュース",
            column: "コラム",
            interview: "インタビュー",
            survey: "アンケート企画",
        };
        return labels[category] || category;
    };

    const getCategoryColor = (category: string) => {
        const colors: { [key: string]: string } = {
            news: "bg-red-100 text-red-800",
            column: "bg-blue-100 text-blue-800",
            interview: "bg-green-100 text-green-800",
            survey: "bg-purple-100 text-purple-800",
        };
        return colors[category] || "bg-gray-100 text-gray-800";
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <article className="max-w-4xl mx-auto">
            {/* パンくずナビ */}
            <nav className="mb-6">
                <ol className="flex items-center space-x-2 text-sm text-gray-500">
                    <li>
                        <Link href="/" className="hover:text-indigo-600">
                            ホーム
                        </Link>
                    </li>
                    <li>/</li>
                    <li>
                        <Link
                            href={`/category/${post.category}`}
                            className="hover:text-indigo-600"
                        >
                            {getCategoryLabel(post.category)}
                        </Link>
                    </li>
                    <li>/</li>
                    <li className="text-gray-900 font-medium">記事詳細</li>
                </ol>
            </nav>

            {/* 記事ヘッダー */}
            <header className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                            post.category
                        )}`}
                    >
                        {getCategoryLabel(post.category)}
                    </span>
                    <time className="text-gray-500">
                        {formatDate(post.published_at)}
                    </time>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                    {post.title}
                </h1>
            </header>

            {/* 記事本文 */}
            <div className="prose prose-lg max-w-none markdown-content">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                >
                    {post.content}
                </ReactMarkdown>
            </div>
        </article>
    );
}

export default async function PostDetailPage({ params }: PageProps) {
    const { id } = await params;
    const post = await getPost(id);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <PostContent post={post} />

                {/* 関連記事 */}
                <div className="mt-16 pt-8 border-t border-gray-200">
                    <Suspense
                        fallback={
                            <div className="animate-pulse">
                                <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[...Array(3)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="bg-white rounded-lg shadow p-4"
                                        >
                                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
                    >
                        <RelatedPosts
                            currentPostId={post.id}
                            category={post.category}
                        />
                    </Suspense>
                </div>
            </main>
        </div>
    );
}

// メタデータ生成
export async function generateMetadata({ params }: PageProps) {
    const { id } = await params;
    const post = await getPost(id);

    if (!post) {
        return {
            title: "記事が見つかりません | 同志社メディア",
        };
    }

    return {
        title: `${post.title} | 同志社メディア`,
        description: post.content.replace(/[#*`_~]/g, "").substring(0, 160),
        openGraph: {
            title: post.title,
            description: post.content.replace(/[#*`_~]/g, "").substring(0, 160),
            type: "article",
            publishedTime: post.published_at,
        },
    };
}
