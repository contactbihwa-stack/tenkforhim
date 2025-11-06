// app/api/poems/route.ts
import { NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'

// 정적 수집 방지 + Node 런타임 강제
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// "ELON-SUN-0008 - 3" → code / planet / title 파싱
function parseTitle(title: string) {
  const match = (title || '').match(/^(ELON-(\w+)-\d+)\s*-\s*(.+)$/)
  if (match) {
    return { code: match[1], planet: match[2], poemTitle: match[3] }
  }
  return { code: title, planet: 'UNKNOWN', poemTitle: title }
}

function mapRow(row: any) {
  const { code, planet, poemTitle } = parseTitle(row.title)
  return {
    code,
    planet,
    title: poemTitle,
    poem: row.content || '',
    subtheme: row.category || '',
    date: row.created_at || '',
  }
}

export async function GET() {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return NextResponse.json(
      { error: 'Supabase env not set (URL or ANON KEY missing)' },
      { status: 500 }
    )
  }

  const { data, error } = await supabase
    .from('poems')
    .select('id,title,content,category,created_at')
    .order('title', { ascending: true })

  if (error) {
    console.error('Supabase error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ items: (data ?? []).map(mapRow) })
}
