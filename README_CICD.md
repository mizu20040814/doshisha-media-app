# CI/CD セットアップガイド

## 概要
このプロジェクトでは、GitHub ActionsによるCI/CDパイプラインを実装しています。

## 必要なSecrets設定

GitHub リポジトリの Settings > Secrets and variables > Actions で以下のシークレットを設定してください：

### 必須のSecrets
- `NEXT_PUBLIC_SUPABASE_URL`: SupabaseプロジェクトのURL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabaseの匿名キー
- `SUPABASE_SERVICE_KEY`: Supabaseのサービスキー

### Vercelデプロイ用（オプション）
- `VERCEL_TOKEN`: Vercelのアクセストークン
- `VERCEL_ORG_ID`: Vercelの組織ID
- `VERCEL_PROJECT_ID`: VercelのプロジェクトID

### Codecov用（オプション）
- `CODECOV_TOKEN`: Codecovのトークン（カバレッジレポート用）

## ワークフロー

### 1. CI/CD Pipeline (`ci.yml`)
メインのワークフローで、以下のジョブを実行：

#### Test Job
- Lintチェック
- TypeScript型チェック
- ユニットテスト実行
- カバレッジレポート生成

#### Build Job
- Next.jsアプリケーションのビルド
- ビルド成果物の保存

#### Deploy Jobs
- **Preview Deploy**: PRに対してプレビュー環境へデプロイ
- **Production Deploy**: mainブランチへのマージ時に本番環境へデプロイ

### 2. PR Checks (`pr-checks.yml`)
プルリクエスト時の追加チェック：
- Danger JS（コードレビュー自動化）
- バンドルサイズチェック
- Lighthouse CI（パフォーマンス測定）

## ローカルでのテスト実行

```bash
# テスト環境のセットアップ
cd doshisha-media-app
npm install

# テスト実行
npm test

# カバレッジ付きテスト
npm run test:coverage

# ウォッチモード
npm run test:watch
```

## ブランチ戦略

推奨されるGit Flow：
- `main`: 本番環境ブランチ
- `develop`: 開発環境ブランチ
- `feature/*`: 機能開発ブランチ
- `hotfix/*`: 緊急修正ブランチ

## トラブルシューティング

### テストが失敗する場合
1. 環境変数が正しく設定されているか確認
2. `node_modules`を削除して`npm install`を再実行
3. テストファイルのモック設定を確認

### GitHub Actionsが失敗する場合
1. Secretsが正しく設定されているか確認
2. ワークフローファイルのパスが正しいか確認
3. Node.jsのバージョンが一致しているか確認

## 今後の改善点

- [ ] E2Eテスト（Playwright）の追加
- [ ] Huskyによるpre-commitフックの設定
- [ ] Prettierの導入と自動フォーマット
- [ ] SonarCloudによるコード品質分析
- [ ] Slack通知の設定