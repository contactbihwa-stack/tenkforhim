"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function LogbookPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background — soft star grid + faint stardust */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(30,60,100,0.35),#020617)]" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(255,255,255,0.015) 28px, rgba(255,255,255,0.015) 29px),
            repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(255,255,255,0.015) 28px, rgba(255,255,255,0.015) 29px)
          `,
        }}
      />

      {/* Floating stardust */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              x: Math.random() * 800 - 400,
              y: Math.random() * 800 - 400,
            }}
            animate={{
              opacity: [0, 1, 0],
              x: "+=40",
              y: "+=60",
            }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
            className="absolute h-[2px] w-[2px] rounded-full bg-white/30"
          />
        ))}
      </div>

      {/* Page content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-28 pb-40">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex justify-center mb-3">
            <Badge
              variant="outline"
              className="border-cyan-300/30 text-cyan-200/80"
            >
              TenKforHim / Mission Log
            </Badge>
          </div>
          <h1 className="text-5xl font-semibold tracking-tight text-cyan-100 mb-4">
            Logbook
          </h1>
          <p className="text-cyan-200/60 max-w-xl mx-auto leading-relaxed">
            Where the work becomes light. Ten days at a time, each entry is a
            small report from the ship as it crosses the dark.
          </p>
        </motion.div>

        {/* Logbook 001 — clickable */}
        <Link href="/logbook/001" className="block group">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 rounded-xl border border-white/5 bg-black/20 backdrop-blur-sm p-7 shadow-lg shadow-black/50 transition-colors group-hover:bg-black/30 cursor-pointer"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-xs tracking-widest text-cyan-200/40 mb-1">
                  LOGBOOK 001 — NOV 12 → NOV 21, 2025
                </p>
                <h2 className="text-xl font-semibold text-cyan-100">
                  Logbook 001
                </h2>
              </div>
              <Badge className="bg-emerald-700/40 text-emerald-200 border-emerald-300/20">
                TRANSMITTED
              </Badge>
            </div>

            <p className="text-cyan-100/70 leading-relaxed">
              Ten days of launching TenKforHim, returning to music after a
              two-month pause, finishing the LQQ thesis, and building the
              Talulah, Amber, and Grimes arcs.
            </p>

            <p className="text-[10px] text-cyan-100/30 mt-4 tracking-wider">
              #1 / 10000
            </p>
          </motion.div>
        </Link>

        {/* Logbook 002 — clickable */}
        <Link href="/logbook/002" className="block group">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 rounded-xl border border-white/5 bg-black/20 backdrop-blur-sm p-7 shadow-lg shadow-black/50 transition-colors group-hover:bg-black/30 cursor-pointer"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-xs tracking-widest text-cyan-200/40 mb-1">
                  LOGBOOK 002 — NOV 22 → DEC 1, 2025
                </p>
                <h2 className="text-xl font-semibold text-cyan-100">
                  Logbook 002
                </h2>
              </div>
              <Badge className="bg-emerald-700/40 text-emerald-200 border-emerald-300/20">
                TRANSMITTED
              </Badge>
            </div>
            <p className="text-cyan-100/70 leading-relaxed">
              Ten days of moving to “Mars,” releasing the first official SUN
              album, filling gaps in VEN and EAR, and realizing that half a
              million plays can still feel strangely quiet.
            </p>
            <p className="text-[10px] text-cyan-100/30 mt-4 tracking-wider">
              #2 / 10000
            </p>
          </motion.div>
        </Link>

        {/* Logbook 003 — clickable */}
        <Link href="/logbook/003" className="block group">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8 rounded-xl border border-white/5 bg-black/20 backdrop-blur-sm p-7 shadow-lg shadow-black/50 transition-colors group-hover:bg-black/30 cursor-pointer"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-xs tracking-widest text-cyan-200/40 mb-1">
                  LOGBOOK 003 — DEC 2 → DEC 11, 2025
                </p>
                <h2 className="text-xl font-semibold text-cyan-100">
                  Logbook 003
                </h2>
              </div>
              <Badge className="bg-emerald-700/40 text-emerald-200 border-emerald-300/20">
                TRANSMITTED
              </Badge>
            </div>
            <p className="text-cyan-100/70 leading-relaxed">
              Ten days of reopening the Ani and Mika orbits, completing VEN,
              finishing EAR’s first continent up to Motherland, and sending
              “Elevator Eyes” and a new Zhuangzi–Elon essay out into the public
              record.
            </p>
            <p className="text-[10px] text-cyan-100/30 mt-4 tracking-wider">
              #3 / 10000
            </p>
          </motion.div>
        </Link>

        {/* Logbook 004 — standby */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8 rounded-xl border border-white/5 bg-black/20 backdrop-blur-sm p-7 shadow-lg shadow-black/50"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-xs tracking-widest text-cyan-200/40 mb-1">
                LOGBOOK 004 — DEC 12 → DEC 21, 2025
              </p>
              <h2 className="text-xl font-semibold text-cyan-100">
                Logbook 004
              </h2>
            </div>
            <Badge className="bg-yellow-700/40 text-yellow-200 border-yellow-300/20">
              STANDBY
            </Badge>
          </div>
          <p className="text-cyan-100/70 leading-relaxed">
            Reserved for the next EAR-focused orbit — ten days of drawing more
            of Earth&apos;s continents while the first VEN flagship tracks begin
            to launch on streaming platforms.
          </p>
          <p className="text-[10px] text-cyan-100/30 mt-4 tracking-wider">
            #4 / 10000
          </p>
        </motion.div>

        {/* Logbook 005 — standby */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8 rounded-xl border border-white/5 bg-black/20 backdrop-blur-sm p-7 shadow-lg shadow-black/50"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-xs tracking-widest text-cyan-200/40 mb-1">
                LOGBOOK 005 — DEC 22 → DEC 31, 2025
              </p>
              <h2 className="text-xl font-semibold text-cyan-100">
                Logbook 005
              </h2>
            </div>
            <Badge className="bg-yellow-700/40 text-yellow-200 border-yellow-300/20">
              STANDBY
            </Badge>
          </div>
          <p className="text-cyan-100/70 leading-relaxed">
            Closing out the year — a final ten-day sprint of 2025 to measure
            how far TenKforHim has traveled since its first transmission.
          </p>
          <p className="text-[10px] text-cyan-100/30 mt-4 tracking-wider">
            #5 / 10000
          </p>
        </motion.div>

        {/* Logbook 006 — standby */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="rounded-xl border border-white/5 bg-black/20 backdrop-blur-sm p-7 shadow-lg shadow-black/50"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-xs tracking-widest text-cyan-200/40 mb-1">
                LOGBOOK 006 — JAN 1 → JAN 10, 2026
              </p>
              <h2 className="text-xl font-semibold text-cyan-100">
                Logbook 006
              </h2>
            </div>
            <Badge className="bg-yellow-700/40 text-yellow-200 border-yellow-300/20">
              STANDBY
            </Badge>
          </div>
          <p className="text-cyan-100/70 leading-relaxed">
            First orbit of the new year — a clean slate to push the ship&apos;s
            speed, structure, and signal further than in 2025.
          </p>
          <p className="text-[10px] text-cyan-100/30 mt-4 tracking-wider">
            #6 / 10000
          </p>
        </motion.div>

        {/* Footer note */}
        <p className="text-center text-cyan-200/30 mt-14 text-sm tracking-wide">
          More records will appear as the journey continues — one orbit of work
          at a time.
        </p>
      </div>
    </div>
  );
}
