export type Category = "news" | "column" | "interview" | "survey";
export type Status = "draft" | "published";

export interface Post {
    id: string;
    title: string;
    content: string;
    category: Category;
    status: Status;
    published_at?: string;
    created_at: string;
    updated_at: string;
    author_id?: string;
}

/** 公開記事の一覧表示用（ホーム・検索・カテゴリページ） */
export type PostPreview = {
    id: string;
    title: string;
    preview: string;
    category: string;
    published_at: string;
};

/** 記事詳細ページ用 */
export type PostDetail = {
    id: string;
    title: string;
    content: string;
    category: string;
    published_at: string;
    created_at: string;
};

/** 管理者ダッシュボード用 */
export type AdminPost = {
    id: string;
    title: string;
    category: string;
    status: "draft" | "published";
    published_at: string | null;
    created_at: string;
    updated_at: string;
};
