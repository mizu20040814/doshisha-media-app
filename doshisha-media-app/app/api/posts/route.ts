import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: "認証が必要です" },
                { status: 401 }
            );
        }

        const { data: posts, error } = await supabase
            .from("posts")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Supabase Error:", error);
            return NextResponse.json(
                { error: "記事の取得に失敗しました" },
                { status: 500 }
            );
        }

        return NextResponse.json(posts || []);
    } catch (error) {
        console.error("API GET Error:", error);
        return NextResponse.json(
            { error: "サーバーエラーが発生しました" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: "認証が必要です" },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { title, content, category, status } = body;

        // バリデーション
        if (!title || !content || !category) {
            return NextResponse.json(
                { error: "タイトル、内容、カテゴリは必須です" },
                { status: 400 }
            );
        }

        const postData: any = {
            title,
            content,
            category,
            status: status || "draft",
            updated_at: new Date().toISOString(),
        };

        if (status === "published" && !body.published_at) {
            postData.published_at = new Date().toISOString();
        }

        const { data, error } = await supabase
            .from("posts")
            .insert(postData)
            .select()
            .single();

        if (error) {
            console.error("Supabase Error:", error);
            return NextResponse.json(
                { error: "記事の作成に失敗しました" },
                { status: 500 }
            );
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error("API POST Error:", error);
        return NextResponse.json(
            { error: "サーバーエラーが発生しました" },
            { status: 500 }
        );
    }
}
