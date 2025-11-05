"use client"
import Link from "next/link"

export default function Navbar() {
  return (
    <div
      className="fixed inset-x-0 top-0 z-40 hidden md:flex items-center justify-between px-6 py-4
                    backdrop-blur bg-black/10 border-b border-white/10"
    >
      <Link href="/" className="font-light tracking-wide text-cyan-100">
        <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 mr-2 align-middle" />
        TenKforHim
      </Link>
      <nav className="flex gap-4 text-cyan-100/80">
        {["/", "/ignition", "/poems", "/essays", "/vision", "/signal"].map((href, i) => (
          <Link key={i} href={href} className="hover:text-cyan-100 hover:[text-shadow:_0_0_8px_rgba(0,255,255,.5)]">
            {href === "/" ? "Home" : href.replace("/", "").replace(/^\w/, (c) => c.toUpperCase())}
          </Link>
        ))}
      </nav>
    </div>
  )
}
