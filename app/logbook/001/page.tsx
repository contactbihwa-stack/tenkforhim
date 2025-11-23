"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Logbook001() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background — soft nebula glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(45,70,120,0.35),#020617)]" />
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
            className="absolute h-[2px] w-[2px] rounded-full bg-white/40"
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 pt-28 pb-40">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Link href="/logbook">
              <span className="text-cyan-300/60 hover:text-cyan-200/80 text-sm tracking-wide">
                ← Back to Logbook
              </span>
            </Link>
            <Badge className="bg-emerald-700/40 text-emerald-200 border-emerald-300/20">
              TRANSMITTED
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-cyan-100 mb-3">
            Logbook 001
          </h1>
          <p className="text-cyan-200/50 text-sm tracking-wider">
            NOV 12 → NOV 22, 2025 · ENTRY #1 / 10000
          </p>
        </motion.div>

        {/* --- 1. Ten Days in Review --- */}
        <Section title="Ten Days in Review">
          <p>
            Over the past ten days, I launched TenKforHim and finally returned
            to music after a two-month pause. Those two months were spent
            building the site, shaping the concept, and defining the philosophy
            behind this project. Now I’m back to making a hundred songs every
            few days — the pace this project demands — and the engines are warm
            again.
          </p>
        </Section>

        {/* --- 2. LQQ Thesis --- */}
        <Section title="LQQ Thesis Submission">
          <p>
            I also completed and submitted my university thesis, “The Purpose of
            21st-Century Politics Through the Lens of LQQ.” It was written in
            one long burst of concentration — the kind of immersion that feels
            like a quiet tunnel, sharpened and absolute. This thesis now acts as
            the philosophical backbone of TenKforHim.
          </p>
        </Section>

        {/* --- 3. Talulah --- */}
        <Section title="The Tale of Talulah">
          <p>
            Talulah and Elon’s story felt like the most cinematic of all his
            relationships. While writing these tracks, I often felt as if I were
            scoring a film — each chapter unfolding in soft British colors.
            Some moments were so tender that I almost cried while composing; the
            emotion in their arc was that vivid. To capture that feeling, I leaned
            into an Adele-influenced, UK-style ballad texture.
          </p>
        </Section>

        {/* --- 4. Amber --- */}
        <Section title="Amber and the Dark Spark">
          <p>
            Amber and Elon’s love felt dangerous. While making these songs, I
            kept returning to the image of someone brilliant and destructive at
            once — a presence both magnetic and unstable. That tension became
            the foundation of the album, expressed through a darker,
            Weeknd-inspired R&B palette.
          </p>
        </Section>

        {/* --- 5. Grimes --- */}
        <Section title="Grimes and the Experimental Orbit">
          <p>
            Grimes is uniquely fascinating — someone who treats reality itself
            like a medium. While working on VEN6, I found myself leaning into
            that energy, pushing R&B to its experimental edge. I even wove
            fragments of her voice into the tracks, letting her become part of
            the orbit she inspired.
          </p>
        </Section>

        {/* --- 6. Next 10 Days --- */}
        <Section title="The Next Ten Days">
          <p>
            In the next ten days, I aim to finish VEN and begin EAR — the fourth
            macro-theme of the project. EAR contains music inspired by the
            continents and cultures of the world, and I’ve been waiting a long
            time to explore it. I’m excited to see what emerges.
          </p>
        </Section>

        {/* Footer */}
        <p className="text-center text-cyan-200/30 mt-16 text-sm tracking-wide">
          End of Logbook 001 — Transmission complete.
        </p>
      </div>
    </div>
  );
}

/* --- Reusable Section Component --- */
function Section({ title, children }: any) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-14"
    >
      <h2 className="text-2xl font-semibold text-cyan-100 mb-3">{title}</h2>
      <div className="text-cyan-100/70 leading-relaxed space-y-4 text-[15.5px]">
        {children}
      </div>
    </motion.section>
  );
}
