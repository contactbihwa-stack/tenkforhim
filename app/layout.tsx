// app/layout.tsx
import "./globals.css"
import type { ReactNode } from "react"
import { Playfair_Display } from "next/font/google"

// ▼ 추가
import Navbar from "@/components/Navbar"   // 경로가 다르면 맞춰서 수정

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
})

export const metadata = {
  title: "TenKforHim",
  description: "Inner orbit of ELON:10,000",
  generator: "v0.app",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`h-full ${playfair.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>

      <body className="h-full bg-[#06070B] text-cyan-100 antialiased">
        {/* ▼ 고정 네비게이션 */}
        <Navbar />

        {/* ▼ 고정 헤더 높이만큼 여백 (Navbar가 fixed라서 겹침 방지) */}
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  )
}
