export default function BlogLoading() {
  return (
    <div className="space-y-8">
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-button terminal-button-red"></div>
          <div className="terminal-button terminal-button-yellow"></div>
          <div className="terminal-button terminal-button-green"></div>
          <div className="terminal-title">blog_posts.sh</div>
        </div>
        <div className="terminal-content">
          <div className="h-4 w-3/4 animate-pulse rounded bg-muted/40 mb-2" />
          <p className="text-sm text-muted-foreground">Loading blog posts...</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-40 animate-pulse rounded-md bg-card border border-border/40" />
        ))}
      </div>
    </div>
  )
}
