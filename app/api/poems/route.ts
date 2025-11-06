// app/api/poems/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Row = { Title?: string; Subtheme?: string; Date?: string; Poem?: string };

// Title 안 건드리고, 별도로 "추정"만 한다 (표시용 X, 로직용 옵션)
function guessFromTitle(raw: string) {
  const m = (raw || "").replace(/\s+/g, " ").match(/ELON[-\s]?([A-Z]{3})[-\s]?(\d{4})/);
  return {
    codeGuess: m ? `ELON-${m[1]}-${m[2]}` : (raw || ""),
    planetGuess: m ? m[1] : "UNKNOWN",
  };
}

export async function GET() {
  const csvUrl = process.env.NEXT_PUBLIC_POEMS_CSV_URL?.trim();
  if (!csvUrl) {
    return NextResponse.json({ ok: false, error: "NEXT_PUBLIC_POEMS_CSV_URL missing" }, { status: 500 });
  }

  const r = await fetch(csvUrl, { cache: "no-store" });
  if (!r.ok) {
    return NextResponse.json({ ok: false, error: `CSV fetch failed: ${r.status}` }, { status: 500 });
  }
  const text = await r.text();

  // 간단 CSV 파서 (따옴표 포함 멀티라인 보존, 셀 내용은 trim 안 함!)
  const lines = text.replace(/\r\n|\r/g, "\n").split("\n");
  const header = (lines[0] || "").split(",").map(s => s);
  const idx = {
    title: header.findIndex(h => /^title$/i.test(h.trim())),
    sub:   header.findIndex(h => /^subtheme$/i.test(h.trim())),
    date:  header.findIndex(h => /^date$/i.test(h.trim())),
    poem:  header.findIndex(h => /^poem$/i.test(h.trim())),
  };

  const rows: Row[] = [];
  let i = 1;
  while (i < lines.length) {
    let row = lines[i++];
    if (row === undefined) break;
    if (row === "") { rows.push({}); continue; }

    // 따옴표 균형 맞출 때까지 이어붙임 (셀 내부 줄바꿈 보존)
    let q = (row.match(/"/g) || []).length;
    while (q % 2 === 1 && i < lines.length) {
      row += "\n" + lines[i++];
      q = (row.match(/"/g) || []).length;
    }

    // 셀 파싱: 외곽 따옴표는 CSV 규칙상 떨어지지만, 내부 "" -> " 만 복원.
    const cols: string[] = [];
    let cur = "", inQ = false;
    for (let k = 0; k < row.length; k++) {
      const ch = row[k];
      if (ch === '"') {
        if (inQ && row[k + 1] === '"') { cur += '"'; k++; }
        else { inQ = !inQ; }
      } else if (ch === "," && !inQ) {
        cols.push(cur); cur = "";
      } else {
        cur += ch;
      }
    }
    cols.push(cur);

    // ⚠️ 여기서 **trim 하지 않는다** — 의도한 공백/따옴표 모두 보존
    const get = (idx: number) => (idx >= 0 ? (cols[idx] ?? "") : "");

    const Title    = get(idx.title);
    const Subtheme = get(idx.sub);
    const Date     = get(idx.date);
    const Poem     = get(idx.poem);

    rows.push({ Title, Subtheme, Date, Poem });
  }

  const items = rows
    .filter(r => r.Title !== undefined && r.Title !== "")
    .map((r) => {
      const { codeGuess, planetGuess } = guessFromTitle(r.Title || "");
      return {
        // 화면 표시는 이 titleRaw 를 그대로 사용
        title: r.Title ?? "",
        // 사용자가 원하면 쓸 수 있는 옵션 필드 (표시엔 사용 X)
        code: codeGuess,
        planet: planetGuess,
        subtheme: r.Subtheme ?? "",
        date: r.Date ?? "",
        // 시 본문도 **원본 그대로** 전달 (trim/quote 제거 없음)
        poem: r.Poem ?? "",
      };
    });

  return NextResponse.json({ ok: true, items });
}
