export interface Post {
    id: string;
    title: string;
    content: string;
    category: "news" | "column" | "interview" | "survey";
    status: "draft" | "published";
    published_at?: string;
    created_at: string;
    updated_at: string;
    author_id?: string;
}
