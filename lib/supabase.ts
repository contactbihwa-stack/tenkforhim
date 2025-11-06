// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

/** 호출될 때만 환경변수를 읽고 생성. import 시점에는 에러를 던지지 않는다. */
export function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anon) return null
  return createClient(url, anon)
}

/** (선택) 기존 타입 유지 */
export type PoemRow = {
  id: string
  title: string      // "ELON-SUN-0008 - 3" 형식
  content: string    // 시 본문
  category: string   // "IGNITION" 같은 소주제
  created_at?: string
}
