import { redirect } from 'next/navigation'
import { Header } from '@/components/common/Header'
import { ProfileCard } from '@/components/mypage/ProfileCard'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function MyPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?next=/mypage')
  }

  // プロフィール情報を取得
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // 診断履歴の件数を取得
  const { count: historyCount } = await supabase
    .from('diagnosis_history')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">マイページ</h1>
            <p className="text-gray-400">アカウント情報と診断履歴を管理できます</p>
          </div>

          <div className="space-y-6">
            {/* プロフィールカード */}
            <ProfileCard
              email={user.email || ''}
              displayName={profile?.display_name}
              createdAt={user.created_at}
            />

            {/* メニューカード */}
            <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">メニュー</h2>
              <div className="space-y-3">
                <Link
                  href="/history"
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pastel-mint/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-pastel-mint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-white">診断履歴</p>
                      <p className="text-sm text-gray-400">{historyCount || 0}件の診断結果</p>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                <Link
                  href="/quiz"
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pastel-coral/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-pastel-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-white">新しい診断を始める</p>
                      <p className="text-sm text-gray-400">AI時代の適職を診断</p>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* ログアウトボタン */}
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gray-800 border border-gray-700 text-gray-300 font-medium rounded-xl hover:bg-gray-700 hover:text-white transition-colors"
              >
                ログアウト
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
