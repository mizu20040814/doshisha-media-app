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
import Footer from "@/components/Footer";

describe("Footer", () => {
    // ─── 基本レンダリング ───
    describe("基本レンダリング", () => {
        it("サイト名「同志社メディア」が表示される", () => {
            render(<Footer />);
            expect(screen.getByText("同志社メディア")).toBeInTheDocument();
        });

        it("サイト説明文が表示される", () => {
            render(<Footer />);
            expect(
                screen.getByText(
                    /同志社大学の学生生活に関する最新情報をお届けする/,
                ),
            ).toBeInTheDocument();
        });
    });

    // ─── カテゴリリンク ───
    describe("カテゴリリンク", () => {
        it("「カテゴリー」セクション見出しが表示される", () => {
            render(<Footer />);
            expect(screen.getByText("カテゴリー")).toBeInTheDocument();
        });

        it("全カテゴリへのリンクが表示される", () => {
            render(<Footer />);
            const expectedCategories = [
                "ニュース",
                "コラム",
                "インタビュー",
                "アンケート企画",
            ];
            expectedCategories.forEach((label) => {
                expect(screen.getByText(label)).toBeInTheDocument();
            });
        });

        it("各カテゴリリンクが正しいhrefを持つ", () => {
            render(<Footer />);

            const expectedLinks: Record<string, string> = {
                ニュース: "/category/news",
                コラム: "/category/column",
                インタビュー: "/category/interview",
                アンケート企画: "/category/survey",
            };

            Object.entries(expectedLinks).forEach(([label, href]) => {
                const link = screen.getByText(label).closest("a");
                expect(link).toHaveAttribute("href", href);
            });
        });
    });

    // ─── SNS・その他リンク ───
    describe("SNS・その他リンク", () => {
        it("「フォロー」セクション見出しが表示される", () => {
            render(<Footer />);
            expect(screen.getByText("フォロー")).toBeInTheDocument();
        });

        it("Instagramリンクが存在する", () => {
            render(<Footer />);
            const instagramLink = screen.getByLabelText("Instagram");
            expect(instagramLink).toHaveAttribute(
                "href",
                expect.stringContaining("instagram.com"),
            );
        });

        it("About Us リンクが表示される", () => {
            render(<Footer />);
            const aboutLink = screen.getByText("About Us").closest("a");
            expect(aboutLink).toHaveAttribute("href", "/aboutus");
        });
    });
});
