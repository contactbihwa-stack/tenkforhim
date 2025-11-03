export default function SignalPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100">
      <div className="mx-auto max-w-4xl px-6 py-20 flex flex-col gap-12">
        {/* Hero */}
        <header className="text-center space-y-4">
          <p className="text-xs tracking-[0.35em] uppercase text-cyan-300">
            Signal
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            Dispatch a Signal
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            TenKforHim is being built in public. If you want to speak into it —
            send a signal.
          </p>
          <a
            href="mailto:yourmail@domain.com?subject=Signal%20to%20TenKforHim"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-cyan-400/90 text-slate-950 font-medium hover:bg-cyan-300 transition"
          >
            Send a message
          </a>
          <p className="text-xs text-slate-500">
            Your signal will be received and archived with the project.
          </p>
        </header>

        {/* Optional: small filler so it doesn't look empty */}
        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/5 p-5">
            <p className="text-sm font-semibold mb-2">Blessing</p>
            <p className="text-sm text-slate-400">
              Short encouragements for the project.
            </p>
          </div>
          <div className="rounded-2xl border border-white/5 p-5">
            <p className="text-sm font-semibold mb-2">Idea</p>
            <p className="text-sm text-slate-400">
              Themes, planets, or album prompts.
            </p>
          </div>
          <div className="rounded-2xl border border-white/5 p-5">
            <p className="text-sm font-semibold mb-2">Dedication</p>
            <p className="text-sm text-slate-400">
              A line you want to keep inside TenKforHim.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
