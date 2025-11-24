import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
    return (
        <section className="relative w-full h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src="/images/aboutSection/aboutSection.jpg"
                    alt="このサイトについて"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-purple-900/80 to-purple-600/70" />
            </div>

            <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-end">
                <div className="text-white max-w-2xl text-right">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        このサイトについて
                    </h2>
                    <p className="text-base md:text-lg mb-2 text-gray-100">
                        学生による、学生のためのメディア。
                    </p>
                    <p className="text-base md:text-lg mb-8 text-gray-100">
                        同志社大学の魅力と情報を発信しています。
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-end">
                        <Link
                            href="/aboutus"
                            className="inline-block bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3 transition-colors duration-200 text-center"
                        >
                            詳しく見る
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
