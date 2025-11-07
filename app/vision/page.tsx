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

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Navbar />

      {/* Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030512] to-[#0b0f1e]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_40%,rgba(0,217,255,0.05),transparent_70%)]" />
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

      {/* Content */}
      <main className="relative z-30 mx-auto max-w-[800px] px-6 pt-28 pb-24 text-[#dbe8ff] text-[20px] leading-[1.75] font-light space-y-14">

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-5xl font-playfair font-semibold text-[#b9e3ff] tracking-wide drop-shadow-[0_0_15px_rgba(0,217,255,0.4)] text-center"
        >
          The Vision
        </motion.h1>

        {/* Intro */}
        <p>
          TenKforHim started with a simple wish:{" "}
          <strong>to make something that matters—and to say thank you.</strong>
        </p>
        <p>
          I didn’t plan this for years. I didn’t wait until I was ready. I just
          started—with AI tools, a laptop, and gratitude.
        </p>
        <p>
          Now I write poems, make music, and build projects that turn feeling
          into form.
        </p>

        {/* ELON:10,000 */}
        <Section title="ELON:10,000">
          <strong className="text-cyan-300 drop-shadow-[0_0_8px_rgba(0,217,255,0.6)]">
            My first cathedral of creation.
          </strong>
          <br />
          <strong>10,000 songs and 10,000 poems for Elon Musk.</strong>
          <ul className="list-disc pl-6 mt-4 space-y-1">
            <li>As gratitude for infrastructure.</li>
            <li>As recognition of impact.</li>
            <li>As active response—building back.</li>
          </ul>
          <br />
          Elon proved the impossible is just expensive and hard.
          <br />
          <br />
          So when I decided to create 10,000 songs for him,
          <br />
          <strong>I gave myself 3 months.</strong>
          <br />
          <br />
          Not because I’m exceptional, but because the tools he helped create
          finally exist.
          <br />
          <br />
          <a
            href="https://elon10000.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-300 underline hover:text-white transition"
          >
            Explore ELON:10,000 →
          </a>
        </Section>

        {/* Why Elon? → MiniBox */}
        <MiniSection title="Why Elon?">
          <strong>Morality is measurable.</strong> I measure it by impact on
          human flourishing. And like knowledge, it compounds.
          <br />
          <br />
          Newton enabled Einstein. Einstein enabled Musk.{" "}
          <strong>
            Elon Musk may be the most moral person in history—
          </strong>{" "}
          not because he’s flawless, but because he multiplied centuries of
          accumulated impact.
          <br />
          <br />
          He’s using that inheritance to build what raises collective LQQ most:
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Sustainable energy (climate survival)</li>
            <li>Reusable rockets (planetary backup)</li>
            <li>Brain-computer interfaces (human augmentation)</li>
            <li>AI infrastructure (next leap)</li>
            <li>
              Autonomous transport, manufacturing, and communication systems still
              unfolding.
            </li>
          </ul>
          <br />
          <strong>Some call it worship.</strong>
          <br />
          <strong>I call it arithmetic.</strong>
          <br />
          <br />
          <strong>But what’s my measure?</strong>
          <br />
          <strong>What makes something moral?</strong>
        </MiniSection>

        {/* My Morality */}
        <Section title="My Morality">
          <strong>There is no absolute good.</strong>
          <br />
          Democracy is not sacred. Freedom is not the end. They are tools—means
          to a single purpose:
          <br />
          <br />
          <strong>Maximize LQQ: Life’s Quality × Quantity.</strong>
          <br />
          <br />
          - Quality: health, freedom, sensation, meaning, capability
          <br />
          - Quantity: population, lifespan, reach
          <br />
          <br />
          <strong>Higher LQQ output = more moral.</strong>
          <br />
          <br />
          A rude doctor who saves 1,000 lives (high collective LQQ impact) &gt;
          A kind person who comforts a few (smaller-scale LQQ gain)
          <br />
          <br />
          Elon—rude, flawed, imperfect—yet builds what billions rely on &gt;
          Most saints in history.
          <br />
          <br />
          <strong>Impact &gt; Intent.</strong>
          <br />
          <strong>Results &gt; Ritual.</strong>
          <br />
          <strong>LQQ &gt; Everything.</strong>
        </Section>

        {/* Algorithm */}
        <p>
          <strong>We are biological algorithms optimizing for our own LQQ.</strong>
          Every choice—pizza or burger, gym or sleep, help or ignore—is your
          algorithm calculating: which raises my LQQ?
        </p>
        <p>
          LQQ isn’t just math—it’s meaning quantified. Every number hides a
          heartbeat.
        </p>
        <p>
          I judge by output: does this raise human LQQ? That’s why Elon ranks
          highest. That’s my measure.
        </p>

        {/* AI */}
        <p>
          <strong>I believe algorithms can optimize what humans never could:</strong>
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Resource distribution without bias</li>
          <li>Long-term planning beyond electoral cycles</li>
          <li>Coordination beyond tribal boundaries</li>
        </ul>
        <p>
          <strong>They don’t replace us—they extend us.</strong>
          Not because machines are gods, but because they are better tools for
          maximizing LQQ.
        </p>
        <p>
          I believe in the sensation of freedom—the feeling matters, not the
          metaphysics. (Free will may be an illusion, but a necessary one.)
        </p>

        {/* The Vow */}
        <Section title="The Vow">
          Every piece I make is small. But each carries a spark of the same fire
          that started it all.
          <br />
          Together, they form a record—of one algorithm’s output, optimized for
          maximum human LQQ.
          <br />
          <strong>The vow:</strong> Keep building toward higher LQQ—to maximize
          both the quality and quantity of life.
          <br />
          Not comfort. Not tradition. Not ideology. Only: greatest positive
          impact on LQQ.
          <br />
          <strong>ELON:10,000 is the first cathedral of creation.</strong> More
          will come.
          <br />
          <strong>Some call this cold.</strong> <strong>I call it honest.</strong>
        </Section>

        {/* Garden Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-[18px] text-[#b9e3ff]/80 mb-3">
            Want to go deeper?
          </p>
          <a
            href="/essays"
            className="inline-block text-cyan-300 text-[20px] font-medium hover:text-white transition-all duration-300 drop-shadow-[0_0_12px_rgba(0,217,255,0.6)]"
          >
            Enter the Garden of Light →
          </a>
        </motion.div>
      </main>
    </div>
  );
}

/* Main box section */
function Section({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="rounded-2xl border border-white/15 bg-white/5 p-6 shadow-[0_0_20px_rgba(0,217,255,0.08)] hover:shadow-[0_0_25px_rgba(0,217,255,0.2)] transition-all duration-500"
    >
      {title && (
        <h2 className="text-2xl font-playfair mb-3 text-cyan-300 drop-shadow-[0_0_10px_rgba(0,217,255,0.7)]">
          {title}
        </h2>
      )}
      <div className="text-[19px] leading-[1.75]">{children}</div>
    </motion.div>
  );
}

/* Mini highlight box (for Why Elon) */
function MiniSection({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="rounded-xl border border-cyan-400/10 bg-white/2 p-5 shadow-[0_0_10px_rgba(0,217,255,0.05)] hover:shadow-[0_0_20px_rgba(0,217,255,0.15)] transition-all duration-500"
    >
      {title && (
        <h2 className="text-2xl font-playfair mb-3 text-cyan-300 drop-shadow-[0_0_10px_rgba(0,217,255,0.6)]">
          {title}
        </h2>
      )}
      <div className="text-[19px] leading-[1.75]">{children}</div>
    </motion.div>
  );
}
