const nextJest = require("next/jest");

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
    // Add more setup options before each test is run
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

    // Test environment
    testEnvironment: "jest-environment-jsdom",

    // Module name mapper for handling CSS imports, image imports, etc.
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
        "^@/components/(.*)$": "<rootDir>/components/$1",
        "^@/lib/(.*)$": "<rootDir>/lib/$1",
        "^@/app/(.*)$": "<rootDir>/app/$1",
        "^@/types/(.*)$": "<rootDir>/types/$1",
        // Handle CSS imports (with CSS modules)
        "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
        // Handle CSS imports (without CSS modules)
        "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
        // Handle image imports
        "^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$":
            "<rootDir>/__mocks__/fileMock.js",
    },

    // Coverage configuration
    collectCoverageFrom: [
        "app/**/*.{js,jsx,ts,tsx}",
        "components/**/*.{js,jsx,ts,tsx}",
        "lib/**/*.{js,jsx,ts,tsx}",
        "!**/*.d.ts",
        "!**/node_modules/**",
        "!**/.next/**",
        "!**/coverage/**",
        "!**/*.config.js",
        "!**/middleware.ts",
    ],

    // Test match patterns
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[jt]s?(x)",
    ],

    // Transform files
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
    },

    // Ignore patterns
    testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],

    // ESM パッケージを babel-jest でトランスフォームする
    transformIgnorePatterns: [
        "node_modules/(?!(" +
            "remark|remark-parse|remark-stringify|" +
            "strip-markdown|unified|bail|devlop|is-plain-obj|trough|" +
            "vfile|vfile-message|" +
            "unist-util-is|unist-util-visit|unist-util-visit-parents|unist-util-stringify-position|" +
            "mdast-util-to-string|mdast-util-from-markdown|mdast-util-to-markdown|mdast-util-phrasing|" +
            "micromark|micromark-core-commonmark|micromark-factory-.*|micromark-util-.*|" +
            "ccount|escape-string-regexp|markdown-table|zwitch|longest-streak|" +
            "character-entities-legacy|character-entities|character-reference-invalid|" +
            "is-alphanumerical|is-decimal|is-hexadecimal|is-alphabetical|" +
            "decode-named-character-reference|stringify-entities" +
            ")/)",
    ],

    // Module directories
    modulePaths: ["<rootDir>"],

    // Verbose output
    verbose: true,
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
