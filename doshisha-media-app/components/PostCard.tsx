import Link from "next/link";
import { getCategoryLabel, getCategoryColor, formatDate } from "@/lib/utils";

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

    return (
        <Link href={`/posts/${id}`} className="block">
            <article className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                        <span
                            className={`inline-flex items-center px-2.5 py-0.5 border text-xs font-medium ${getCategoryColor(
                                category
                            )}`}
                        >
                            {getCategoryLabel(category)}
                        </span>
                        <time className="text-sm text-gray-500">
                            {formatDate(published_at)}
                        </time>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-doshisha-purple-400">
                        {title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {preview}
                    </p>

                    <div className="inline-flex items-center text-doshisha-purple-600 hover:text-doshisha-purple-400 text-sm font-medium">
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
                    </div>
                </div>
            </article>
        </Link>
    );
}
