import Link from "next/link"
import { ProjectCard } from "@/components/project-card"
import { getFeaturedProjects } from "@/services/api"

const categories = [
  { id: "all", name: "All" },
  { id: "ai", name: "AI Engineering" },
  { id: "web", name: "Backend & Full-Stack" },
] as const

type CategoryId = (typeof categories)[number]["id"]

function isCategoryId(id: string): id is CategoryId {
  return categories.some((category) => category.id === id)
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams
  const rawCategory = params.category ?? "all"
  const activeFilter: CategoryId = isCategoryId(rawCategory) ? rawCategory : "all"
  const projects = await getFeaturedProjects()

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter)

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
          <p className="mb-4">
            <span className="text-primary">$</span> Displaying projects directory. Select category to filter results.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const href = category.id === "all" ? "/projects" : `/projects?category=${category.id}`
          const isActive = activeFilter === category.id

          return (
            <Link
            key={category.id}
            href={href}
            scroll={false}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {category.name}
            </Link>
          )
        })}
      </div>

      {filteredProjects.length === 0 ? (
        <p className="text-muted-foreground">No projects available for this filter.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              technologies={project.technologies}
            />
          ))}
        </div>
      )}
    </div>
  )
}

