'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { getHistory, deleteHistory } from '@/lib/api/history'
import { HistoryCard } from './HistoryCard'
import type { DiagnosisHistory } from '@/types/auth'

export function HistoryList() {
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [histories, setHistories] = useState<DiagnosisHistory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (authLoading) return

    if (!user) {
      router.push('/login?next=/history')
      return
    }

    loadHistories()
  }, [user, authLoading, router])

  async function loadHistories() {
    setIsLoading(true)
    setError(null)

    try {
      const data = await getHistory()
      setHistories(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : '履歴の取得に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteHistory(id)
      setHistories((prev) => prev.filter((h) => h.id !== id))
    } catch (err) {
      throw err
    }
  }

  if (authLoading || isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 animate-pulse">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-20 h-6 bg-gray-700 rounded-full" />
              <div className="w-32 h-4 bg-gray-700 rounded" />
            </div>
            <div className="w-48 h-6 bg-gray-700 rounded mb-3" />
            <div className="w-24 h-4 bg-gray-700 rounded" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-6 py-4 rounded-xl text-center">
        <p>{error}</p>
        <button
          onClick={loadHistories}
          className="mt-3 px-4 py-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors"
        >
          再読み込み
        </button>
      </div>
    )
  }

  if (histories.length === 0) {
    return (
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">まだ履歴がありません</h3>
        <p className="text-gray-400 mb-6">診断を行って結果を保存すると、ここに表示されます。</p>
        <a
          href="/quiz"
          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-pastel-mint to-pastel-green text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
        >
          診断を始める
        </a>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {histories.map((history) => (
        <HistoryCard key={history.id} history={history} onDelete={handleDelete} />
      ))}
    </div>
  )
}
