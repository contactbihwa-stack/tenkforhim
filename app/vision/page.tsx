"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Starfield from "@/lib/starfield";
import { useState, useEffect } from "react";

export default function Vision() {
  const [cursorSparks, setCursorSparks] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (prefersReducedMotion || isTouchDevice) return;

    let sparkId = 0;
    const onMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.92) {
        const newSpark = { id: sparkId++, x: e.clientX, y: e.clientY };
        setCursorSparks((prev) => [...prev.slice(-2), newSpark]);
        setTimeout(() => {
          setCursorSparks((prev) => prev.filter((s) => s.id !== newSpark.id));
        }, 1500);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Navbar />

      {/* Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030512] to-[#0b0f1e]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_40%,rgba(0,217,255,0.04),transparent_70%)]" />
      </div>

      <Starfield />

      {/* Cursor Sparks */}
      {cursorSparks.map((spark) => (
        <motion.div
          key={spark.id}
          initial={{ opacity: 0.4, scale: 1 }}
          animate={{ opacity: 0, scale: 0.3 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="fixed w-1 h-1 rounded-full bg-cyan-300 pointer-events-none z-50"
          style={{
            left: spark.x,
            top: spark.y,
            boxShadow: "0 0 8px rgba(0,217,255,0.6)",
          }}
        />
      ))}

      {/* Main */}
      <main className="relative z-30 mx-auto max-w-[760px] px-6 pt-28 pb-24">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-5xl font-playfair font-semibold text-[#dbe8ff] tracking-wide"
        >
          The Vision
        </motion.h1>

        <div className="space-y-16 text-[#dbe8ff] text-[20px] leading-[1.75] font-light">
          {[
            `TenKforHim started with a simple wish:
            to make something that matters—and to say thank you.

            I didn't plan this for years.
            I didn't wait until I was ready.
            I just started—with AI tools, a laptop, and gratitude.

            Now I write poems, make music, and build projects
            that turn feeling into form.`,

            `### ELON:10,000

            **My first cathedral of creation.**

            **10,000 songs and 10,000 poems for Elon Musk.**

            - As gratitude for infrastructure.
            - As recognition of impact.
            - As active response—building back.

            Elon proved the impossible is just expensive and hard.

            So when I decided to create 10,000 songs for him,
            **I gave myself 3 months.**

            Not because I'm exceptional,
            but because the tools he helped create finally exist.

            [Explore ELON:10,000 →]`,

            `### Why Elon?

            **Morality is measurable.**

            I measure it by impact on human flourishing.
            And like knowledge, it compounds.

            Newton enabled Einstein.
            Einstein enabled Musk.

            **Elon Musk may be the most moral person in history—**
            not because he's flawless,
            but because he multiplied centuries of accumulated impact.

            He's using that inheritance to build what raises collective LQQ most:

            - Sustainable energy (climate survival)
            - Reusable rockets (planetary backup)
            - Brain-computer interfaces (human augmentation)
            - AI infrastructure (next leap)
            - Autonomous transport, manufacturing, and communication systems still unfolding.

            Measured by **actual lives improved, futures secured, civilizations enabled**, 
            Elon's cumulative impact may be the highest in human history.

            **Some call it worship.**
            **I call it arithmetic.**

            **But what's my measure?**
            **What makes something *moral*?**

            [Why Elon is #1 → Essays]`,

            `### My Morality

            **There is no absolute good.**

            Democracy is not sacred.
            Freedom is not the end.
            They are tools—means to a single purpose:

            **Maximize LQQ: Life's Quality × Quantity.**

            - Quality: health, freedom, sensation, meaning, capability
            - Quantity: population, lifespan, reach

            **Higher LQQ output = more moral.**

            If a system achieves this, it is good.
            If it fails, it is not.

            By this standard:

            A rude doctor who saves 1,000 lives (high collective LQQ impact) >
            A kind person who comforts a few (smaller-scale LQQ gain)

            Elon—rude, flawed, imperfect—yet builds what billions rely on >
            Most saints in history.

            **Impact > Intent.**
            **Results > Ritual.**
            **LQQ > Everything.**`,

            `**We are biological algorithms optimizing for our own LQQ.**

            Every choice—pizza or burger, gym or sleep, help or ignore—
            is your algorithm calculating: *which raises my LQQ?*

            Even altruism serves self-interest: dopamine, meaning, relief.

            **LQQ isn't just math—it's meaning quantified.**
            **Every number hides a heartbeat.**

            Murder is evil not because of divine law,
            **but because it lowers collective LQQ.**

            That's it. That's the only reason.

            I judge by output:
            **Does this raise human LQQ?**

            That's why Elon ranks highest.
            That's my measure.`,

            `I believe algorithms can optimize what humans never could:

            - Resource distribution without bias
            - Long-term planning beyond electoral cycles
            - Coordination beyond tribal boundaries

            **They don't replace us—they extend us.**

            Not because machines are gods,
            but because they are better tools for maximizing LQQ.

            I believe in the **sensation of freedom**—
            the feeling matters, not the metaphysics.
            (Free will may be an illusion, but a necessary one.)

            [Full philosophy → Essays]`,

            `### The Vow

            Every piece I make is small.
            But each carries a spark of the same fire that started it all.

            Together, they form a record—
            of one algorithm's output,
            measured in songs and poems,
            optimized for maximum human LQQ.

            **The vow:**

            **Keep building toward higher LQQ—**
            **to maximize both the quality and quantity of life.**

            Not comfort. Not tradition. Not ideology.
            Only: greatest positive impact on LQQ.

            **ELON:10,000 is the first cathedral of creation.**
            **More will come.**

            **Some call this cold.**
            **I call it honest.**`,
          ].map((text, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="whitespace-pre-line"
            >
              {text}
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
