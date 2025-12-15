'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { signup } from '@/app/login/actions'

export function SignupForm() {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
      const result = await signup(formData)
      if (result?.error) {
        setError(result.error)
      }
    })
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          メールアドレス
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pastel-mint focus:border-transparent transition-all"
          placeholder="example@email.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
          パスワード
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pastel-mint focus:border-transparent transition-all"
          placeholder="6文字以上"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 px-4 bg-gradient-to-r from-pastel-coral to-pastel-pink text-white font-semibold rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-pastel-coral focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? '登録中...' : 'アカウント作成'}
      </button>

      <p className="text-center text-gray-400 text-sm">
        すでにアカウントをお持ちの方は{' '}
        <Link href="/login" className="text-pastel-mint hover:underline">
          ログイン
        </Link>
      </p>
    </form>
  )
}
