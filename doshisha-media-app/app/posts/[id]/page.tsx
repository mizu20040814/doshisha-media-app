import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import { getCategoryLabel, getCategoryColor, formatDateLong, cleanMarkdownForPreview } from "@/lib/utils";

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
                        className={`inline-flex items-center px-3 py-1 border text-sm font-medium ${getCategoryColor(
                            post.category
                        )}`}
                    >
                        {getCategoryLabel(post.category)}
                    </span>
                    <time className="text-gray-500">
                        {formatDateLong(post.published_at)}
                    </time>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                    {post.title}
                </h1>
            </header>

            {/* 記事本文 */}
            <div className="prose prose-lg max-w-none markdown-content">
                <MarkdownRenderer content={post.content} />
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
        <div className="min-h-screen bg-white">
            <ScrollProgress />
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

            <Footer />
            <ScrollToTop />
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

    const description = cleanMarkdownForPreview(post.content);
    
    return {
        title: `${post.title} | 同志社メディア`,
        description,
        openGraph: {
            title: post.title,
            description,
            type: "article",
            publishedTime: post.published_at,
        },
    };
}
