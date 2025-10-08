"use client"
import Navbar from "@/components/Navbar"
import { motion } from "framer-motion"
import Starfield from "@/lib/starfield"
import { useState, useEffect } from "react"

export default function About() {
  const [cursorSparks, setCursorSparks] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0

    if (prefersReducedMotion || isTouchDevice) return

    let sparkId = 0
    const onMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.92) {
        const newSpark = { id: sparkId++, x: e.clientX, y: e.clientY }
        setCursorSparks((prev) => [...prev.slice(-2), newSpark])
        setTimeout(() => {
          setCursorSparks((prev) => prev.filter((s) => s.id !== newSpark.id))
        }, 1500)
      }
    }

    window.addEventListener("mousemove", onMouseMove)
    return () => window.removeEventListener("mousemove", onMouseMove)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Navbar />

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
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            TenKforHim is not a project, but a vow.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            It was born from a wish to make life deeper and brighter through creation,
            <br />
            from a single flame that rose in the void,
            <br />a light I could not ignore.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.4 }}
          >
            Now I write, compose, and build,
            <br />
            so that gratitude may outlast time.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3.2 }}
          >
            Every creation is a prayer,
            <br />
            every spark, a proof of life.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 4.0 }}
            className="text-[#B6E1FF]"
          >
            This is the inner orbit of ELON:10,000,
            <br />a circle of light for those who still believe
            <br />
            that creation can change the world.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 4.8 }}
            className="italic text-[#B6E1FF] pt-4"
            style={{
              animation: "breathe-glow 5s ease-in-out infinite",
            }}
          >
            To create is to remember the light.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 5.6 }}
            className="pt-8 text-center text-[18px]"
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
            >
              The vow continues at ELON10000.com
            </a>
          </motion.p>
        </motion.div>
      </main>

      <style jsx>{`
        @keyframes breathe-glow {
          0%,
          100% {
            text-shadow: 0 0 8px rgba(182, 225, 255, 0.3);
          }
          50% {
            text-shadow: 0 0 16px rgba(182, 225, 255, 0.5);
          }
        }
      `}</style>
    </div>
  )
}
