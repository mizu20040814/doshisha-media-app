import { render, screen } from "@testing-library/react";
import NotFound from "@/app/not-found";

// Header / Footer をモック
jest.mock("@/components/Header", () => {
    return function MockHeader() {
        return <header data-testid="header">Header</header>;
    };
});

jest.mock("@/components/Footer", () => {
    return function MockFooter() {
        return <footer data-testid="footer">Footer</footer>;
    };
});

describe("NotFound (404ページ)", () => {
    it("404テキストが表示される", () => {
        render(<NotFound />);
        expect(screen.getByText("404")).toBeInTheDocument();
    });

    it("エラーメッセージが表示される", () => {
        render(<NotFound />);
        expect(screen.getByText("ページが見つかりません")).toBeInTheDocument();
    });

    it("説明文が表示される", () => {
        render(<NotFound />);
        expect(
            screen.getByText(
                /お探しのページは移動または削除された可能性があります/,
            ),
        ).toBeInTheDocument();
    });

    it("トップページへのリンクが存在する", () => {
        render(<NotFound />);
        const homeLink = screen.getByText("トップページへ").closest("a");
        expect(homeLink).toHaveAttribute("href", "/");
    });

    it("記事検索ページへのリンクが存在する", () => {
        render(<NotFound />);
        const searchLink = screen.getByText("記事を検索").closest("a");
        expect(searchLink).toHaveAttribute("href", "/search");
    });

    it("Header が表示される", () => {
        render(<NotFound />);
        expect(screen.getByTestId("header")).toBeInTheDocument();
    });

    it("Footer が表示される", () => {
        render(<NotFound />);
        expect(screen.getByTestId("footer")).toBeInTheDocument();
    });
});
