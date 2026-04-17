import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono, Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Tenshi Terminal",
  description: "A neo-brutalist Tenshi Terminal portfolio",
  generator: 'Om.Singh'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${jetbrainsMono.variable} ${inter.variable} font-sans bg-black text-white min-h-screen flex flex-col relative overflow-x-hidden`} suppressHydrationWarning>
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-50%] left-[-20%] w-[800px] h-[800px] rounded-full bg-emerald-500/20 blur-[120px]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[120px]"></div>
        </div>
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-1 container mx-auto px-4 pt-20 pb-8">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
