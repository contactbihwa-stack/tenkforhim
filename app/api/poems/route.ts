// app/api/poems/route.ts
import { NextResponse } from "next/server";

const NOCO_API_URL = process.env.NOCO_API_URL!;     // 예) https://lazy-rice-divide.loca.lt/api/v2/tables/m6h0l8o7bdn8r1m/records
const NOCO_API_TOKEN = process.env.NOCO_API_TOKEN!; // Va… 로 시작하는 Personal Token

// NocoDB 컬럼(표시명 기준) — 스샷 기준으로 교정
const F_TITLE = "Title";
const F_SONG_TITLE = "노래제목";
const F_LYRICS = "가사";
const F_TOOL = "툴";
const F_DATE = "제작일";
const F_SUBTHEME = "T 소주제";     // ← 여기!
const F_NOTE = "T 특이사항";       // ← 여기!
const F_POEM = "시(Poem)";

// "ELON-SUN-0008 - 3" → { code, planet: "SUN" }
function parseCode(raw: string | undefined) {
  const code = (raw || "").split(" - ")[0]?.trim();
  const planet = code?.slice(5, 8) || ""; // ELON-XYZ-....
  return { code, planet };
}

export async function GET() {
  try {
    if (!NOCO_API_URL || !NOCO_API_TOKEN) {
      return NextResponse.json(
        { error: "Missing NOCO_API_URL or NOCO_API_TOKEN" },
        { status: 500 }
      );
    }

    // 필요한 필드만 받도록 쿼리 구성
    const fields = [
      F_TITLE, F_SONG_TITLE, F_LYRICS, F_TOOL, F_DATE, F_SUBTHEME, F_NOTE, F_POEM,
    ];
    const url = new URL(NOCO_API_URL);
    url.searchParams.set("limit", "10000");
    fields.forEach((f) => url.searchParams.append("fields", f));

    const r = await fetch(url.toString(), {
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "xc-token": NOCO_API_TOKEN,                 // NocoDB 인증
        "Bypass-Tunnel-Reminder": "true",           // loca.lt 공지 우회 (중요)
      },
      cache: "no-store",
    });

    const text = await r.text();
    if (!r.ok) {
      return NextResponse.json({ error: text }, { status: r.status });
    }

    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      // loca.lt가 HTML을 돌려주는 경우를 잡아줌
      return new NextResponse(
        JSON.stringify({
          error: "Upstream returned non-JSON",
          preview: text.slice(0, 500),
        }),
        { status: 502, headers: { "content-type": "application/json" } }
      );
    }

    const rows = Array.isArray(data?.list) ? data.list : data;

    const items = rows.map((row: any) => {
      const { code, planet } = parseCode(row[F_TITLE]);
      return {
        code,
        planet,
        title: row[F_SONG_TITLE] ?? row[F_TITLE] ?? "",
        lyrics: row[F_LYRICS] ?? "",
        tool: row[F_TOOL] ?? "",
        date: row[F_DATE] ?? "",
        subtheme: row[F_SUBTHEME] ?? "",
        note: row[F_NOTE] ?? "",
        poem: row[F_POEM] ?? "",
      };
    });

    return NextResponse.json({ items });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 });
  }
}
