import { Header } from '@/components/common/Header'
import { HistoryList } from '@/components/history/HistoryList'

export default function HistoryPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">診断履歴</h1>
            <p className="text-gray-400">過去の診断結果を確認できます</p>
          </div>

          <HistoryList />
        </div>
      </main>
    </div>
  )
}
