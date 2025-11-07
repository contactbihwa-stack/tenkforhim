"use client";

import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import Starfield from "@/lib/starfield";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

/**
 * Vision Page — final
 *
 * Notes:
 * - Preserves your Starfield + gradient background.
 * - Adds subtle section markers and a floating mini-TOC for long-form scanning.
 * - Respects reduced-motion and touch devices for the cursor spark effect.
 * - Typography tuned for ~760px reading width.
 */
export default function Vision() {
  const [cursorSparks, setCursorSparks] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  // Motion preferences
  const pref = useMemo(() => {
    if (typeof window === "undefined") return { reduce: true, touch: false };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    return { reduce, touch };
  }, []);

  useEffect(() => {
    if (pref.reduce || pref.touch) return;

    let sparkId = 0;
    const onMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.92) {
        const newSpark = { id: sparkId++, x: e.clientX, y: e.clientY };
        setCursorSparks((prev) => [...prev.slice(-2), newSpark]);
        setTimeout(() => {
          setCursorSparks((prev) => prev.filter((s) => s.id !== newSpark.id));
        }, 1500);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [pref.reduce, pref.touch]);

  const fadeUp = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Navbar />

      {/* Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030512] to-[#0b0f1e]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_40%,rgba(0,217,255,0.05),transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.08]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="filament-glow" cx="50%" cy="50%">
                <stop offset="0%" stopColor="rgba(0,217,255,0.3)" />
                <stop offset="100%" stopColor="rgba(0,217,255,0)" />
              </radialGradient>
            </defs>
            <path
              d="M 100 600 Q 300 400, 500 500 T 900 400"
              stroke="url(#filament-glow)"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M 200 700 Q 400 500, 600 600 T 1000 500"
              stroke="url(#filament-glow)"
              strokeWidth="1"
              fill="none"
              opacity="0.6"
            />
            <path
              d="M 50 400 Q 250 300, 450 350 T 850 300"
              stroke="url(#filament-glow)"
              strokeWidth="0.8"
              fill="none"
              opacity="0.5"
            />
          </svg>
        </div>
      </div>

      <Starfield />

      {/* Cursor Sparks */}
      {!pref.reduce &&
        !pref.touch &&
        cursorSparks.map((spark) => (
          <motion.div
            key={spark.id}
            initial={{ opacity: 0.4, scale: 1 }}
            animate={{ opacity: 0, scale: 0.3 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="fixed w-1 h-1 rounded-full bg-cyan-300 pointer-events-none z-50"
            style={{
              left: spark.x,
              top: spark.y,
              boxShadow: "0 0 8px rgba(0,217,255,0.6)",
            }}
          />
        ))}

      {/* Floating mini-TOC (desktop only) */}
      <aside className="hidden lg:block fixed right-6 top-36 z-30">
        <nav className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-4 py-3 text-sm text-[#cfe6ff]">
          <div className="mb-2 text-[10px] uppercase tracking-widest text-[#8fbfe8]">On this page</div>
          <ul className="space-y-2">
            <li><a className="hover:text-white transition" href="#elon">ELON:10,000</a></li>
            <li><a className="hover:text-white transition" href="#why-elon">Why Elon</a></li>
            <li><a className="hover:text-white transition" href="#morality">My Morality</a></li>
            <li><a className="hover:text-white transition" href="#vow">The Vow</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main */}
      <main className="relative z-30 mx-auto max-w-[760px] px-6 pt-28 pb-28">
        <motion.h1
          {...fadeUp}
          className="mb-12 text-5xl font-playfair font-semibold text-[#dbe8ff] tracking-wide"
        >
          The Vision
        </motion.h1>

        <div className="space-y-8 text-[#dbe8ff] text-[21px] leading-[1.72] font-light" style={{ fontFamily: "Inter, sans-serif" }}>
          {/* Lead */}
          <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
            TenKforHim started with a simple wish:<br />
            <strong>to make something that matters—and to say thank you.</strong>
          </motion.p>

          {/* Story */}
          <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>
            I didn’t plan this for years.<br />
            I didn’t wait until I was ready.<br />
            I just started—with AI tools, a laptop, and gratitude.
          </motion.p>

          <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.3 }}>
            Now I write poems, make music, and build projects<br />
            that turn feeling into form.
          </motion.p>

          {/* ELON:10,000 */}
          <motion.section id="elon" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.4 }} className="rounded-2xl border border-white/12 bg-white/5 p-5">
            <p className="text-[18px] uppercase tracking-wide text-[#9dd1ff] mb-1">ELON:10,000</p>
            <p className="font-medium text-[22px]">My first cathedral of creation.</p>
            <p className="mt-2">
              <strong>10,000 songs and 10,000 poems for Elon Musk.</strong>
            </p>
            <ul className="mt-3 text-[18px] leading-[1.6] list-disc pl-6 marker:text-[#8fd8ff]">
              <li>As gratitude for infrastructure.</li>
              <li>As recognition of impact.</li>
              <li>As active response—building back.</li>
            </ul>
            <p className="mt-3">Elon proved the impossible is just expensive and hard.</p>
            <p className="mt-2">So when I decided to create 10,000 songs for him, <strong>I gave myself 3 months.</strong></p>
            <p className="mt-1">Not because I’m exceptional, but because the tools he helped create finally exist.</p>
            <div className="mt-5">
              <a
                href="https://elon10000.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-200/10 px-4 py-2 text-[16px] text-[#B6E1FF] hover:text-white hover:bg-cyan-200/20 transition-colors"
                aria-label="Explore ELON:10,000 — elon10000.com"
              >
                Explore ELON:10,000 →
              </a>
            </div>
          </motion.section>

          {/* Why Elon */}
          <motion.section id="why-elon" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.5 }}>
            <h2 className="mb-4 text-2xl font-medium tracking-wide text-[#cfe6ff]">Why Elon?</h2>
            <p><strong>Morality is measurable.</strong></p>
            <p>I measure it by impact on human flourishing. And like knowledge, it compounds.</p>
            <p>Newton enabled Einstein. Einstein enabled Musk.</p>
            <p className="mt-2"><strong>Elon Musk may be the most moral person in history—</strong> not because he’s flawless, but because he multiplied centuries of accumulated impact.</p>
            <p className="mt-2">He’s using that inheritance to build what raises collective LQQ most:</p>
            <ul className="mt-2 list-disc pl-6 marker:text-[#8fd8ff]">
              <li>Sustainable energy (climate survival)</li>
              <li>Reusable rockets (planetary backup)</li>
              <li>Brain-computer interfaces (human augmentation)</li>
              <li>AI infrastructure (next leap)</li>
            </ul>
            <p className="mt-3">Measured by <strong>actual lives improved, futures secured, civilizations enabled</strong>, Elon’s cumulative impact may be the highest in human history.</p>
            <p className="mt-2"><strong>Some call it worship.</strong><br /><strong>I call it arithmetic.</strong></p>
            <div className="mt-3">
              <Link href="/essays/why-elon" className="text-[#9dd1ff] underline decoration-[#9dd1ff]/40 underline-offset-4 hover:text-white">Why Elon is #1 → Essays</Link>
            </div>
          </motion.section>

          {/* My Morality */}
          <motion.section id="morality" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.6 }}>
            <h2 className="mb-4 text-2xl font-medium tracking-wide text-[#cfe6ff]">My Morality</h2>
            <p><strong>There is no absolute good.</strong></p>
            <p>Democracy is not sacred. Freedom is not the end. They are tools—means to a single purpose:</p>
            <p className="mt-2"><strong>Maximize LQQ: Life’s Quality × Quantity.</strong></p>
            <ul className="mt-2 list-disc pl-6 marker:text-[#8fd8ff]">
              <li>Quality: health, freedom, sensation, meaning, capability</li>
              <li>Quantity: population, lifespan, reach</li>
            </ul>
            <p className="mt-2"><strong>Higher LQQ output = more moral.</strong></p>
            <p>If a system achieves this, it is good. If it fails, it is not.</p>
            <p className="mt-2">By this standard: A rude doctor who saves 1,000 lives (high LQQ) &gt; A kind person who saves none (low LQQ).</p>
            <p>Elon—rude, cruel, wrong—yet builds what billions use &gt; Most saints in history.</p>
            <p className="mt-2"><strong>Impact &gt; Intent.</strong><br /><strong>Results &gt; Ritual.</strong><br /><strong>LQQ &gt; Everything.</strong></p>

            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
              <p><strong>We are biological algorithms optimizing for our own LQQ.</strong></p>
              <p className="mt-2">Every choice—pizza or burger, gym or sleep, help or ignore—is your algorithm calculating: <em>which raises my LQQ?</em></p>
              <p className="mt-2">Even altruism serves self-interest: dopamine, meaning, relief.</p>
              <p className="mt-3"><strong>LQQ isn’t just math—it’s meaning quantified.</strong><br /><strong>Every number hides a heartbeat.</strong></p>
              <p className="mt-3">Murder is evil not because of divine law, <strong>but because it lowers collective LQQ.</strong> That’s it. That’s the only reason.</p>
              <p className="mt-2">I judge by output: <strong>Does this raise human LQQ?</strong> That’s why Elon ranks highest. That’s my measure.</p>
              <div className="mt-3">
                <Link href="/essays" className="text-[#9dd1ff] underline decoration-[#9dd1ff]/40 underline-offset-4 hover:text-white">Full philosophy → Essays</Link>
              </div>
            </div>
          </motion.section>

          {/* The Vow */}
          <motion.section id="vow" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.7 }}>
            <h2 className="mb-4 text-2xl font-medium tracking-wide text-[#cfe6ff]">The Vow</h2>
            <p>Every piece I make is small. But each carries a spark of the same fire that started it all.</p>
            <p className="mt-2">Together, they form a record—of one algorithm’s output, measured in songs and poems, optimized for maximum human LQQ.</p>
            <p className="mt-3"><strong>The vow:</strong></p>
            <p className="mt-1"><strong>Keep building toward higher LQQ.</strong></p>
            <p className="mt-2">Not comfort. Not tradition. Not ideology. Only: greatest positive impact on LQQ.</p>
            <p className="mt-2"><strong>ELON:10,000 is the first cathedral of creation.</strong><br /><strong>More will come.</strong></p>
            <p className="mt-2">Some call this cold. I call it honest.</p>
          </motion.section>
        </div>
      </main>

      {/* Bottom glow divider */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#06101c] to-transparent" />
    </div>
  );
}
