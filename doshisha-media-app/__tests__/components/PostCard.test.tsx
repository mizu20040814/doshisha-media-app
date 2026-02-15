// remark ESM 問題を回避
jest.mock("remark", () => ({
    remark: () => ({
        use: () => ({
            processSync: (content: string) => ({
                toString: () => String(content),
            }),
        }),
    }),
}));
jest.mock("strip-markdown", () => ({ __esModule: true, default: () => {} }));

import { render, screen } from "@testing-library/react";
import PostCard from "@/components/PostCard";

describe("PostCard", () => {
    const defaultProps = {
        id: "test-id-123",
        title: "テスト記事のタイトル",
        preview: "これはテスト記事のプレビューテキストです。",
        category: "news",
        published_at: "2024-03-15T10:30:00Z",
    };

    it("記事タイトルが表示される", () => {
        render(<PostCard {...defaultProps} />);
        expect(screen.getByText("テスト記事のタイトル")).toBeInTheDocument();
    });

    it("プレビューテキストが表示される", () => {
        render(<PostCard {...defaultProps} />);
        expect(
            screen.getByText("これはテスト記事のプレビューテキストです。"),
        ).toBeInTheDocument();
    });

    it("カテゴリラベルが表示される", () => {
        render(<PostCard {...defaultProps} />);
        expect(screen.getByText("ニュース")).toBeInTheDocument();
    });

    it("公開日が日本語形式で表示される", () => {
        render(<PostCard {...defaultProps} />);
        expect(screen.getByText("2024/3/15")).toBeInTheDocument();
    });

    it("記事詳細ページへのリンクが正しい", () => {
        render(<PostCard {...defaultProps} />);
        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", "/posts/test-id-123");
    });

    it("「続きを読む」テキストが表示される", () => {
        render(<PostCard {...defaultProps} />);
        expect(screen.getByText("続きを読む")).toBeInTheDocument();
    });

    it("各カテゴリに対して正しいカラーが適用される", () => {
        const categories = [
            { value: "news", color: "border-red-600" },
            { value: "column", color: "border-blue-600" },
            { value: "interview", color: "border-green-600" },
            { value: "survey", color: "border-purple-600" },
        ];

        categories.forEach(({ value, color }) => {
            const { unmount } = render(
                <PostCard {...defaultProps} category={value} />,
            );
            const categoryLabels: Record<string, string> = {
                news: "ニュース",
                column: "コラム",
                interview: "インタビュー",
                survey: "アンケート企画",
            };
            const badge = screen.getByText(categoryLabels[value]);
            expect(badge).toHaveClass(color);
            unmount();
        });
    });
});
