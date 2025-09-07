import Link from "next/link";

type PostCardProps = {
    id: string;
    title: string;
    preview: string;
    category: string;
    published_at: string;
};

export default function PostCard({
    id,
    title,
    preview,
    category,
    published_at,
}: PostCardProps) {
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
            month: "numeric",
            day: "numeric",
        });
    };

    return (
        <article className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                    <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                            category
                        )}`}
                    >
                        {getCategoryLabel(category)}
                    </span>
                    <time className="text-sm text-gray-500">
                        {formatDate(published_at)}
                    </time>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    <Link
                        href={`/posts/${id}`}
                        className="hover:text-indigo-600"
                    >
                        {title}
                    </Link>
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {preview}
                </p>

                <Link
                    href={`/posts/${id}`}
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                    続きを読む
                    <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </Link>
            </div>
        </article>
    );
}
