"use client"

import { useState } from "react"
import Link from "next/link"
import { Terminal } from "@/components/terminal"
import { ProjectCard } from "@/components/project-card"
import { BlogCard } from "@/components/blog-card"
import { ArrowRight } from "lucide-react"

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false)
  
  const featuredProjects = [
    {
      id: "turning-leaves",
      title: "Turning Leaves Webapp",
      description: "Seamless book shopping made easy. Explore an extensive collection, enjoy a user-friendly interface, and make secure purchases.",
      image: "/turning-leaves.png?height=400&width=600",
      technologies: ["ReactJS", "ExpressJS", "WebSockets","NodeJS", "Mongoose"],
    },
    {
      id: "mask-detection",
      title: "Face Mask Detection",
      description: "Championed 'MaskDetectron' AI Guardian, safeguarding humanity one face mask at a time.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["Python", "Keras", "VGG16" ,"OpenCV"],
    },
    {
      id: "ai-chatbot",
      title: "AI Chatbot",
      description: "Conversational AI assistant with natural language processing and machine learning capabilities.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["Python", "NLP", "TensorFlow"],
    },
  ]

  const latestPosts = [
    {
      id: "deep-time-prediction",
      title: "The Promise of Deep Learning for Time Series Forecasting",
      excerpt: "Time series forecasting plays a crucial role in various domains like finance, healthcare, and climate science. Traditional statistical methods such as ARIMA and exponential smoothing have been widely used, but they often struggle with complex, non-linear patterns in data.",
      date: "2023-02-03",
      readingTime: "4 min read",
      mediumUrl: "https://medium.com/@omsingh1149/the-promise-of-deep-learning-for-time-series-forecasting-ff9d02932c62"
    },
  ]

  const skills = ["C#", "C/C++", "JavaScript", "Python", "PostgreSQL", ".NET", "AWS", "Next.js", "Node.js", "TensorFlow" ,"OpenCV"]

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-primary">$</span>
                  <span className="text-white">{skill}</span>
                </div>
              ))}
            </div>
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

        <div className="grid grid-cols-1 gap-6">
          {latestPosts.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>
      </section>
    </div>
  )
}

