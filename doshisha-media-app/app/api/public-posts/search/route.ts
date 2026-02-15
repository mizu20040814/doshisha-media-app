import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { cleanMarkdownForPreview } from "@/lib/utils";

export async function GET(req: NextRequest) {
    const queryLengthLimit = 100;
    const queryArticleLimit = 20;
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");
    const limit = searchParams.get("limit");

    try {
        if (!query || query.trim() === "") {
            return NextResponse.json([], { status: 200 });
        }

        if (query.length > queryLengthLimit) {
            return NextResponse.json(
                { error: "検索クエリが長すぎます" },
                { status: 400 },
            );
        }

        // LIKEワイルドカード文字をエスケープ
        const sanitizedQuery = query.trim().replace(/[%_\\]/g, "\\$&");

        let dbQuery = supabase
            .from("posts")
            .select("id, title, content, category, published_at, created_at")
            .eq("status", "published")
            .ilike("title", `%${sanitizedQuery}%`)
            .order("published_at", { ascending: false });

        if (limit && parseInt(limit) > 0) {
            dbQuery = dbQuery.limit(parseInt(limit));
        } else {
            dbQuery = dbQuery.limit(queryArticleLimit);
        }

        const { data: posts, error } = await dbQuery;

        if (error) {
            console.error("Supabase Error :", error);
            return NextResponse.json(
                { error: "記事の取得に失敗しました" },
                { status: 500 },
            );
        }

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
