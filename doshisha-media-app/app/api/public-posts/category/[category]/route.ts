import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Category } from "@/types/database";
import { cleanMarkdownForPreview } from "@/lib/utils";

type CategoryPostResponse = {
    id: string;
    title: string;
    preview: string;
    category: Category;
    published_at: string;
};

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ category: string }> },
) {
    try {
        const { category } = await params;

        // カテゴリの妥当性チェック
        const validCategories: Category[] = [
            "news",
            "column",
            "interview",
            "survey",
        ];
        if (!validCategories.includes(category as Category)) {
            return NextResponse.json(
                { error: "無効なカテゴリです" },
                { status: 400 },
            );
        }

        // supabaseから公開記事を取得（既存のpublic-posts APIと同様の構造）
        const supabase = createSupabaseServerClient();
        const { data: posts, error } = await supabase
            .from("posts")
            .select("id, title, content, category, published_at, created_at")
            .eq("category", category)
            .eq("status", "published")
            .order("published_at", { ascending: false });

        if (error) {
            console.error("Supabase error:", error);
            return NextResponse.json(
                { error: "記事の取得に失敗しました" },
                { status: 500 },
            );
        }

        // cleanMarkdownForPreview関数を使ってプレビュー生成
        const formattedPosts: CategoryPostResponse[] =
            posts?.map((post) => ({
                id: post.id,
                title: post.title,
                preview: cleanMarkdownForPreview(post.content),
                category: post.category,
                published_at: post.published_at || post.created_at,
            })) || [];

        return NextResponse.json(formattedPosts);
    } catch (error) {
        console.error("Category API error:", error);
        return NextResponse.json(
            { error: "サーバーエラーが発生しました" },
            { status: 500 },
        );
    }
}
