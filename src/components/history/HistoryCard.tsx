'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { DiagnosisHistory } from '@/types/auth'

interface HistoryCardProps {
  history: DiagnosisHistory
  onDelete: (id: string) => Promise<void>
}

export function HistoryCard({ history, onDelete }: HistoryCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const formattedDate = new Date(history.diagnosed_at).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  async function handleDelete() {
    setIsDeleting(true)
    try {
      await onDelete(history.id)
    } catch (error) {
      console.error('Delete failed:', error)
      setIsDeleting(false)
      setShowConfirm(false)
    }
  }

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 transition-all hover:border-gray-700">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {/* MBTI Type */}
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center justify-center px-3 py-1 bg-gradient-to-r from-pastel-mint to-pastel-green text-white text-sm font-bold rounded-full">
              {history.mbti_type}
            </span>
            <span className="text-gray-400 text-sm">{formattedDate}</span>
          </div>

          {/* Job Name */}
          <h3 className="text-xl font-bold text-white mb-3">{history.job_name}</h3>

          {/* View Link */}
          <Link
            href={`/result/${history.mbti_type}`}
            className="inline-flex items-center gap-1 text-pastel-mint hover:underline text-sm"
          >
            詳細を見る
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Delete Button */}
        <div className="relative">
          {showConfirm ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50"
              >
                {isDeleting ? '削除中...' : '削除'}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-lg hover:bg-gray-600 transition-colors"
              >
                キャンセル
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowConfirm(true)}
              className="p-2 text-gray-500 hover:text-red-400 transition-colors"
              title="削除"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
