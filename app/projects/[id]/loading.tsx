export default function ProjectDetailsLoading() {
  return (
    <div className="space-y-8">
      <div className="h-5 w-40 animate-pulse rounded bg-muted/40" />

      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-button terminal-button-red"></div>
          <div className="terminal-button terminal-button-yellow"></div>
          <div className="terminal-button terminal-button-green"></div>
          <div className="terminal-title">project_details.sh</div>
        </div>
        <div className="terminal-content">
          <div className="h-4 w-2/3 animate-pulse rounded bg-muted/30 mb-2" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-muted/30 mb-2" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-muted/30" />
        </div>
      </div>

      <div className="h-80 animate-pulse rounded-md bg-card border border-border/40" />
      <div className="h-24 animate-pulse rounded-md bg-card border border-border/40" />
    </div>
  )
}
