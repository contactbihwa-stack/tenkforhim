"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Starfield from "@/lib/starfield";
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";

export default function Vision() {
  const [cursorSparks, setCursorSparks] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  useEffect(() => {
    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    let sparkId = 0;
    const onMove = (e: MouseEvent) => {
      if (Math.random() > 0.9) {
        const s = { id: sparkId++, x: e.clientX, y: e.clientY };
        setCursorSparks((p) => [...p.slice(-2), s]);
        setTimeout(() => setCursorSparks((p) => p.filter((x) => x.id !== s.id)), 1000);
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
  };

  const sections = [
    {
      type: "plain",
      text: `TenKforHim started with a simple wish:
to make something that matters—and to say thank you.

I didn't plan this for years.
I didn't wait until I was ready.
I just started—with AI tools, a laptop, and gratitude.

Now I write poems, make music, and build projects
that turn feeling into form.`,
    },
    {
      type: "box",
      text: `### ELON:10,000

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
    },
    {
      type: "box",
      text: `### Why Elon?

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
    },
    {
      type: "highlight",
      text: `**There is no absolute good.**

Democracy is not sacred.  
Freedom is not the end.  
They are tools—means to a single purpose:

**Maximize LQQ: Life's Quality × Quantity.**

- Quality: health, freedom, sensation, meaning, capability  
- Quantity: population, lifespan, reach

**Higher LQQ output = more moral.**

If a system achieves this, it is good.  
If it fails, it is not.`,
    },
    {
      type: "neon",
      text: `**Impact > Intent.**  
**Results > Ritual.**  
**LQQ > Everything.**`,
    },
    {
      type: "box",
      text: `**We are biological algorithms optimizing for our own LQQ.**

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
    },
    {
      type: "box",
      text: `I believe algorithms can optimize what humans never could:

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
    },
    {
      type: "highlight",
      text: `### The Vow

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
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Navbar />
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030512] to-[#0b0f1e]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_40%,rgba(0,217,255,0.05),transparent_70%)]" />
      </div>
      <Starfield />

      {/* Cursor glow */}
      {cursorSparks.map((s) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0.2 }}
          transition={{ duration: 1.2 }}
          className="fixed w-1 h-1 rounded-full bg-cyan-300 pointer-events-none"
          style={{
            left: s.x,
            top: s.y,
            boxShadow: "0 0 6px rgba(0,217,255,0.6)",
          }}
        />
      ))}

      {/* Main */}
      <main className="relative z-20 mx-auto max-w-[760px] px-6 pt-28 pb-28">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-5xl font-playfair font-semibold text-[#dbe8ff]"
        >
          The Vision
        </motion.h1>

        <div className="space-y-14 text-[#dbe8ff] text-[18.5px] leading-[1.75] font-light">
          {sections.map((sec, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              className={
                sec.type === "box"
                  ? "p-6 rounded-2xl border border-cyan-400/20 bg-[#0b0f1f]/40 backdrop-blur-sm"
                  : sec.type === "highlight"
                  ? "p-6 rounded-2xl border border-cyan-400/30 bg-[#0e1525]/60 backdrop-blur-md"
                  : sec.type === "neon"
                  ? "text-cyan-300 font-semibold tracking-wide text-center py-8 border border-cyan-300/50 rounded-xl bg-[#0b0f1f]/80"
                  : ""
              }
            >
              <ReactMarkdown>{sec.text}</ReactMarkdown>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
