# AI職業診断アプリ データ構造設計

## 概要

本アプリケーションはバックエンドデータベースを使用せず、静的JSONファイルでデータを管理する。
将来的にCMS機能が必要になった場合は、Supabaseなどへの移行を検討する。

---

## 1. データファイル一覧

| ファイル | 用途 | 場所 |
|----------|------|------|
| questions.json | 60問の質問データ | /src/data/questions.json |
| jobs.json | 32種類のAI職業データ | /src/data/jobs.json |
| types.json | MBTIタイプ基本情報 | /src/data/types.json |

---

## 2. questions.json スキーマ

### 2.1 構造

```json
{
  "version": "1.0.0",
  "lastUpdated": "2024-01-01",
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

### 2.2 フィールド定義

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| version | string | Yes | データバージョン |
| lastUpdated | string | Yes | 最終更新日（YYYY-MM-DD） |
| questions | Question[] | Yes | 質問配列 |

#### Question オブジェクト

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| id | number | Yes | 質問ID（1-60） |
| axis | string | Yes | 測定する軸（"EI", "SN", "TF", "JP", "AT"） |
| text | string | Yes | 質問文 |
| direction | string | Yes | スコア方向（"positive" or "negative"） |

### 2.3 direction の説明

- `positive`: 同意するとE, S, T, J, A側にスコアが加算
- `negative`: 同意するとI, N, F, P, T側にスコアが加算

### 2.4 サンプルデータ

```json
{
  "version": "1.0.0",
  "lastUpdated": "2024-01-01",
  "questions": [
    {
      "id": 1,
      "axis": "EI",
      "text": "大勢の人がいるパーティーでエネルギーを感じる",
      "direction": "positive"
    },
    {
      "id": 2,
      "axis": "EI",
      "text": "一人で過ごす時間が自分を回復させる",
      "direction": "negative"
    },
    {
      "id": 13,
      "axis": "SN",
      "text": "具体的な事実やデータに基づいて判断する",
      "direction": "positive"
    },
    {
      "id": 14,
      "axis": "SN",
      "text": "直感やひらめきを大切にする",
      "direction": "negative"
    },
    {
      "id": 25,
      "axis": "TF",
      "text": "決断する時は論理的な分析を重視する",
      "direction": "positive"
    },
    {
      "id": 26,
      "axis": "TF",
      "text": "人の気持ちを考慮して決断する",
      "direction": "negative"
    },
    {
      "id": 37,
      "axis": "JP",
      "text": "計画を立ててから行動するのが好き",
      "direction": "positive"
    },
    {
      "id": 38,
      "axis": "JP",
      "text": "状況に応じて柔軟に対応するのが好き",
      "direction": "negative"
    },
    {
      "id": 49,
      "axis": "AT",
      "text": "自分の能力に自信を持っている",
      "direction": "positive"
    },
    {
      "id": 50,
      "axis": "AT",
      "text": "失敗しないか心配になることが多い",
      "direction": "negative"
    }
  ]
}
```

---

## 3. jobs.json スキーマ

### 3.1 構造

```json
{
  "version": "1.0.0",
  "lastUpdated": "2024-01-01",
  "jobs": {
    "ENFJ-A": {
      "id": "enfj-a",
      "type": "ENFJ-A",
      "name": "AIコミュニティマネージャー",
      "description": "AIツールを活用してオンラインコミュニティを運営・活性化する職業。",
      "skills": ["コミュニケーション力", "リーダーシップ", "AI活用スキル"],
      "futureProspect": "high",
      "futureProspectDescription": "AIコミュニティの需要は急速に拡大中",
      "aptitudes": {
        "strengths": ["管理能力が高い", "人を巻き込む力がある"],
        "workStyles": ["チームをリードする立場", "人と関わる仕事"]
      }
    }
  }
}
```

### 3.2 フィールド定義

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| version | string | Yes | データバージョン |
| lastUpdated | string | Yes | 最終更新日 |
| jobs | Record<MBTIType, Job> | Yes | タイプ別職業データ |

#### Job オブジェクト

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| id | string | Yes | 職業ID（小文字ケバブケース） |
| type | string | Yes | MBTIタイプ（例: "ENFJ-A"） |
| name | string | Yes | AI職業名 |
| description | string | Yes | 職業の説明（100-200文字） |
| skills | string[] | Yes | 必要スキル（3-5項目） |
| futureProspect | string | Yes | 将来性（"high", "medium", "low"） |
| futureProspectDescription | string | Yes | 将来性の説明 |
| aptitudes | Aptitudes | Yes | 適性情報 |

#### Aptitudes オブジェクト

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| strengths | string[] | Yes | 強み・適性（3-5項目） |
| workStyles | string[] | Yes | 向いている仕事スタイル（2-3項目） |

---

## 4. types.json スキーマ

### 4.1 構造

```json
{
  "version": "1.0.0",
  "types": {
    "ENFJ": {
      "code": "ENFJ",
      "nickname": "主人公",
      "description": "カリスマ性があり、人々を鼓舞するリーダータイプ",
      "color": "#A8D5BA"
    }
  },
  "identities": {
    "A": {
      "code": "A",
      "name": "自己主張型",
      "description": "自信に満ち、ストレス耐性が高い"
    },
    "T": {
      "code": "T",
      "name": "慎重型",
      "description": "自己改善意欲が高く、完璧主義的傾向がある"
    }
  }
}
```

### 4.2 MBTIType オブジェクト

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| code | string | Yes | タイプコード（例: "ENFJ"） |
| nickname | string | Yes | タイプの愛称（例: "主人公"） |
| description | string | Yes | タイプの説明 |
| color | string | Yes | タイプのテーマカラー（HEX） |

### 4.3 Identity オブジェクト

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| code | string | Yes | アイデンティティコード（"A" or "T"） |
| name | string | Yes | 名称 |
| description | string | Yes | 説明 |

---

## 5. TypeScript 型定義

```typescript
// /src/types/quiz.ts

export type Axis = 'EI' | 'SN' | 'TF' | 'JP' | 'AT';
export type Direction = 'positive' | 'negative';
export type FutureProspect = 'high' | 'medium' | 'low';
export type Identity = 'A' | 'T';

export interface Question {
  id: number;
  axis: Axis;
  text: string;
  direction: Direction;
}

export interface QuestionsData {
  version: string;
  lastUpdated: string;
  questions: Question[];
}

// /src/types/job.ts

export interface Aptitudes {
  strengths: string[];
  workStyles: string[];
}

export interface AIJob {
  id: string;
  type: string;
  name: string;
  description: string;
  skills: string[];
  futureProspect: FutureProspect;
  futureProspectDescription: string;
  aptitudes: Aptitudes;
}

export interface JobsData {
  version: string;
  lastUpdated: string;
  jobs: Record<string, AIJob>;
}

// /src/types/mbti.ts

export type MBTICode =
  | 'ENFJ' | 'ENFP' | 'ENTJ' | 'ENTP'
  | 'ESFJ' | 'ESFP' | 'ESTJ' | 'ESTP'
  | 'INFJ' | 'INFP' | 'INTJ' | 'INTP'
  | 'ISFJ' | 'ISFP' | 'ISTJ' | 'ISTP';

export type MBTIType = `${MBTICode}-${Identity}`;

export interface MBTITypeInfo {
  code: MBTICode;
  nickname: string;
  description: string;
  color: string;
}

export interface IdentityInfo {
  code: Identity;
  name: string;
  description: string;
}

export interface TypesData {
  version: string;
  types: Record<MBTICode, MBTITypeInfo>;
  identities: Record<Identity, IdentityInfo>;
}

// /src/types/result.ts

export interface AxisResult {
  axis: Axis;
  primary: string;
  secondary: string;
  percentage: number;
}

export interface DiagnosisResult {
  type: MBTIType;
  axisResults: AxisResult[];
  job: AIJob;
  typeInfo: MBTITypeInfo;
  identityInfo: IdentityInfo;
}
```

---

## 6. データ整合性ルール

### 6.1 questions.json
- 質問数は必ず60問
- 各軸は12問ずつ（EI: 12, SN: 12, TF: 12, JP: 12, AT: 12）
- IDは1から60まで連番

### 6.2 jobs.json
- 32種類のMBTIタイプ全てに対応する職業が必要
- MBTIタイプのキー形式: `{MBTI}-{A|T}`（例: ENFJ-A, ENFJ-T）

### 6.3 types.json
- 16種類のMBTIタイプ全ての情報が必要
- A/T両方のアイデンティティ情報が必要

---

## 7. 将来のデータベース移行計画

将来的にCMS機能や管理画面が必要になった場合、以下の構成への移行を推奨:

### 7.1 Supabase構成（案）

```sql
-- 質問テーブル
CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  axis VARCHAR(2) NOT NULL,
  text TEXT NOT NULL,
  direction VARCHAR(10) NOT NULL,
  order_index INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 職業テーブル
CREATE TABLE jobs (
  id VARCHAR(10) PRIMARY KEY,
  mbti_type VARCHAR(10) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  future_prospect VARCHAR(10) NOT NULL,
  future_prospect_description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- スキルテーブル（多対多）
CREATE TABLE job_skills (
  id SERIAL PRIMARY KEY,
  job_id VARCHAR(10) REFERENCES jobs(id),
  skill VARCHAR(100) NOT NULL
);

-- 適性テーブル
CREATE TABLE job_aptitudes (
  id SERIAL PRIMARY KEY,
  job_id VARCHAR(10) REFERENCES jobs(id),
  type VARCHAR(20) NOT NULL, -- 'strength' or 'work_style'
  content TEXT NOT NULL
);
```

### 7.2 移行ステップ
1. Supabaseプロジェクト作成
2. テーブル作成
3. JSONデータをインポート
4. APIルート作成（または直接Supabase Client使用）
5. フロントエンドのデータ取得処理を変更
