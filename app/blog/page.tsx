import { BlogCard } from "@/components/blog-card"
import { getBlogPosts } from "@/services/api"

export default async function BlogPage() {
  const posts = await getBlogPosts()

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
          <p className="mb-4">
            <span className="text-primary">$</span> ls -la /articles
          </p>
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No blog posts available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>
      )}
    </div>
  )
}

