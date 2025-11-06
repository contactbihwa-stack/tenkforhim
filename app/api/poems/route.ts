// app/api/poems/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Title에서 정보 추출 헬퍼
function parseTitle(title: string) {
  // "ELON-SUN-0008 - 3" -> { code: "ELON-SUN-0008", planet: "SUN", poemTitle: "3" }
  const match = title.match(/^(ELON-(\w+)-\d+)\s*-\s*(.+)$/);
  
  if (match) {
    return {
      code: match[1],           // "ELON-SUN-0008"
      planet: match[2],         // "SUN"
      poemTitle: match[3],      // "3"
    };
  }
  
  // 매칭 실패시 기본값
  return {
    code: title,
    planet: 'UNKNOWN',
    poemTitle: title,
  };
}

export async function GET() {
  try {
    // Supabase에서 모든 시 가져오기
    const { data, error } = await supabase
      .from('poems')
      .select('*')
      .order('title', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch poems from database' },
        { status: 500 }
      );
    }

    // 프론트엔드가 기대하는 형식으로 변환
    const items = (data || []).map((row) => {
      const { code, planet, poemTitle } = parseTitle(row.title);
      
      return {
        code: code,
        planet: planet,
        title: poemTitle,
        poem: row.content || '',
        subtheme: row.category || '',
        // 추가 필드들 (필요시)
        date: row.created_at || '',
      };
    });

    return NextResponse.json({ items });
  } catch (err: any) {
    console.error('API error:', err);
    return NextResponse.json(
      { error: err?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
