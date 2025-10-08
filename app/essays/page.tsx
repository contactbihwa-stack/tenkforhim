"use client"
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Starfield from '@/lib/starfield';

const essays = [
  {
    title: "The Art of Ignition",
    subtitle: "On creation and willpower",
    position: { top: "45%", left: "20%" },
    color: "#00ffff",
  },
  {
    title: "Between Machine and Soul",
    subtitle: "On AI and emotion",
    position: { top: "50%", left: "50%" },
    color: "#ff69b4",
  },
  {
    title: "Why I Create Ten Thousand Times",
    subtitle: "The MQQ philosophy",
    position: { top: "48%", left: "75%" },
    color: "#ffd700",
  },
]

export default function Essays() {
  const [hoveredFlower, setHoveredFlower] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [lightSeeds, setLightSeeds] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [pollenParticles, setPollenParticles] = useState<
    Array<{ id: number; x: number; y: number; vx: number; vy: number }>
  >([])
  const seedIdRef = useRef(0)

  useEffect(() => {
    const particles = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }))
    setPollenParticles(particles)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setPollenParticles((prev) =>
        prev.map((p) => ({
          ...p,
          x: (p.x + p.vx + window.innerWidth) % window.innerWidth,
          y: (p.y + p.vy + window.innerHeight) % window.innerHeight,
        })),
      )
    }, 50)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })

      if (Math.random() > 0.9) {
        const id = seedIdRef.current++
        setLightSeeds((prev) => [...prev, { id, x: e.clientX, y: e.clientY }])
        setTimeout(() => {
          setLightSeeds((prev) => prev.filter((s) => s.id !== id))
        }, 3000)
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#030515] to-[#0b0f1e]">
      <Navbar />
      <Starfield />

      {pollenParticles.map((particle) => (
        <div
          key={particle.id}
          className="pointer-events-none fixed z-20 h-0.5 w-0.5 rounded-full bg-white/15"
          style={{
            left: particle.x,
            top: particle.y,
            boxShadow: "0 0 3px rgba(255, 255, 255, 0.2)",
          }}
        />
      ))}

      {lightSeeds.map((seed) => (
        <motion.div
          key={seed.id}
          className="pointer-events-none fixed z-50"
          style={{ left: seed.x, top: seed.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.8, 0.8, 0], scale: [0, 1, 1.2, 0] }}
          transition={{ duration: 3, ease: "easeOut" }}
        >
          <div className="relative">
            {/* Seed */}
            <div className="h-1 w-1 rounded-full bg-cyan-300/80" />
            {/* Sprout stem */}
            <motion.div
              className="absolute left-1/2 top-0 w-0.5 bg-gradient-to-t from-cyan-400/60 to-transparent"
              initial={{ height: 0 }}
              animate={{ height: 20 }}
              transition={{ duration: 2, delay: 0.5 }}
              style={{ transform: "translateX(-50%)" }}
            />
            {/* Sprout leaves */}
            <motion.div
              className="absolute left-1/2 top-0 h-2 w-4 rounded-full bg-cyan-300/40 blur-sm"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              style={{ transform: "translate(-50%, -10px)" }}
            />
          </div>
        </motion.div>
      ))}

      <motion.div
        className="pointer-events-none fixed z-40"
        animate={{
          x: [0, window.innerWidth * 0.3, window.innerWidth * 0.7, window.innerWidth],
          y: [window.innerHeight * 0.2, window.innerHeight * 0.4, window.innerHeight * 0.3, window.innerHeight * 0.5],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="relative">
          {/* Trail */}
          <motion.div
            className="absolute h-1 w-8 rounded-full bg-gradient-to-r from-transparent via-pink-300/30 to-transparent blur-sm"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
          {/* Butterfly body */}
          <div className="relative h-3 w-1 rounded-full bg-pink-200/60" />
          {/* Wings */}
          <motion.div
            className="absolute -left-2 top-0 h-2 w-2 rounded-full bg-pink-300/40 blur-[2px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute -right-2 top-0 h-2 w-2 rounded-full bg-pink-300/40 blur-[2px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, delay: 0.25 }}
          />
        </div>
      </motion.div>

      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-white/5 to-transparent backdrop-blur-sm" />

      <main className="relative z-30 flex min-h-screen flex-col items-center justify-start px-6 pt-32 pb-24">
        <motion.h1
          className="mb-4 font-playfair text-6xl font-light tracking-wide text-[#dbe8ff]"
          style={{
            textShadow: "0 0 30px rgba(0, 255, 255, 0.3), 0 0 60px rgba(0, 255, 255, 0.15)",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          The Garden of Light
        </motion.h1>

        <motion.p
          className="mb-24 max-w-2xl text-center text-sm font-light leading-relaxed text-[#dbe8ff]/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0.7, 1, 1, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
        >
          Don't chase the butterfly. Tend to the garden. Every thought is a seed.
        </motion.p>

        <div className="relative h-[500px] w-full max-w-6xl">
          {essays.map((essay, i) => (
            <motion.div
              key={i}
              className="absolute cursor-pointer"
              style={{
                top: essay.position.top,
                left: essay.position.left,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: [0, -8, 0],
              }}
              transition={{
                opacity: { duration: 1, delay: i * 0.3 },
                y: {
                  duration: 4 + i * 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
              }}
              onMouseEnter={() => setHoveredFlower(i)}
              onMouseLeave={() => setHoveredFlower(null)}
              onClick={() => setShowModal(true)}
            >
              {/* Flower structure */}
              <div className="relative flex flex-col items-center">
                {/* Glow ring on hover */}
                <motion.div
                  className="absolute top-0 h-24 w-24 rounded-full blur-2xl"
                  style={{ backgroundColor: essay.color }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: hoveredFlower === i ? 0.3 : 0,
                    scale: hoveredFlower === i ? 1.2 : 0.8,
                  }}
                  transition={{ duration: 0.5 }}
                />

                {/* Petals */}
                <div className="relative h-16 w-16">
                  {[0, 1, 2, 3, 4, 5].map((petal) => (
                    <motion.div
                      key={petal}
                      className="absolute left-1/2 top-1/2 h-8 w-4 rounded-full"
                      style={{
                        backgroundColor: essay.color,
                        opacity: 0.4,
                        transformOrigin: "center bottom",
                        transform: `translate(-50%, -100%) rotate(${petal * 60}deg)`,
                        filter: "blur(1px)",
                      }}
                      animate={{
                        scale: hoveredFlower === i ? 1.3 : 1,
                        opacity: hoveredFlower === i ? 0.6 : 0.4,
                      }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  ))}
                  {/* Center */}
                  <div
                    className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      backgroundColor: essay.color,
                      opacity: 0.8,
                      boxShadow: `0 0 20px ${essay.color}`,
                    }}
                  />
                </div>

                {/* Stem */}
                <div
                  className="h-24 w-1 rounded-full"
                  style={{
                    background: `linear-gradient(to bottom, ${essay.color}80, ${essay.color}20)`,
                    filter: "blur(0.5px)",
                  }}
                />

                {/* Title (appears on hover) */}
                <motion.div
                  className="absolute -bottom-16 w-48 text-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{
                    opacity: hoveredFlower === i ? 1 : 0,
                    y: hoveredFlower === i ? 0 : -10,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <p
                    className="font-playfair text-sm font-light text-[#dbe8ff]"
                    style={{ textShadow: `0 0 10px ${essay.color}` }}
                  >
                    {essay.title}
                  </p>
                  <p className="mt-1 text-xs text-[#dbe8ff]/60">{essay.subtitle}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-pink-400/30 blur-2xl" />
              <p className="font-playfair text-2xl font-light text-[#dbe8ff]">🌸 This flower is still blooming.</p>
              <p className="mt-3 text-sm text-[#dbe8ff]/60">Come back when its light is ready.</p>
              <button
                onClick={() => setShowModal(false)}
                className="mt-6 rounded-lg border border-pink-400/30 bg-pink-400/10 px-6 py-2 text-sm text-pink-100 transition-all hover:bg-pink-400/20"
              >
                Return to the garden
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
