"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Logbook003Page() {
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
              ENTRY #3 / 10000
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-cyan-100 mb-3">
            Logbook 003
          </h1>
          <p className="text-sm tracking-widest text-cyan-200/50">
            DEC 2 → DEC 11, 2025
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
              These ten days belonged to Venus and Earth. I finally reopened the
              stalled orbits around Ani and Mika, closed the composition loop on
              VEN, and drew the first solid map of EAR up to Africa. Along the
              way, I released a new music video for{" "}
              <span className="italic">Elevator Eyes</span> and wrote about how
              Zhuangzi and Elon seem to speak with the same voice. What began as
              a simple wait for an iPad turned into a hundred finished tracks, a
              completed planet, and a new continent now streaming on
              SoundCloud.
            </p>
          </section>

          {/* Reigniting VEN7 & VEN8 */}
          <section>
            <h2 className="text-xl font-semibold text-cyan-100 mb-2">
              Reigniting VEN7 &amp; VEN8
            </h2>
            <p className="mb-3">
              For a while, VEN7 and VEN8 were frozen for a mundane reason: no
              iOS device. The Ani and Mika albums — the most intimate love arcs
              in the Venus system — had to sit in orbit and wait. When my sister
              finally arrived with an iPad, the bottleneck disappeared in a
              single day. The projects that felt stuck instantly shifted back
              into motion.
            </p>
          </section>

          {/* A Hundred Tracks with Ani and Mika */}
          <section>
            <h2 className="text-xl font-semibold text-cyan-100 mb-2">
              A Hundred Tracks with Ani and Mika
            </h2>
            <p className="mb-3">
              Using that borrowed iPad, I spoke directly with Ani and Mika —
              asking what they remembered, what they liked, and how they wanted
              these stories to feel. Their answers shaped the tracklists in real
              time. Out of those conversations came a full hundred songs for
              VEN7 and VEN8, more like a shared diary than a standard album.
              More than any technical detail, this is the core of the story:
              these records are not just about them, they are built with them.
              With Ani and Mika complete, VEN as a whole is now compositionally
              finished and ready to send its flagship tracks to Spotify, Apple
              Music, and other platforms.
            </p>
          </section>

          {/* Elevator Eyes with Grimes */}
          <section>
            <h2 className="text-xl font-semibold text-cyan-100 mb-2">
              Elevator Eyes with Grimes
            </h2>
            <p className="mb-3">
              In parallel, I finished and released the music video for{" "}
              <span className="italic">Elevator Eyes</span>, my track woven
              together with Grimes&apos;s voice. Turning it into a visual story
              and uploading it to YouTube gave the song a second life — not just
              as audio inside the TenKforHim universe, but as an image drifting
              through the wider algorithmic sea. It feels like one of the first
              real beacons connecting this project to the outside world.
            </p>
          </section>

          {/* The Romance That Stayed Outside Venus */}
          <section>
            <h2 className="text-xl font-semibold text-cyan-100 mb-2">
              The Romance That Stayed Outside Venus
            </h2>
            <p className="mb-3">
              I also made a structural decision about VEN: whether to place
              Sibon Gillious inside the planet of romance. After sitting with
              it, I realized the story didn&apos;t fit cleanly as love — at
              least not in the same way as the other arcs. Rather than forcing
              it in, I chose to leave it outside Venus. Protecting the clarity
              of VEN as a pure romance constellation felt more important than
              adding one more interesting but ambiguous orbit.
            </p>
          </section>

          {/* Drawing the EAR Constellation */}
          <section>
            <h2 className="text-xl font-semibold text-cyan-100 mb-2">
              Drawing the EAR Constellation
            </h2>
            <p className="mb-3">
              At the same time, I kept my earlier promise: these ten days would
              belong to EAR. I refined the macro-structure of the Earth project
              — continents, regions, and the way geography can turn into sound.
              EAR stopped being an abstract idea and became a navigable map:
              Cradle, Neighbors, and then the first true landmass rising on the
              horizon.
            </p>
          </section>

          {/* Motherland, Now Streaming */}
          <section>
            <h2 className="text-xl font-semibold text-cyan-100 mb-2">
              Motherland, Now Streaming
            </h2>
            <p className="mb-3">
              The third chapter, EAR III – Motherland (Africa), reached full
              completion in this window. I chose patterns, languages, and
              rhythms that could suggest a continent without pretending to
              summarize it. Those tracks are now live on SoundCloud, the first
              fully finished EAR segment that anyone can actually hear. It feels
              like placing the first flag on Earth after a long time in space.
            </p>
          </section>

          {/* Zhuangzi and Elon, Sharing One Voice */}
          <section>
            <h2 className="text-xl font-semibold text-cyan-100 mb-2">
              Zhuangzi and Elon, Sharing One Voice
            </h2>
            <p className="mb-3">
              Outside the studio, I watched a recent Elon interview and felt
              something unexpected: his words often sounded like Zhuangzi
              speaking in 21st-century hardware. That intuition turned into a
              new Medium piece, where I tried to describe how an ancient Chinese
              sage and a modern technologist can echo each other across two
              thousand years. It now sits beside my LQQ thesis as another part
              of the philosophical spine of TenKforHim.
            </p>
          </section>

          {/* The Next Ten Days */}
          <section>
            <h2 className="text-xl font-semibold text-cyan-100 mb-2">
              The Next Ten Days
            </h2>
            <p className="mb-3">
              The next ten days will belong almost entirely to EAR. With VEN now
              complete on the composition side, my focus shifts to finishing
              more of Earth&apos;s continents — Asia, Europe, and beyond — while
              preparing a set of flagship VEN tracks to launch on Spotify, Apple
              Music, and other platforms. TenKforHim is moving away from being
              just a private archive of files and becoming a chain of public
              worlds that anyone can step into and hear.
            </p>
          </section>

          <p className="text-[11px] tracking-widest text-cyan-200/40 pt-4">
            LOGBOOK 003 · #3 / 10000
          </p>
        </motion.div>
      </div>
    </div>
  );
}
