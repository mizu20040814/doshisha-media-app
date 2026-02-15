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
import Header from "@/components/Header";
import { usePathname } from "next/navigation";

// next/navigation をモック
jest.mock("next/navigation", () => ({
    usePathname: jest.fn(),
}));

// SearchBar をモック（子コンポーネント）
jest.mock("@/components/SearchBar", () => {
    return function MockSearchBar() {
        return <div data-testid="search-bar">Search Bar</div>;
    };
});

describe("Header", () => {
    beforeEach(() => {
        (usePathname as jest.Mock).mockReturnValue("/");
    });

    // ─── 基本レンダリング ───
    describe("基本レンダリング", () => {
        it("サイトタイトル「同志社メディア」が表示される", () => {
            render(<Header />);
            expect(screen.getByText("同志社メディア")).toBeInTheDocument();
        });

        it("サイトタイトルがホームへのリンクである", () => {
            render(<Header />);
            const link = screen.getByRole("link", { name: "同志社メディア" });
            expect(link).toHaveAttribute("href", "/");
        });

        it("検索バーが表示される", () => {
            render(<Header />);
            expect(screen.getByTestId("search-bar")).toBeInTheDocument();
        });
    });

    // ─── カテゴリナビゲーション ───
    describe("カテゴリナビゲーション", () => {
        it("全カテゴリリンクが表示される", () => {
            render(<Header />);
            expect(screen.getByText("全て")).toBeInTheDocument();
            expect(screen.getByText("ニュース")).toBeInTheDocument();
            expect(screen.getByText("コラム")).toBeInTheDocument();
            expect(screen.getByText("インタビュー")).toBeInTheDocument();
            expect(screen.getByText("アンケート企画")).toBeInTheDocument();
        });

        it("About Us リンクが表示される", () => {
            render(<Header />);
            const aboutLink = screen.getByText("About Us").closest("a");
            expect(aboutLink).toHaveAttribute("href", "/aboutus");
        });

        it("各カテゴリリンクが正しいhrefを持つ", () => {
            render(<Header />);

            const expectedLinks: Record<string, string> = {
                全て: "/",
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

    // ─── アクティブ状態 ───
    describe("アクティブ状態のハイライト", () => {
        it("ホームページでは「全て」がハイライトされる", () => {
            (usePathname as jest.Mock).mockReturnValue("/");
            render(<Header />);

            const allLink = screen.getByText("全て").closest("a");
            expect(allLink).toHaveClass("text-doshisha-purple-600");
        });

        it("カテゴリページでは該当カテゴリがハイライトされる", () => {
            (usePathname as jest.Mock).mockReturnValue("/category/news");
            render(<Header />);

            const newsLink = screen.getByText("ニュース").closest("a");
            expect(newsLink).toHaveClass("text-doshisha-purple-600");
        });

        it("非アクティブカテゴリはハイライトされない", () => {
            (usePathname as jest.Mock).mockReturnValue("/category/news");
            render(<Header />);

            const allLink = screen.getByText("全て").closest("a");
            const columnLink = screen.getByText("コラム").closest("a");

            expect(allLink).not.toHaveClass("text-doshisha-purple-600");
            expect(columnLink).not.toHaveClass("text-doshisha-purple-600");
        });

        it("About Usページでは About Us がハイライトされる", () => {
            (usePathname as jest.Mock).mockReturnValue("/aboutus");
            render(<Header />);

            const aboutLink = screen.getByText("About Us").closest("a");
            expect(aboutLink).toHaveClass("text-doshisha-purple-600");
        });
    });
});
