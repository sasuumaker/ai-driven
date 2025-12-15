import { Header } from '@/components/common/Header'
import { SignupForm } from '@/components/auth/SignupForm'

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">アカウント作成</h1>
            <p className="text-gray-400">
              無料で診断履歴を保存できます
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-8">
            <SignupForm />
          </div>
        </div>
      </main>
    </div>
  )
}
