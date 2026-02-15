import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { error: "記事IDが必要です" },
                { status: 400 },
            );
        }

        // 公開記事のみ取得
        const supabase = createSupabaseServerClient();
        const { data: post, error } = await supabase
            .from("posts")
            .select("id, title, content, category, published_at, created_at")
            .eq("id", id)
            .eq("status", "published")
            .single();

        if (error) {
            if (error.code === "PGRST116") {
                return NextResponse.json(
                    { error: "記事が見つかりません" },
                    { status: 404 },
                );
            }
            console.error("Supabase error:", error);
            return NextResponse.json(
                { error: "記事の取得に失敗しました" },
                { status: 500 },
            );
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error("API error:", error);
        return NextResponse.json(
            { error: "サーバーエラーが発生しました" },
            { status: 500 },
        );
    }
}
