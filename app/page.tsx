import { Suspense } from "react"
import { HomeIntro } from "@/components/home/home-intro"
import { HomeDataSections } from "@/components/home/home-data-sections"

export default function Home() {
  return (
    <div className="space-y-16">
      <HomeIntro />
      <Suspense fallback={
        <div className="space-y-16 animate-pulse">
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-sans">Featured Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="glass-panel h-80 rounded-xl bg-white/5"></div>
              ))}
            </div>
          </section>
        </div>
      }>
        <HomeDataSections />
      </Suspense>
    </div>
  )
}

