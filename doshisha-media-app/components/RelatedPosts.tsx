import Link from "next/link";
import { getCategoryLabel, formatDate } from "@/lib/utils";

type RelatedPost = {
    id: string;
    title: string;
    published_at: string;
};

type RelatedPostsProps = {
    currentPostId: string;
    category: string;
};

async function getRelatedPosts(
    currentPostId: string,
    category: string
): Promise<RelatedPost[]> {
    try {
        const res = await fetch(
            `${
                process.env.NEXT_PUBLIC_NEXTAUTH_URL || "http://localhost:3000"
            }/api/public-posts?category=${category}&limit=4`,
            {
                cache: "no-store",
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch related posts");
        }

        const posts: RelatedPost[] = await res.json();

        // 現在の記事を除外して最大3件返す
        return posts.filter((post) => post.id !== currentPostId).slice(0, 3);
    } catch (error) {
        console.error("Error fetching related posts:", error);
        return [];
    }
}

export default async function RelatedPosts({
    currentPostId,
    category,
}: RelatedPostsProps) {
    const relatedPosts = await getRelatedPosts(currentPostId, category);

    if (relatedPosts.length === 0) {
        return null;
    }


    return (
        <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                関連する{getCategoryLabel(category)}記事
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                    <Link
                        key={post.id}
                        href={`/posts/${post.id}`}
                        className="block"
                    >
                        <article className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-doshisha-purple-300 transition-all cursor-pointer h-full">
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-doshisha-purple-600">
                                    {post.title}
                                </h3>
                                <time className="text-sm text-gray-500">
                                    {formatDate(post.published_at)}
                                </time>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </section>
    );
}
