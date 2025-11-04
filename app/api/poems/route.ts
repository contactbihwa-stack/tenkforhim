// app/api/poems/route.ts
import { NextResponse } from "next/server"

const BASE = process.env.NOCO_BASE_URL!
const TOKEN = process.env.NOCO_API_TOKEN!
const TABLE_ID = process.env.NOCO_TABLE_ID!

// 간단한 where/search/pagination 지원
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get("q") || ""           // 제목/첫줄 검색
  const planet = searchParams.get("planet") || "" // SUN / MER ...
  const sub = searchParams.get("sub") || ""       // Subtheme
  const limit = Number(searchParams.get("limit") || "60")
  const offset = Number(searchParams.get("offset") || "0")

  // v2 엔드포인트: /api/v2/tables/{tableId}/records
  // 컬럼명은 네 실제 테이블 스키마에 맞게 바꿔줘 (예: title, first_line, content, code, planet, subtheme)
  const where: any[] = []
  if (planet) where.push({ column: "planet", operator: "eq", value: planet })
  if (sub) where.push({ column: "subtheme", operator: "eq", value: sub })

  // 간단 검색: title/first_line LIKE q
  // (NocoDB v2의 where JSON 규격 사용)
  if (q) {
    where.push({
      or: [
        { column: "title", operator: "like", value: `%${q}%` },
        { column: "first_line", operator: "like", value: `%${q}%` },
        { column: "content", operator: "like", value: `%${q}%` },
      ],
    })
  }

  const url = new URL(`${BASE}/api/v2/tables/${TABLE_ID}/records`)
  url.searchParams.set("limit", String(limit))
  url.searchParams.set("offset", String(offset))
  if (where.length) url.searchParams.set("where", JSON.stringify(where))
  // 필요한 컬럼만 선택하고 싶으면 아래 사용
  // url.searchParams.set("fields", "id,code,title,first_line,planet,subtheme")

  const res = await fetch(url.toString(), {
    headers: { "xc-token": TOKEN },
    // 배포 시 CORS 문제 없지만, 개발에서 필요하면 다음 줄:
    // cache: "no-store",
  })

  if (!res.ok) {
    const txt = await res.text()
    return NextResponse.json({ error: txt || res.statusText }, { status: res.status })
  }

  const data = await res.json()
  // v2는 { list, pageInfo } 형태
  return NextResponse.json(data)
}
