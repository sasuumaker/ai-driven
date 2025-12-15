'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { saveHistory } from '@/lib/api/history'
import type { AxisResult } from '@/types/quiz'

interface SaveResultButtonProps {
  mbtiType: string
  jobName: string
  axisResults: AxisResult[]
}

export function SaveResultButton({ mbtiType, jobName, axisResults }: SaveResultButtonProps) {
  const { user, isLoading: authLoading } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSave() {
    if (!user) {
      // 未ログイン時はログインページへリダイレクト
      router.push(`/login?next=/result/${mbtiType}`)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await saveHistory({
        mbtiType,
        jobName,
        axisResults,
      })
      setIsSaved(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : '保存に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading) {
    return (
      <button
        disabled
        className="w-full py-3 px-6 bg-gray-700 text-gray-400 rounded-full font-medium cursor-not-allowed"
      >
        読み込み中...
      </button>
    )
  }

  if (isSaved) {
    return (
      <button
        disabled
        className="w-full py-3 px-6 bg-pastel-mint/20 text-pastel-mint rounded-full font-medium cursor-default flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        保存しました
      </button>
    )
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleSave}
        disabled={isLoading}
        className="w-full py-3 px-6 bg-gray-800 hover:bg-gray-700 text-white rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg
              className="w-5 h-5 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            保存中...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            {user ? '履歴を保存' : 'ログインして保存'}
          </>
        )}
      </button>
      {error && <p className="text-red-400 text-sm text-center">{error}</p>}
    </div>
  )
}
