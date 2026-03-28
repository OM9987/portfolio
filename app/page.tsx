import { Suspense } from "react"
import { HomeIntro } from "@/components/home/home-intro"
import { HomeDataSections } from "@/components/home/home-data-sections"

export default function Home() {
  return (
    <div className="space-y-16">
      <HomeIntro />
      <Suspense fallback={<p className="text-muted-foreground">Loading portfolio data...</p>}>
        <HomeDataSections />
      </Suspense>
    </div>
  )
}

