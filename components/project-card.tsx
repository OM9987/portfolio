import Image from "next/image"
import Link from "next/link"

interface ProjectCardProps {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
}

export function ProjectCard({ id, title, description, image, technologies }: ProjectCardProps) {
  return (
    <Link href={`/projects/${id}`}>
      <div className="glass-panel rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(0,255,140,0.2)] hover:border-neon group">
        <div className="relative h-48 border-b border-white/10">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgb(10,10,10)] to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4 w-full">
            <h3 className="text-lg font-bold text-white font-sans drop-shadow-md">
              {title}
            </h3>
          </div>
        </div>
        <div className="p-5 flex-1 flex flex-col bg-[rgb(10,10,10)]/50">
          <p className="text-sm text-gray-400 mb-6 flex-1 font-sans">{description}</p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {technologies.map((tech) => (
              <span key={tech} className="text-xs px-2 py-1 bg-white/5 text-neon border border-neon/20 rounded font-mono">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

