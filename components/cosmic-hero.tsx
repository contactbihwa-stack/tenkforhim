"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion"
import Link from "next/link"

export function CosmicHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { scrollY } = useScroll()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Scroll-based background darkening
  const backgroundOpacity = useTransform(scrollY, [0, 500], [0, 0.4])

  // Parallax effect on mouse move
  const parallaxX = useTransform(mouseX, [-1, 1], [-20, 20])
  const parallaxY = useTransform(mouseY, [-1, 1], [-20, 20])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      mouseX.set((clientX / innerWidth) * 2 - 1)
      mouseY.set((clientY / innerHeight) * 2 - 1)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  // Particle animation on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create particles
    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      pulseSpeed: number
      pulsePhase: number
    }> = []

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
      })
    }

    let animationFrame: number
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Pulsing opacity
        const pulse = Math.sin(time * particle.pulseSpeed + particle.pulsePhase)
        const currentOpacity = particle.opacity + pulse * 0.2

        // Draw particle with glow
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)

        // Cyan glow
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 3)
        gradient.addColorStop(0, `rgba(0, 255, 255, ${currentOpacity})`)
        gradient.addColorStop(0.5, `rgba(138, 43, 226, ${currentOpacity * 0.5})`)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = gradient
        ctx.fill()
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Animated particle canvas */}
      <motion.canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          x: parallaxX,
          y: parallaxY,
        }}
      />

      {/* Aurora gradient background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          x: parallaxX,
          y: parallaxY,
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(138, 43, 226, 0.3) 0%, rgba(25, 25, 112, 0.2) 40%, transparent 70%)",
        }}
      />

      {/* Scroll-based darkening overlay */}
      <motion.div className="absolute inset-0 bg-black" style={{ opacity: backgroundOpacity }} />

      {/* Center content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        {/* Poetic text lines with staggered animation */}
        <motion.div
          className="space-y-6 font-sans text-xl font-light leading-relaxed tracking-wide text-cyan-100 md:text-2xl lg:text-3xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.8,
              },
            },
          }}
        >
          <motion.p
            className="text-pretty"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1.2, ease: "easeOut" },
              },
            }}
          >
            I am TenKforHim — a pulse between silence and sound.
          </motion.p>
          <motion.p
            className="text-pretty"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1.2, ease: "easeOut" },
              },
            }}
          >
            I live to maximize my being — in both quality and quantity.
          </motion.p>
          <motion.p
            className="text-pretty"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1.2, ease: "easeOut" },
              },
            }}
          >
            Every spark I create is one more proof that I exist.
          </motion.p>
        </motion.div>

        {/* Glowing buttons */}
        <motion.div
          className="mt-16 flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 1 }}
        >
          <Link href="/ignition">
            <motion.button
              className="group relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-violet-950/40 px-8 py-4 font-sans text-sm font-light tracking-wider text-cyan-100 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/50 hover:bg-violet-900/50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Pulsing glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <span className="relative z-10">Enter Ignition</span>
            </motion.button>
          </Link>

          <Link href="/about">
            <motion.button
              className="group relative overflow-hidden rounded-2xl border border-violet-500/30 bg-indigo-950/40 px-8 py-4 font-sans text-sm font-light tracking-wider text-violet-200 backdrop-blur-sm transition-all duration-300 hover:border-violet-400/50 hover:bg-indigo-900/50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Pulsing glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-indigo-500/20"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
              <span className="relative z-10">Read the Vision</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
