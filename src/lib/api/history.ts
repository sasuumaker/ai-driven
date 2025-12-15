import { createClient } from '@/lib/supabase/client'
import type { AxisResult } from '@/types/quiz'
import type { DiagnosisHistory, DiagnosisHistoryInput } from '@/types/auth'

export async function saveHistory(input: DiagnosisHistoryInput): Promise<DiagnosisHistory> {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('ログインが必要です')
  }

  const { data, error } = await supabase
    .from('diagnosis_history')
    .insert({
      user_id: user.id,
      mbti_type: input.mbtiType,
      job_name: input.jobName,
      axis_results: input.axisResults,
    })
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data as DiagnosisHistory
}

export async function getHistory(): Promise<DiagnosisHistory[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('diagnosis_history')
    .select('*')
    .order('diagnosed_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data as DiagnosisHistory[]
}

export async function deleteHistory(id: string): Promise<void> {
  const supabase = createClient()

  const { error } = await supabase.from('diagnosis_history').delete().eq('id', id)

  if (error) {
    throw new Error(error.message)
  }
}
