import { Suspense } from "react";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";

type Post = {
    id: string;
    title: string;
    preview: string;
    category: string;
    published_at: string;
};

async function getPublishedPosts(): Promise<Post[]> {
    try {
        const res = await fetch(
            `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/public-posts`,
            {
                cache: "no-store",
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch posts");
        }

        return res.json();
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
}

function PostGrid({ posts }: { posts: Post[] }) {
    if (posts.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">まだ記事がありません</p>
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

export default async function HomePage() {
    const posts = await getPublishedPosts();

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        最新記事
                    </h1>
                    <p className="text-gray-600">
                        同志社大学の学生生活に関する最新情報をお届けします
                    </p>
                </div>

                <Suspense
                    fallback={
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* ローディング用スケルトン */}
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-lg shadow-sm border border-gray-200 animate-pulse"
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
                    <PostGrid posts={posts} />
                </Suspense>
            </main>
        </div>
    );
}
