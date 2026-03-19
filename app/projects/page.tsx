"use client"

import { useState } from "react"
import { ProjectCard } from "@/components/project-card"

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all")

  const projects = [
      {
        id: "ai-sports-engine",
        title: "AI-Powered Sports Game Engine",
        description:
          "Built a generative AI engine that creates complete sports web games from text prompts using GPT-4. Features real-time orchestration via WebSockets and dynamic theming with a full-stack architecture.",
        image: "/placeholder.svg?height=400&width=600",
        technologies: ["Python", "ReactJS", "NodeJS", "Flask", "MongoDB", "OpenAI", "WebSockets"],
        category: "ai",
      },
      {
        id: "sales-copilot",
        title: "AI Sales Co-Pilot",
        description:
          "Developed a multi-agent AI system to auto-generate client-ready sales presentations from briefs. Integrated Google Slides API for end-to-end deck creation with high content relevance.",
        image: "/placeholder.svg?height=400&width=600",
        technologies: ["FastAPI", "OpenAI", "ChromaDB", "SQLite", "Google Slides API"],
        category: "ai",
      },
      {
        id: "turning-leaves",
        title: "Turning Leaves Webapp",
        description:
          "Location-based book marketplace enabling seamless discovery, negotiation, and transactions with a real-time, user-friendly interface.",
        image: "/turning-leaves.png?height=400&width=600",
        technologies: ["ReactJS", "NodeJS", "ExpressJS", "MongoDB", "WebSockets"],
        category: "web",
      },
      {
        id: "ipl-stats",
        title: "IPL Stats Analytics Platform",
        description:
          "Full-stack analytics platform delivering deep IPL insights with interactive filtering, high-performance APIs, and optimized data querying.",
        image: "/placeholder.svg?height=400&width=600",
        technologies: [".NET Core", "ReactJS", "PostgreSQL", "Bootstrap"],
        category: "web",
      }
  ]

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
    </div>
  )
}

