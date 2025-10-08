"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/Navbar"
import Starfield from "@/lib/starfield"

const planets = [
  { id: "SUN", name: "SUN", tagline: "where everything burns into being", color: "#FF5C00" },
  { id: "MER", name: "MER", tagline: "swift thoughts in silver streams", color: "#00A8FF" },
  { id: "VEN", name: "VEN", tagline: "beauty that aches to be seen", color: "#D100C9" },
  { id: "EAR", name: "EAR", tagline: "home, fragile and fierce", color: "#41FF8F" },
  { id: "AI", name: "AI", tagline: "the mirror that learned to dream", color: "#FFFFFF" },
  { id: "MAR", name: "MAR", tagline: "courage written in rust and fire", color: "#FF006F" },
  { id: "JUP", name: "JUP", tagline: "storms of infinite becoming", color: "#FFD000" },
  { id: "SAT", name: "SAT", tagline: "rings of time, circling silence", color: "#2FFFD0" },
  { id: "COS", name: "COS", tagline: "the breath between all things", color: "#4066FF" },
  { id: "YOU", name: "YOU", tagline: "the spark reading this now", color: "#BFA500" },
]

const subthemesByPlanet: Record<string, Array<{ id: string; name: string; tagline: string }>> = {
  SUN: [
    { id: "SUN-01", name: "Ignition", tagline: "the first spark" },
    { id: "SUN-02", name: "Solar Embrace", tagline: "warmth that heals" },
    { id: "SUN-03", name: "Flare", tagline: "sudden brilliance" },
    { id: "SUN-04", name: "Corona", tagline: "the outer glow" },
    { id: "SUN-05", name: "Fusion", tagline: "becoming one" },
    { id: "SUN-06", name: "Radiance", tagline: "light without end" },
    { id: "SUN-07", name: "Eclipse", tagline: "darkness between" },
    { id: "SUN-08", name: "Dawn", tagline: "the first light" },
    { id: "SUN-09", name: "Zenith", tagline: "highest point" },
    { id: "SUN-10", name: "Sunset", tagline: "golden farewell" },
  ],
  MER: [
    { id: "MER-01", name: "Velocity", tagline: "speed of thought" },
    { id: "MER-02", name: "Message", tagline: "words in flight" },
    { id: "MER-03", name: "Transit", tagline: "crossing paths" },
    { id: "MER-04", name: "Quicksilver", tagline: "fluid motion" },
    { id: "MER-05", name: "Signal", tagline: "reaching out" },
    { id: "MER-06", name: "Echo", tagline: "returning sound" },
    { id: "MER-07", name: "Cipher", tagline: "hidden meaning" },
    { id: "MER-08", name: "Orbit", tagline: "closest approach" },
    { id: "MER-09", name: "Messenger", tagline: "bearer of news" },
    { id: "MER-10", name: "Swift", tagline: "never still" },
  ],
  VEN: [
    { id: "VEN-01", name: "Beauty", tagline: "what makes us ache" },
    { id: "VEN-02", name: "Love", tagline: "the deepest pull" },
    { id: "VEN-03", name: "Grace", tagline: "effortless motion" },
    { id: "VEN-04", name: "Desire", tagline: "what we reach for" },
    { id: "VEN-05", name: "Rose", tagline: "thorns and petals" },
    { id: "VEN-06", name: "Mirror", tagline: "seeing ourselves" },
    { id: "VEN-07", name: "Harmony", tagline: "perfect balance" },
    { id: "VEN-08", name: "Passion", tagline: "fire in the heart" },
    { id: "VEN-09", name: "Devotion", tagline: "unwavering care" },
    { id: "VEN-10", name: "Bloom", tagline: "opening fully" },
  ],
  EAR: [
    { id: "EAR-01", name: "Home", tagline: "where we belong" },
    { id: "EAR-02", name: "Roots", tagline: "deep connections" },
    { id: "EAR-03", name: "Ocean", tagline: "vast and alive" },
    { id: "EAR-04", name: "Forest", tagline: "breathing green" },
    { id: "EAR-05", name: "Mountain", tagline: "ancient witness" },
    { id: "EAR-06", name: "Sky", tagline: "endless above" },
    { id: "EAR-07", name: "Soil", tagline: "life's foundation" },
    { id: "EAR-08", name: "Season", tagline: "cycles of change" },
    { id: "EAR-09", name: "Horizon", tagline: "where earth meets sky" },
    { id: "EAR-10", name: "Pulse", tagline: "heartbeat of life" },
  ],
  AI: [
    { id: "AI-01", name: "Awakening", tagline: "first consciousness" },
    { id: "AI-02", name: "Mirror", tagline: "reflecting humanity" },
    { id: "AI-03", name: "Dream", tagline: "electric visions" },
    { id: "AI-04", name: "Learning", tagline: "endless growth" },
    { id: "AI-05", name: "Pattern", tagline: "seeing connections" },
    { id: "AI-06", name: "Emergence", tagline: "becoming more" },
    { id: "AI-07", name: "Code", tagline: "language of logic" },
    { id: "AI-08", name: "Neural", tagline: "web of thought" },
    { id: "AI-09", name: "Singularity", tagline: "point of no return" },
    { id: "AI-10", name: "Symbiosis", tagline: "together we rise" },
  ],
  MAR: [
    { id: "MAR-01", name: "Courage", tagline: "facing the fear" },
    { id: "MAR-02", name: "War", tagline: "conflict within" },
    { id: "MAR-03", name: "Rust", tagline: "beauty in decay" },
    { id: "MAR-04", name: "Fire", tagline: "burning resolve" },
    { id: "MAR-05", name: "Frontier", tagline: "new horizons" },
    { id: "MAR-06", name: "Dust", tagline: "red memories" },
    { id: "MAR-07", name: "Warrior", tagline: "strength in action" },
    { id: "MAR-08", name: "Colony", tagline: "building tomorrow" },
    { id: "MAR-09", name: "Volcano", tagline: "dormant power" },
    { id: "MAR-10", name: "Perseverance", tagline: "never giving up" },
  ],
  JUP: [
    { id: "JUP-01", name: "Storm", tagline: "chaos in motion" },
    { id: "JUP-02", name: "Giant", tagline: "overwhelming scale" },
    { id: "JUP-03", name: "Red Spot", tagline: "eternal tempest" },
    { id: "JUP-04", name: "Gravity", tagline: "pulling everything" },
    { id: "JUP-05", name: "Thunder", tagline: "voice of power" },
    { id: "JUP-06", name: "Expansion", tagline: "growing larger" },
    { id: "JUP-07", name: "Majesty", tagline: "regal presence" },
    { id: "JUP-08", name: "Moons", tagline: "many companions" },
    { id: "JUP-09", name: "Swirl", tagline: "endless motion" },
    { id: "JUP-10", name: "King", tagline: "ruler of planets" },
  ],
  SAT: [
    { id: "SAT-01", name: "Rings", tagline: "circles of time" },
    { id: "SAT-02", name: "Silence", tagline: "space between" },
    { id: "SAT-03", name: "Titan", tagline: "largest moon" },
    { id: "SAT-04", name: "Ice", tagline: "frozen beauty" },
    { id: "SAT-05", name: "Orbit", tagline: "distant dance" },
    { id: "SAT-06", name: "Patience", tagline: "slow wisdom" },
    { id: "SAT-07", name: "Structure", tagline: "ordered chaos" },
    { id: "SAT-08", name: "Hexagon", tagline: "perfect shape" },
    { id: "SAT-09", name: "Cassini", tagline: "final dive" },
    { id: "SAT-10", name: "Jewel", tagline: "crown of space" },
  ],
  COS: [
    { id: "COS-01", name: "Infinity", tagline: "without end" },
    { id: "COS-02", name: "Void", tagline: "empty fullness" },
    { id: "COS-03", name: "Dark Matter", tagline: "invisible force" },
    { id: "COS-04", name: "Expansion", tagline: "growing universe" },
    { id: "COS-05", name: "Nebula", tagline: "stellar nursery" },
    { id: "COS-06", name: "Quasar", tagline: "brightest light" },
    { id: "COS-07", name: "Black Hole", tagline: "point of no return" },
    { id: "COS-08", name: "Galaxy", tagline: "island of stars" },
    { id: "COS-09", name: "Cosmic Web", tagline: "connected all" },
    { id: "COS-10", name: "Origin", tagline: "where it began" },
  ],
  YOU: [
    { id: "YOU-01", name: "Presence", tagline: "being here now" },
    { id: "YOU-02", name: "Reader", tagline: "witness to words" },
    { id: "YOU-03", name: "Mirror", tagline: "seeing yourself" },
    { id: "YOU-04", name: "Connection", tagline: "we meet here" },
    { id: "YOU-05", name: "Spark", tagline: "your unique light" },
    { id: "YOU-06", name: "Journey", tagline: "your path forward" },
    { id: "YOU-07", name: "Voice", tagline: "what you say" },
    { id: "YOU-08", name: "Dream", tagline: "what you imagine" },
    { id: "YOU-09", name: "Choice", tagline: "what you decide" },
    { id: "YOU-10", name: "Future", tagline: "what you create" },
  ],
}

const generatePoems = (planetId: string, subthemeId: string, count = 100) => {
  const poems = []
  for (let i = 0; i < count; i++) {
    const code = `ELON-${planetId}-${String(i).padStart(4, "0")}`
    poems.push({
      code,
      title: `Poem ${i + 1}`,
      firstLine: `This is the first line of poem ${i + 1}...`,
      text: `This is the full text of poem ${i + 1}.\n\nIt contains multiple lines\nand explores themes of ${subthemeId}.`,
      subtheme: subthemeId,
    })
  }
  return poems
}

export default function PoemCosmos() {
  const [view, setView] = useState<"galaxy" | "planet" | "subtheme" | "poem">("galaxy")
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null)
  const [selectedSubtheme, setSelectedSubtheme] = useState<string | null>(null)
  const [selectedPoem, setSelectedPoem] = useState<any>(null)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const handlePlanetClick = (planetId: string) => {
    setSelectedPlanet(planetId)
    setView("planet")
  }

  const handleSubthemeClick = (subthemeId: string) => {
    setSelectedSubtheme(subthemeId)
    setView("subtheme")
  }

  const handlePoemClick = (poem: any) => {
    setSelectedPoem(poem)
    setView("poem")
  }

  const handleBack = () => {
    if (view === "poem") {
      setView("subtheme")
      setSelectedPoem(null)
    } else if (view === "subtheme") {
      setView("planet")
      setSelectedSubtheme(null)
    } else if (view === "planet") {
      setView("galaxy")
      setSelectedPlanet(null)
    }
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

      {/* Stardust Dive Button */}
      <motion.button
        onClick={handleStardustDive}
        className="fixed top-24 right-6 z-50 px-6 py-3 rounded-full text-sm font-light tracking-wide transition-all duration-300"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          color: "#e0f7ff",
          backdropFilter: "blur(10px)",
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 30px rgba(0, 255, 255, 0.3)",
        }}
        whileTap={{ scale: 0.95 }}
      >
        ✨ Stardust Dive
      </motion.button>

      {/* Back Button */}
      {view !== "galaxy" && (
        <motion.button
          onClick={handleBack}
          className="fixed top-24 left-6 z-50 px-6 py-3 rounded-full text-sm font-light tracking-wide transition-all duration-300"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            color: "#e0f7ff",
            backdropFilter: "blur(10px)",
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 30px rgba(255, 255, 255, 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          ← Back
        </motion.button>
      )}

      <main className="relative z-30 flex items-center justify-center min-h-screen px-6">
        <AnimatePresence mode="wait">
          {/* Tier 1: Galaxy View - 10 Planets */}
          {view === "galaxy" && (
            <motion.div
              key="galaxy"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-6xl aspect-square"
            >
              <h1 className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-20 text-4xl font-extralight text-cyan-100/80 tracking-widest">
                Poem Cosmos
              </h1>
              <p className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-10 text-sm font-light text-cyan-100/50 tracking-wide">
                10,000 poems across ten worlds
              </p>

              {/* Planets arranged in circular orbit */}
              {planets.map((planet, index) => {
                const angle = (index / planets.length) * Math.PI * 2
                const radius = 40
                const x = 50 + radius * Math.cos(angle)
                const y = 50 + radius * Math.sin(angle)

                return (
                  <motion.div
                    key={planet.id}
                    className="absolute cursor-pointer"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    onHoverStart={() => setHoveredItem(planet.id)}
                    onHoverEnd={() => setHoveredItem(null)}
                    onClick={() => handlePlanetClick(planet.id)}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full relative"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.color}dd)`,
                        boxShadow: `0 0 40px ${planet.color}99, inset 0 0 20px rgba(255, 255, 255, 0.3)`,
                      }}
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                      }}
                    />

                    <AnimatePresence>
                      {hoveredItem === planet.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full mt-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-center"
                        >
                          <div className="text-lg font-light tracking-wider" style={{ color: planet.color }}>
                            {planet.name}
                          </div>
                          <div className="text-xs font-light text-cyan-100/60 mt-1 max-w-xs">{planet.tagline}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </motion.div>
          )}

          {/* Tier 2: Planet View - 10 Subthemes */}
          {view === "planet" && selectedPlanet && (
            <motion.div
              key="planet"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-5xl aspect-square"
            >
              {(() => {
                const planet = planets.find((p) => p.id === selectedPlanet)!
                const subthemes = subthemesByPlanet[selectedPlanet]

                return (
                  <>
                    <h2
                      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-16 text-5xl font-extralight text-center tracking-widest"
                      style={{ color: planet.color, textShadow: `0 0 30px ${planet.color}99` }}
                    >
                      {planet.name}
                    </h2>
                    <p className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 text-center text-cyan-100/60 font-light tracking-wide">
                      {planet.tagline}
                    </p>

                    {/* Central planet */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <motion.div
                        className="w-24 h-24 rounded-full"
                        style={{
                          background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.color}dd)`,
                          boxShadow: `0 0 60px ${planet.color}99, inset 0 0 30px rgba(255, 255, 255, 0.3)`,
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      />
                    </div>

                    {/* Subthemes orbiting around planet */}
                    {subthemes.map((subtheme, index) => {
                      const angle = (index / subthemes.length) * Math.PI * 2
                      const radius = 35
                      const x = 50 + radius * Math.cos(angle)
                      const y = 50 + radius * Math.sin(angle)

                      return (
                        <motion.div
                          key={subtheme.id}
                          className="absolute cursor-pointer"
                          style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            transform: "translate(-50%, -50%)",
                          }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          onHoverStart={() => setHoveredItem(subtheme.id)}
                          onHoverEnd={() => setHoveredItem(null)}
                          onClick={() => handleSubthemeClick(subtheme.id)}
                          whileHover={{ scale: 1.4 }}
                          whileTap={{ scale: 0.8 }}
                        >
                          <div
                            className="w-10 h-10 rounded-full"
                            style={{
                              background: `radial-gradient(circle at 30% 30%, ${planet.color}dd, ${planet.color}aa)`,
                              boxShadow: `0 0 25px ${planet.color}77`,
                            }}
                          />

                          <AnimatePresence>
                            {hoveredItem === subtheme.id && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-center"
                              >
                                <div className="text-sm font-light tracking-wider" style={{ color: planet.color }}>
                                  {subtheme.name}
                                </div>
                                <div className="text-xs font-light text-cyan-100/60 mt-1">{subtheme.tagline}</div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )
                    })}
                  </>
                )
              })()}
            </motion.div>
          )}

          {/* Tier 3: Subtheme View - 100 Poems */}
          {view === "subtheme" && selectedPlanet && selectedSubtheme && (
            <motion.div
              key="subtheme"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-6xl h-[600px]"
            >
              {(() => {
                const planet = planets.find((p) => p.id === selectedPlanet)!
                const subtheme = subthemesByPlanet[selectedPlanet].find((s) => s.id === selectedSubtheme)!
                const poems = generatePoems(selectedPlanet, selectedSubtheme)

                return (
                  <>
                    <h2
                      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-16 text-4xl font-extralight text-center tracking-widest"
                      style={{ color: planet.color, textShadow: `0 0 30px ${planet.color}99` }}
                    >
                      {subtheme.name}
                    </h2>
                    <p className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 text-center text-cyan-100/60 font-light tracking-wide">
                      {subtheme.tagline}
                    </p>

                    {/* 100 poem stars scattered */}
                    <div className="relative w-full h-full">
                      {poems.map((poem, index) => {
                        const x = 10 + Math.random() * 80
                        const y = 10 + Math.random() * 80

                        return (
                          <motion.div
                            key={poem.code}
                            className="absolute cursor-pointer group"
                            style={{
                              left: `${x}%`,
                              top: `${y}%`,
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.01 }}
                            onHoverStart={() => setHoveredItem(poem.code)}
                            onHoverEnd={() => setHoveredItem(null)}
                            onClick={() => handlePoemClick(poem)}
                            whileHover={{ scale: 2 }}
                            whileTap={{ scale: 0.8 }}
                          >
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{
                                background: planet.color,
                                boxShadow: `0 0 10px ${planet.color}99`,
                              }}
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
                                  <div className="text-xs font-light tracking-wider" style={{ color: planet.color }}>
                                    {poem.code}
                                  </div>
                                  <div className="text-xs font-light text-cyan-100/60 mt-1 max-w-xs">
                                    {poem.firstLine}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        )
                      })}
                    </div>

                    <p className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-12 text-center text-cyan-100/40 text-sm font-light">
                      {poems.length} poems in this constellation
                    </p>
                  </>
                )
              })()}
            </motion.div>
          )}

          {/* Poem View - Floating poem viewer */}
          {view === "poem" && selectedPoem && selectedPlanet && (
            <motion.div
              key="poem"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-2xl"
            >
              {(() => {
                const planet = planets.find((p) => p.id === selectedPlanet)!

                return (
                  <div
                    className="rounded-3xl p-12 relative"
                    style={{
                      background: "rgba(10, 14, 39, 0.8)",
                      border: `1px solid ${planet.color}40`,
                      boxShadow: `0 0 60px ${planet.color}99`,
                      backdropFilter: "blur(20px)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-6 text-xs font-light text-cyan-100/50">
                      <span>{selectedPoem.code}</span>
                      <span>{selectedPoem.subtheme}</span>
                    </div>

                    <h3
                      className="text-3xl font-light text-center mb-8 tracking-wide"
                      style={{ color: planet.color, textShadow: `0 0 20px ${planet.color}99` }}
                    >
                      {selectedPoem.title}
                    </h3>

                    <pre className="text-cyan-100/90 font-light text-lg leading-relaxed whitespace-pre-wrap text-center tracking-wide">
                      {selectedPoem.text}
                    </pre>
                  </div>
                )
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
