// app/essays/EssaysClient.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Starfield from '@/lib/starfield';
import useIsMobile from '@/lib/useIsMobile';

type Particle = { id: number; x: number; y: number; vx: number; vy: number };
type Seed = { id: number; x: number; y: number };

const essays = [
  {
    title: 'The Art of Ignition',
    subtitle: 'On creation and willpower',
    position: { top: '45%', left: '20%' },
    color: '#00ffff',
  },
  {
    title: 'Between Machine and Soul',
    subtitle: 'On AI and emotion',
    position: { top: '50%', left: '50%' },
    color: '#ff69b4',
  },
  {
    title: 'Why I Create Ten Thousand Times',
    subtitle: 'The MQQ philosophy',
    position: { top: '48%', left: '75%' },
    color: '#ffd700',
  },
];

export default function EssaysClient() {
  const isMobile = useIsMobile(); // ✅ 모바일 감지 (true/false)

  const [hoveredFlower, setHoveredFlower] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  // 화면 크기를 상태로 들고가서 SSR 안전 + 애니메이션 수치 계산
  const [vw, setVw] = useState(0);
  const [vh, setVh] = useState(0);

  const [pollenParticles, setPollenParticles] = useState<Particle[]>([]);
  const [lightSeeds, setLightSeeds] = useState<Seed[]>([]);
  const seedIdRef = useRef(0);

  // viewport 수집
  useEffect(() => {
    const update = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // 배경 파티클: 모바일에서는 개수 축소/미표시
  useEffect(() => {
    const count = isMobile ? 0 : 80; // ✅ 모바일이면 파티클 제거(0) / 데스크톱 80개
    const ps: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * Math.max(vw, 1),
      y: Math.random() * Math.max(vh, 1),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));
    setPollenParticles(ps);
  }, [vw, vh, isMobile]);

  // 파티클 이동
  useEffect(() => {
    if (pollenParticles.length === 0) return;
    const interval = setInterval(() => {
      setPollenParticles(prev =>
        prev.map(p => ({
          ...p,
          x: vw ? (p.x + p.vx + vw) % vw : p.x,
          y: vh ? (p.y + p.vy + vh) % vh : p.y,
        })),
      );
    }, 50);
    return () => clearInterval(interval);
  }, [vw, vh, pollenParticles.length]);

  // 마우스 씨앗 빛: 모바일에서는 비활성화
  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.9) {
        const id = seedIdRef.current++;
        setLightSeeds(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
        setTimeout(() => {
          setLightSeeds(prev => prev.filter(s => s.id !== id));
        }, 3000);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#030515] to-[#0b0f1e]">
      <Navbar />

      {/* ✅ 무거운 연출(Starfield, 파티클, 나비)은 데스크톱에서만 */}
      {!isMobile && (
        <>
          <Starfield />

          {pollenParticles.map(p => (
            <div
              key={p.id}
              className="pointer-events-none fixed z-20 h-0.5 w-0.5 rounded-full bg-white/15"
              style={{
                left: p.x,
                top: p.y,
                boxShadow: '0 0 3px rgba(255, 255, 255, 0.2)',
              }}
            />
          ))}

          {lightSeeds.map(seed => (
            <motion.div
              key={seed.id}
              className="pointer-events-none fixed z-50"
              style={{ left: seed.x, top: seed.y }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 0.8, 0.8, 0], scale: [0, 1, 1.2, 0] }}
              transition={{ duration: 3, ease: 'easeOut' }}
            >
              <div className="relative">
                <div className="h-1 w-1 rounded-full bg-cyan-300/80" />
                <motion.div
                  className="absolute left-1/2 top-0 w-0.5 bg-gradient-to-t from-cyan-400/60 to-transparent"
                  initial={{ height: 0 }}
                  animate={{ height: 20 }}
                  transition={{ duration: 2, delay: 0.5 }}
                  style={{ transform: 'translateX(-50%)' }}
                />
                <motion.div
                  className="absolute left-1/2 top-0 h-2 w-4 rounded-full bg-cyan-300/40 blur-sm"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.6, scale: 1 }}
                  transition={{ duration: 1, delay: 1.5 }}
                  style={{ transform: 'translate(-50%, -10px)' }}
                />
              </div>
            </motion.div>
          ))}

          {/* 🦋 나비 궤적: viewport 준비된 뒤에만 */}
          {vw > 0 && vh > 0 && (
            <motion.div
              className="pointer-events-none fixed z-40"
              animate={{
                x: [0, vw * 0.3, vw * 0.7, vw],
                y: [vh * 0.2, vh * 0.4, vh * 0.3, vh * 0.5],
              }}
              transition={{
                duration: 30,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeInOut',
              }}
            >
              <div className="relative">
                <motion.div
                  className="absolute h-1 w-8 rounded-full bg-gradient-to-r from-transparent via-pink-300/30 to-transparent blur-sm"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                <div className="relative h-3 w-1 rounded-full bg-pink-200/60" />
                <motion.div
                  className="absolute -left-2 top-0 h-2 w-2 rounded-full bg-pink-300/40 blur-[2px]"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.div
                  className="absolute -right-2 top-0 h-2 w-2 rounded-full bg-pink-300/40 blur-[2px]"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 0.25,
                  }}
                />
              </div>
            </motion.div>
          )}
        </>
      )}

      {/* 아래 그라데이션 바닥 */}
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-white/5 to-transparent backdrop-blur-sm" />

      <main className="relative z-30 flex min-h-screen flex-col items-center justify-start px-6 pt-32 pb-24">
        <motion.h1
          className="mb-4 font-playfair text-4xl md:text-6xl font-light tracking-wide text-[#dbe8ff]"
          style={{
            textShadow:
              '0 0 30px rgba(0, 255, 255, 0.3), 0 0 60px rgba(0, 255, 255, 0.15)',
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          The Garden of Light
        </motion.h1>

        <motion.p
          className="mb-16 md:mb-24 max-w-2xl text-center text-sm font-light leading-relaxed text-[#dbe8ff]/70 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0.7, 1, 1, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: 'loop' }}
        >
          Don&apos;t chase the butterfly. Tend to the garden. Every thought is a seed.
        </motion.p>

        {/* 꽃 카드들: 모바일은 간격/크기 소폭 확대 */}
        <div className="relative h-[420px] md:h-[500px] w-full max-w-6xl">
          {essays.map((essay, i) => (
            <motion.div
              key={i}
              className="absolute cursor-pointer"
              style={{
                top: essay.position.top,
                left: essay.position.left,
                transform: 'translate(-50%, -50%)',
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
                  ease: 'easeInOut',
                },
              }}
              onMouseEnter={() => setHoveredFlower(i)}
              onMouseLeave={() => setHoveredFlower(null)}
              onClick={() => setShowModal(true)}
            >
              <div className="relative flex flex-col items-center">
                {/* glow */}
                <motion.div
                  className="absolute top-0 h-24 w-24 rounded-full blur-2xl"
                  style={{ backgroundColor: essay.color }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: hoveredFlower === i && !isMobile ? 0.3 : 0, // 모바일은 hover 효과 제거
                    scale: hoveredFlower === i && !isMobile ? 1.2 : 0.8,
                  }}
                  transition={{ duration: 0.5 }}
                />

                {/* petals */}
                <div className="relative h-16 w-16 md:h-16 md:w-16">
                  {[0, 1, 2, 3, 4, 5].map(petal => (
                    <motion.div
                      key={petal}
                      className="absolute left-1/2 top-1/2 h-8 w-4 rounded-full"
                      style={{
                        backgroundColor: essay.color,
                        opacity: 0.4,
                        transformOrigin: 'center bottom',
                        transform: `translate(-50%, -100%) rotate(${petal * 60}deg)`,
                        filter: 'blur(1px)',
                      }}
                      animate={{
                        scale:
                          hoveredFlower === i && !isMobile
                            ? 1.3
                            : 1,
                        opacity:
                          hoveredFlower === i && !isMobile
                            ? 0.6
                            : 0.4,
                      }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  ))}
                  <div
                    className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      backgroundColor: essay.color,
                      opacity: 0.8,
                      boxShadow: `0 0 20px ${essay.color}`,
                    }}
                  />
                </div>

                {/* stem */}
                <div
                  className="h-24 w-1 rounded-full"
                  style={{
                    background: `linear-gradient(to bottom, ${essay.color}80, ${essay.color}20)`,
                    filter: 'blur(0.5px)',
                  }}
                />

                {/* title */}
                <motion.div
                  className="absolute -bottom-16 w-48 text-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{
                    opacity: hoveredFlower === i && !isMobile ? 1 : 1, // 모바일에서도 항상 보이도록
                    y: hoveredFlower === i && !isMobile ? 0 : -2,
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-pink-400/30 blur-2xl" />
              <p className="font-playfair text-xl md:text-2xl font-light text-[#dbe8ff]">
                🌸 This flower is still blooming.
              </p>
              <p className="mt-3 text-sm text-[#dbe8ff]/60">
                Come back when its light is ready.
              </p>
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
  );
}
