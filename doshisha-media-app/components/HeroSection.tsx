import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src="/images/heroSection/HeroSection.jpg"
                    alt="同志社大学メディアヒーローイメージ"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
            </div>
            
            <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <div className="text-white max-w-2xl">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        同志社大学
                        <span className="block text-3xl md:text-5xl mt-2">
                            学生メディア
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl mb-8 text-gray-200">
                        キャンパスライフの最新情報を、学生目線でお届けします。
                        イベント、サークル活動、学生生活のリアルな声を発信中。
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link 
                            href="#latest-posts"
                            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 text-center"
                        >
                            最新記事を読む
                        </Link>
                        <Link 
                            href="#category"
                            className="inline-block bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-lg border border-white/30 transition-colors duration-200 text-center"
                        >
                            カテゴリーを見る
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
