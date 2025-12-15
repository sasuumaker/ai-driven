import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')
  const next = searchParams.get('next') ?? '/'

  const redirectTo = new URL(next, origin)

  // PKCE フロー: code パラメータがある場合
  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(redirectTo)
    }
  }

  // マジックリンク フロー: token_hash パラメータがある場合
  if (token_hash && type) {
    const supabase = await createClient()
    const { error } = await supabase.auth.verifyOtp({
      type: type as 'signup' | 'recovery' | 'invite' | 'email',
      token_hash,
    })
    if (!error) {
      return NextResponse.redirect(redirectTo)
    }
  }

  // エラー時はトップページにリダイレクト
  return NextResponse.redirect(new URL('/?error=auth_error', origin))
}
