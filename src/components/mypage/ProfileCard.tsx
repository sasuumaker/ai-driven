'use client'

interface ProfileCardProps {
  email: string
  displayName?: string | null
  createdAt: string
}

export function ProfileCard({ email, displayName, createdAt }: ProfileCardProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-6">
      <div className="flex items-start gap-4">
        {/* アバター */}
        <div className="w-16 h-16 bg-gradient-to-br from-pastel-mint to-pastel-green rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-2xl font-bold text-white">
            {(displayName || email || '?')[0].toUpperCase()}
          </span>
        </div>

        {/* ユーザー情報 */}
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-white truncate">
            {displayName || 'ユーザー'}
          </h2>
          <p className="text-gray-400 truncate">{email}</p>
          <p className="text-sm text-gray-500 mt-1">
            {formattedDate} に登録
          </p>
        </div>
      </div>
    </div>
  )
}
