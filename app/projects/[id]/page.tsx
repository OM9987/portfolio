"use client"

import { useEffect, useState } from "react"
import { useParams, notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getFeaturedProjects, type Project } from "@/services/api"

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [isLoadingProject, setIsLoadingProject] = useState(true)
  const [projectError, setProjectError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadProject = async () => {
      setIsLoadingProject(true)
      setProjectError(null)

      try {
        const projects = await getFeaturedProjects()
        if (!isMounted) return
        const matched = projects.find((item) => item.id === id) ?? null
        setProject(matched)
      } catch (error) {
        if (!isMounted) return
        console.error("Failed to load project details:", error)
        setProjectError("Unable to load project details from API right now.")
      } finally {
        if (isMounted) setIsLoadingProject(false)
      }
    }

    if (id) {
      void loadProject()
    }

    return () => {
      isMounted = false
    }
  }, [id])

  if (!isLoadingProject && !projectError && !project) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <Link href="/projects" className="inline-flex items-center gap-2 text-primary hover:underline">
        <ArrowLeft size={16} /> Back to projects
      </Link>

      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-button terminal-button-red"></div>
          <div className="terminal-button terminal-button-yellow"></div>
          <div className="terminal-button terminal-button-green"></div>
          <div className="terminal-title">project_details.sh</div>
        </div>
        <div className="terminal-content">
          <p className="mb-2">
            <span className="text-primary">$</span> cat {id}.json
          </p>
          {isLoadingProject ? (
            <p className="text-muted-foreground">Loading project details...</p>
          ) : projectError ? (
            <p className="text-red-400">{projectError}</p>
          ) : project ? (
            <div className="mb-4">
              <p>
                <span className="text-primary">title:</span> {project.title}
              </p>
              <p>
                <span className="text-primary">category:</span> {project.category}
              </p>
              <p className="flex flex-wrap gap-2 mt-2">
                <span className="text-primary">stack:</span>
                {project.technologies.map((tech) => (
                  <span key={tech} className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded">
                    {tech}
                  </span>
                ))}
              </p>
            </div>
          ) : null}
        </div>
      </div>

      {project && (
        <>
          <div className="relative h-80 rounded-md overflow-hidden">
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          </div>

          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
            <p className="text-muted-foreground">{project.description}</p>
          </div>
        </>
      )}
    </div>
  )
}

