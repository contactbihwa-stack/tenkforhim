"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/Navbar"
import Starfield from "@/lib/starfield"

/** -----------------------
 *  DATA
 *  ----------------------*/
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
]


const generatePoems = (planetId: string, subthemeId: string, count = 100) => {
  const poems = []
  for (let i = 0; i < count; i++) {
    const code = `ELON-${planetId}-${String(i).padStart(4, "0")}`
    poems.push({
      code,
      planet: planetId,
      title: `Poem ${i + 1}`,
      firstLine: `This is the first line of poem ${i + 1}...`,
      text: `This is the full text of poem ${i + 1}.\n\nIt contains multiple lines\nand explores themes of ${subthemeId}.`,
      subtheme: subthemeId,
    })
  }
  return poems
}

/** -----------------------
 *  PAGE
 *  ----------------------*/
export default function PoemCosmos() {
  const [view, setView] = useState<"galaxy" | "planet" | "subtheme" | "poem" | "library">("galaxy")
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null)
  const [selectedSubtheme, setSelectedSubtheme] = useState<string | null>(null)
  const [selectedPoem, setSelectedPoem] = useState<any>(null)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  // 전체 시 (데모)
  const allPoems = useMemo(() => {
    const out: any[] = []
    planets.forEach((p) => {
      subthemesByPlanet[p.id].forEach((s) => {
        out.push(...generatePoems(p.id, s.id, 20))
      })
    })
    return out
  }, [])

  // 현재 선택 컨텍스트
  const currentPlanet = useMemo(
    () => (selectedPlanet ? planets.find((p) => p.id === selectedPlanet) ?? null : null),
    [selectedPlanet]
  )

  const currentSubtheme = useMemo(
    () =>
      selectedPlanet && selectedSubtheme
        ? subthemesByPlanet[selectedPlanet].find((s) => s.id === selectedSubtheme) ?? null
        : null,
    [selectedPlanet, selectedSubtheme]
  )

  // 현재 서브테마의 시 목록
  const subthemePoems = useMemo(
    () => (selectedPlanet && selectedSubtheme ? generatePoems(selectedPlanet, selectedSubtheme) : []),
    [selectedPlanet, selectedSubtheme]
  )

  // 시점 점 위치(선택 변경 시 고정)
  const positions = useMemo(() => {
    return subthemePoems.map(() => ({
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
    }))
  }, [selectedPlanet, selectedSubtheme, subthemePoems.length])

  // 라이브러리 필터
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return allPoems.filter((poem) => {
      if (selectedPlanet && poem.planet !== selectedPlanet) return false
      if (selectedSubtheme && poem.subtheme !== selectedSubtheme) return false
      if (!q) return true
      return (
        poem.title?.toLowerCase().includes(q) ||
        poem.firstLine?.toLowerCase().includes(q) ||
        poem.text?.toLowerCase().includes(q)
      )
    })
  }, [allPoems, search, selectedPlanet, selectedSubtheme])

  const handlePlanetClick = (planetId: string) => { setSelectedPlanet(planetId); setView("planet") }
  const handleSubthemeClick = (subthemeId: string) => { setSelectedSubtheme(subthemeId); setView("subtheme") }
  const handlePoemClick = (poem: any) => { setSelectedPoem(poem); setView("poem") }

  const handleBack = () => {
    if (view === "poem") { setView("subtheme"); setSelectedPoem(null) }
    else if (view === "subtheme") { setView("planet"); setSelectedSubtheme(null) }
    else if (view === "planet") { setView("galaxy"); setSelectedPlanet(null) }
    else if (view === "library") { setView("galaxy") }
  }

  const handleStardustDive = () => {
    const randomPlanet = planets[Math.floor(Math.random() * planets.length)]
    const subthemes = subthemesByPlanet[randomPlanet.id]
    const randomSubtheme = subthemes[Math.floor(Math.random() * subthemes.length)]
    const poems = generatePoems(randomPlanet.id, randomSubtheme.id)
    const randomPoem = poems[Math.floor(Math.random() * poems.length)]
    setSelectedPlanet(randomPlanet.id)
    setSelectedSubtheme(randomSubtheme.id)
    setSelectedPoem(randomPoem)
    setView("poem")
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0a0e27] to-black">
      <Navbar />
      <Starfield />

      {/* 액션 버튼 */}
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
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.3)" }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >← Back</motion.button>
      )}

      {/* 본문 */}
      <main className="relative z-30 flex items-center justify-center min-h-screen px-6" style={{ paddingTop: "72px" }}>
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
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              >
                {planets.map((planet, index) => {
                  const angle = (index / planets.length) * Math.PI * 2
                  const radius = 40
                  const x = 50 + radius * Math.cos(angle)
                  const y = 50 + radius * Math.sin(angle)
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
                  )
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
                <p
                  className="absolute left-1/2 -translate-x-1/2 text-center text-cyan-100/60 font-light tracking-wide"
                  style={{ top: 56 }}
                >
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
                  const angle = (index / subthemesByPlanet[selectedPlanet].length) * Math.PI * 2
                  const radius = 35
                  const x = 50 + radius * Math.cos(angle)
                  const y = 50 + radius * Math.sin(angle)
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
                            <div className="text-xs font-light text-cyan-100/60 mt-1">{subtheme.tagline}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
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
                <p
                  className="absolute left-1/2 -translate-x-1/2 text-center text-cyan-100/60 font-light tracking-wide"
                  style={{ top: 52 }}
                >
                  {currentSubtheme.tagline}
                </p>

                <div className="relative w-full h-full">
                  {subthemePoems.map((poem, index) => {
                    const { x, y } = positions[index] || { x: 50, y: 50 }
                    return (
                      <motion.div
                        key={poem.code}
                        className="absolute cursor-pointer group"
                        style={{ left: `${x}%`, top: `${y}%` }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.01 }}
                        onMouseEnter={() => setHoveredItem(poem.code)}
                        onMouseLeave={() => setHoveredItem(null)}
                        onClick={() => handlePoemClick(poem)}
                        whileHover={{ scale: 2 }}
                        whileTap={{ scale: 0.86 }}
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ background: currentPlanet.color, boxShadow: `0 0 10px ${currentPlanet.color}99` }}
                        />
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
                              <div className="text-xs font-light text-cyan-100/60 mt-1 max-w-xs">{poem.firstLine}</div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )
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
                  placeholder="Search title / first line / text"
                  className="flex-1 bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-sm text-white/90"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filtered.map((poem) => (
                  <button
                    key={poem.code}
                    onClick={() => { setSelectedPoem(poem); setView("poem"); }}
                    className="text-left bg-white/5 hover:bg-white/8 transition border border-white/10 rounded-2xl p-4"
                  >
                    <div className="text-xs text-white/50">{poem.code}</div>
                    <div className="mt-1 text-white/90">{poem.title}</div>
                    <div className="mt-1 text-xs text-white/60 line-clamp-2">{poem.firstLine}</div>
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
                <div className="flex items-center justify-between mb-6 text-xs font-light text-cyan-100/50">
                  <span>{selectedPoem.code}</span>
                  <span>{selectedPoem.subtheme}</span>
                </div>
                <h3 className="text-3xl font-light text-center mb-8 tracking-wide"
                    style={{ color: currentPlanet.color, textShadow: `0 0 20px ${currentPlanet.color}99` }}>
                  {selectedPoem.title}
                </h3>
                <pre className="text-cyan-100/90 font-light text-lg leading-relaxed whitespace-pre-wrap text-center tracking-wide">
                  {selectedPoem.text}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
