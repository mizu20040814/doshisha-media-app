import { remark } from "remark";
import stripMarkdown from "strip-markdown";

export const CATEGORY_LABELS: { [key: string]: string } = {
    news: "ニュース",
    column: "コラム",
    interview: "インタビュー",
    survey: "アンケート企画",
};

export const CATEGORY_COLORS: { [key: string]: string } = {
    news: "border-red-600 text-red-600",
    column: "border-blue-600 text-blue-600",
    interview: "border-green-600 text-green-600",
    survey: "border-purple-600 text-purple-600",
};

export function getCategoryLabel(category: string): string {
    return CATEGORY_LABELS[category] || category;
}

export function getCategoryColor(category: string): string {
    return CATEGORY_COLORS[category] || "border-gray-600 text-gray-600";
}

const PREVIEW_LENGTH = 160;

/**
 * Markdownコンテンツからプレーンテキストのプレビューを生成する。
 * remark + strip-markdown を使い、AST レベルで確実にMarkdown記法を除去する。
 */
export function cleanMarkdownForPreview(
    content: string,
    length: number = PREVIEW_LENGTH,
): string {
    const result = remark().use(stripMarkdown).processSync(content);

    const cleaned = String(result)
        .replace(/\n{3,}/g, "\n\n")
        .replace(/\s{2,}/g, " ")
        .trim();

    return (
        cleaned.substring(0, length) + (cleaned.length > length ? "..." : "")
    );
}

export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });
}

export function formatDateLong(dateString: string): string {
    return new Date(dateString).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}
