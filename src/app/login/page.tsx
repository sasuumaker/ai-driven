import { Suspense } from 'react'
import { Header } from '@/components/common/Header'
import { LoginForm } from '@/components/auth/LoginForm'

function LoginContent({ searchParams }: { searchParams: { message?: string } }) {
  return (
    <>
      {searchParams.message && (
        <div className="mb-6 bg-pastel-mint/10 border border-pastel-mint/50 text-pastel-mint px-4 py-3 rounded-lg text-sm text-center">
          {searchParams.message}
        </div>
      )}
      <LoginForm />
    </>
  )
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>
}) {
  const params = await searchParams

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">ログイン</h1>
            <p className="text-gray-400">
              診断履歴を保存・閲覧できます
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-8">
            <Suspense fallback={<div className="text-center text-gray-400">読み込み中...</div>}>
              <LoginContent searchParams={params} />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  )
}
