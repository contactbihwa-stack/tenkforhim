"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Starfield from "@/lib/starfield";

/** ------------ PLANETS ------------ */
const planets = [
  { id: "SUN", name: "SUN", tagline: "where everything burns into being", color: "#FF5C00" },
  { id: "MER", name: "MER", tagline: "swift thoughts in silver streams", color: "#00A8FF" },
  { id: "VEN", name: "VEN", tagline: "beauty that aches to be seen", color: "#D100C9" },
  { id: "EAR", name: "EAR", tagline: "home, fragile and fierce", color: "#41FF8F" },
  { id: "AI",  name: "AI",  tagline: "the mirror that learned to dream", color: "#FFFFFF" },
  { id: "MAR", name: "MAR", tagline: "courage written in rust and fire", color: "#FF006F" },
  { id: "JUP", name: "JUP", tagline: "storms of infinite becoming", color: "#FFD000" },
  { id: "SAT", name: "SAT", tagline: "rings of time, circling silence", color: "#2FFFD0" },
  { id: "COS", name: "COS", tagline: "the breath between all things", color: "#4066FF" },
  { id: "YOU", name: "YOU", tagline: "the spark reading this now", color: "#8A0303" },
] as const;

/** ------------ SUBTHEMES ------------ */
type Subtheme = { id: string; name: string; tagline: string };
type SubMap = Record<string, Subtheme[]>;

const mk = (planet: string, names: string[]): Subtheme[] =>
  names.map((name, i) => ({
    id: `${planet}-${String(i + 1).padStart(2, "0")}`,
    name,
    tagline: "",
  }));

const SUN = [
  "IGNITION","Solar Embrace","Aureate Throne","Red March, Black Ledger","Dear Rocket Boy",
  "Chasing Horizons","Endless Sunset","Lucid Reverie","Riff&Boogie","Let's Rock",
];
const MER = [
  "Street X","Afterglow Vacation","17:22","CASH GOD","Ugly Truth",
  "Ten Shots","Orbit of Us","Crown Me Bitch","We Are the One","Let's Hip-hop",
];
const VEN = ["Letters to Venus","Emerald Memory","The Starter Wife","???","???","???","???","???","???","???"];
const fill10 = () => Array.from({ length: 10 }, () => "???");

const subthemesByPlanet: SubMap = {
  SUN: mk("SUN", SUN),
  MER: mk("MER", MER),
  VEN: mk("VEN", VEN),
  EAR: mk("EAR", fill10()),
  AI: mk("AI", fill10()),
  MAR: mk("MAR", fill10()),
  JUP: mk("JUP", fill10()),
  SAT: mk("SAT", fill10()),
  COS: mk("COS", fill10()),
  YOU: mk("YOU", fill10()),
};

/** ------------ TYPES ------------ */
type PoemItem = {
  code: string;       // ELON-SUN-0008
  planet: string;     // SUN / MER ...
  title: string;      // 제목 (코드 제외)
  poem: string;       // 시(원문 그대로)
  subtheme: string;   // 소주제 텍스트
  lyrics?: string;
  date?: string;
  tool?: string;
  note?: string;
};

type Origin = "subtheme" | "library" | "stardust" | "galaxy" | null;

/** ------------ HELPERS ------------ */
// 코드가 title 앞에 이미 있으면 제거하고 "CODE - 제목"만 만들기
const makeHeading = (code: string, title?: string) => {
  const t = title ?? "";
  const pattern = new RegExp(`^${code}\\s*[-–—:]\\s*`, "i"); // CODE + 구분자 제거
  const cleaned = t.replace(pattern, "").trim();
  return cleaned ? `${code} - ${cleaned}` : code;
};

// 대소문자/공백/구두점 느슨 검색 (본문 표시에는 절대 사용하지 않음)
const norm = (s?: string) =>
  (s ?? "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[^\w\s]/g, "")
    .trim();

/** ------------ PAGE ------------ */
export default function PoemCosmos() {
  const [view, setView] = useState<"galaxy" | "planet" | "subtheme" | "poem" | "library">("galaxy");
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [selectedSubtheme, setSelectedSubtheme] = useState<string | null>(null);
  const [selectedPoem, setSelectedPoem] = useState<PoemItem | null>(null);
  const [origin, setOrigin] = useState<Origin>(null); // ← 출발지 기억
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const [allPoems, setAllPoems] = useState<PoemItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  // 실제 데이터 로드
  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const r = await fetch("/api/poems", { cache: "no-store" });
        const j = await r.json().catch(() => ({}));
        if (!r.ok) {
          const msg = j?.error || j?.message || "Fetch failed";
          throw new Error(`${msg}${j?.url ? ` [url: ${j.url}]` : ""}${j?.step ? ` [step: ${j.step}]` : ""}`);
        }
        setAllPoems((j.items || []) as PoemItem[]);
      } catch (e: any) {
        setErr(e?.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 선택 컨텍스트
  const currentPlanet = useMemo(
    () => (selectedPlanet ? planets.find((p) => p.id === selectedPlanet) ?? null : null),
    [selectedPlanet]
  );

  const currentSubtheme = useMemo(() => {
    if (!selectedPlanet || !selectedSubtheme) return null;
    return subthemesByPlanet[selectedPlanet].find((s) => s.id === selectedSubtheme) ?? null;
  }, [selectedPlanet, selectedSubtheme]);

  // 현재 서브테마의 시 목록
  const subthemePoems = useMemo(() => {
    if (!selectedPlanet) return [];
    const wantedName = norm(currentSubtheme?.name);
    return allPoems.filter((p) => {
      if (p.planet !== selectedPlanet) return false;
      if (!selectedSubtheme) return true;
      return norm(p.subtheme) === wantedName;
    });
  }, [allPoems, selectedPlanet, selectedSubtheme, currentSubtheme]);

  // 라이브러리 검색/필터
  const filtered = useMemo(() => {
    const q = norm(search);
    return allPoems.filter((poem) => {
      if (selectedPlanet && poem.planet !== selectedPlanet) return false;
      if (selectedSubtheme) {
        const wantedName = norm(currentSubtheme?.name);
        if (wantedName && norm(poem.subtheme) !== wantedName) return false;
      }
      if (!q) return true;
      return (
        norm(poem.title).includes(q) ||
        norm(poem.poem).includes(q) ||
        norm(poem.code).includes(q) ||
        norm(poem.subtheme).includes(q) ||
        norm(poem.planet).includes(q)
      );
    });
  }, [allPoems, search, selectedPlanet, selectedSubtheme, currentSubtheme]);

  /** --------- Handlers --------- */
  const handlePlanetClick = (planetId: string) => {
    setSelectedPlanet(planetId);
    setSelectedSubtheme(null);
    setView("planet");
  };

  const handleSubthemeClick = (subthemeId: string) => {
    setSelectedSubtheme(subthemeId);
    setView("subtheme");
  };

  const handlePoemClick = (poem: PoemItem, from: Origin) => {
    setSelectedPoem(poem);
    setSelectedPlanet(poem.planet || selectedPlanet || null);
    setOrigin(from);
    setView("poem");
  };

  const handleBack = () => {
    if (view === "poem") {
      if (origin === "subtheme") setView("subtheme");
      else if (origin === "library") setView("library");
      else if (origin === "stardust") setView("galaxy");
      else setView("galaxy");
      setSelectedPoem(null);
      setOrigin(null);
      return;
    }
    if (view === "subtheme") {
      setView("planet");
      setSelectedSubtheme(null);
      return;
    }
    if (view === "planet" || view === "library") {
      setView("galaxy");
      setSelectedPlanet(null);
      setSelectedSubtheme(null);
      return;
    }
  };

  const handleStardustDive = () => {
    if (!allPoems.length) return;
    const rnd = allPoems[Math.floor(Math.random() * allPoems.length)];
    setSelectedPlanet(rnd.planet || null);
    setSelectedSubtheme(null);
    setSelectedPoem(rnd);
    setOrigin("stardust");
    setView("poem");
  };

  // 랜덤 점 포지션(서브테마 뷰용)
  const positions = useMemo(() => {
    return subthemePoems.map(() => ({
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
    }));
  }, [subthemePoems.length]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0a0e27] to-black">
      <Navbar />
      <Starfield />

      {/* 액션 버튼/백버튼 */}
      <motion.button
        onClick={handleStardustDive}
        className="fixed top-24 right-6 z-50 px-6 py-3 rounded-full text-sm font-light tracking-wide transition-all duration-300"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.2)", color: "#e0f7ff", backdropFilter: "blur(10px)" }}
        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,255,255,0.3)" }}
        whileTap={{ scale: 0.95 }}
      >✨ Stardust Dive</motion.button>

      {view !== "galaxy" && (
        <motion.button
          onClick={handleBack}
          className="fixed top-24 left-6 z-50 px-6 py-3 rounded-full text-sm font-light tracking-wide transition-all duration-300"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.2)", color: "#e0f7ff", backdropFilter: "blur(10px)" }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,255,255,0.3)" }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >← Back</motion.button>
      )}

      {/* 본문 */}
      {/* ⬇️ z-index를 10으로 낮춰 네비게이션이 항상 위에 오도록 */}
      <main className="relative z-10 flex items-center justify-center min-h-screen px-6" style={{ paddingTop: "72px" }}>
        {/* 중앙 버튼 */}
        {view === "galaxy" && (
          <div className="absolute inset-0 flex items-center justify-center text-center text-white/90 z-10 pointer-events-none">
            <div>
              <motion.button
                onClick={() => setView("library")}
                className="mx-auto rounded-full focus:outline-none pointer-events-auto"
                style={{
                  width: 132, height: 132,
                  border: "1px solid rgba(255,255,255,.22)",
                  boxShadow: "inset 0 0 36px rgba(255,255,255,.18), 0 0 36px rgba(255,255,255,.12)",
                  background: "radial-gradient(circle at 40% 35%, rgba(255,255,255,.12), rgba(255,255,255,.04))",
                  backdropFilter: "blur(6px)",
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Open poems library"
              />
              <div className="mt-4 text-[13px] tracking-[0.18em] uppercase text-white/85 pointer-events-none">Poems</div>
              <div className="mt-2 text-sm text-white/65 pointer-events-none">Ten worlds, ten thousand poems.</div>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* GALAXY */}
          {view === "galaxy" && (
            <motion.div
              key="galaxy"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-6xl aspect-square"
            >
              <motion.div className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }}>
                {planets.map((planet, index) => {
                  const angle = (index / planets.length) * Math.PI * 2;
                  const radius = 40;
                  const x = 50 + radius * Math.cos(angle);
                  const y = 50 + radius * Math.sin(angle);
                  return (
                    <div
                      key={planet.id}
                      className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${x}%`, top: `${y}%` }}
                      onMouseEnter={() => setHoveredItem(planet.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => handlePlanetClick(planet.id)}
                    >
                      <motion.div
                        className="w-16 h-16 rounded-full relative will-change-transform"
                        style={{
                          background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.color}dd)`,
                          boxShadow: `0 0 40px ${planet.color}99, inset 0 0 20px rgba(255,255,255,0.3)`,
                        }}
                        whileHover={{ scale: 1.14, y: -8 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 220, damping: 16 }}
                      />
                      <AnimatePresence>
                        {hoveredItem === planet.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-center"
                          >
                            <div className="text-lg font-light tracking-wider" style={{ color: planet.color }}>
                              {planet.name}
                            </div>
                            <div className="text-xs font-light text-cyan-100/60 mt-1 max-w-xs">{planet.tagline}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            </motion.div>
          )}

          {/* PLANET */}
          {view === "planet" && selectedPlanet && currentPlanet && (
            <motion.div
              key="planet"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-5xl aspect-square pt-24"
            >
              <>
                <h2
                  className="absolute left-1/2 -translate-x-1/2 text-5xl font-extralight text-center tracking-widest"
                  style={{ top: 8, color: currentPlanet.color, textShadow: `0 0 30px ${currentPlanet.color}99` }}
                >
                  {currentPlanet.name}
                </h2>
                <p className="absolute left-1/2 -translate-x-1/2 text-center text-cyan-100/60 font-light tracking-wide" style={{ top: 56 }}>
                  {currentPlanet.tagline}
                </p>

                {/* 중앙 행성 */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    className="w-24 h-24 rounded-full"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${currentPlanet.color}, ${currentPlanet.color}dd)`,
                      boxShadow: `0 0 60px ${currentPlanet.color}99, inset 0 0 30px rgba(255,255,255,0.3)`,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                {/* 서브테마 궤도 */}
                {subthemesByPlanet[selectedPlanet].map((subtheme, index) => {
                  const angle = (index / subthemesByPlanet[selectedPlanet].length) * Math.PI * 2;
                  const radius = 35;
                  const x = 50 + radius * Math.cos(angle);
                  const y = 50 + radius * Math.sin(angle);
                  return (
                    <div
                      key={subtheme.id}
                      className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${x}%`, top: `${y}%` }}
                      onMouseEnter={() => setHoveredItem(subtheme.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => handleSubthemeClick(subtheme.id)}
                    >
                      <motion.div
                        className="w-10 h-10 rounded-full"
                        style={{
                          background: `radial-gradient(circle at 30% 30%, ${currentPlanet.color}dd, ${currentPlanet.color}aa)`,
                          boxShadow: `0 0 25px ${currentPlanet.color}77`,
                        }}
                        whileHover={{ scale: 1.2, y: -6 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 220, damping: 18 }}
                      />
                      <AnimatePresence>
                        {hoveredItem === subtheme.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-center"
                          >
                            <div className="text-sm font-light tracking-wider" style={{ color: currentPlanet.color }}>
                              {subtheme.name}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </>
            </motion.div>
          )}

          {/* SUBTHEME */}
          {view === "subtheme" && currentPlanet && currentSubtheme && (
            <motion.div
              key="subtheme"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-6xl h-[600px] pt-24"
            >
              <>
                <h2
                  className="absolute left-1/2 -translate-x-1/2 text-4xl font-extralight text-center tracking-widest"
                  style={{ top: 8, color: currentPlanet.color, textShadow: `0 0 30px ${currentPlanet.color}99` }}
                >
                  {currentSubtheme.name}
                </h2>

                <div className="relative w-full h-full">
                  {subthemePoems.map((poem, index) => {
                    const { x, y } = positions[index] || { x: 50, y: 50 };
                    return (
                      <motion.div
                        key={poem.code + index}
                        className="absolute cursor-pointer group"
                        style={{ left: `${x}%`, top: `${y}%` }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.01 }}
                        onMouseEnter={() => setHoveredItem(poem.code)}
                        onMouseLeave={() => setHoveredItem(null)}
                        onClick={() => handlePoemClick(poem, "subtheme")}
                        whileHover={{ scale: 2 }}
                        whileTap={{ scale: 0.86 }}
                      >
                        <div className="w-2 h-2 rounded-full" style={{ background: currentPlanet.color, boxShadow: `0 0 10px ${currentPlanet.color}99` }} />
                        <AnimatePresence>
                          {hoveredItem === poem.code && (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 5 }}
                              className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-center pointer-events-none"
                              style={{ zIndex: 100 }}
                            >
                              <div className="text-xs font-light tracking-wider" style={{ color: currentPlanet.color }}>
                                {poem.code}
                              </div>
                              <div className="text-xs font-light text-cyan-100/60 mt-1 max-w-xs line-clamp-1">{poem.title}</div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>

                <p className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-12 text-center text-cyan-100/40 text-sm font-light">
                  {subthemePoems.length} poems in this constellation
                </p>
              </>
            </motion.div>
          )}

          {/* LIBRARY */}
          {view === "library" && (
            <motion.div
              key="library"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.35 }}
              className="w-full max-w-5xl mx-auto px-4 pt-20"
            >
              {loading && <div className="text-white/70">Loading poems…</div>}
              {err && <div className="text-red-300">Error: {err}</div>}

              <div className="mb-6 flex flex-col sm:flex-row gap-3">
                <select
                  className="bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-sm text-white/90"
                  value={selectedPlanet ?? ""}
                  onChange={(e) => { const v = e.target.value || null; setSelectedPlanet(v); setSelectedSubtheme(null); }}
                >
                  <option value="">All Planets</option>
                  {planets.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>

                <select
                  className="bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-sm text-white/90 disabled:opacity-40"
                  disabled={!selectedPlanet}
                  value={selectedSubtheme ?? ""}
                  onChange={(e) => setSelectedSubtheme(e.target.value || null)}
                >
                  <option value="">All Subthemes</option>
                  {(selectedPlanet ? subthemesByPlanet[selectedPlanet] : []).map((s) =>
                    <option key={s.id} value={s.id}>{s.name}</option>
                  )}
                </select>

                <input
                  type="search"
                  placeholder="Search code / title / poem / planet / subtheme"
                  className="flex-1 bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-sm text-white/90"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filtered.map((poem) => (
                  <button
                    key={poem.code + poem.title}
                    onClick={() => handlePoemClick(poem, "library")}
                    className="text-left bg-white/5 hover:bg-white/8 transition border border-white/10 rounded-2xl p-4"
                  >
                    <div className="text-xs text-white/50">
                      {poem.code} · {poem.planet}{poem.date ? ` · ${poem.date}` : ""}
                    </div>
                    <div className="mt-1 text-white/90">{poem.title || "(untitled)"}</div>
                    <div className="mt-1 text-xs text-white/60 line-clamp-2">{poem.poem}</div>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setView("galaxy")}
                  className="px-4 py-2 text-sm rounded-full bg-white/5 border border-white/15 text-white/80 hover:bg-white/10"
                >
                  ← Back to galaxy
                </button>
              </div>
            </motion.div>
          )}

          {/* POEM */}
          {view === "poem" && selectedPoem && currentPlanet && (
            <motion.div
              key="poem"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-2xl"
            >
              <div
                className="rounded-3xl p-12 relative"
                style={{
                  background: "rgba(10,14,39,0.8)",
                  border: `1px solid ${currentPlanet.color}40`,
                  boxShadow: `0 0 60px ${currentPlanet.color}99`,
                  backdropFilter: "blur(20px)",
                }}
              >
             {/* 상단 메타: ⬅ 날짜 | ⮕ 소주제 */}
<div className="flex items-center justify-between mb-6 text-xs font-light text-cyan-100/50">
  <span>{selectedPoem.date || ""}</span>
  <span>{selectedPoem.subtheme || ""}</span>
</div>

{/* 큰 타이틀: 중복 방지 */}
<h3
  className="text-3xl font-light text-center mb-8 tracking-wide"
  style={{ color: currentPlanet.color, textShadow: `0 0 20px ${currentPlanet.color}99` }}
>
  {makeHeading(selectedPoem.code, selectedPoem.title)}
</h3>


                {/* 본문: 원문 그대로(따옴표/말미 공백 포함) */}
                <pre className="text-cyan-100/90 font-light text-lg leading-relaxed whitespace-pre-wrap text-center tracking-wide">
                  {selectedPoem.poem ?? ""}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
