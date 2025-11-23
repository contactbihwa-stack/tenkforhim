"use client";

import Link from "next/link";

export default function LogbookPage() {
  // 나중에 여기 reports 배열을 CMS 또는 마크다운에서 불러오도록 변경 가능
  const reports = [
    {
      id: "001",
      title: "Logbook 001",
      period: "Nov 13 – Nov 22, 2025",
      summary:
        "A week of LQQ thesis completion, the Talulah album arc, and new Venus-based imagery.",
    },
    {
      id: "002",
      title: "Logbook 002",
      period: "Coming soon",
      summary: "Next 10-day record will appear here.",
    },
  ];

  return (
    <div className="min-h-screen w-full px-6 md:px-12 lg:px-24 py-24 text-gray-200">
      {/* HEADER */}
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-light tracking-wide mb-4">
          Logbook
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          Where the work becomes light.
        </p>
      </div>

      {/* LIST */}
      <div className="grid gap-8 max-w-3xl mx-auto">
        {reports.map((r) => (
          <Link
            key={r.id}
            href={`/logbook/${r.id}`}
            className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition duration-200 backdrop-blur-sm"
          >
            <h2 className="text-xl font-semibold mb-1">{r.title}</h2>
            <p className="text-sm text-gray-400 mb-2">{r.period}</p>
            <p className="text-gray-300 text-sm">{r.summary}</p>
          </Link>
        ))}
      </div>

      {/* FOOTER */}
      <div className="text-center mt-20 text-gray-500 text-xs">
        More records will appear as the journey continues.
      </div>
    </div>
  );
}
