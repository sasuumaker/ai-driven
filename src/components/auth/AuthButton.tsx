'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

export function AuthButton() {
  const { user, isLoading } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // メニュー外クリックで閉じる
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (isLoading) {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse" />
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
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pastel-mint to-pastel-green flex items-center justify-center">
          <span className="text-white font-medium text-sm">
            {user.email?.charAt(0).toUpperCase()}
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-xl shadow-lg py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-800">
            <p className="text-sm text-gray-400 truncate">{user.email}</p>
          </div>

          <Link
            href="/history"
            onClick={() => setIsMenuOpen(false)}
            className="block px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors"
          >
            診断履歴
          </Link>

          <form action="/auth/signout" method="POST">
            <button
              type="submit"
              className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800 transition-colors"
            >
              ログアウト
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
