"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Logbook002Page() {
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
      <div className="relative z-10 mx-auto max-w-3xl px-6 pt-24 pb-32">
        {/* Back link */}
        <div className="mb-6">
          <Link
            href="/logbook"
            className="text-xs font-medium text-cyan-200/70 hover:text-cyan-100 transition-colors"
          >
            ← Back to Logbook
          </Link>
        </div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <Badge
              variant="outline"
              className="border-cyan-300/30 text-cyan-200/80"
            >
              TenKforHim / Mission Log
            </Badge>
            <span className="text-[11px] tracking-widest text-cyan-200/40">
              ENTRY #2 / 10000
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-cyan-100 mb-3">
            Logbook 002
          </h1>
          <p className="text-sm tracking-widest text-cyan-200/50">
            NOV 22 → DEC 1, 2025
          </p>
        </motion.header>

        {/* Body */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-8 text-cyan-100/80 leading-relaxed"
        >
          {/* Ten Days in Review */}
          <section>
            <h2 className="text-xl font-semibold text-cyan-100 mb-2">
              Ten Days in Review
            </h2>
            <p className="mb-3">
              Over these ten days, the ship changed coordinates. I moved to
              Hwaseong City — a place that feels appropriately named Mars, a
              quieter orbit away from noise. The space is smaller, but the
              separation feels important. It’s easier to work when the world is
              further away.
            </p>
          </section>

          {/* The Official Release of SUN */}
          <section>
            <h2 className="text-xl font-semibold text-cyan-100 mb-2">
              The Official Release of SUN
            </h2>
            <p className="mb-3">
              This period marked a major milestone: the official release of my
              first SUN album, <span className="italic">ELON-SUN - The Challenger</span>. Twenty tracks
              went live on Spotify, Apple Music, YouTube Music, and other
              platforms. Until now, everything lived in drafts and local
              folders. Seeing SUN enter the public record felt like ignition
              finally turning into flight.
            </p>
          </section>

          {/* A New Medium Signal */}
          <section>
            <h2 className="text-xl font-semibold text-cyan-100 mb-2">
              A New Medium Signal
            </h2>
            <p className="mb-3">
              I also published a new essay on Medium — a full overview of the
              TenKforHim project and its structure. From here on, the plan is
              simple and strict: one essay every two weeks. Even if the music
              moves fast and chaotically, I want a stable written signal that
              documents the direction in slow motion.
            </p>
          </section>

          {/* Filling the Gaps in VEN and EAR */}
          <section>
            <h2 className="text-xl font-semibold text-cyan-100 mb-2">
              Filling the Gaps in VEN and EAR
            </h2>
            <p className="mb-3">
              Work on VEN temporarily stalled at Annie and Mika due to the lack
              of an iOS device. Instead of waiting, I jumped ahead. I completed
              VEN 9, VEN 10, and EAR 1 — filling the empty spaces of the
              constellation first, knowing the uploads will still follow the
              original order once everything is ready.
            </p>
          </section>

          {/* Half a Million, and Silence */}
          <section>
            <h2 className="text-xl font-semibold text-cyan-100 mb-2">
              Half a Million, and Silence
            </h2>
            <p className="mb-3">
              SoundCloud quietly crossed 500,000 total plays. The number looks
              loud on paper, but the silence elsewhere is striking. On YouTube,
              TikTok, and X, the response is still almost nonexistent. It feels
              like shouting into a vacuum — the sound exists, but the echo
              hasn&apos;t returned.
            </p>
          </section>

          {/* The Next Ten Days */}
          <section>
            <h2 className="text-xl font-semibold text-cyan-100 mb-2">
              The Next Ten Days
            </h2>
            <p className="mb-3">
              The next ten days will belong to EAR. From December 2 to December
              11, I&apos;ll focus on the Earth project — music shaped by
              geography, continents, and natural structure. I may not finish the
              entire world in one orbit, but I expect to come very close.
            </p>
          </section>

          <p className="text-[11px] tracking-widest text-cyan-200/40 pt-4">
            LOGBOOK 002 · #2 / 10000
          </p>
        </motion.div>
      </div>
    </div>
  );
}
