"use client"

import { useState } from "react"
import emailjs from "@emailjs/browser"
import Link from "next/link"
import { FileText, Github, Linkedin, Mail } from "lucide-react"
import { Terminal } from "@/components/terminal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { Experience, SkillGroup } from "@/services/api"

interface AboutContentProps {
  experiences: Experience[]
  skills: SkillGroup[]
}

export function AboutContent({ experiences, skills }: AboutContentProps) {
  const [introComplete, setIntroComplete] = useState(false)
  const [bioComplete, setBioComplete] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    const form = e.currentTarget
    const formData = {
      from_name: (form.elements.namedItem("name") as HTMLInputElement).value,
      from_email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      to_name: "Om Singh",
      reply_to: (form.elements.namedItem("email") as HTMLInputElement).value,
      time: new Date().toLocaleString(),
    }

    try {
      await emailjs.send("service_qwiqc1r", "template_hm1ulkd", formData, "GD7s94DtBgdWTRBy5")
      setSubmitStatus("success")
      form.reset()
    } catch (error) {
      console.error("Error sending email:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-16">
      <section>
        <Terminal
          text="Initializing personal profile... Access granted. Loading bio data..."
          typingSpeed={30}
          className="max-w-3xl mx-auto"
          onComplete={() => setIntroComplete(true)}
        />

        {introComplete && (
          <Terminal
            text="Hello, I'm Om. Backend Engineer crafting high-performance systems and real-time applications, with a strong edge in AI."
            typingSpeed={20}
            className="max-w-3xl mx-auto mt-4"
            showPrompt={false}
            onComplete={() => setBioComplete(true)}
          />
        )}
      </section>

      {bioComplete && (
        <>
          <section>
            <h2 className="text-2xl font-bold mb-6">Experience Timeline</h2>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="terminal-window">
                  <div className="terminal-header">
                    <div className="terminal-button terminal-button-red"></div>
                    <div className="terminal-button terminal-button-yellow"></div>
                    <div className="terminal-button terminal-button-green"></div>
                    <div className="terminal-title">{exp.company}.sh</div>
                  </div>
                  <div className="terminal-content">
                    <p className="mb-1">
                      <span className="text-primary">$</span> cat job_details.txt
                    </p>
                    <p>
                      <span className="text-primary">title:</span> {exp.title}
                    </p>
                    <p>
                      <span className="text-primary">period:</span> {exp.period}
                    </p>
                    <p>
                      <span className="text-primary">description:</span> {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">System Specs</h2>
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-button terminal-button-red"></div>
                <div className="terminal-button terminal-button-yellow"></div>
                <div className="terminal-button terminal-button-green"></div>
                <div className="terminal-title">skills.sh</div>
              </div>
              <div className="terminal-content">
                <p className="mb-4">
                  <span className="text-primary">$</span> cat /proc/skills
                </p>
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
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Contact</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="terminal-window">
                <div className="terminal-header">
                  <div className="terminal-button terminal-button-red"></div>
                  <div className="terminal-button terminal-button-yellow"></div>
                  <div className="terminal-button terminal-button-green"></div>
                  <div className="terminal-title">contact_form.sh</div>
                </div>
                <div className="terminal-content">
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <Input id="name" name="name" placeholder="Enter your name" className="bg-background border-border" required />
                    <Input id="email" name="email" type="email" placeholder="Enter your email" className="bg-background border-border" required />
                    <Textarea id="message" name="message" placeholder="Enter your message" rows={4} className="bg-background border-border" required />
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                    {submitStatus === "success" && <p className="text-green-500 text-sm mt-2">Message sent successfully!</p>}
                    {submitStatus === "error" && <p className="text-red-500 text-sm mt-2">Failed to send message. Please try again.</p>}
                  </form>
                </div>
              </div>

              <div className="terminal-window">
                <div className="terminal-header">
                  <div className="terminal-button terminal-button-red"></div>
                  <div className="terminal-button terminal-button-yellow"></div>
                  <div className="terminal-button terminal-button-green"></div>
                  <div className="terminal-title">network_connections.sh</div>
                </div>
                <div className="terminal-content space-y-3">
                  <Link href="https://github.com/OM9987" className="flex items-center gap-2 hover:text-primary transition-colors" target="_blank">
                    <Github size={16} /> github.com/OM9987
                  </Link>
                  <Link href="https://medium.com/@omsingh1149" className="flex items-center gap-2 hover:text-primary transition-colors" target="_blank">
                    <FileText size={16} /> medium.com/@omsingh1149
                  </Link>
                  <Link href="https://www.linkedin.com/in/om-singh6363/" className="flex items-center gap-2 hover:text-primary transition-colors" target="_blank">
                    <Linkedin size={16} /> linkedin.com/in/om-singh6363
                  </Link>
                  <Link href="mailto:omsingh6363@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Mail size={16} /> omsingh6363@gmail.com
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
