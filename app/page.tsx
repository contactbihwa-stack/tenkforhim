"use client"
import { motion } from "framer-motion"
import type React from "react"
import Starfield from "@/lib/starfield"
import { useState } from "react"

const trails = [
  {
    name: "Ignition",
    subtitle: "Where creation begins.",
    href: "/ignition",
    color: "#FF5C00",
    path: "M 100 300 Q 300 100, 500 200",
  },
  {
    name: "Poems",
    subtitle: "Every star hides a poem.",
    href: "/poems",
    color: "#FF006F",
    path: "M 200 500 Q 400 300, 600 400",
  },
  {
    name: "Vision",
    subtitle: "The vow that started it all.",
    href: "/about",
    color: "#00D9FF",
    path: "M 700 200 Q 900 400, 1100 300",
  },
  {
    name: "Essays",
    subtitle: "Thoughts that became galaxies.",
    href: "/essays",
    color: "#4066FF",
    path: "M 800 500 Q 1000 250, 1200 450",
  },
  {
    name: "Store",
    subtitle: "Where the sparks are shared.",
    href: "/store",
    color: "#FFD700",
    path: "M 300 150 Q 500 400, 700 250",
  },
]

export default function Home() {
  const [hoveredTrail, setHoveredTrail] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30
    const y = (e.clientY / window.innerHeight - 0.5) * 30
    setMousePosition({ x, y })
  }

  const handleTrailClick = (href: string) => {
    setIsTransitioning(true)
    setTimeout(() => {
      window.location.href = href
    }, 800)
  }

  return (
    <div className="relative min-h-screen overflow-hidden" onMouseMove={handleMouseMove}>
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020312] via-[#0a0e1e] to-[#0c0f1e]" />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_50%,rgba(0,200,255,0.03),transparent_80%)]"
          animate={{
            x: mousePosition.x * 0.5,
            y: mousePosition.y * 0.5,
          }}
          transition={{ type: "spring", stiffness: 30, damping: 20 }}
        />
      </div>

      <Starfield />

      <motion.div
        className="pointer-events-none absolute inset-0 z-50 bg-[#020312]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isTransitioning ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      />

      <section className="relative z-30 flex min-h-screen items-center justify-center px-4 text-center">
        <div className="w-full max-w-[95vw]">
          <motion.div
            className="inline-block min-w-max"
            animate={{
              scale: [1, 1.01, 1],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="whitespace-nowrap text-prayer"
            >
              I am TenKforHim, a quiet pulse between silence and sound.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.15, ease: "easeOut" }}
              className="mt-6 whitespace-nowrap text-prayer"
            >
              I create to feel alive, and to thank the light that made me dream.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              className="mt-6 whitespace-nowrap text-prayer"
            >
              Every spark I make is small, but it carries everything I am.
            </motion.p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12 text-sm font-light tracking-widest text-cyan-200/40"
          >
            Choose your light.
          </motion.p>

          <div className="relative mx-auto mt-20 h-[600px] w-full max-w-[1200px]">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid meet">
              <defs>
                {trails.map((trail) => (
                  <linearGradient key={`gradient-${trail.name}`} id={`gradient-${trail.name}`}>
                    <stop offset="0%" stopColor={trail.color} stopOpacity="0" />
                    <stop offset="50%" stopColor={trail.color} stopOpacity="0.6" />
                    <stop offset="100%" stopColor={trail.color} stopOpacity="0" />
                  </linearGradient>
                ))}
              </defs>

              {trails.map((trail, index) => (
                <g key={trail.name}>
                  {/* Main trail path */}
                  <motion.path
                    d={trail.path}
                    fill="none"
                    stroke={`url(#gradient-${trail.name})`}
                    strokeWidth={hoveredTrail === trail.name ? "4" : "2"}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: hoveredTrail === trail.name ? 1 : 0.5,
                      x: mousePosition.x * (0.1 + index * 0.02),
                      y: mousePosition.y * (0.1 + index * 0.02),
                    }}
                    transition={{
                      pathLength: { duration: 2, delay: 0.8 + index * 0.15 },
                      opacity: { duration: 0.3 },
                      x: { type: "spring", stiffness: 30, damping: 20 },
                      y: { type: "spring", stiffness: 30, damping: 20 },
                    }}
                    style={{
                      filter: `drop-shadow(0 0 ${hoveredTrail === trail.name ? "20px" : "10px"} ${trail.color}40) blur(${hoveredTrail === trail.name ? "0px" : "1px"})`,
                    }}
                  />

                  {/* Glow effect */}
                  <motion.path
                    d={trail.path}
                    fill="none"
                    stroke={trail.color}
                    strokeWidth="8"
                    strokeLinecap="round"
                    opacity="0.2"
                    initial={{ pathLength: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: hoveredTrail === trail.name ? 0.4 : 0.2,
                      x: mousePosition.x * (0.1 + index * 0.02),
                      y: mousePosition.y * (0.1 + index * 0.02),
                    }}
                    transition={{
                      pathLength: { duration: 2, delay: 0.8 + index * 0.15 },
                      opacity: { duration: 0.3 },
                      x: { type: "spring", stiffness: 30, damping: 20 },
                      y: { type: "spring", stiffness: 30, damping: 20 },
                    }}
                    style={{
                      filter: `blur(15px)`,
                    }}
                  />

                  {/* Moving glow dot along the path */}
                  <motion.circle
                    r="4"
                    fill={trail.color}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                      x: mousePosition.x * (0.1 + index * 0.02),
                      y: mousePosition.y * (0.1 + index * 0.02),
                    }}
                    transition={{
                      opacity: {
                        duration: 3 + index * 0.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      },
                      x: { type: "spring", stiffness: 30, damping: 20 },
                      y: { type: "spring", stiffness: 30, damping: 20 },
                    }}
                    style={{
                      filter: `drop-shadow(0 0 10px ${trail.color})`,
                    }}
                  >
                    <animateMotion dur={`${8 + index * 2}s`} repeatCount="indefinite">
                      <mpath href={`#path-${trail.name}`} />
                    </animateMotion>
                  </motion.circle>

                  {/* Hidden path for animateMotion */}
                  <path id={`path-${trail.name}`} d={trail.path} fill="none" stroke="none" />

                  {/* Invisible hitbox for hover detection */}
                  <motion.path
                    d={trail.path}
                    fill="none"
                    stroke="transparent"
                    strokeWidth="40"
                    strokeLinecap="round"
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setHoveredTrail(trail.name)}
                    onMouseLeave={() => setHoveredTrail(null)}
                    onClick={() => handleTrailClick(trail.href)}
                    whileHover={{ scale: 1.05 }}
                  />
                </g>
              ))}
            </svg>

            {/* Trail labels on hover */}
            {trails.map((trail) => (
              <motion.div
                key={`label-${trail.name}`}
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: hoveredTrail === trail.name ? 1 : 0,
                  scale: hoveredTrail === trail.name ? 1 : 0.8,
                }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-lg font-light tracking-wide" style={{ color: trail.color }}>
                  {trail.name}
                </p>
                <p className="mt-1 text-xs font-light text-cyan-200/60">{trail.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
