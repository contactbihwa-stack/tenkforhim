"use client"
import { useEffect, useRef } from "react"

export default function Starfield({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const c = ref.current
    if (!c) return

    const ctx = c.getContext("2d")!
    let w = (c.width = window.innerWidth)
    let h = (c.height = window.innerHeight)

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0

    let targetCursorX = w / 2
    let targetCursorY = h / 2
    let cursorX = w / 2
    let cursorY = h / 2

    const createLayer = (count: number, layer: "far" | "mid" | "near") => {
      const layerConfig = {
        far: { speed: 0.25, maxTranslate: 2 },
        mid: { speed: 0.5, maxTranslate: 5 },
        near: { speed: 1.0, maxTranslate: 10 },
      }
      const config = layerConfig[layer]

      return Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        baseX: 0,
        baseY: 0,
        r:
          layer === "far"
            ? Math.random() * 0.5 + 0.3
            : layer === "mid"
              ? Math.random() * 0.6 + 0.4
              : Math.random() * 0.8 + 0.5,
        a: Math.random() * 0.3 + 0.35,
        speed: config.speed,
        maxTranslate: config.maxTranslate,
      }))
    }

    const farStars = createLayer(40, "far")
    const midStars = createLayer(40, "mid")
    const nearStars = createLayer(40, "near")
    const allStars = [...farStars, ...midStars, ...nearStars]

    allStars.forEach((s) => {
      s.baseX = s.x
      s.baseY = s.y
    })

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const clamp = (value: number, min: number, max: number) => {
      return Math.max(min, Math.min(max, value))
    }

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      cursorX = lerp(cursorX, targetCursorX, 0.12)
      cursorY = lerp(cursorY, targetCursorY, 0.12)

      const offsetX = ((cursorX - w / 2) / w) * 0.025
      const offsetY = ((cursorY - h / 2) / h) * 0.025

      for (const s of allStars) {
        if (prefersReducedMotion || isTouchDevice) {
          s.x = s.baseX
          s.y = s.baseY
        } else {
          const translateX = clamp(offsetX * w * s.speed, -s.maxTranslate, s.maxTranslate)
          const translateY = clamp(offsetY * h * s.speed, -s.maxTranslate, s.maxTranslate)
          s.x = s.baseX + translateX
          s.y = s.baseY + translateY
        }

        // Gentle twinkling
        s.a += (Math.random() - 0.5) * 0.02
        const alpha = Math.max(0.2, Math.min(0.65, s.a))

        ctx.fillStyle = `rgba(0, 255, 255, ${alpha})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    const onMouseMove = (e: MouseEvent) => {
      if (!prefersReducedMotion && !isTouchDevice) {
        targetCursorX = e.clientX
        targetCursorY = e.clientY
      }
    }

    const onResize = () => {
      w = c.width = window.innerWidth
      h = c.height = window.innerHeight
      allStars.forEach((s) => {
        s.baseX = Math.random() * w
        s.baseY = Math.random() * h
        s.x = s.baseX
        s.y = s.baseY
      })
      targetCursorX = w / 2
      targetCursorY = h / 2
      cursorX = w / 2
      cursorY = h / 2
    }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return <canvas ref={ref} className={`fixed inset-0 z-0 pointer-events-none ${className}`} />
}
