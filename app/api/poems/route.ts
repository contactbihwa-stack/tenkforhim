// app/api/poems/route.ts
import { NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function mask(s?: string) {
  if (!s) return '(empty)'
  if (s.length <= 8) return '(too-short)'
  return s.slice(0,4) + '...' + s.slice(-4)
}

export async function GET() {
  // 1) ENV 읽고 "깨끗하게" 다듬기
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  const url = rawUrl.trim().replace(/\/+$/, '')  // 앞뒤 공백 제거 + 끝의 / 제거

  if (!url || !anon) {
    return NextResponse.json({
      step: 'env',
      ok: false,
      message: 'Supabase env not set',
      rawUrl,
      url,
      anon: mask(anon),
    }, { status: 500 })
  }

  // 2) health 체크 (apikey 없이도 시도 → 실패 시 apikey로 재시도)
  try {
    const h1 = await fetch(`${url}/auth/v1/health`, { cache: 'no-store' })
    if (!h1.ok) {
      const body = await h1.text()
      return NextResponse.json({
        step: 'health-no-key',
        ok: false,
        status: h1.status,
        body: body.slice(0,200),
        url,
      }, { status: 500 })
    }
  } catch (e: any) {
    // fetch 자체 실패(오타/공백/네트워크)
    return NextResponse.json({
      step: 'fetch-no-key',
      ok: false,
      message: String(e?.message || e),
      url,
    }, { status: 500 })
  }

  // 3) 실제 쿼리 시도
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

  return NextResponse.json({
    step: 'done',
    ok: true,
    count: data?.length ?? 0,
    sample: data?.slice(0,1) ?? [],
  })
}

