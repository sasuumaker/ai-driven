import type { AxisResult } from './quiz'

export interface Profile {
  id: string
  email: string | null
  display_name: string | null
  created_at: string
  updated_at: string
}

export interface DiagnosisHistory {
  id: string
  user_id: string
  mbti_type: string
  job_name: string
  axis_results: AxisResult[] | null
  diagnosed_at: string
}

export interface DiagnosisHistoryInput {
  mbtiType: string
  jobName: string
  axisResults: AxisResult[]
}
