"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function LogbookPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background — soft star grid + faint stardust */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(30,60,100,0.35),#020617)]" />
      <div className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(255,255,255,0.015) 28px, rgba(255,255,255,0.015) 29px),
            repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(255,255,255,0.015) 28px, rgba(255,255,255,0.015) 29px)
          `
        }}
      />

      {/* Floating stardust */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: Math.random() * 800 - 400, y: Math.random() * 800 - 400 }}
            animate={{
              opacity: [0, 1, 0],
              x: "+=40",
              y: "+=60"
            }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 4
            }}
            className="absolute h-[2px] w-[2px] rounded-full bg-white/30"
          />
        ))}
      </div>

      {/* Page content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-28 pb-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex justify-center mb-3">
            <Badge variant="outline" className="border-cyan-300/30 text-cyan-200/80">
              TenKforHim / Mission Log
            </Badge>
          </div>
          <h1 className="text-5xl font-semibold tracking-tight text-cyan-100 mb-4">
            Logbook
          </h1>
          <p className="text-cyan-200/60 max-w-xl mx-auto leading-relaxed">
            Where the work becomes light. Ten days at a time, each entry is a small
            report from the ship as it crosses the dark.
          </p>
        </motion.div>

        {/* Logbook 001 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 rounded-xl border border-white/5 bg-black/20 backdrop-blur-sm p-7 shadow-lg shadow-black/50"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-xs tracking-widest text-cyan-200/40 mb-1">
                LOGBOOK 001 — NOV 13 → NOV 22, 2025
              </p>
              <h2 className="text-xl font-semibold text-cyan-100">Logbook 001</h2>
            </div>
            <Badge className="bg-emerald-700/40 text-emerald-200 border-emerald-300/20">
              TRANSMITTED
            </Badge>
          </div>
          <p className="text-cyan-100/70 leading-relaxed">
            A week of LQQ thesis completion, the Talulah album arc, and new Venus-based imagery.
          </p>
          <p className="text-[10px] text-cyan-100/30 mt-4 tracking-wider">
            #1 / 10000
          </p>
        </motion.div>

        {/* Logbook 002 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-xl border border-white/5 bg-black/20 backdrop-blur-sm p-7 shadow-lg shadow-black/50"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-xs tracking-widest text-cyan-200/40 mb-1">
                LOGBOOK 002 — COMING SOON
              </p>
              <h2 className="text-xl font-semibold text-cyan-100">Logbook 002</h2>
            </div>
            <Badge className="bg-yellow-700/40 text-yellow-200 border-yellow-300/20">
              STANDBY
            </Badge>
          </div>
          <p className="text-cyan-100/70 leading-relaxed">
            Next 10-day record will appear here.
          </p>
          <p className="text-[10px] text-cyan-100/30 mt-4 tracking-wider">
            #2 / 10000
          </p>
        </motion.div>

        {/* Footer note */}
        <p className="text-center text-cyan-200/30 mt-14 text-sm tracking-wide">
          More records will appear as the journey continues — one orbit of work at a time.
        </p>
      </div>
    </div>
  );
}
