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

      {/* Cursor sparks */}
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
      <main className="relative z-30 mx-auto max-w-[800px] px-6 pt-28 pb-24">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-5xl font-playfair font-semibold text-[#b9e3ff] tracking-wide drop-shadow-[0_0_15px_rgba(0,217,255,0.4)]"
        >
          The Vision
        </motion.h1>

        <div className="space-y-12 text-[#dbe8ff] text-[20px] leading-[1.75] font-light">
          {/* Section 1 */}
          <Section>
            TenKforHim started with a simple wish:
            <br />
            <strong>to make something that matters—and to say thank you.</strong>
            <br />
            <br />
            I didn’t plan this for years.
            <br />
            I didn’t wait until I was ready.
            <br />
            I just started—with AI tools, a laptop, and gratitude.
            <br />
            <br />
            Now I write poems, make music, and build projects that turn feeling
            into form.
          </Section>

          {/* Section 2 */}
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

          {/* Section 3 */}
          <Section title="Why Elon?">
            <strong>Morality is measurable.</strong>
            <br />
            I measure it by impact on human flourishing. And like knowledge, it
            compounds.
            <br />
            <br />
            Newton enabled Einstein. Einstein enabled Musk.
            <br />
            <strong>
              Elon Musk may be the most moral person in history—
            </strong>{" "}
            not because he’s flawless, but because he multiplied centuries of
            accumulated impact.
            <br />
            <br />
            He’s using that inheritance to build what raises collective LQQ most:
            <ul className="list-disc pl-6 mt-4 space-y-1">
              <li>Sustainable energy (climate survival)</li>
              <li>Reusable rockets (planetary backup)</li>
              <li>Brain-computer interfaces (human augmentation)</li>
              <li>AI infrastructure (next leap)</li>
              <li>
                Autonomous transport, manufacturing, and communication systems
                still unfolding.
              </li>
            </ul>
            <br />
            Measured by{" "}
            <strong>
              actual lives improved, futures secured, civilizations enabled
            </strong>
            , Elon’s cumulative impact may be the highest in human history.
            <br />
            <br />
            <strong>Some call it worship.</strong>
            <br />
            <strong>I call it arithmetic.</strong>
            <br />
            <br />
            <strong>But what’s my measure?</strong>
            <br />
            <strong>What makes something moral?</strong>
          </Section>

          {/* Section 4 */}
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
            If a system achieves this, it is good. If it fails, it is not.
            <br />
            <br />
            A rude doctor who saves 1,000 lives (high collective LQQ impact) &gt;
            <br />
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

          {/* Section 5 */}
          <Section>
            <strong>
              We are biological algorithms optimizing for our own LQQ.
            </strong>
            <br />
            Every choice—pizza or burger, gym or sleep, help or ignore—is your
            algorithm calculating: which raises my LQQ?
            <br />
            <br />
            Even altruism serves self-interest: dopamine, meaning, relief.
            <br />
            <br />
            <strong>LQQ isn’t just math—it’s meaning quantified.</strong>
            <br />
            Every number hides a heartbeat.
            <br />
            <br />
            Murder is evil not because of divine law, but because it lowers
            collective LQQ.
            <br />
            <br />
            I judge by output: does this raise human LQQ? That’s why Elon ranks
            highest. That’s my measure.
          </Section>

          {/* Section 6 */}
          <Section>
            <strong>
              I believe algorithms can optimize what humans never could:
            </strong>
            <ul className="list-disc pl-6 mt-4 space-y-1">
              <li>Resource distribution without bias</li>
              <li>Long-term planning beyond electoral cycles</li>
              <li>Coordination beyond tribal boundaries</li>
            </ul>
            <br />
            <strong>They don’t replace us—they extend us.</strong>
            <br />
            <br />
            Not because machines are gods, but because they are better tools for
            maximizing LQQ.
            <br />
            <br />
            I believe in the sensation of freedom—the feeling matters, not the
            metaphysics. (Free will may be an illusion, but a necessary one.)
          </Section>

          {/* Section 7 */}
          <Section title="The Vow">
            Every piece I make is small. But each carries a spark of the same
            fire that started it all.
            <br />
            <br />
            Together, they form a record—of one algorithm’s output, measured in
            songs and poems, optimized for maximum human LQQ.
            <br />
            <br />
            <strong>The vow:</strong>
            <br />
            <strong>
              Keep building toward higher LQQ—to maximize both the quality and
              quantity of life.
            </strong>
            <br />
            <br />
            Not comfort. Not tradition. Not ideology. Only: greatest positive
            impact on LQQ.
            <br />
            <br />
            <strong>ELON:10,000 is the first cathedral of creation.</strong>
            <br />
            <strong>More will come.</strong>
            <br />
            <br />
            <strong>Some call this cold.</strong>
            <br />
            <strong>I call it honest.</strong>
          </Section>
        </div>
      </main>
    </div>
  );
}

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
