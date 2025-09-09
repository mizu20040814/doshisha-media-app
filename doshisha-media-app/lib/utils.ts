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

export function cleanMarkdownForPreview(content: string, length: number = PREVIEW_LENGTH): string {
    const cleaned = content
        // コードブロック記法を最初に除去 ```code```
        .replace(/```[\s\S]*?```/g, '')
        // インラインコード記法を除去 `code` → code
        .replace(/`([^`]*)`/g, '$1')
        // ヘッダー記法を除去 (# ## ### など)
        .replace(/^#{1,6}\s+/gm, '')
        // リンク記法を除去 [text](url) → text
        .replace(/\[([^\]]*)\]\([^\)]*\)/g, '$1')
        // 画像記法を除去 ![alt](url)
        .replace(/!\[([^\]]*)\]\([^\)]*\)/g, '')
        // 太字記法を除去 **text** および __text__ → text
        .replace(/\*\*(.+?)\*\*/g, '$1')
        .replace(/__(.+?)__/g, '$1')
        // イタリック記法を除去 *text* および _text_ → text
        .replace(/\*(?!\*)(.+?)\*(?!\*)/g, '$1')
        .replace(/_(.+?)_/g, '$1')
        // 取り消し線記法を除去 ~~text~~ → text
        .replace(/~~([^~]*)~~/g, '$1')
        // 引用記法を除去 > text → text
        .replace(/^>\s*/gm, '')
        // リスト記法を除去 - item, * item, + item → item
        .replace(/^[-*+]\s+/gm, '')
        // 数字リスト記法を除去 1. item → item
        .replace(/^\d+\.\s+/gm, '')
        // 水平線を除去 --- *** ___
        .replace(/^[-*_]{3,}$/gm, '')
        // テーブル記法を除去: ヘッダー・区切り・データ行をまとめて削除
        .replace(
            // マークダウンテーブルのブロック（ヘッダー、区切り、データ行）を検出して削除
            /((?:.*\|.*\n)+\s*[-:| ]+\n(?:.*\|.*\n)*)/g,
            ''
        )
        // HTMLタグを除去
        .replace(/<[^>]*>/g, '')
        // 余分な空白・改行を整理
        .replace(/\n{3,}/g, '\n\n')
        .replace(/\s{2,}/g, ' ')
        // 先頭と末尾の空白を除去
        .trim();

    return cleaned.substring(0, length) + (cleaned.length > length ? '...' : '');
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