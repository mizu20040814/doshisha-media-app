import Link from "next/link";
import Image from "next/image";

type Category = {
    id: string;
    name: string;
    image: string;
};

const categories: Category[] = [
    {
        id: "news",
        name: "ニュース",
        image: "/images/categories/news.jpg",
    },
    {
        id: "column",
        name: "コラム",
        image: "/images/categories/column.jpg",
    },
    {
        id: "interview",
        name: "インタビュー",
        image: "/images/categories/interview.jpg",
    },
    {
        id: "survey",
        name: "アンケート企画",
        image: "/images/categories/enquete.jpg",
    },
];

export default function CategoryCards() {
    return (
        <div className="mt-16 mb-12">
            <div className="mb-8">
                <h2 id="category" className="text-3xl font-bold text-gray-900 mb-2">
                    カテゴリー
                </h2>
                <p className="text-gray-600">
                    興味のあるカテゴリーから記事をお探しください
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/category/${category.id}`}
                        className="group block"
                    >
                        <div className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    priority={false}
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
                                />
                            </div>
                            <div className="p-4 flex items-center justify-between">
                                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-doshisha-purple-400">
                                    {category.name}
                                </h3>
                                <svg
                                    className="w-4 h-4 text-doshisha-purple-600 group-hover:text-doshisha-purple-400"
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
                    </Link>
                ))}
            </div>
        </div>
    );
}
