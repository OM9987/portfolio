"use client"

import { useEffect, useState } from "react"
import { BlogCard } from "@/components/blog-card"
import { getBlogPosts, type BlogPost } from "@/services/api"

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoadingPosts, setIsLoadingPosts] = useState(true)
  const [postsError, setPostsError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadPosts = async () => {
      setIsLoadingPosts(true)
      setPostsError(null)

      try {
        const response = await getBlogPosts()
        if (!isMounted) return
        setPosts(response)
      } catch (error) {
        if (!isMounted) return
        console.error("Failed to load blog posts:", error)
        setPostsError("Unable to load blog posts from API right now.")
      } finally {
        if (isMounted) setIsLoadingPosts(false)
      }
    }

    void loadPosts()

    return () => {
      isMounted = false
    }
  }, [])

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

      {isLoadingPosts ? (
        <p className="text-muted-foreground">Loading blog posts...</p>
      ) : postsError ? (
        <p className="text-red-400">{postsError}</p>
      ) : posts.length === 0 ? (
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

