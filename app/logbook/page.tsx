"use client";

import { motion } from "framer-motion";

const records = [
  {
    id: "001",
    range: "Nov 13 – Nov 22, 2025",
    title: "Logbook 001",
    summary:
      "A week of LQQ thesis completion, the Talulah album arc, and new Venus-based imagery.",
    status: "Transmitted",
  },
  {
    id: "002",
    range: "Coming soon",
    title: "Logbook 002",
    summary: "Next 10-day record will appear here.",
    status: "Standby",
  },
];

export default function LogbookPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020311] text-slate-100">
      {/* --- Cosmic background ------------------------------------------------ */}
      {/* Deep gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,#1c2748_0,transparent_45%),radial-gradient(circle_at_80%_100%,#141b33_0,transparent_50%),radial-gradient(circle_at_50%_50%,#070814_0,#020311_65%)]" />

      {/* Slow-moving star dust */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-32 opacity-50"
        initial={{ x: 0, y: 0 }}
        animate={{ x: -30, y: -20 }}
        transition={{
          duration: 40,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "linear",
        }}
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.35) 0, rgba(255,255,255,0) 55%)",
          backgroundSize: "3px 3px",
        }}
      />

      {/* Starship trajectory arc */}
      <svg
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-[260px] w-full opacity-40"
        viewBox="0 0 1440 400"
      >
        <defs>
          <linearGradient id="orbit" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0" />
            <stop offset="40%" stopColor="#00E5FF" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#7DF9FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F9E66E" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M -40 320 C 360 80, 1080 80, 1480 320"
          fill="none"
          stroke="url(#orbit)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* little starship */}
        <motion.circle
          r="4"
          fill="#F9E66E"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
        >
          <animateMotion
            dur="32s"
            repeatCount="indefinite"
            path="M -40 320 C 360 80, 1080 80, 1480 320"
          />
        </motion.circle>
      </svg>

      {/* --- Content ----------------------------------------------------------- */}
      <main className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col px-4 pb-16 pt-24 md:px-8 md:pt-28">
        {/* HUD / header */}
        <header className="mb-10 space-y-4 md:mb-14">
          <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-black/40 px-4 py-1 text-[11px] uppercase tracking-[0.2em] text-cyan-200/70 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span>TenKforHim / Mission Log</span>
            <span className="h-[1px] w-10 bg-gradient-to-r from-cyan-300/60 to-transparent" />
            <span>Every 10 days</span>
          </div>

          <div>
            <h1 className="font-playfair text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl">
              Logbook
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-300/80 md:text-base">
              Where the work becomes light. Ten days at a time, each entry is a
              small report from the ship as it crosses the dark.
            </p>
          </div>
        </header>

        {/* Records list */}
        <section className="space-y-6 md:space-y-8">
          {records.map((log, index) => (
            <motion.article
              key={log.id}
              className="relative overflow-hidden rounded-3xl border border-white/6 bg-white/2 px-5 py-5 text-sm shadow-[0_18px_60px_rgba(0,0,0,0.75)] backdrop-blur-md md:px-8 md:py-7"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ borderColor: "rgba(56,189,248,0.6)", translateY: -2 }}
            >
              {/* subtle inner glow */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-500/6 via-transparent to-amber-400/8" />

              <div className="relative z-10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-cyan-200/70">
                    <span>LOGBOOK {log.id}</span>
                    <span className="h-[1px] w-8 bg-cyan-300/60" />
                    <span>{log.range}</span>
                  </div>
                  <p className="mt-3 text-base font-medium text-slate-50 md:text-lg">
                    {log.title}
                  </p>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-200/80">
                    {log.summary}
                  </p>
                </div>

                <div className="mt-2 flex flex-col items-start gap-2 md:mt-0 md:items-end">
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
                    {log.status}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    #{index + 1} / 10000
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </section>

        {/* Footer note */}
        <footer className="mt-10 text-center text-[11px] text-slate-400/80 md:mt-14">
          <p>
            More records will appear as the journey continues—one orbit of work
            at a time.
          </p>
        </footer>
      </main>
    </div>
  );
}
