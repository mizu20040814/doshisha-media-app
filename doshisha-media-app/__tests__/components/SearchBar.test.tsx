import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "next/navigation";

// next/navigation をモック
jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

describe("SearchBar", () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
        });
    });

    it("検索入力欄が表示される", () => {
        render(<SearchBar />);
        expect(
            screen.getByPlaceholderText("記事を検索..."),
        ).toBeInTheDocument();
    });

    it("送信ボタンが表示される", () => {
        render(<SearchBar />);
        expect(screen.getByRole("button", { name: "" })).toBeInTheDocument();
    });

    it("テキスト入力ができる", async () => {
        const user = userEvent.setup();
        render(<SearchBar />);

        const input = screen.getByPlaceholderText("記事を検索...");
        await user.type(input, "テスト検索");
        expect(input).toHaveValue("テスト検索");
    });

    it("フォーム送信で検索ページに遷移する", async () => {
        const user = userEvent.setup();
        render(<SearchBar />);

        const input = screen.getByPlaceholderText("記事を検索...");
        await user.type(input, "テスト");
        await user.keyboard("{Enter}");

        expect(mockPush).toHaveBeenCalledWith(
            "/search?q=%E3%83%86%E3%82%B9%E3%83%88",
        );
    });

    it("空白のみの入力では検索しない", async () => {
        const user = userEvent.setup();
        render(<SearchBar />);

        const input = screen.getByPlaceholderText("記事を検索...");
        await user.type(input, "   ");
        await user.keyboard("{Enter}");

        expect(mockPush).not.toHaveBeenCalled();
    });

    it("空の入力では検索しない", async () => {
        const user = userEvent.setup();
        render(<SearchBar />);

        await user.keyboard("{Enter}");
        expect(mockPush).not.toHaveBeenCalled();
    });

    it("検索クエリの前後の空白はトリムされる", async () => {
        const user = userEvent.setup();
        render(<SearchBar />);

        const input = screen.getByPlaceholderText("記事を検索...");
        await user.type(input, "  テスト  ");
        await user.keyboard("{Enter}");

        expect(mockPush).toHaveBeenCalledWith(
            "/search?q=%E3%83%86%E3%82%B9%E3%83%88",
        );
    });
});
