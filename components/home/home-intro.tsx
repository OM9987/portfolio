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
        <div className="mt-8 flex justify-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-md transition-colors border border-primary/30"
          >
            Learn more about me <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </section>
  )
}
