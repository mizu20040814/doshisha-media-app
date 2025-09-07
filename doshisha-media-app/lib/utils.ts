export const CATEGORY_LABELS: { [key: string]: string } = {
    news: "ニュース",
    column: "コラム", 
    interview: "インタビュー",
    survey: "アンケート企画",
};

export const CATEGORY_COLORS: { [key: string]: string } = {
    news: "bg-red-100 text-red-800",
    column: "bg-blue-100 text-blue-800",
    interview: "bg-green-100 text-green-800",
    survey: "bg-purple-100 text-purple-800",
};

export function getCategoryLabel(category: string): string {
    return CATEGORY_LABELS[category] || category;
}

export function getCategoryColor(category: string): string {
    return CATEGORY_COLORS[category] || "bg-gray-100 text-gray-800";
}

const PREVIEW_LENGTH = 160;
const MARKDOWN_REMOVE_REGEX = /[#*`_~]/g;

export function cleanMarkdownForPreview(content: string, length: number = PREVIEW_LENGTH): string {
    return content.replace(MARKDOWN_REMOVE_REGEX, "").substring(0, length);
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