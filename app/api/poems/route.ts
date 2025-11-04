// app/api/poems/route.ts
import { NextResponse } from "next/server";

const NOCO_API_URL = process.env.NOCO_API_URL!;
const NOCO_API_TOKEN = process.env.NOCO_API_TOKEN!;

// NocoDB 테이블 컬럼명(네가 올린 스크린샷 기준, 공백/한글 그대로)
const F_TITLE = "Title";
const F_SONG_TITLE = "노래제목";
const F_LYRICS = "가사";
const F_TOOL = "툴";
const F_DATE = "제작일";
const F_SUBTHEME = "소주제";
const F_NOTE = "특이사항";
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

    // 필요한 필드만 받도록 쿼리(없어도 작동하지만 트래픽 절약)
    const fields = [
      F_TITLE, F_SONG_TITLE, F_LYRICS, F_TOOL, F_DATE, F_SUBTHEME, F_NOTE, F_POEM,
    ];
    const url = new URL(NOCO_API_URL);
    url.searchParams.set("limit", "10000");
    fields.forEach((f) => url.searchParams.append("fields", f));

    const r = await fetch(url.toString(), {
      headers: { "xc-token": NOCO_API_TOKEN },
      cache: "no-store",
    });

    if (!r.ok) {
      const txt = await r.text();
      return NextResponse.json({ error: txt }, { status: r.status });
    }

    const data = await r.json();
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
        poem: row[F_POEM] ?? "", // 사이트에 표시할 실제 시
      };
    });

    return NextResponse.json({ items });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 });
  }
}
