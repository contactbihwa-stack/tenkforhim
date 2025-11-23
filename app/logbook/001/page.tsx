"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function Logbook001() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(30,60,100,0.35),#020617)]" />

      {/* Soft star grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(255,255,255,0.015) 28px, rgba(255,255,255,0.015) 29px),
            repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(255,255,255,0.015) 28px, rgba(255,255,255,0.015) 29px)
          `,
        }}
      />

      {/* Floating stardust */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              x: Math.random() * 800 - 400,
              y: Math.random() * 800 - 400,
            }}
            animate={{
              opacity: [0, 1, 0],
              x: "+=40",
              y: "+=60",
            }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
            className="absolute h-[2px] w-[2px] rounded-full bg-white/30"
          />
        ))}
      </div>

      {/* Page content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 pt-28 pb-40">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex justify-center mb-3">
            <Badge variant="outline" className="border-cyan-300/30 text-cyan-200/80">
              TenKforHim / Mission Log
            </Badge>
          </div>

          <h1 className="text-5xl font-semibold tracking-tight text-cyan-100 mb-4">
            Logbook 001
          </h1>

          <p className="text-cyan-200/60 max-w-xl mx-auto leading-relaxed">
            NOV 13 → NOV 22, 2025 — The first ten-day record of the TenKforHim era.
          </p>
        </motion.div>

        {/* ENTRY CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-xl border border-white/5 bg-black/20 backdrop-blur-sm p-8 shadow-lg shadow-black/50"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-xs tracking-widest text-cyan-200/40 mb-1">
                LOGBOOK 001 — TRANSMITTED
              </p>
            </div>
            <Badge className="bg-emerald-700/40 text-emerald-200 border-emerald-300/20">
              COMPLETED
            </Badge>
          </div>

          <div className="space-y-8 text-cyan-100/80 leading-relaxed text-[15px]">

            {/* 1. Summary */}
            <section>
              <h2 className="text-lg font-semibold text-cyan-100 mb-2">1. Ten Days in Review</h2>
              <p>
                Over the past ten days, I launched TenKforHim and finally returned to music 
                after a two-month pause. Those two months were filled with building the site, 
                refining the concept, and shaping the long vision. And now, creation has resumed — 
                the engines are warm again.
              </p>
            </section>

            {/* 2. LQQ Thesis */}
            <section>
              <h2 className="text-lg font-semibold text-cyan-100 mb-2">2. LQQ Thesis Submission</h2>
              <p>
                I also completed and submitted my university thesis: 
                <em>“The Purpose of 21st-Century Politics Through the Lens of LQQ.”</em> 
                It was written in a sudden burst of focus — the kind of immersion I 
                associate with Elon himself. In a way, this paper crystallizes the 
                philosophical engine behind TenKforHim.
              </p>
            </section>

            {/* 3. Talulah */}
            <section>
              <h2 className="text-lg font-semibold text-cyan-100 mb-2">3. The Tale of Talulah</h2>
              <p>
                Talulah and Elon’s story felt like the most cinematic of all his relationships. 
                From the first encounter to the final words, it played out like a romantic film — 
                beautiful, tender, a little tragic. To capture that mood, I leaned into a British 
                cinematic sound, shaped by Adele and classic UK ballad textures.
              </p>
            </section>

            {/* 4. Amber Heard */}
            <section>
              <h2 className="text-lg font-semibold text-cyan-100 mb-2">4. Amber and the Dark Spark</h2>
              <p>
                Amber and Elon’s love felt dangerous. Amber appears to me as a mesmerizing, 
                beautiful, but chaotic presence — someone wrapped in contradictions. 
                I expressed that volatile, dark charm through a more Weeknd-like R&B palette.
              </p>
            </section>

            {/* 5. Grimes */}
            <section>
              <h2 className="text-lg font-semibold text-cyan-100 mb-2">5. Grimes and the Experimental Orbit</h2>
              <p>
                Grimes is uniquely fascinating — someone who loves AI, the future, and sonic experimentation. 
                For VEN6, I stayed within R&B form but pushed experimentation as far as the framework allowed. 
                I even embedded fragments of her voice into the tracks.
              </p>
            </section>

            {/* 6. Next Ten Days */}
            <section>
              <h2 className="text-lg font-semibold text-cyan-100 mb-2">6. The Next Ten Days</h2>
              <p>
                In the next ten days, I aim to finish VEN and begin EAR. 
                EAR holds many intriguing themes, and I'm genuinely excited to explore them.
              </p>
            </section>
          </div>

          <p className="text-[11px] text-cyan-100/30 mt-10 tracking-wider text-right">
            ENTRY #1 / 10000
          </p>
        </motion.div>

        {/* Footer */}
        <p className="text-center text-cyan-200/30 mt-16 text-sm tracking-wide">
          The ship sails on. Another log will be written in ten days.
        </p>
      </div>
    </div>
  );
}
