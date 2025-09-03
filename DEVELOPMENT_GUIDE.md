# 開発ガイド - 同志社メディアアプリ

## 🚀 プロジェクト立ち上げ手順

### 1. リポジトリのクローン
```bash
git clone [repository-url]
cd Doshisha-Media-App/doshisha-media-app
```

### 2. パッケージインストール
```bash
npm install
```

### 3. Supabaseプロジェクトセットアップ
1. [Supabase](https://supabase.com)でアカウント作成
2. 新規プロジェクト作成
3. SQL Editorで`IMPLEMENTATION_LOG.md`記載のSQLを実行

### 4. 環境変数設定
`.env.local`ファイルを作成：
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# NextAuth
NEXTAUTH_SECRET=generate_random_32_chars
NEXTAUTH_URL=http://localhost:3000

# 管理者認証
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
```

### 5. 開発サーバー起動
```bash
npm run dev
```

## 📂 ディレクトリ構造と役割

```
doshisha-media-app/
├── app/                        # Next.js App Router
│   ├── api/                   # APIルート
│   │   ├── auth/              # 認証エンドポイント
│   │   └── posts/             # 記事API（未実装）
│   ├── admin/                 # 管理者用ページ
│   │   ├── login/            # ログインページ
│   │   ├── dashboard/        # ダッシュボード（未実装）
│   │   └── posts/            # 記事管理（未実装）
│   ├── posts/                 # 公開記事ページ（未実装）
│   └── category/              # カテゴリ別表示（未実装）
├── lib/                       # ユーティリティ
│   ├── supabase.ts           # DBクライアント
│   └── auth.ts               # 認証ヘルパー
├── types/                     # TypeScript型定義
├── components/                # 再利用可能コンポーネント（未実装）
└── middleware.ts             # 認証ミドルウェア
```

## 🔐 認証フロー

1. **未認証ユーザーが`/admin`にアクセス**
   - ミドルウェアが認証チェック
   - `/admin/login`にリダイレクト

2. **ログイン処理**
   - 環境変数の認証情報と照合
   - JWTトークン生成（24時間有効）
   - 元のページにリダイレクト

3. **認証済みユーザー**
   - `/admin`配下の全ページにアクセス可能
   - セッション情報はJWTで管理

## 🗄️ データベース操作

### 記事の取得（例）
```typescript
import { supabase } from '@/lib/supabase'

// 公開記事一覧
const { data: posts } = await supabase
  .from('posts')
  .select('*')
  .eq('status', 'published')
  .order('published_at', { ascending: false })

// 特定カテゴリの記事
const { data: newsPosts } = await supabase
  .from('posts')
  .select('*')
  .eq('category', 'news')
  .eq('status', 'published')
```

### 記事の作成（例）
```typescript
const { data, error } = await supabase
  .from('posts')
  .insert({
    title: '記事タイトル',
    content: 'Markdown形式のコンテンツ',
    category: 'news',
    status: 'draft'
  })
  .select()
```

## 🎨 スタイリング規則

- **Tailwind CSS**を使用
- レスポンシブデザイン優先
- モバイルファースト設計
- カラースキーム：
  - Primary: Indigo (`bg-indigo-600`)
  - Secondary: Gray (`bg-gray-50`)
  - Error: Red (`bg-red-50`)

## 🧪 テスト手順

### データベース接続テスト
```bash
# ブラウザでアクセス
http://localhost:3000/api/test-db
```

### 認証テスト
1. `/admin`にアクセス
2. ログインページにリダイレクトされることを確認
3. 正しい認証情報でログイン
4. `/admin`に戻ることを確認

## 🚨 トラブルシューティング

### RLSエラー
```
Error: new row violates row-level security policy
```
**解決策**: Supabase SQL Editorで実行
```sql
ALTER TABLE posts DISABLE ROW LEVEL SECURITY;
```

### 無限リダイレクト
**原因**: ミドルウェア設定の問題
**確認**: `/middleware.ts`で`/admin/login`が除外されているか確認

### TypeScriptエラー
**原因**: 型定義の不足
**解決**: `/types/next-auth.d.ts`で型拡張

## 📋 開発チェックリスト

### 新機能追加時
- [ ] TypeScript型定義を追加
- [ ] エラーハンドリングを実装
- [ ] モバイルレスポンシブ確認
- [ ] 認証が必要な場合はミドルウェアで保護

### コミット前
- [ ] `npm run build`でビルドエラーがないか確認
- [ ] `npm run lint`でLintエラーがないか確認
- [ ] 環境変数が`.env.local.example`に記載されているか

## 🔄 Git運用

### ブランチ戦略
- `main`: 本番環境
- `develop`: 開発環境
- `feature/*`: 機能開発
- `fix/*`: バグ修正

### コミットメッセージ規則
```
feat: 新機能追加
fix: バグ修正
docs: ドキュメント更新
style: スタイル変更
refactor: リファクタリング
test: テスト追加
chore: その他の変更
```

## 🎯 次のステップ推奨順序

1. **管理者ダッシュボード作成**
   - `/app/admin/page.tsx`
   - 記事一覧表示

2. **記事作成機能**
   - `/app/admin/posts/new/page.tsx`
   - Markdownエディタ導入

3. **記事編集・削除**
   - `/app/admin/posts/[id]/page.tsx`
   - CRUD完成

4. **パブリックページ**
   - トップページ
   - 記事詳細
   - カテゴリ表示

5. **最適化**
   - SEO対策
   - パフォーマンス改善
   - エラーハンドリング強化