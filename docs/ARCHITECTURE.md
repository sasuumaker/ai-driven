# AI職業診断アプリ システムアーキテクチャ

## 1. 技術スタック

### 1.1 フロントエンド
| 技術 | バージョン | 用途 |
|------|-----------|------|
| Next.js | 14.x | Reactフレームワーク（App Router） |
| React | 18.x | UIライブラリ |
| TypeScript | 5.x | 型安全な開発 |
| Tailwind CSS | 3.x | スタイリング |

### 1.2 状態管理
| 技術 | 用途 |
|------|------|
| React Context | 診断の回答状態管理 |
| useState/useReducer | ローカル状態管理 |

### 1.3 データ管理
| 技術 | 用途 |
|------|------|
| JSON ファイル | 質問データ、職業データの静的管理 |
| TypeScript 型定義 | データ構造の型安全性確保 |

### 1.4 その他
| 技術 | 用途 |
|------|------|
| next/font | Webフォント最適化 |
| next/image | 画像最適化 |
| Vercel | ホスティング（推奨） |

---

## 2. ディレクトリ構成

```
ai-driven/
├── docs/                          # ドキュメント
│   ├── SPECIFICATIONS.md
│   ├── ARCHITECTURE.md
│   ├── DATABASE_SCHEMA.md
│   ├── DEVELOPMENT_PLAN.md
│   └── AI_JOBS.md
│
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── layout.tsx            # ルートレイアウト
│   │   ├── page.tsx              # トップページ
│   │   ├── globals.css           # グローバルスタイル
│   │   │
│   │   ├── quiz/
│   │   │   └── page.tsx          # 診断ページ
│   │   │
│   │   └── result/
│   │       └── [type]/
│   │           └── page.tsx      # 結果ページ（動的ルート）
│   │
│   ├── components/               # UIコンポーネント
│   │   ├── common/              # 共通コンポーネント
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── Header.tsx
│   │   │
│   │   ├── quiz/                # 診断関連コンポーネント
│   │   │   ├── QuestionCard.tsx
│   │   │   ├── AnswerOptions.tsx
│   │   │   ├── QuizProgress.tsx
│   │   │   └── EncouragementMessage.tsx
│   │   │
│   │   └── result/              # 結果関連コンポーネント
│   │       ├── ResultHeader.tsx
│   │       ├── JobCard.tsx
│   │       ├── SkillsList.tsx
│   │       ├── AptitudeSection.tsx
│   │       ├── TypeBreakdown.tsx
│   │       └── ShareButton.tsx
│   │
│   ├── contexts/                # React Context
│   │   └── QuizContext.tsx      # 診断状態管理
│   │
│   ├── hooks/                   # カスタムフック
│   │   ├── useQuiz.ts          # 診断ロジック
│   │   └── useShare.ts         # シェア機能
│   │
│   ├── data/                    # 静的データ（JSON）
│   │   ├── questions.json       # 60問の質問データ
│   │   ├── jobs.json           # 32種類のAI職業データ
│   │   └── types.json          # MBTIタイプ情報
│   │
│   ├── lib/                     # ユーティリティ
│   │   ├── calculateResult.ts  # 結果計算ロジック
│   │   ├── constants.ts        # 定数
│   │   └── utils.ts            # 汎用ユーティリティ
│   │
│   └── types/                   # TypeScript型定義
│       ├── quiz.ts             # 診断関連の型
│       ├── job.ts              # 職業関連の型
│       └── mbti.ts             # MBTIタイプの型
│
├── public/                      # 静的ファイル
│   ├── images/
│   │   ├── logo.svg
│   │   └── og-image.png
│   └── favicon.ico
│
├── tailwind.config.ts          # Tailwind設定
├── next.config.js              # Next.js設定
├── tsconfig.json               # TypeScript設定
├── package.json
└── README.md
```

---

## 3. コンポーネント設計

### 3.1 コンポーネント階層図

```
App (layout.tsx)
├── Header
│
├── TopPage (page.tsx)
│   ├── HeroSection
│   ├── FeatureList
│   └── Button (CTA)
│
├── QuizPage (quiz/page.tsx)
│   ├── QuizProgress
│   │   └── ProgressBar
│   ├── QuestionCard
│   │   ├── QuestionText
│   │   └── AnswerOptions
│   │       └── AnswerButton (×5)
│   ├── NavigationButtons
│   └── EncouragementMessage
│
└── ResultPage (result/[type]/page.tsx)
    ├── ResultHeader
    │   ├── TypeBadge
    │   └── TypeNickname
    ├── JobCard
    │   ├── JobTitle
    │   ├── JobDescription
    │   ├── SkillsList
    │   └── FutureProspect
    ├── AptitudeSection
    │   ├── StrengthsList
    │   └── WorkStyleList
    ├── TypeBreakdown
    │   └── AxisScore (×5)
    └── ShareSection
        ├── ShareButton (X)
        └── RetryButton
```

### 3.2 主要コンポーネント仕様

#### QuestionCard
```typescript
interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  onAnswer: (score: number) => void;
}
```

#### AnswerOptions
```typescript
interface AnswerOptionsProps {
  options: AnswerOption[];
  selectedValue: number | null;
  onSelect: (value: number) => void;
}

interface AnswerOption {
  label: string;
  value: number; // -2, -1, 0, 1, 2
}
```

#### JobCard
```typescript
interface JobCardProps {
  job: AIJob;
}

interface AIJob {
  id: string;
  name: string;
  description: string;
  skills: string[];
  futureProspect: 'high' | 'medium' | 'low';
  futureProspectDescription: string;
}
```

---

## 4. 状態管理

### 4.1 QuizContext

診断の回答状態を管理するContext。

```typescript
interface QuizState {
  currentQuestion: number;
  answers: Answer[];
  isCompleted: boolean;
}

interface Answer {
  questionId: number;
  axis: 'EI' | 'SN' | 'TF' | 'JP' | 'AT';
  value: number; // -2 ~ 2
}

interface QuizContextValue {
  state: QuizState;
  answerQuestion: (answer: Answer) => void;
  goToPrevious: () => void;
  goToNext: () => void;
  resetQuiz: () => void;
  calculateResult: () => MBTIType;
}
```

### 4.2 状態遷移図

```
[初期状態]
    │ startQuiz()
    ▼
[質問中] ←─────────────┐
    │                  │
    │ answerQuestion() │
    ▼                  │
[次の質問へ] ──────────┘
    │
    │ (60問完了)
    ▼
[結果計算中]
    │ calculateResult()
    ▼
[結果表示]
    │
    │ resetQuiz()
    ▼
[初期状態]
```

---

## 5. データフロー

### 5.1 診断フロー

```
1. ユーザーが診断開始
   ↓
2. questions.json から質問データを取得
   ↓
3. 質問を1問ずつ表示
   ↓
4. ユーザーが回答を選択
   ↓
5. QuizContext に回答を保存
   ↓
6. 60問完了後、calculateResult() を実行
   ↓
7. 各軸のスコアを集計
   ↓
8. MBTIタイプを判定（例: ENFJ-A）
   ↓
9. jobs.json から該当する職業データを取得
   ↓
10. 結果ページへ遷移・表示
```

### 5.2 スコア計算ロジック

```typescript
// 各軸のスコア計算
function calculateAxisScore(answers: Answer[], axis: string): {
  primary: string;
  percentage: number;
} {
  const axisAnswers = answers.filter(a => a.axis === axis);
  const totalScore = axisAnswers.reduce((sum, a) => sum + a.value, 0);

  // スコアをパーセンテージに変換
  const maxScore = axisAnswers.length * 2; // 最大スコア
  const percentage = ((totalScore + maxScore) / (maxScore * 2)) * 100;

  // 50%以上なら第1要素、未満なら第2要素
  const primary = percentage >= 50
    ? axis[0]  // E, S, T, J, A
    : axis[1]; // I, N, F, P, T

  return { primary, percentage };
}
```

---

## 6. API設計

### 6.1 静的データ構造

本アプリはバックエンドAPIを持たず、静的JSONファイルでデータを管理する。

#### /src/data/questions.json
```json
{
  "questions": [
    {
      "id": 1,
      "axis": "EI",
      "text": "大勢の人がいるパーティーでエネルギーを感じる",
      "direction": "positive"
    }
  ]
}
```

#### /src/data/jobs.json
```json
{
  "jobs": {
    "ENFJ-A": {
      "id": "enfj-a",
      "name": "AIコミュニティマネージャー",
      "description": "...",
      "skills": ["コミュニケーション", "リーダーシップ"],
      "futureProspect": "high",
      "futureProspectDescription": "...",
      "aptitudes": {
        "strengths": ["管理能力が高い", "..."],
        "workStyles": ["チームをリードする立場", "..."]
      }
    }
  }
}
```

---

## 7. パフォーマンス最適化

### 7.1 Next.js の最適化機能活用
- **Static Generation**: 結果ページを事前生成
- **Image Optimization**: next/image による画像最適化
- **Font Optimization**: next/font によるフォント最適化
- **Code Splitting**: 自動的なコード分割

### 7.2 実装上の最適化
- 質問データの遅延読み込み（不要な場合）
- React.memo によるコンポーネントの再レンダリング防止
- useMemo/useCallback の適切な使用

### 7.3 バンドルサイズ
- 目標: 初回ロード < 100KB（gzip後）
- 不要な依存関係の排除
- Tree Shaking の活用

---

## 8. デプロイ構成

### 8.1 推奨構成（Vercel）

```
GitHub Repository
    │
    │ push
    ▼
Vercel (自動デプロイ)
    │
    ├── Production: main ブランチ
    └── Preview: 各PRごとにプレビュー環境
```

### 8.2 環境変数

```env
# .env.local
NEXT_PUBLIC_SITE_URL=https://ai-career-finder.vercel.app
NEXT_PUBLIC_OG_IMAGE_URL=https://ai-career-finder.vercel.app/og-image.png
```

---

## 9. セキュリティ考慮事項

### 9.1 フロントエンドセキュリティ
- XSS対策: Reactの自動エスケープ機能を活用
- CSP（Content Security Policy）の設定
- HTTPS強制

### 9.2 データ保護
- ユーザーの回答データはブラウザ内でのみ処理
- サーバーへの送信なし
- ローカルストレージへの保存なし（プライバシー配慮）
