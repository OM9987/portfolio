"use client"

import { useEffect, useState } from "react"
import { ProjectCard } from "@/components/project-card"
import { getFeaturedProjects, type Project } from "@/services/api"

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoadingProjects, setIsLoadingProjects] = useState(true)
  const [projectsError, setProjectsError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadProjects = async () => {
      setIsLoadingProjects(true)
      setProjectsError(null)

      try {
        const response = await getFeaturedProjects()
        if (!isMounted) return
        setProjects(response)
      } catch (error) {
        if (!isMounted) return
        console.error("Failed to load projects:", error)
        setProjectsError("Unable to load projects from API right now.")
      } finally {
        if (isMounted) setIsLoadingProjects(false)
      }
    }

    void loadProjects()

    return () => {
      isMounted = false
    }
  }, [])

  const categories = [
    { id: "all", name: "All" },
    { id: "ai", name: "AI Engineering" },
    { id: "web", name: "Backend & Full-Stack" },
  ]

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
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveFilter(category.id)}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeFilter === category.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {isLoadingProjects ? (
        <p className="text-muted-foreground">Loading projects...</p>
      ) : projectsError ? (
        <p className="text-red-400">{projectsError}</p>
      ) : filteredProjects.length === 0 ? (
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

