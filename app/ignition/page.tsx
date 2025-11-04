"use client"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Starfield from "@/lib/starfield"

function Rocket({ glow = false }: { glow?: boolean }) {
  return (
    <svg
      width="84"
      height="180"
      viewBox="0 0 84 180"
      fill="none"
      className={glow ? "drop-shadow-[0_0_24px_#00ffffaa]" : ""}
    >
      <defs>
        <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7FFBFF" />
          <stop offset="100%" stopColor="#003a80" />
        </linearGradient>
      </defs>
      <path
        d="M42 6 C58 32 64 64 64 96 C64 128 58 150 42 174 C26 150 20 128 20 96 C20 64 26 32 42 6 Z"
        fill="url(#rg)"
        stroke="white"
        strokeOpacity=".25"
        strokeWidth="1"
      />
      <path d="M20 108 L6 126 L22 126" fill="#0aa3ff" fillOpacity=".6" />
      <path d="M64 108 L78 126 L62 126" fill="#0aa3ff" fillOpacity=".6" />
      <rect x="34" y="126" width="16" height="14" rx="3" fill="#003a80" />
      <ellipse cx="42" cy="92" rx="18" ry="66" fill="#00ffff" opacity=".08" />
    </svg>
  )
}

function Flame() {
  return (
    <svg width="28" height="52" viewBox="0 0 28 52" className="origin-top">
      <path d="M14 0 C18 10 22 18 14 52 C6 18 10 10 14 0 Z" fill="#00ffff" opacity=".65" />
      <path d="M14 6 C17 13 19 18 14 44 C9 18 11 13 14 6 Z" fill="#ffffff" opacity=".6" />
    </svg>
  )
}

export default function Ignition() {
  const [isHolding, setIsHolding] = useState(false)
  const [holdTime, setHoldTime] = useState(0)
  const [launched, setLaunched] = useState(false)
  const [rocketY, setRocketY] = useState(0)
  const [poemVisible, setPoemVisible] = useState(false)
  const startRef = useRef<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio()
    /* set your mp3 URL later */
  }, [])

  useEffect(() => {
    let t: any
    if (isHolding) {
      startRef.current = Date.now()
      t = setInterval(() => {
        const now = Date.now()
        setHoldTime(now - (startRef.current || now))
      }, 10)
    }
    return () => clearInterval(t)
  }, [isHolding])

  const release = () => {
    if (!isHolding) return
    setIsHolding(false)
    const total = holdTime
    setHoldTime(0)
    const capped = Math.min(total, 8000)
    setLaunched(true)
    setRocketY(-1 * (capped / 8))
    setTimeout(() => setPoemVisible(true), 2200)
    const best = localStorage.getItem("bestHold")
    if (!best || total > Number(best)) localStorage.setItem("bestHold", String(total))
    // if (audioRef.current) { audioRef.current.currentTime = 0; audioRef.current.play().catch(() => {}) }
  }

  const reset = () => {
    setLaunched(false)
    setPoemVisible(false)
    setRocketY(0)
  }

  const best = typeof window !== "undefined" ? localStorage.getItem("bestHold") : null

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(65%_45%_at_50%_45%,rgba(0,255,255,0.05),transparent_70%)]" />
      </div>
      <Starfield />

      {/* Best record (keep) */}
      {best && (
        <div className="absolute right-6 top-6 z-30 text-sm text-cyan-200/85">
          Best: {(Number(best) / 1000).toFixed(2)}s
        </div>
      )}

      {/* main stage */}
      <div className="relative z-30 flex min-h-screen flex-col items-center justify-center text-center">
        <motion.div
          animate={{
            y: launched ? rocketY - 520 : 0,
            filter: isHolding ? "drop-shadow(0 0 24px rgba(0,255,255,.7))" : "none",
          }}
          transition={{ duration: launched ? 3 : 0.25, ease: "easeOut" }}
          className="z-10 flex flex-col items-center"
        >
          <Rocket glow={isHolding} />
          {isHolding && (
            <div className="-mt-2 scale-90 animate-pulse">
              <Flame />
            </div>
          )}
        </motion.div>

        {/* footer controls */}
        <div className="absolute bottom-20 left-0 right-0 flex flex-col items-center gap-3 text-center">
          {/* Primary action button — now visibly a BUTTON */}
          {!launched ? (
            <button
              onMouseDown={() => setIsHolding(true)}
              onMouseUp={release}
              onMouseLeave={() => isHolding && setIsHolding(false)}
              onTouchStart={() => setIsHolding(true)}
              onTouchEnd={release}
              className="group relative inline-flex items-center justify-center rounded-full 
                         bg-gradient-to-b from-cyan-400/90 to-cyan-600/90 px-8 py-3 font-medium text-slate-950
                         shadow-[0_0_28px_rgba(34,211,238,0.35)] hover:shadow-[0_0_60px_rgba(34,211,238,0.45)]
                         transition-all duration-300 active:scale-[0.98] select-none"
              aria-label="Hold to ignite"
            >
              <span className="relative z-10">Hold to Ignite</span>
              <span className="absolute inset-0 rounded-full bg-cyan-400/30 blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
            </button>
          ) : (
            <button onClick={reset} className="btn-glass px-6 py-2">
              Try Again
            </button>
          )}

          {/* Gauge */}
          {!launched && (
            <div className="mt-1 w-56 h-[5px] rounded-full bg-cyan-500/15 overflow-hidden">
              <div
                style={{ width: `${Math.min(holdTime / 80, 100)}%` }}
                className="h-full bg-cyan-400 shadow-[0_0_16px_#00ffff] transition-[width] duration-100"
              />
            </div>
          )}

          {/* Clear, split instructions */}
          {!launched && !isHolding && (
            <p className="text-sm text-cyan-200/80 mt-1">
              Press and hold to ignite the engine. <br className="hidden sm:block" />
              <span className="text-cyan-200/70">Release to launch.</span>
            </p>
          )}
          {isHolding && (
            <p className="text-sm text-cyan-200/80 mt-1">
              Charging… {(holdTime / 1000).toFixed(2)}s
            </p>
          )}
          {launched && <p className="text-sm text-cyan-200/70 mt-1">Launching…</p>}
        </div>

        {/* poetic line after launch */}
        <AnimatePresence>
          {poemVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 3 }}
              className="absolute top-1/3 px-6 text-center text-lg text-cyan-200 italic"
            >
              "Every ignition is a prayer to the future."
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
