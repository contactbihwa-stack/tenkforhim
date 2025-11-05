"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Starfield from "@/lib/starfield";
import { useState, useEffect } from "react";

export default function About() {
  const [cursorSparks, setCursorSparks] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (prefersReducedMotion || isTouchDevice) return;

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
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Navbar />

      {/* Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030512] to-[#0b0f1e]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_40%,rgba(0,217,255,0.04),transparent_70%)]" />
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
              opacity="0.6"
            />
            <path
              d="M 200 700 Q 400 500, 600 600 T 1000 500"
              stroke="url(#filament-glow)"
              strokeWidth="1"
              fill="none"
              opacity="0.5"
            />
            <path
              d="M 50 400 Q 250 300, 450 350 T 850 300"
              stroke="url(#filament-glow)"
              strokeWidth="0.8"
              fill="none"
              opacity="0.4"
            />
          </svg>
        </div>
      </div>

      <Starfield />

      {/* Cursor Sparks */}
      {cursorSparks.map((spark) => (
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

      {/* Main */}
      <main className="relative z-30 mx-auto max-w-[760px] px-6 pt-28 pb-24">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-5xl font-playfair font-semibold text-[#dbe8ff] tracking-wide"
        >
          The Vision
        </motion.h1>

        <motion.div
          className="space-y-8 text-[#dbe8ff] text-[21px] leading-[1.7] font-light"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {/* Lead */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            TenKforHim started with a simple wish:
            <br />
            <strong>to make something that matters—and to say thank you.</strong>
          </motion.p>

          {/* Story */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            I didn’t plan this for years.
            <br />
            I didn’t wait until I was ready.
            <br />
            I just started—with AI tools, a laptop, and gratitude.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            Now I write poems, make music, and ship small projects
            <br />
            that turn feeling into form.
          </motion.p>

          {/* ELON:10,000 block */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.4 }}
            className="rounded-2xl border border-white/15 bg-white/5 p-5"
          >
            <p>
              <strong>ELON:10,000</strong> is my first large-scale build:
            </p>
            <p className="mt-2">
              <strong>10,000 songs and 10,000 poems</strong> dedicated to Elon
              Musk
              <br />
              and the era that made creation accessible.
            </p>
          </motion.div>

          {/* Philosophy */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3.0 }}
          >
            Every piece I make is small.
            <br />
            Together, they’re a record—
            <br />
            of gratitude, of this moment, and of what one person can build
            <br />
            when the tools finally exist.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3.6 }}
            className="font-medium"
          >
            The vow is simple: keep building.
          </motion.p>

          {/* CTA */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 4.2 }}
            className="pt-6 text-center text-[18px]"
          >
            <a
              href="https://elon10000.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#B6E1FF] hover:text-[#dbe8ff] transition-colors duration-300"
              style={{
                textDecoration: "none",
                textShadow: "0 0 12px rgba(182,225,255,0.3)",
              }}
              aria-label="Explore ELON:10,000 — elon10000.com"
            >
              Explore ELON:10,000 → <span className="underline">elon10000.com</span>
            </a>
          </motion.p>
        </motion.div>
      </main>
    </div>
  );
}
