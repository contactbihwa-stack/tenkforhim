// app/api/poems/route.ts
import { NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function mask(s?: string) {
  if (!s) return '(empty)'
  if (s.length <= 8) return '(too-short)'
  return s.slice(0,4) + '...'+ s.slice(-4)
}

export async function GET() {
  // 1) ENV 확인
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anon) {
    return NextResponse.json({
      step: 'env',
      ok: false,
      message: 'Supabase env not set',
      url,
      anon: mask(anon),
    }, { status: 500 })
  }

  // 2) 네트워크/도메인 헬스체크 (auth 헬스는 테이블 없어도 200)
  try {
    const health = await fetch(`${url}/auth/v1/health`, {
      headers: { apikey: anon },
      // 기본 timeout은 없으니, Vercel에서 걸릴 경우를 대비
      cache: 'no-store',
    })
    const text = await health.text()
    if (!health.ok) {
      return NextResponse.json({
        step: 'health',
        ok: false,
        status: health.status,
        body: text.slice(0,200),
        url,
        anon: mask(anon),
      }, { status: 500 })
    }
  } catch (e: any) {
    return NextResponse.json({
      step: 'fetch',
      ok: false,
      message: String(e?.message || e),
      url,
      anon: mask(anon),
    }, { status: 500 })
  }

  // 3) 실제 쿼리 (여기부터 기존 로직)
  const supabase = getSupabaseClient()
  if (!supabase) {
    return NextResponse.json({
      step: 'client',
      ok: false,
      message: 'getSupabaseClient() returned null',
      url,
      anon: mask(anon),
    }, { status: 500 })
  }

  const { data, error } = await supabase
    .from('poems')
    .select('id,title,content,category,created_at')
    .order('title', { ascending: true })

  if (error) {
    return NextResponse.json({
      step: 'query',
      ok: false,
      message: error.message,
      hint: 'RLS/컬럼명/권한 확인',
    }, { status: 500 })
  }

  // 성공
  return NextResponse.json({
    step: 'done',
    ok: true,
    count: data?.length ?? 0,
    sample: data?.slice(0,1) ?? [],
  })
}
