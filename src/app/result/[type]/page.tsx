import { createClient } from '@/lib/supabase/server';
import { ResultContent } from './ResultContent';

interface ResultPageProps {
  params: Promise<{ type: string }>;
}

export default async function ResultPage({ params }: ResultPageProps) {
  const { type } = await params;

  let user = null;

  try {
    // サーバーサイドでユーザー情報を取得
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data?.user ?? null;
  } catch (error) {
    // Supabase環境変数が設定されていない場合はスキップ
    console.error('Failed to get user:', error);
  }

  return <ResultContent type={type} initialUser={user} />;
}
