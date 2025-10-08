"use client"
import Navbar from "@/components/Navbar"
import Starfield from "@/lib/starfield"

export default function Store() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Navbar />
      <Starfield />

      <main className="relative z-30 flex min-h-screen items-center justify-center text-center px-6">
        <div>
          <h1 className="font-light text-cyan-100 mb-4 text-6xl">
            COMING SOON
          </h1>
          
        </div>
      </main>
    </div>
  )
}
