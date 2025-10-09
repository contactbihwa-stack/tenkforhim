import "./globals.css"
import type { ReactNode } from "react"
import { Playfair_Display } from "next/font/google"

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
        {/* ✅ 이 한 줄이 모바일 깨짐 방지의 핵심 */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>

      <body className="h-full bg-[#06070B] text-cyan-100 antialiased">
        {children}
      </body>
    </html>
  )
}
