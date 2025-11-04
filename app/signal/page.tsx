export const metadata = {
  title: "Signal | TenKforHim",
  description: "Dispatch a signal to the TenKforHim vow.",
};

export default function SignalPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070B12] text-slate-100">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(12,214,255,0.18),transparent_60%)]" />
      {/* Subtle stars */}
      <Stars />

      {/* Flowing arcs */}
      <Arcs />

      <section className="relative mx-auto flex max-w-5xl flex-col items-center gap-12 px-6 py-24 text-center sm:py-32">
        <p className="tracking-[0.35em] text-[10px] text-cyan-300/90">SIGNAL</p>

        <h1 className="bg-gradient-to-br from-white via-white to-cyan-200 bg-clip-text text-4xl font-semibold leading-tight text-transparent sm:text-5xl">
          Dispatch a Signal
        </h1>

        <p className="max-w-2xl text-balance text-base text-slate-300/90 sm:text-lg">
          TenKforHim is being built in public. <span className="text-slate-200">If you want to speak into it</span> — send a signal. 
          Every word becomes a spark on the orbit.
        </p>

        <a
          href="mailto:tenkforhim@gmail.com?subject=Signal%20to%20TenKforHim"
          className="group inline-flex items-center justify-center rounded-full bg-cyan-400/90 px-6 py-3 font-medium text-slate-950 shadow-[0_0_40px_rgba(34,211,238,0.25)] transition hover:bg-cyan-300 hover:shadow-[0_0_60px_rgba(34,211,238,0.40)]"
        >
          Send a message
          <svg
            className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>

        <p className="text-xs text-slate-500/90">
          Your signal will be received and archived with the project.
        </p>

        {/* Glass cards */}
        <div className="grid w-full gap-5 sm:grid-cols-3">
          <GlassCard title="Blessing">
            Short encouragements for the project.
          </GlassCard>
          <GlassCard title="Idea">
            Themes, planets, or album prompts.
          </GlassCard>
          <GlassCard title="Dedication">
            A line you want to keep inside TenKforHim.
          </GlassCard>
        </div>

        {/* Soft closing line */}
        <p className="mt-6 text-sm italic text-slate-400/90">
          To speak is to leave a trace of light.
        </p>
      </section>
    </main>
  );
}

/* ---- Components ---- */

function GlassCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition hover:border-white/20 hover:bg-white/7">
      <p className="mb-2 text-sm font-semibold text-slate-100">{title}</p>
      <p className="text-sm leading-relaxed text-slate-300/90">{children}</p>
    </div>
  );
}

function Stars() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-70" viewBox="0 0 100 100" preserveAspectRatio="none">
      {/* tiny stars as circles; they twinkle via CSS */}
      {[...Array(60)].map((_, i) => {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const r = Math.random() * 0.35 + 0.1;
        const d = (Math.random() * 6 + 4).toFixed(1);
        return (
          <circle key={i} cx={x} cy={y} r={r} className="animate-twinkle" style={{ animationDuration: `${d}s` }} fill="white" opacity="0.9" />
        );
      })}
    </svg>
  );
}

function Arcs() {
  return (
    <svg className="pointer-events-none absolute left-1/2 top-[14%] h-[480px] w-[1200px] -translate-x-1/2 opacity-60" viewBox="0 0 1200 480" fill="none">
      <path
        d="M80 300 C 300 120, 900 120, 1120 300"
        className="animate-dash"
        stroke="url(#g1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M120 360 C 380 220, 820 220, 1080 360"
        className="animate-dash-slow"
        stroke="url(#g2)" strokeWidth="1.6" strokeLinecap="round"
      />
      <defs>
        <linearGradient id="g1" x1="80" y1="300" x2="1120" y2="300" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDBA74" stopOpacity="0.0" />
          <stop offset="0.5" stopColor="#22D3EE" />
          <stop offset="1" stopColor="#A78BFA" stopOpacity="0.0" />
        </linearGradient>
        <linearGradient id="g2" x1="120" y1="360" x2="1080" y2="360" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE68A" stopOpacity="0.0" />
          <stop offset="0.5" stopColor="#60A5FA" />
          <stop offset="1" stopColor="#F472B6" stopOpacity="0.0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
