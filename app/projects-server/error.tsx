"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function ProjectsServerError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("projects-server error:", error)
  }, [error])

  const message =
    error.message && error.message !== "An error occurred in the Server Components render."
      ? error.message
      : "Unable to load projects right now."

  return (
    <div className="space-y-8">
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-button terminal-button-red"></div>
          <div className="terminal-button terminal-button-yellow"></div>
          <div className="terminal-button terminal-button-green"></div>
          <div className="terminal-title">projects.sh</div>
        </div>
        <div className="terminal-content">
          <p className="mb-2">
            <span className="text-primary">$</span>{" "}
            <span className="text-red-400">Error while loading projects directory.</span>
          </p>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Try again
        </button>
        <Link
          href="/projects-server"
          className="px-4 py-2 text-sm rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
        >
          Reload page
        </Link>
      </div>
    </div>
  )
}
