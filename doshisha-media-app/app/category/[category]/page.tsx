import { Suspense } from "react";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import { Category } from "@/types/database";
import { getCategoryLabel } from "@/lib/utils";

type CategoryPost = {
    id: string;
    title: string;
    preview: string;
    category: Category;
    published_at: string;
};

async function getCategoryPosts(category: string): Promise<CategoryPost[]> {
    try {
        const res = await fetch(
            `${
                process.env.NEXTAUTH_URL || "http://localhost:3000"
            }/api/public-posts/category/${category}`,
            {
                cache: "no-store",
            }
        );

        if (!res.ok) {
            if (res.status === 400) {
                notFound();
            }
            throw new Error("Failed to fetch posts");
        }

        return res.json();
    } catch (error) {
        console.error("Error fetching category posts:", error);
        return [];
    }
}

function isValidCategory(category: string): category is Category {
    const validCategories: Category[] = [
        "news",
        "column",
        "interview",
        "survey",
    ];
    return validCategories.includes(category as Category);
}

export default async function CategoryPage({ params }: PageProps) {
    const { category } = await params;

    // カテゴリの妥当性チェック
    if (!isValidCategory(category)) {
        notFound();
    }

    const posts = await getCategoryPosts(category);
    const categoryLabel = getCategoryLabel(category);

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* カテゴリヘッダー */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {categoryLabel}
                    </h1>
                    <p className="text-gray-600">
                        {categoryLabel}に関する記事一覧
                    </p>
                </div>

                {/* 記事一覧 */}
                <Suspense
                    fallback={
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* ローディング用スケルトン */}
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-white shadow-sm border border-gray-200 animate-pulse"
                                >
                                    <div className="p-6">
                                        <div className="h-4 bg-gray-200 rounded w-20 mb-3"></div>
                                        <div className="h-6 bg-gray-200 rounded w-full mb-3"></div>
                                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                >
                    <CategoryPostGrid posts={posts} />
                </Suspense>
            </main>
        </div>
    );
}

function CategoryPostGrid({ posts }: { posts: CategoryPost[] }) {
    if (posts.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">
                    このカテゴリの記事はまだありません
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <PostCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    preview={post.preview}
                    category={post.category}
                    published_at={post.published_at}
                />
            ))}
        </div>
    );
}
