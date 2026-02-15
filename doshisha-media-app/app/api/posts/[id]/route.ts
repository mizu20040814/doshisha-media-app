import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Category, Status } from "@/types/database";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: "認証が必要です" },
                { status: 401 },
            );
        }

        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { error: "記事IDが必要です" },
                { status: 400 },
            );
        }

        const supabase = createSupabaseServerClient();
        const { data: post, error } = await supabase
            .from("posts")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            if (error.code === "PGRST116") {
                return NextResponse.json(
                    { error: "記事が見つかりません" },
                    { status: 404 },
                );
            }
            console.error("Supabase Error:", error);
            return NextResponse.json(
                { error: "記事の取得に失敗しました" },
                { status: 500 },
            );
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error("Unexpected error in GET /api/posts/[id]:", error);
        return NextResponse.json(
            { error: "サーバーエラーが発生しました" },
            { status: 500 },
        );
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: "認証が必要です" },
                { status: 401 },
            );
        }

        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { error: "記事IDが必要です" },
                { status: 400 },
            );
        }

        let body;
        try {
            body = await req.json();
        } catch (_parseError) {
            return NextResponse.json(
                { error: "不正なJSONフォーマットです" },
                { status: 400 },
            );
        }

        // バリデーション
        const { title, content, category, status } = body;

        if (!title || !content || !category) {
            return NextResponse.json(
                { error: "タイトル、内容、カテゴリは必須です" },
                { status: 400 },
            );
        }

        const updateData: {
            title: string;
            content: string;
            category: Category;
            status: Status;
            updated_at: string;
            published_at?: string;
        } = {
            title,
            content,
            category: category as Category,
            status: (status || "draft") as Status,
            updated_at: new Date().toISOString(),
        };
        const supabase = createSupabaseServerClient();
        if (status === "published") {
            const { data: currentPost } = await supabase
                .from("posts")
                .select("status, published_at")
                .eq("id", id)
                .single();
            if (currentPost?.status !== "published") {
                updateData.published_at = new Date().toISOString();
            }
        } else if (status === "draft") {
            updateData.published_at = undefined;
        }

        // データ更新
        const { data: data, error } = await supabase
            .from("posts")
            .update(updateData)
            .eq("id", id)
            .select()
            .single();

        if (error) {
            if (error.code === "PGRST116") {
                return NextResponse.json(
                    { error: "更新対象の記事が見つかりません" },
                    { status: 404 },
                );
            }
            console.error("Update Error:", error);
            return NextResponse.json(
                { error: "記事の更新に失敗しました" },
                { status: 500 },
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Unexpected error in PUT /api/posts/[id]:", error);
        return NextResponse.json(
            { error: "サーバーエラーが発生しました" },
            { status: 500 },
        );
    }
}

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: "認証が必要です" },
                { status: 401 },
            );
        }

        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { error: "記事IDが必要です" },
                { status: 400 },
            );
        }

        const supabase = createSupabaseServerClient();
        const { data: existingPost } = await supabase
            .from("posts")
            .select("id")
            .eq("id", id)
            .single();

        if (!existingPost) {
            return NextResponse.json(
                { error: "削除対象の記事が見つかりません" },
                { status: 404 },
            );
        }

        const { error } = await supabase.from("posts").delete().eq("id", id);

        if (error) {
            console.error("Delete Error:", error);
            return NextResponse.json(
                { error: "記事の削除に失敗しました" },
                { status: 500 },
            );
        }

        return NextResponse.json(
            { message: "記事を削除しました" },
            { status: 200 },
        );
    } catch (error) {
        console.error("Unexpected error in DELETE /api/posts/[id]:", error);
        return NextResponse.json(
            { error: "サーバーエラーが発生しました" },
            { status: 500 },
        );
    }
}
