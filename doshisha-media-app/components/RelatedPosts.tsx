import Link from "next/link";

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
                process.env.NEXTAUTH_URL || "http://localhost:3000"
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

    const getCategoryLabel = (category: string) => {
        const labels: { [key: string]: string } = {
            news: "ニュース",
            column: "コラム",
            interview: "インタビュー",
            survey: "アンケート企画",
        };
        return labels[category] || category;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        });
    };

    return (
        <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                関連する{getCategoryLabel(category)}記事
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                    <article
                        key={post.id}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                    >
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                <Link
                                    href={`/posts/${post.id}`}
                                    className="hover:text-indigo-600"
                                >
                                    {post.title}
                                </Link>
                            </h3>
                            <time className="text-sm text-gray-500">
                                {formatDate(post.published_at)}
                            </time>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
