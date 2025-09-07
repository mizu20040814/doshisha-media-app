# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

同志社大学の学生およびその関連コミュニティ向けのウェブメディアサイト。管理者によるコンテンツ管理機能と一般向けのコンテンツ閲覧機能を持つフルスタックNext.jsアプリケーション。

## アーキテクチャ

### 技術スタック
- **フレームワーク**: Next.js 15.5.2 (App Router + Turbopack)
- **データベース**: PostgreSQL (Supabase)
- **認証**: NextAuth.js (管理者のみ)
- **スタイリング**: Tailwind CSS 4.0
- **Markdown処理**: react-markdown + remark-gfm
- **Markdownエディタ**: @uiw/react-md-editor
- **開発**: TypeScript 5.0, ESLint
- **デプロイ**: Vercel

### アプリケーション構成
- **パブリックルート**: 記事一覧、記事詳細、カテゴリフィルタリング
- **管理者ルート**: 認証、記事CRUD、ダッシュボード
- **APIルート**: 記事管理、認証エンドポイント
- **データベース**: UUID主キーを持つ単一の`posts`テーブル

### 主要機能
- 管理者専用コンテンツ管理（ユーザー登録なし）
- ライブプレビュー付きMarkdownベース記事作成
- カテゴリベースコンテンツ整理（ニュース、コラム、インタビュー、アンケート企画）
- ドラフト/公開ステータス管理
- SEO最適化された静的生成

## URL構成

### パブリックルート
- `/` - 記事一覧付きホームページ
- `/posts/[id]` - 記事詳細ページ
- `/category/[category]` - カテゴリ別記事一覧

### 管理者ルート
- `/admin/login` - 管理者認証
- `/admin/dashboard` - 記事管理ダッシュボード
- `/admin/posts/new` - 新規記事作成
- `/admin/posts/[id]` - 記事編集

## データベーススキーマ

### postsテーブル
```sql
posts {
  id: UUID (Primary Key)
  title: VARCHAR(255) NOT NULL
  content: TEXT NOT NULL (Markdown)
  category: VARCHAR(50) NOT NULL
  status: ENUM('draft', 'published') DEFAULT 'draft'
  published_at: TIMESTAMP
  created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  updated_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  author_id: UUID
}
```

## 開発コマンド

プロジェクトセットアップ後の典型的なコマンド：
```bash
npm run dev          # 開発サーバー起動
npm run build        # 本番環境向けビルド
npm run start        # 本番サーバー起動
npm run lint         # ESLint実行
npm run type-check   # TypeScript型チェック実行
```

## 開発優先順位

1. **Phase 1**: 基本セットアップ（Next.js、データベース、認証、記事CRUD）
2. **Phase 2**: フロントエンド実装（記事一覧、詳細、カテゴリ）
3. **Phase 3**: 最適化（SEO、パフォーマンス、エラーハンドリング）

## 認証とセキュリティ

### 管理者認証の実装方針
1. **NextAuth.js設定**:
   - `/app/api/auth/[...nextauth]/route.ts`にNextAuth設定ファイルを作成
   - CredentialsProviderで管理者認証を実装
   - 環境変数`ADMIN_USERNAME`と`ADMIN_PASSWORD`で管理者情報を管理

2. **ミドルウェアによる保護**:
   - `/middleware.ts`でルート保護を実装
   - `/admin/*`パスへのアクセスを認証チェック
   - 未認証の場合は`/admin/login`へリダイレクト

3. **環境変数設定**:
   ```
   NEXTAUTH_SECRET=ランダムな秘密鍵
   NEXTAUTH_URL=http://localhost:3000
   ADMIN_USERNAME=管理者ユーザー名
   ADMIN_PASSWORD=管理者パスワード
   ```

4. **セッション管理**:
   - JWTトークンベースのセッション
   - 24時間の有効期限
   - セキュアなクッキー設定

## 実装済み機能（2025-09-07時点）

### ✅ Phase 1: 基本セットアップ（完了）
1. **データベース基盤**
   - Supabaseプロジェクト接続完了
   - postsテーブル作成（UUID、カテゴリ、ステータス管理）
   - RLS設定（開発用）

2. **認証システム**
   - NextAuth.js導入・設定完了
   - 管理者ログイン機能（`/admin/login`）
   - ミドルウェアによるルート保護（`/admin/*`）
   - セッション管理（JWT、24時間有効期限）

3. **管理者機能**
   - 記事管理ダッシュボード（`/admin`）
   - 記事CRUD機能（作成・編集・削除・公開）
   - Markdownエディタ統合（@uiw/react-md-editor）
   - ライブプレビュー機能

### ✅ Phase 2: パブリック機能（完了）
1. **記事一覧表示**
   - ホームページ（`/`）での公開記事一覧表示
   - 記事カードコンポーネント（PostCard.tsx）
   - カテゴリ別カラーコーディング
   - レスポンシブデザイン対応
   - クリック可能な記事カード

2. **記事詳細表示**
   - 記事詳細ページ（`/posts/[id]`）
   - Markdown記事内容表示（react-markdown + remark-gfm）
   - パンくずナビゲーション
   - SEOメタデータ生成

3. **関連記事機能**
   - 同カテゴリ記事から関連記事表示
   - 現在記事を除外した最大3件表示
   - Suspense境界でローディング状態管理

4. **ナビゲーション**
   - サイトヘッダー（Header.tsx）
   - カテゴリナビゲーション

### ✅ Phase 3: コード品質向上（完了）
1. **共通ユーティリティ関数**
   - `lib/utils.ts`に共通関数集約
   - カテゴリラベル・色管理の一元化
   - Markdownクリーニング関数
   - 日付フォーマット関数
   - 重複コード排除（DRY原則適用）

2. **TypeScript最適化**
   - 型安全性向上
   - Next.js 15対応（async params処理）
   - 厳密な型チェック実装

### 🚧 未実装機能
1. **カテゴリページ**
   - `/category/[category]`ページ実装
   - カテゴリ別フィルタリング機能

2. **最適化・追加機能**
   - 画像アップロード機能
   - 検索機能
   - ページネーション
   - コメント・いいね機能
   - アンケート機能

## 重要な注意事項

- 管理者中心でユーザー登録システムなし
- 全記事はMarkdown形式で記述
- モバイル学生向けレスポンシブデザイン重視
- コンテンツ発見のためSEO最適化が重要
- 将来拡張予定: 画像アップロード、アンケート、コメント、いいね機能
- **開発環境ではRLS無効化中** - 本番前に必ず有効化すること