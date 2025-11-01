import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";

type SearchPost = {
    id: string;
    title: string;
    preview: string;
    category: string;
    published_at: string;
};

type PageProps = {
    searchParams: Promise<{ q?: string; limit?: string }>;
};

async function getSearchResults(query: string, limit?: string): Promise<SearchPost[]> {
    try {
        const params = new URLSearchParams();
        params.set("q", query);
        if (limit) params.set("limit", limit);

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEXTAUTH_URL || "http://localhost:3000"}/api/public-posts/search?${params.toString()}`,
            {
                cache: "no-store",
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch search results");
        }

        return res.json();
    } catch (error) {
        console.error("Error fetching search results:", error);
        return [];
    }
}

function SearchResults({ posts, query }: { posts: SearchPost[]; query: string }) {
    if (posts.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-2">
                    「{query}」に関する記事は見つかりませんでした
                </p>
                <p className="text-gray-400 text-sm">
                    別のキーワードで検索してみてください
                </p>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <p className="text-gray-600">
                    「<span className="font-semibold text-gray-900">{query}</span>」の検索結果: {posts.length}件
                </p>
            </div>
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
        </div>
    );
}

export default async function SearchPage({ searchParams }: PageProps) {
    const { q: query, limit } = await searchParams;

    if (!query || query.trim() === "") {
        notFound();
    }

    const posts = await getSearchResults(query, limit);

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        検索結果
                    </h1>
                    <p className="text-gray-600">
                        記事タイトルから検索しています
                    </p>
                </div>

                <SearchResults posts={posts} query={query} />
            </main>

            <Footer />
        </div>
    );
}

export async function generateMetadata({ searchParams }: PageProps) {
    const { q: query } = await searchParams;
    
    return {
        title: query ? `「${query}」の検索結果 | 同志社メディア` : "検索結果 | 同志社メディア",
        description: query ? `「${query}」に関する記事の検索結果です。` : "記事の検索結果です。",
    };
}
