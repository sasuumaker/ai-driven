import { createClient } from '@/lib/supabase/server';
import { ResultContent } from './ResultContent';

interface ResultPageProps {
  params: Promise<{ type: string }>;
}

export default async function ResultPage({ params }: ResultPageProps) {
  const { type } = await params;

  // サーバーサイドでユーザー情報を取得
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return <ResultContent type={type} initialUser={user} />;
}
