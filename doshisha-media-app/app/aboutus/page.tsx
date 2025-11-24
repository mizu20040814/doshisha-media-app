import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutUsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* ページタイトル */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        私たちについて
                    </h1>
                    <p className="text-lg text-gray-600">
                        私たちは同志社大学のローム記念プロジェクトに所属するプロジェクトチームとして、
                        「150周年アプリ～次世代への種まきプロジェクト～」を推進しています。
                    </p>
                </div>

                {/* 自己紹介セクション */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-200 relative">
                        このメディアについて
                        <span className="absolute bottom-0 left-0 w-20 h-0.5 bg-gradient-to-r from-purple-600 to-purple-400"></span>
                    </h2>
                    <div className="bg-white shadow-sm border border-gray-200 p-8 rounded-lg">
                        <p
                            className="text-lg text-gray-800 mb-6"
                            style={{
                                lineHeight: "1.8",
                                letterSpacing: "0.02em",
                            }}
                        >
                            同志社大学学生メディアは、学生目線でキャンパスライフに関する最新情報をお届けするメディアです。
                            サークル活動、イベント情報、学生生活のリアルな声など、同志社大学での日々をより充実させるための情報を発信しています。
                        </p>
                        <p
                            className="text-lg text-gray-800 mb-6"
                            style={{
                                lineHeight: "1.8",
                                letterSpacing: "0.02em",
                            }}
                        >
                            私たちは、学生による学生のためのメディアとして、キャンパス内外での様々な出来事や役立つ情報を提供することを使命としています。
                            同志社大学の魅力を多くの方に知っていただくとともに、在学生の皆さんにとって有益な情報源となることを目指しています。
                        </p>
                        <p
                            className="text-lg text-gray-800"
                            style={{
                                lineHeight: "1.8",
                                letterSpacing: "0.02em",
                            }}
                        >
                            これからも、同志社大学コミュニティの一員として、信頼できる情報をタイムリーにお届けしてまいります。
                            皆さんの学生生活がより豊かなものになるよう、私たちは全力でサポートいたします。
                        </p>
                    </div>
                </section>

                {/* ミッションセクション */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-200 relative">
                        私たちのミッション
                        <span className="absolute bottom-0 left-0 w-20 h-0.5 bg-gradient-to-r from-purple-600 to-purple-400"></span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white shadow-sm border border-gray-200 p-6 rounded-lg hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-purple-600"
                                >
                                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                                    <path d="M18 14h-8" />
                                    <path d="M15 18h-5" />
                                    <path d="M10 6h8v4h-8V6Z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                正確な情報発信
                            </h3>
                            <p
                                className="text-lg text-gray-700"
                                style={{ lineHeight: "1.8" }}
                            >
                                学生生活に役立つ正確で信頼できる情報を、タイムリーにお届けします。
                            </p>
                        </div>
                        <div className="bg-white shadow-sm border border-gray-200 p-6 rounded-lg hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-purple-600"
                                >
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                コミュニティ形成
                            </h3>
                            <p
                                className="text-lg text-gray-700"
                                style={{ lineHeight: "1.8" }}
                            >
                                学生同士のつながりを深め、活気あるキャンパスコミュニティを育てます。
                            </p>
                        </div>
                        <div className="bg-white shadow-sm border border-gray-200 p-6 rounded-lg hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-purple-600"
                                >
                                    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                学生生活の充実
                            </h3>
                            <p
                                className="text-lg text-gray-700"
                                style={{ lineHeight: "1.8" }}
                            >
                                様々な情報を通じて、学生の皆さんのキャンパスライフをより豊かにします。
                            </p>
                        </div>
                    </div>
                </section>

                {/* 協力者セクション */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-200 relative">
                        協力機関
                        <span className="absolute bottom-0 left-0 w-20 h-0.5 bg-gradient-to-r from-purple-600 to-purple-400"></span>
                    </h2>
                    <p
                        className="text-lg text-gray-700 mb-8"
                        style={{ lineHeight: "1.8" }}
                    >
                        このメディアの運営にあたり、以下の機関のご協力をいただいております。
                    </p>

                    <div className="space-y-6">
                        {/* 同志社香里 */}
                        <div className="bg-white shadow-sm border border-gray-200 p-8 rounded-lg hover:shadow-md transition-shadow">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-6">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-purple-600"
                                    >
                                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                        同志社香里中学校・高等学校
                                    </h3>
                                    <p
                                        className="text-lg text-gray-800 mb-6"
                                        style={{
                                            lineHeight: "1.8",
                                            letterSpacing: "0.02em",
                                        }}
                                    >
                                        同志社香里中学校・高等学校は、同志社教育の精神を受け継ぐ中高一貫校です。
                                        大阪府寝屋川市に位置し、「良心教育」を基盤とした教育を実践しています。
                                    </p>
                                    <p
                                        className="text-lg text-gray-800"
                                        style={{
                                            lineHeight: "1.8",
                                            letterSpacing: "0.02em",
                                        }}
                                    >
                                        本メディアの運営にあたり、同志社ネットワークの一員として貴重なご支援とご協力をいただいております。
                                        同志社香里から同志社大学へ進学する多くの学生との連携を通じて、より充実した情報発信を実現しています。
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 法人同志社 */}
                        <div className="bg-white shadow-sm border border-gray-200 p-8 rounded-lg hover:shadow-md transition-shadow">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-6">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-purple-600"
                                    >
                                        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                                        <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                                        <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                                        <path d="M10 6h4" />
                                        <path d="M10 10h4" />
                                        <path d="M10 14h4" />
                                        <path d="M10 18h4" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                        学校法人同志社
                                    </h3>
                                    <p
                                        className="text-lg text-gray-800 mb-6"
                                        style={{
                                            lineHeight: "1.8",
                                            letterSpacing: "0.02em",
                                        }}
                                    >
                                        学校法人同志社は、1875年の創立以来、「良心を手腕に運用する人物の育成」を建学の精神とし、
                                        幼稚園から大学・大学院まで一貫した教育を提供する総合学園です。
                                    </p>
                                    <p
                                        className="text-lg text-gray-800"
                                        style={{
                                            lineHeight: "1.8",
                                            letterSpacing: "0.02em",
                                        }}
                                    >
                                        本メディアは、学校法人同志社の教育理念に基づき、学生の自主性と創造性を尊重した運営を行っています。
                                        法人からの支援により、学生が主体的に情報発信できる環境が整えられています。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* お問い合わせセクション */}
                <section className="mb-16">
                    <div className="bg-purple-50 border border-purple-200 p-8 rounded-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            お問い合わせ
                        </h2>
                        <p
                            className="text-lg text-gray-800 mb-4"
                            style={{
                                lineHeight: "1.8",
                                letterSpacing: "0.02em",
                            }}
                        >
                            取材のご依頼、記事に関するご質問、その他のお問い合わせは、以下の連絡先までお願いいたします。
                        </p>
                        <p className="text-lg text-gray-700">
                            Email:{" "}
                            <span className="text-purple-600 font-semibold">
                                contact@example.com
                            </span>
                            （仮）
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
