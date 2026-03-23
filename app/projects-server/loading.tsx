export default function ProjectsServerLoading() {
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
          <div className="mb-4 h-4 w-full max-w-md animate-pulse rounded bg-muted/40" aria-hidden />
          <p className="text-sm text-muted-foreground">Loading projects directory…</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2" aria-busy="true" aria-label="Loading filters">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-8 w-28 animate-pulse rounded-md bg-secondary/60" />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-card rounded-md overflow-hidden border border-border/50 flex flex-col animate-pulse"
          >
            <div className="h-48 bg-muted/30" />
            <div className="p-4 space-y-3 flex-1">
              <div className="h-3 w-3/4 rounded bg-muted/40" />
              <div className="h-3 w-full rounded bg-muted/30" />
              <div className="h-3 w-5/6 rounded bg-muted/30" />
              <div className="flex flex-wrap gap-2 pt-2">
                <div className="h-6 w-14 rounded bg-secondary/50" />
                <div className="h-6 w-20 rounded bg-secondary/50" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
