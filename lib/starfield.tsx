"use client";

import { useEffect, useRef } from "react";

/**
 * Starfield – lightweight, crisp, and click-through.
 * - Fixed behind UI (-z-10) + pointer-events-none (절대 클릭 안가로챔)
 * - DPR 스케일링으로 레티나에서도 선명
 * - 윈도우 크기/밀도에 따라 별 개수 자동 조절
 * - Reduce Motion / 터치 기기 대응
 */
export default function Starfield({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // --- 환경 감지
    const mm = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = mm.matches;
    const onMM = (e: MediaQueryListEvent) => (prefersReducedMotion = e.matches);
    mm.addEventListener?.("change", onMM);

    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.maxTouchPoints > 0;

    // --- 크기 & DPR 셋업
    const state = {
      w: 0,
      h: 0,
      dpr: Math.max(1, Math.min(2, window.devicePixelRatio || 1)), // 1~2로 제한 (성능)
    };

    type Star = {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      r: number;
      a: number;
      speed: number;
      maxTranslate: number;
    };

    let stars: Star[] = [];
    let targetX = 0;
    let targetY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const lerp = (s: number, e: number, t: number) => s + (e - s) * t;
    const clamp = (v: number, min: number, max: number) =>
      Math.max(min, Math.min(max, v));

    function createLayer(count: number, layer: "far" | "mid" | "near") {
      const cfg = {
        far: { speed: 0.25, maxTranslate: 2 },
        mid: { speed: 0.5, maxTranslate: 5 },
        near: { speed: 1.0, maxTranslate: 10 },
      }[layer];

      const arr: Star[] = Array.from({ length: count }, () => {
        const r =
          layer === "far"
            ? Math.random() * 0.5 + 0.3
            : layer === "mid"
            ? Math.random() * 0.6 + 0.4
            : Math.random() * 0.8 + 0.5;

        return {
          x: Math.random() * state.w,
          y: Math.random() * state.h,
          baseX: 0,
          baseY: 0,
          r,
          a: Math.random() * 0.3 + 0.35,
          speed: cfg.speed,
          maxTranslate: cfg.maxTranslate,
        };
      });

      return arr;
    }

    function resize() {
      state.w = window.innerWidth;
      state.h = window.innerHeight;

      // DPR 스케일
      canvas.width = Math.floor(state.w * state.dpr);
      canvas.height = Math.floor(state.h * state.dpr);
      canvas.style.width = `${state.w}px`;
      canvas.style.height = `${state.h}px`;
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);

      // 화면 면적당 밀도 (조정 가능)
      const area = state.w * state.h;
      const density = Math.max(0.00005, Math.min(0.00012, 0.00009)); // 90개 / 1e6px^2 정도
      const total = Math.max(60, Math.floor(area * density));

      const far = Math.floor(total * 0.35);
      const mid = Math.floor(total * 0.35);
      const near = Math.max(10, total - far - mid);

      const farStars = createLayer(far, "far");
      const midStars = createLayer(mid, "mid");
      const nearStars = createLayer(near, "near");
      stars = [...farStars, ...midStars, ...nearStars];

      stars.forEach((s) => {
        s.baseX = s.x;
        s.baseY = s.y;
      });

      targetX = state.w / 2;
      targetY = state.h / 2;
      cursorX = targetX;
      cursorY = targetY;
    }

    // 리사이즈 스로틀
    let resizeRaf: number | null = null;
    const onResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = null;
        resize();
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!prefersReducedMotion && !isTouch) {
        targetX = e.clientX;
        targetY = e.clientY;
      }
    };

    function draw() {
      ctx.clearRect(0, 0, state.w, state.h);

      // 커서 따라 부드럽게
      cursorX = lerp(cursorX, targetX, 0.12);
      cursorY = lerp(cursorY, targetY, 0.12);

      const offsetX = ((cursorX - state.w / 2) / state.w) * 0.025;
      const offsetY = ((cursorY - state.h / 2) / state.h) * 0.025;

      for (const s of stars) {
        // 모션 최소화/터치면 정적
        if (prefersReducedMotion || isTouch) {
          s.x = s.baseX;
          s.y = s.baseY;
        } else {
          const tx = clamp(offsetX * state.w * s.speed, -s.maxTranslate, s.maxTranslate);
          const ty = clamp(offsetY * state.h * s.speed, -s.maxTranslate, s.maxTranslate);
          s.x = s.baseX + tx;
          s.y = s.baseY + ty;
        }

        // 은은한 반짝임
        s.a += (Math.random() - 0.5) * 0.02;
        const alpha = clamp(s.a, 0.2, 0.65);

        ctx.fillStyle = `rgba(160, 255, 255, ${alpha})`; // 살짝 청록
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    // 초기화 & 루프 시작
    resize();
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      mm.removeEventListener?.("change", onMM);
    };
  }, []);

  // 뒤로 보내고, 클릭은 통과시키기
  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}

