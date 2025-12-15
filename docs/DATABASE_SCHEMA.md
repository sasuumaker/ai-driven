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

---

## 7. Supabase データベーススキーマ（認証・履歴機能）

### 7.1 profiles テーブル

ユーザープロファイル情報を管理。`auth.users` と連携。

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_profiles_email ON profiles(email);
```

| カラム | 型 | 必須 | 説明 |
|--------|-----|------|------|
| id | UUID | Yes | auth.users.id への外部キー |
| email | TEXT | No | ユーザーメールアドレス |
| display_name | TEXT | No | 表示名 |
| created_at | TIMESTAMP | Yes | 作成日時 |
| updated_at | TIMESTAMP | Yes | 更新日時 |

### 7.2 diagnosis_history テーブル

診断履歴を保存。

```sql
CREATE TABLE diagnosis_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mbti_type VARCHAR(10) NOT NULL,
  job_name TEXT NOT NULL,
  axis_results JSONB,
  diagnosed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_diagnosis_history_user_id ON diagnosis_history(user_id);
CREATE INDEX idx_diagnosis_history_diagnosed_at ON diagnosis_history(diagnosed_at DESC);
```

| カラム | 型 | 必須 | 説明 |
|--------|-----|------|------|
| id | UUID | Yes | 主キー（自動生成） |
| user_id | UUID | Yes | ユーザーID |
| mbti_type | VARCHAR(10) | Yes | 診断結果（例: "ENFJ-A"） |
| job_name | TEXT | Yes | AI職業名 |
| axis_results | JSONB | No | 各軸の詳細スコア |
| diagnosed_at | TIMESTAMP | Yes | 診断日時 |

#### axis_results JSONB 構造

```json
[
  {
    "axis": "EI",
    "primary": "E",
    "secondary": "I",
    "percentage": 65
  },
  {
    "axis": "SN",
    "primary": "N",
    "secondary": "S",
    "percentage": 72
  }
]
```

### 7.3 Row Level Security (RLS) ポリシー

```sql
-- profiles テーブル
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- diagnosis_history テーブル
ALTER TABLE diagnosis_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own history"
  ON diagnosis_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own history"
  ON diagnosis_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own history"
  ON diagnosis_history FOR DELETE
  USING (auth.uid() = user_id);
```

### 7.4 トリガー（自動プロファイル作成）

新規ユーザー登録時に自動的に profiles レコードを作成。

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 7.5 TypeScript 型定義

```typescript
// /src/types/auth.ts

export interface Profile {
  id: string;
  email: string | null;
  display_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface DiagnosisHistory {
  id: string;
  user_id: string;
  mbti_type: string;
  job_name: string;
  axis_results: AxisResult[] | null;
  diagnosed_at: string;
}
```

---

## 8. 将来のデータベース移行計画

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
