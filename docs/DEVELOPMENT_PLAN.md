# AI職業診断アプリ 開発計画

## 概要

本ドキュメントは、AI職業診断Webアプリケーションの開発計画を定義する。

---

## 1. 開発フェーズ

### Phase 1: プロジェクト基盤構築

#### 1.1 環境セットアップ
- [ ] Next.js プロジェクト初期化（App Router）
- [ ] TypeScript 設定
- [ ] Tailwind CSS 設定
- [ ] ESLint / Prettier 設定
- [ ] ディレクトリ構造の作成

#### 1.2 デザインシステム構築
- [ ] Tailwind カラーパレット設定（パステルカラー）
- [ ] フォント設定（Noto Sans JP, Inter）
- [ ] 共通コンポーネント作成
  - [ ] Button
  - [ ] Card
  - [ ] ProgressBar
  - [ ] Header

---

### Phase 2: データ準備

#### 2.1 静的データファイル作成
- [ ] questions.json（60問の質問データ）
- [ ] jobs.json（32種類のAI職業データ）
- [ ] types.json（MBTIタイプ情報）

#### 2.2 TypeScript 型定義
- [ ] quiz.ts（診断関連の型）
- [ ] job.ts（職業関連の型）
- [ ] mbti.ts（MBTIタイプの型）

---

### Phase 3: コア機能実装

#### 3.1 状態管理
- [ ] QuizContext の実装
- [ ] 回答状態の管理
- [ ] 結果計算ロジック

#### 3.2 トップページ
- [ ] ヒーローセクション
- [ ] アプリ説明
- [ ] 診断開始ボタン（CTA）

#### 3.3 診断ページ
- [ ] QuestionCard コンポーネント
- [ ] AnswerOptions コンポーネント（5段階選択）
- [ ] QuizProgress コンポーネント
- [ ] 質問のナビゲーション（前へ/次へ）
- [ ] 10問ごとの励ましメッセージ
- [ ] 離脱防止の確認ダイアログ

#### 3.4 結果ページ
- [ ] ResultHeader コンポーネント
- [ ] JobCard コンポーネント
- [ ] SkillsList コンポーネント
- [ ] AptitudeSection コンポーネント
- [ ] TypeBreakdown コンポーネント（軸別スコア表示）

---

### Phase 4: シェア機能実装

#### 4.1 Xシェア機能
- [ ] ShareButton コンポーネント
- [ ] シェアテキスト生成ロジック
- [ ] Twitter Intent URL の構築

#### 4.2 OGP設定（基本）
- [ ] メタタグ設定
- [ ] 静的OGP画像の設置

---

### Phase 5: UI/UX 磨き込み

#### 5.1 アニメーション
- [ ] ページ遷移アニメーション
- [ ] プログレスバーアニメーション
- [ ] 回答選択時のフィードバック
- [ ] 結果表示時のアニメーション

#### 5.2 レスポンシブ対応
- [ ] モバイル最適化
- [ ] タブレット対応
- [ ] デスクトップ対応

#### 5.3 アクセシビリティ
- [ ] キーボードナビゲーション
- [ ] ARIA属性の設定
- [ ] コントラスト比の確認

---

### Phase 6: テスト & 最適化

#### 6.1 テスト
- [ ] コンポーネントテスト
- [ ] 結果計算ロジックのテスト
- [ ] E2Eテスト（診断フロー全体）

#### 6.2 パフォーマンス最適化
- [ ] Lighthouse スコア計測・改善
- [ ] バンドルサイズ最適化
- [ ] 画像最適化

---

### Phase 7: デプロイ

#### 7.1 本番環境構築
- [ ] Vercel プロジェクト作成
- [ ] 環境変数設定
- [ ] ドメイン設定（必要に応じて）

#### 7.2 リリース
- [ ] 本番デプロイ
- [ ] 動作確認
- [ ] モニタリング設定

---

## 2. タスク優先順位

### 高優先度（Must Have）
1. プロジェクト基盤構築
2. 60問の質問データ作成
3. 32種類のAI職業データ作成
4. 診断ロジック実装
5. 3画面（トップ/診断/結果）の基本実装
6. Xシェア機能

### 中優先度（Should Have）
7. プログレス表示
8. 励ましメッセージ
9. アニメーション
10. レスポンシブ対応
11. OGP設定

### 低優先度（Nice to Have）
12. 高度なアニメーション
13. アクセシビリティ完全対応
14. E2Eテスト
15. 分析機能

---

## 3. 実装順序

```
Week 1: 基盤構築
├── Day 1-2: プロジェクトセットアップ
├── Day 3-4: デザインシステム構築
└── Day 5-7: 共通コンポーネント作成

Week 2: データ & コア機能
├── Day 1-2: データファイル作成（質問・職業）
├── Day 3-4: 状態管理 & 診断ロジック
└── Day 5-7: トップページ実装

Week 3: 診断機能
├── Day 1-3: 診断ページ実装
├── Day 4-5: 結果ページ実装
└── Day 6-7: シェア機能実装

Week 4: 仕上げ
├── Day 1-2: アニメーション追加
├── Day 3-4: レスポンシブ対応
├── Day 5-6: テスト & バグ修正
└── Day 7: デプロイ
```

---

## 4. 技術的な実装メモ

### 4.1 質問のシャッフル
ユーザー体験向上のため、質問の表示順をシャッフルすることを検討。
ただし、各軸のバランスを保つため、軸ごとにグループ化してシャッフル。

```typescript
// 軸ごとにシャッフルして混ぜる例
function shuffleQuestions(questions: Question[]): Question[] {
  const grouped = groupBy(questions, 'axis');
  const shuffledGroups = Object.values(grouped).map(shuffle);
  return interleave(shuffledGroups);
}
```

### 4.2 離脱防止
60問と長いため、途中離脱を防ぐ仕組みが重要。

```typescript
// beforeunloadイベントで確認
useEffect(() => {
  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    if (currentQuestion > 0 && !isCompleted) {
      e.preventDefault();
      e.returnValue = '';
    }
  };
  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
}, [currentQuestion, isCompleted]);
```

### 4.3 結果URLの永続化
結果ページを直接アクセス可能にするため、動的ルートを使用。

```
/result/ENFJ-A  ← タイプをURLに含める
```

ただし、軸別のスコア詳細は表示しない（URLパラメータが長くなるため）。
詳細スコアが必要な場合は、再診断を促す。

### 4.4 Xシェア実装

```typescript
function shareToX(result: DiagnosisResult) {
  const text = encodeURIComponent(
    `AI職業診断の結果、私は【${result.job.name}】でした！\n` +
    `タイプ: ${result.type}（${result.typeInfo.nickname}）\n` +
    `#AI職業診断 #MBTI`
  );
  const url = encodeURIComponent(
    `${process.env.NEXT_PUBLIC_SITE_URL}/result/${result.type}`
  );
  window.open(
    `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    '_blank'
  );
}
```

---

## 5. リスクと対策

| リスク | 影響 | 対策 |
|--------|------|------|
| 60問は長すぎて離脱が多い | 高 | 励ましメッセージ、プログレス表示、UX改善 |
| 職業データの質が低い | 高 | 事前にレビュー、ユーザーテストで改善 |
| スマホでの操作性が悪い | 中 | モバイルファーストで設計 |
| OGP画像が動的に生成できない | 低 | 静的OGP画像で対応、後から改善 |

---

## 6. 成功指標（参考）

| 指標 | 目標値 |
|------|--------|
| 診断完了率 | 60%以上 |
| シェア率 | 20%以上 |
| Lighthouseスコア | 90以上 |
| 初回ロード時間 | 3秒以内 |
