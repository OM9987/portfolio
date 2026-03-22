"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Terminal } from "@/components/terminal"
import { ProjectCard } from "@/components/project-card"
import { BlogCard } from "@/components/blog-card"
import { ArrowRight } from "lucide-react"
import { getFeaturedProjects, getLatestBlogPosts, getSkills, type BlogPost, type Project, type SkillGroup } from "@/services/api"

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false)
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([])
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([])
  const [skills, setSkills] = useState<SkillGroup[]>([])
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [dataError, setDataError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadHomeData = async () => {
      setIsLoadingData(true)
      setDataError(null)

      try {
        const [projects, posts, skillGroups] = await Promise.all([
          getFeaturedProjects(),
          getLatestBlogPosts(1),
          getSkills(),
        ])

        if (!isMounted) return

        setFeaturedProjects(projects)
        setLatestPosts(posts)
        setSkills(skillGroups)
      } catch (error) {
        if (!isMounted) return
        console.error("Failed to load home data:", error)
        setDataError("Unable to load data from API right now.")
      } finally {
        if (isMounted) setIsLoadingData(false)
      }
    }

    void loadHomeData()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="space-y-16">
      <section className="py-12">
        <Terminal
          text="Hello, World. I am Om Singh. Full-stack developer and AI enthusiast. Welcome to my digital realm."
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

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Projects</h2>
          <Link href="/projects" className="text-primary hover:underline inline-flex items-center gap-1">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        {isLoadingData ? (
          <p className="text-muted-foreground">Loading featured projects...</p>
        ) : dataError ? (
          <p className="text-red-400">{dataError}</p>
        ) : featuredProjects.length === 0 ? (
          <p className="text-muted-foreground">No projects available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Skills</h2>
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-button terminal-button-red"></div>
            <div className="terminal-button terminal-button-yellow"></div>
            <div className="terminal-button terminal-button-green"></div>
            <div className="terminal-title">system_specs.sh</div>
          </div>
          <div className="terminal-content">
            {isLoadingData ? (
              <p className="text-muted-foreground">Loading skills...</p>
            ) : dataError ? (
              <p className="text-red-400">{dataError}</p>
            ) : skills.length === 0 ? (
              <p className="text-muted-foreground">No skills available.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skillGroup) => (
                  <div key={skillGroup.category} className="space-y-2">
                    <h3 className="text-primary font-bold">{skillGroup.category}</h3>
                    <ul className="space-y-1">
                      {skillGroup.items.map((skill) => (
                        <li key={skill} className="flex items-center gap-2">
                          <span className="text-primary">-</span>
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Latest from the Blog</h2>
          <Link href="/blog" className="text-primary hover:underline inline-flex items-center gap-1">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        {isLoadingData ? (
          <p className="text-muted-foreground">Loading latest post...</p>
        ) : dataError ? (
          <p className="text-red-400">{dataError}</p>
        ) : latestPosts.length === 0 ? (
          <p className="text-muted-foreground">No blog posts available.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {latestPosts.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

