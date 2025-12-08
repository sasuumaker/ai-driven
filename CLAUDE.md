# AI職業診断アプリ - Claude Code設定

## プロジェクト概要
MBTI性格診断形式でAI時代の職業を提案するWebアプリケーション

## 技術スタック
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- React 19

## ディレクトリ構造
```
ai-driven/
├── src/
│   ├── app/          # App Router ページ
│   ├── components/   # UIコンポーネント
│   ├── contexts/     # React Context
│   ├── data/         # 静的JSONデータ
│   ├── lib/          # ユーティリティ関数
│   └── types/        # TypeScript型定義
├── docs/             # 設計ドキュメント
│   ├── SPECIFICATIONS.md   # 機能仕様書
│   ├── ARCHITECTURE.md     # アーキテクチャ設計
│   ├── DATABASE_SCHEMA.md  # データスキーマ
│   └── DEVELOPMENT_PLAN.md # 開発計画
└── public/           # 静的アセット
```

## 開発コマンド
```bash
npm run dev    # 開発サーバー起動
npm run build  # 本番ビルド
npm run lint   # Lint実行
```

## 作業ルール

### セッション開始時
1. `./init.sh` を実行して環境確認
2. `claude-progress.txt` で前回の作業内容を確認
3. `features.json` から次のタスクを選定

### セッション終了時
1. `claude-progress.txt` を更新（完了タスク + 次回引継ぎ）
2. `features.json` のpassedを更新（完了した機能）
3. コミットを作成

## デザインガイドライン

### カラーパレット
- 背景: #FFFFFF (白), #F8F9FA (薄グレー)
- プライマリ: #A8D5BA (ミントグリーン)
- セカンダリ: #FFB7B2 (コーラルピンク)
- アクセント: #FFDAC1, #B5EAD7, #C7CEEA, #E2F0CB

### トーン
- カジュアル・エンタメ寄り
- 親しみやすく明るい雰囲気
- 白背景 × パステルカラー

## 主要機能
1. **診断機能**: 60問の質問（5軸×12問）
2. **結果表示**: 32パターン（16MBTI × A/T）
3. **Xシェア**: 結果をTwitterでシェア

## 参照ドキュメント
- 機能仕様: `/docs/SPECIFICATIONS.md`
- アーキテクチャ: `/docs/ARCHITECTURE.md`
- 開発計画: `/docs/DEVELOPMENT_PLAN.md`
