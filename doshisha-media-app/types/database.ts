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
