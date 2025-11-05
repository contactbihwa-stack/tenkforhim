// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Starfield from "@/lib/starfield";
import useIsMobile from "@/lib/useIsMobile";

type Trail = {
  name: string;
  subtitle: string;
  href: string;
  color: string;
  path: string;
};

const trails: Trail[] = [
  { name: "Ignition", subtitle: "Where creation begins.", href: "/ignition", color: "#FF5C00", path: "M 100 300 Q 300 100, 500 200" },
  { name: "Poems",    subtitle: "Every star hides a poem.", href: "/poems",    color: "#FF006F", path: "M 200 500 Q 400 300, 600 400" },
  { name: "Vision",   subtitle: "The vow that started it all.", href: "/vision", color: "#00D9FF", path: "M 700 200 Q 900 400, 1100 300" },
  { name: "Essays",   subtitle: "Thoughts that became galaxies.", href: "/essays", color: "#4066FF", path: "M 800 500 Q 1000 250, 1200 450" },
  { name: "Signal",    subtitle: "Where the sparks are shared.", href: "/signal",  color: "#FFD700", path: "M 300 150 Q 500 400, 700 250" },
];

export default function Home() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const prefersReduce = useReducedMotion();

  const [hovered, setHovered] = useState<string | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [vw, setVw] = useState(0);
  const [vh, setVh] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // viewport 저장(SSR 안전)
  useEffect(() => {
    const update = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / (vw || 1) - 0.5) * 30;
    const y = (e.clientY / (vh || 1) - 0.5) * 30;
    setMouse({ x, y });
  };

  const go = (href: string) => {
    setIsTransitioning(true);
    setTimeout(() => router.push(href), 400);
  };

  /* ──────────────────────────────────────────────────────────────
   *  ✅ 모바일/Reduce-Motion: 초경량 정적 홈 (애니메이션/Starfield 없음)
   *  ──────────────────────────────────────────────────────────── */
  if (isMobile || prefersReduce) {
    return (
      <div className="relative min-h-[100svh] overflow-hidden bg-[#020312] text-cyan-100">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#020312] via-[#0a0e1e] to-[#0c0f1e]" />
        <main className="relative z-10 mx-auto w-full max-w-[680px] px-4 pt-[max(48px,env(safe-area-inset-top))] pb-[max(24px,env(safe-area-inset-bottom))] text-center">
          {/* 줄바꿈 허용 + clamp로 폰트 자동조절 */}
          <h1 className="font-playfair leading-snug text-[#dbe8ff]" style={{ fontSize: "clamp(18px,4.8vw,28px)" }}>
            I am TenKforHim, a quiet pulse between silence and sound.
          </h1>
          <p className="mt-3 leading-relaxed text-[#dbe8ff]/85" style={{ fontSize: "clamp(14px,4.2vw,22px)" }}>
            I create to feel alive, and to thank the light that made me dream.
          </p>
          <p className="mt-3 leading-relaxed text-[#dbe8ff]/85" style={{ fontSize: "clamp(14px,4.2vw,22px)" }}>
            Every spark I make is small, but it carries everything I am.
          </p>

          <p className="mt-8 text-xs tracking-widest text-cyan-200/60">Choose your light</p>

          <ul className="mt-10 w-full space-y-3 text-left">
            {trails.map((t) => (
              <li key={t.name}>
                <Link
                  href={t.href}
                  className="block rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm transition-colors hover:bg-white/10 active:bg-white/15"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-playfair" style={{ color: t.color, fontSize: "clamp(16px,4.6vw,20px)" }}>
                        {t.name}
                      </p>
                      <p className="mt-1 text-[12px] text-cyan-200/70">{t.subtitle}</p>
                    </div>
                    <span
                      className="ml-3 inline-flex h-2.5 w-2.5 flex-none rounded-full opacity-90"
                      style={{ backgroundColor: t.color, boxShadow: `0 0 8px ${t.color}` }}
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </main>
      </div>
    );
  }

  /* ──────────────────────────────────────────────────────────────
   *  💻 데스크톱: 네가 쓰던 연출 그대로 (아래 코드는 원본 유지)
   *  ──────────────────────────────────────────────────────────── */
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      onMouseMove={!isMobile && !prefersReduce ? handleMouseMove : undefined}
    >
      {/* BG gradient + 약한 패럴랙스 (데스크톱만) */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020312] via-[#0a0e1e] to-[#0c0f1e]" />
        {!isMobile && !prefersReduce && (
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_50%,rgba(0,200,255,0.03),transparent_80%)]"
            animate={{ x: mouse.x * 0.5, y: mouse.y * 0.5 }}
            transition={{ type: "spring", stiffness: 30, damping: 20 }}
          />
        )}
      </div>

      {/* Starfield는 데스크톱 전용 */}
      {!isMobile && !prefersReduce && <Starfield />}

      {/* 전환 오버레이 */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-50 bg-[#020312]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isTransitioning ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      <section className="relative z-30 flex min-h-screen items-center justify-center px-4 text-center">
        <div className="w-full max-w-[1200px]">
          {/* 헤드라인: 반응형 폰트 크기 */}
          <motion.div
            className="inline-block"
            animate={{ scale: [1, 1.01, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, ease: "easeOut" }}
              className="text-prayer text-[22px] leading-tight md:text-[28px]"
            >
              I am TenKforHim
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.1, ease: "easeOut" }}
              className="mt-4 text-prayer text-[20px] leading-tight md:mt-6 md:text-[26px]"
            >
              I write poems and make music—
to feel alive, and to thank the era that made me dream
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.2, ease: "easeOut" }}
              className="mt-4 text-prayer text-[20px] leading-tight md:mt-6 md:text-[26px]"
            >
              Each piece is small, but it carries everything I am
            </motion.p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 text-xs font-light tracking-widest text-cyan-200/50 md:mt-12"
          >
            Choose your light.
          </motion.p>

          {/* 데스크톱: 기존 트레일 연출 */}
          <div className="relative mx-auto mt-14 h-[520px] w-full">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid meet">
              <defs>
                {trails.map((t) => (
                  <linearGradient key={`g-${t.name}`} id={`g-${t.name}`}>
                    <stop offset="0%" stopColor={t.color} stopOpacity="0" />
                    <stop offset="50%" stopColor={t.color} stopOpacity="0.6" />
                    <stop offset="100%" stopColor={t.color} stopOpacity="0" />
                  </linearGradient>
                ))}
              </defs>

              {trails.map((t, i) => (
                <g key={t.name}>
                  {/* 메인 경로 */}
                  <motion.path
                    d={t.path}
                    fill="none"
                    stroke={`url(#g-${t.name})`}
                    strokeWidth={hovered === t.name ? 4 : 2}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: hovered === t.name ? 1 : 0.6,
                      x: mouse.x * (0.08 + i * 0.02),
                      y: mouse.y * (0.08 + i * 0.02),
                    }}
                    transition={{
                      pathLength: { duration: 1.4, delay: 0.5 + i * 0.12 },
                      opacity: { duration: 0.2 },
                      x: { type: "spring", stiffness: 28, damping: 18 },
                      y: { type: "spring", stiffness: 28, damping: 18 },
                    }}
                    style={{ filter: `drop-shadow(0 0 ${hovered === t.name ? "16px" : "8px"} ${t.color}40)` }}
                  />

                  {/* 은은한 글로우 */}
                  <motion.path
                    d={t.path}
                    fill="none"
                    stroke={t.color}
                    strokeWidth="8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: hovered === t.name ? 0.35 : 0.18,
                      x: mouse.x * (0.08 + i * 0.02),
                      y: mouse.y * (0.08 + i * 0.02),
                    }}
                    transition={{
                      pathLength: { duration: 1.4, delay: 0.5 + i * 0.12 },
                    }}
                    style={{ filter: "blur(14px)" }}
                  />

                  {/* 따라다니는 작은 빛 */}
                  <motion.circle
                    r="3.5"
                    fill={t.color}
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2.6 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                    style={{ filter: `drop-shadow(0 0 10px ${t.color})` }}
                  >
                    <animateMotion dur={`${7 + i * 1.6}s`} repeatCount="indefinite">
                      <mpath href={`#p-${t.name}`} />
                    </animateMotion>
                  </motion.circle>

                  {/* 애니메이션용 숨김 경로 */}
                  <path id={`p-${t.name}`} d={t.path} fill="none" stroke="none" />

                  {/* 호버/클릭 hitbox */}
                  <motion.path
                    d={t.path}
                    fill="none"
                    stroke="transparent"
                    strokeWidth="36"
                    strokeLinecap="round"
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setHovered(t.name)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => go(t.href)}
                    whileHover={{ scale: 1.02 }}
                  />
                </g>
              ))}
            </svg>

            {/* 라벨 */}
            {trails.map((t) => (
              <motion.div
                key={`label-${t.name}`}
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: hovered === t.name ? 1 : 0, scale: hovered === t.name ? 1 : 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <p className="font-playfair text-lg tracking-wide" style={{ color: t.color }}>
                  {t.name}
                </p>
                <p className="mt-1 text-xs text-cyan-200/70">{t.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
