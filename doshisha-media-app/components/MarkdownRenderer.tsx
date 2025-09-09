"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ReactNode, createElement } from "react";

// 日本語文字の正規表現
const JAPANESE_CHARS_REGEX = /[^a-zA-Z0-9\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g;

interface HeadingProps {
    level: number;
    children: ReactNode;
}

// 見出しのテキストからIDを生成する関数
function generateId(children: ReactNode): string {
    if (typeof children === "string") {
        return children
            .toLowerCase()
            .replace(JAPANESE_CHARS_REGEX, "")
            .replace(/\s+/g, "-");
    }
    
    if (Array.isArray(children)) {
        return children
            .map(child => typeof child === "string" ? child : "")
            .join("")
            .toLowerCase()
            .replace(JAPANESE_CHARS_REGEX, "")
            .replace(/\s+/g, "-");
    }
    
    return "";
}

// カスタム見出しコンポーネント
function CustomHeading({ level, children }: HeadingProps) {
    const id = generateId(children);
    const tagName = `h${level}`;
    
    return createElement(
        tagName,
        { 
            id, 
            className: "scroll-mt-24" 
        },
        children
    );
}

interface MarkdownRendererProps {
    content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                h1: ({ children }) => <CustomHeading level={1}>{children}</CustomHeading>,
                h2: ({ children }) => <CustomHeading level={2}>{children}</CustomHeading>,
                h3: ({ children }) => <CustomHeading level={3}>{children}</CustomHeading>,
                h4: ({ children }) => <CustomHeading level={4}>{children}</CustomHeading>,
                h5: ({ children }) => <CustomHeading level={5}>{children}</CustomHeading>,
                h6: ({ children }) => <CustomHeading level={6}>{children}</CustomHeading>,
                a: ({ href, children }) => {
                    // 内部リンク（#で始まる）の場合はスムーススクロールを適用
                    if (href?.startsWith("#")) {
                        return (
                            <a
                                href={href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    // URLデコードしてIDを取得（エラーハンドリング付き）
                                    let targetId: string;
                                    try {
                                        targetId = decodeURIComponent(href.slice(1));
                                    } catch (error) {
                                        // デコードに失敗した場合は何もしない
                                        console.warn('Failed to decode URI component:', href, error);
                                        return;
                                    }
                                    
                                    const element = document.getElementById(targetId);
                                    if (element) {
                                        const headerOffset = 100;
                                        const elementPosition = element.getBoundingClientRect().top;
                                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                                        
                                        window.scrollTo({
                                            top: offsetPosition,
                                            behavior: "smooth"
                                        });
                                    }
                                }}
                                className="text-doshisha-purple-600 hover:text-doshisha-purple-400 underline decoration-2 underline-offset-2 transition-colors cursor-pointer"
                            >
                                {children}
                            </a>
                        );
                    }
                    // 外部リンクの場合は通常のリンク
                    return (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-doshisha-purple-600 hover:text-doshisha-purple-400 underline decoration-2 underline-offset-2 transition-colors"
                        >
                            {children}
                        </a>
                    );
                }
            }}
        >
            {content}
        </ReactMarkdown>
    );
}