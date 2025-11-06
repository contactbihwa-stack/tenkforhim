// app/api/poems/route.ts
import { NextResponse } from "next/server";

/** Title 예시: "ELON-SUN-0008 - Horizon" 에서 코드/행성/제목을 분리 */
function parseTitle(title: string) {
  const m = title?.match(/^(ELON-(\w+)-\d+)\s*-\s*(.+)$/);
  if (m) return { code: m[1], planet: m[2], poemTitle: m[3] };
  // 코드 포맷이 아니어도 안전하게 처리
  return { code: title || "", planet: "UNKNOWN", poemTitle: title || "" };
}

export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_POEMS_CSV_URL; // ← Vercel에 넣어둔 CSV 주소
    if (!url) throw new Error("Missing env: NEXT_PUBLIC_POEMS_CSV_URL");

    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) throw new Error(`CSV fetch failed (${r.status})`);

    const text = await r.text();

    // CSV 파싱(심플): 줄 → 칼럼. 헤더는 정확히 Title,Date,Subtheme,Poem 이어야 함
    const lines = text.split(/\r?\n/).filter(Boolean);
    const header = lines.shift()!;
    const cols = header.split(",");

    const idx = {
      Title: cols.indexOf("Title"),
      Date: cols.indexOf("Date"),
      Subtheme: cols.indexOf("Subtheme"),
      Poem: cols.indexOf("Poem"),
    };
    for (const k of Object.keys(idx) as (keyof typeof idx)[]) {
      if (idx[k] === -1) throw new Error(`CSV header missing: ${k}`);
    }

    const items = lines.map((line) => {
      // CSV 안의 콤마를 단순히 split하면 깨질 수 있어, 큰따옴표 감싸진 경우를 처리
      const cells: string[] = [];
      let cur = "";
      let inQ = false;
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"' ) {
          // "" => " 이스케이프
          if (inQ && line[i + 1] === '"') { cur += '"'; i++; }
          else inQ = !inQ;
        } else if (ch === "," && !inQ) {
          cells.push(cur); cur = "";
        } else {
          cur += ch;
        }
      }
      cells.push(cur);

      const title = cells[idx.Title] || "";
      const date = cells[idx.Date] || "";
      const subtheme = cells[idx.Subtheme] || "";
      const poem = cells[idx.Poem] || "";

      const { code, planet, poemTitle } = parseTitle(title);

      return {
        code,
        planet,
        title: poemTitle,
        poem,
        subtheme,
        date,
      };
    });

    return NextResponse.json({ items });
  } catch (err: any) {
    return NextResponse.json(
      { step: "poems-api", ok: false, error: err?.message || String(err) },
      { status: 500 }
    );
  }
}
