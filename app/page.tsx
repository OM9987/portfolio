import Link from "next/link"
import { ProjectCard } from "@/components/project-card"
import { BlogCard } from "@/components/blog-card"
import { ArrowRight } from "lucide-react"
import { HomeIntro } from "@/components/home/home-intro"
import { getFeaturedProjects, getLatestBlogPosts, getSkills } from "@/services/api"

export default async function Home() {
  const [featuredProjects, latestPosts, skills] = await Promise.all([
    getFeaturedProjects(),
    getLatestBlogPosts(1),
    getSkills(),
  ])

  return (
    <div className="space-y-16">
      <HomeIntro />

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Projects</h2>
          <Link href="/projects" className="text-primary hover:underline inline-flex items-center gap-1">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        {featuredProjects.length === 0 ? (
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
            {skills.length === 0 ? (
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

        {latestPosts.length === 0 ? (
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

