'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

export function AuthButton() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="w-20 h-9 rounded-full bg-gray-700 animate-pulse" />
    )
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-pastel-mint to-pastel-green rounded-full hover:opacity-90 transition-opacity"
      >
        ログイン
      </Link>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/mypage"
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pastel-mint to-pastel-green flex items-center justify-center">
          <span className="text-white font-medium text-sm">
            {user.email?.charAt(0).toUpperCase()}
          </span>
        </div>
      </Link>
      <form action="/auth/signout" method="POST">
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
        >
          ログアウト
        </button>
      </form>
    </div>
  )
}
