// app/api/poems/route.ts
import { NextResponse } from "next/server";

const NOCO_URL = process.env.NOCO_URL;
const NOCO_TOKEN = process.env.NOCO_TOKEN;
const NOCO_TABLE_ID = process.env.NOCO_TABLE_ID;

export async function GET(req: Request) {
  try {
    if (!NOCO_URL || !NOCO_TOKEN || !NOCO_TABLE_ID) {
      return NextResponse.json(
        { error: "NocoDB env vars missing (NOCO_URL, NOCO_TOKEN, NOCO_TABLE_ID)" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(req.url);
    const planet = searchParams.get("planet") || "";       // e.g., SUN
    const subtheme = searchParams.get("subtheme") || "";   // e.g., SUN-01
    const q = searchParams.get("q") || "";                 // free text
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "60", 10);
    const sort = searchParams.get("sort") || "code";
    const order = (searchParams.get("order") || "asc").toLowerCase() === "desc" ? "desc" : "asc";

    const offset = Math.max(0, (page - 1) * pageSize);
    const params = new URLSearchParams();
    params.set("limit", String(pageSize));
    params.set("offset", String(offset));
    params.set("sort", sort);
    params.set("order", order);

    if (q) params.set("q", q);

    // where=(planet,eq,SUN)~and(subtheme,eq,SUN-01)
    const whereParts: string[] = [];
    if (planet) whereParts.push(`(planet,eq,${encodeURIComponent(planet)})`);
    if (subtheme) whereParts.push(`(subtheme,eq,${encodeURIComponent(subtheme)})`);
    if (whereParts.length) params.set("where", whereParts.join("~and"));

    const apiUrl = `${NOCO_URL}/api/v2/tables/${NOCO_TABLE_ID}/records?${params.toString()}`;

    const res = await fetch(apiUrl, {
      headers: {
        "xc-token": NOCO_TOKEN,
        "Accept": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: "NocoDB error", detail: text }, { status: res.status });
    }

    const data = await res.json();
    // v2 응답은 { list: [...], pageInfo: { totalRows, ... } } 형태
    const items = data?.list ?? [];
    const total = data?.pageInfo?.totalRows ?? items.length;

    // 프론트에서 쓰기 쉬운 필드 정규화
    const normalized = items.map((r: any) => ({
      id: r.id,
      code: r.code ?? "",
      planet: r.planet ?? "",
      subtheme: r.subtheme ?? "",
      title: r.title ?? "",
      firstLine: r.first_line ?? r.firstLine ?? "",
      text: r.text ?? "",
      createdAt: r.created_at ?? r.createdAt ?? null,
      updatedAt: r.updated_at ?? r.updatedAt ?? null,
    }));

    return NextResponse.json({ items: normalized, total });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 });
  }
}
