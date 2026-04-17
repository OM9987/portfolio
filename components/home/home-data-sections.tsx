import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { BlogCard } from "@/components/blog-card"
import { ProjectCard } from "@/components/project-card"
import { getFeaturedProjects, getLatestBlogPosts, getSkills } from "@/services/api"

export async function HomeDataSections() {
  try {
    const [featuredProjects, latestPosts, skills] = await Promise.all([
      getFeaturedProjects(),
      getLatestBlogPosts(1),
      getSkills(),
    ])
    const homeProjects = featuredProjects.slice(0, 3)

    return (
      <>
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-sans">Featured Projects</h2>
            <Link href="/projects/" className="font-mono text-neon hover:text-white transition-colors inline-flex items-center gap-1 group">
              View all <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          {homeProjects.length === 0 ? (
            <p className="text-muted-foreground">No projects available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {homeProjects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 font-sans">Skills</h2>
          <div className="terminal-window">
            <div className="terminal-header relative justify-center pt-2">
              <div className="absolute left-4 flex gap-2 items-center">
                <div className="terminal-button terminal-button-red"></div>
                <div className="terminal-button terminal-button-yellow"></div>
                <div className="terminal-button terminal-button-green"></div>
              </div>
              <div className="terminal-title m-0 text-center font-sans tracking-wide">system_specs.sh</div>
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
      </>
    )
  } catch (error) {
    console.error("Home data fetch failed:", error)
    return (
      <section>
        <div className="terminal-window">
          <div className="terminal-header relative justify-center pt-2">
            <div className="absolute left-4 flex gap-2 items-center">
              <div className="terminal-button terminal-button-red"></div>
              <div className="terminal-button terminal-button-yellow"></div>
              <div className="terminal-button terminal-button-green"></div>
            </div>
            <div className="terminal-title m-0 text-center font-sans tracking-wide">home_data.sh</div>
          </div>
          <div className="terminal-content">
            <p className="text-red-400">Unable to load home data right now.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Check API URL and Lambda availability, then refresh.
            </p>
          </div>
        </div>
      </section>
    )
  }
}
