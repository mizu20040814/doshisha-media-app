// remark / strip-markdown を jest.setup で先にモックして
// lib/utils.ts が import しても ESM エラーが起きないようにする

jest.mock("remark", () => {
    const mockProcessSync = (content: string) => ({
        toString: () => String(content),
    });
    const mockUse = () => ({ processSync: mockProcessSync });
    return {
        remark: () => ({ use: mockUse }),
    };
});

jest.mock("strip-markdown", () => ({
    __esModule: true,
    default: () => {},
}));

import {
    getCategoryLabel,
    getCategoryColor,
    cleanMarkdownForPreview,
    formatDate,
    formatDateLong,
    CATEGORY_LABELS,
    CATEGORY_COLORS,
} from "@/lib/utils";

describe("utils", () => {
    // ─────────────────────────────────────────────
    // getCategoryLabel
    // ─────────────────────────────────────────────
    describe("getCategoryLabel", () => {
        it("既知のカテゴリに対して正しいラベルを返す", () => {
            expect(getCategoryLabel("news")).toBe("ニュース");
            expect(getCategoryLabel("column")).toBe("コラム");
            expect(getCategoryLabel("interview")).toBe("インタビュー");
            expect(getCategoryLabel("survey")).toBe("アンケート企画");
        });

        it("未知のカテゴリにはそのまま返す", () => {
            expect(getCategoryLabel("unknown")).toBe("unknown");
            expect(getCategoryLabel("")).toBe("");
        });
    });

    // ─────────────────────────────────────────────
    // getCategoryColor
    // ─────────────────────────────────────────────
    describe("getCategoryColor", () => {
        it("既知のカテゴリに対して正しいカラークラスを返す", () => {
            expect(getCategoryColor("news")).toBe(
                "border-red-600 text-red-600",
            );
            expect(getCategoryColor("column")).toBe(
                "border-blue-600 text-blue-600",
            );
            expect(getCategoryColor("interview")).toBe(
                "border-green-600 text-green-600",
            );
            expect(getCategoryColor("survey")).toBe(
                "border-purple-600 text-purple-600",
            );
        });

        it("未知のカテゴリにはデフォルトカラーを返す", () => {
            expect(getCategoryColor("unknown")).toBe(
                "border-gray-600 text-gray-600",
            );
            expect(getCategoryColor("")).toBe("border-gray-600 text-gray-600");
        });
    });

    // ─────────────────────────────────────────────
    // cleanMarkdownForPreview (remark モック経由)
    //
    // モックの processSync は入力テキストをそのまま返すため、
    // 後処理ロジック (空白圧縮・トリム・切り詰め) をテストする。
    // ─────────────────────────────────────────────
    describe("cleanMarkdownForPreview", () => {
        it("長いテキストを指定文字数で切り詰めて省略記号を付ける", () => {
            const longText = "あ".repeat(200);
            const result = cleanMarkdownForPreview(longText, 100);
            expect(result.length).toBe(103); // 100 + '...'
            expect(result.endsWith("...")).toBe(true);
        });

        it("短いテキストには省略記号を付けない", () => {
            const result = cleanMarkdownForPreview("短いテキスト", 100);
            expect(result).toBe("短いテキスト");
            expect(result).not.toContain("...");
        });

        it("空文字列を処理できる", () => {
            const result = cleanMarkdownForPreview("");
            expect(result).toBe("");
        });

        it("3つ以上連続する改行を2つに圧縮する", () => {
            const result =
                cleanMarkdownForPreview("テキスト1\n\n\n\nテキスト2");
            expect(result).not.toContain("\n\n\n");
        });

        it("2つ以上連続する空白を1つに圧縮する", () => {
            const result = cleanMarkdownForPreview("テキスト1    テキスト2");
            expect(result).toBe("テキスト1 テキスト2");
        });

        it("デフォルトの切り詰め長は160文字", () => {
            const longText = "あ".repeat(200);
            const result = cleanMarkdownForPreview(longText);
            expect(result.length).toBe(163); // 160 + '...'
            expect(result.endsWith("...")).toBe(true);
        });

        it("前後の空白をトリムする", () => {
            const result = cleanMarkdownForPreview("   テキスト   ");
            expect(result).toBe("テキスト");
        });
    });

    // ─────────────────────────────────────────────
    // formatDate
    // ─────────────────────────────────────────────
    describe("formatDate", () => {
        it("日本語の短い日付形式でフォーマットする", () => {
            const result = formatDate("2024-03-15T10:30:00Z");
            expect(result).toMatch(/2024\/3\/15/);
        });

        it("異なる日付を正しくフォーマットする", () => {
            expect(formatDate("2024-01-01")).toMatch(/2024\/1\/1/);
            expect(formatDate(new Date("2024-12-31").toISOString())).toMatch(
                /2024\/12\/31/,
            );
        });
    });

    // ─────────────────────────────────────────────
    // formatDateLong
    // ─────────────────────────────────────────────
    describe("formatDateLong", () => {
        it("日本語の長い日付形式でフォーマットする", () => {
            const result = formatDateLong("2024-03-15T10:30:00Z");
            expect(result).toContain("2024年");
            expect(result).toContain("3月");
            expect(result).toContain("15日");
        });

        it("1月と12月を正しく処理する", () => {
            expect(formatDateLong("2024-01-01")).toContain("1月");
            expect(formatDateLong("2024-12-31")).toContain("12月");
        });
    });

    // ─────────────────────────────────────────────
    // 定数
    // ─────────────────────────────────────────────
    describe("定数", () => {
        it("CATEGORY_LABELS が全カテゴリを含む", () => {
            const expectedKeys = ["news", "column", "interview", "survey"];
            expectedKeys.forEach((key) => {
                expect(CATEGORY_LABELS).toHaveProperty(key);
                expect(typeof CATEGORY_LABELS[key]).toBe("string");
            });
        });

        it("CATEGORY_COLORS が全カテゴリを含む", () => {
            const expectedKeys = ["news", "column", "interview", "survey"];
            expectedKeys.forEach((key) => {
                expect(CATEGORY_COLORS).toHaveProperty(key);
                expect(typeof CATEGORY_COLORS[key]).toBe("string");
            });
        });

        it("CATEGORY_LABELS と CATEGORY_COLORS のキーが一致する", () => {
            const labelKeys = Object.keys(CATEGORY_LABELS).sort();
            const colorKeys = Object.keys(CATEGORY_COLORS).sort();
            expect(labelKeys).toEqual(colorKeys);
        });
    });
});
