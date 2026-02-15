import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cleanMarkdownForPreview } from "@/lib/utils";

export async function GET(req: NextRequest) {
    try {
        // URLパラメータから検索条件を取得
        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");
        const limit = searchParams.get("limit");

        // 基本クエリ（公開記事のみ）
        const supabase = createSupabaseServerClient();
        let query = supabase
            .from("posts")
            .select("id, title, content, category, published_at, created_at")
            .eq("status", "published")
            .order("published_at", { ascending: false });

        // カテゴリフィルター
        if (category && category !== "all") {
            query = query.eq("category", category);
        }

        // 件数制限
        if (limit) {
            query = query.limit(parseInt(limit));
        }

        const { data: posts, error } = await query;

        if (error) {
            console.error("Supabase Error :", error);
            return NextResponse.json(
                { error: "記事の取得に失敗しました" },
                { status: 500 },
            );
        }

        // 内容のプレビューを生成
        const postsWithPreview = posts?.map((post) => ({
            ...post,
            preview: cleanMarkdownForPreview(post.content, 150) + "...",
        }));

        return NextResponse.json(postsWithPreview || []);
    } catch (error) {
        console.error("API Error :", error);
        return NextResponse.json(
            { error: "サーバーエラーが発生しました" },
            { status: 500 },
        );
    }
}
