"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Terminal } from "@/components/terminal"

export function HomeIntro() {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <section className="py-12">
      <Terminal
        text="AI & Data Science graduate turned backend engineer, building scalable systems for real-world, production workloads."
        typingSpeed={40}
        className="max-w-3xl mx-auto"
        onComplete={() => setIntroComplete(true)}
      />

      {introComplete && (
        <div className="mt-8 flex justify-center fade-in-up">
          <Link
            href="/about/"
            className="inline-flex items-center gap-2 glass-panel hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,255,140,0.3)] hover:text-neon hover:border-neon/50 text-white px-6 py-3 rounded-full transition-all duration-300 group font-sans text-sm tracking-wide"
          >
            <span className="group-hover:drop-shadow-[0_0_8px_rgba(0,255,140,0.8)]">Learn more about me</span> 
            <ArrowRight size={16} className="group-hover:text-neon group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      )}
    </section>
  )
}
