import { AboutContent } from "@/components/about/about-content"
import { getExperiences, getSkills } from "@/services/api"

export default async function AboutPage() {
  const [experiences, skills] = await Promise.all([getExperiences(), getSkills()])
  return <AboutContent experiences={experiences} skills={skills} />
}

