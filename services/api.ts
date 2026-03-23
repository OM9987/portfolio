export interface Experience {
  id: string
  title: string
  company: string
  period: string
  description: string
}

export interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  category: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  readingTime: string
  mediumUrl: string
}

export interface SkillGroup {
  category: string
  items: string[]
}

const inflightRequests = new Map<string, Promise<unknown>>()
const responseCache = new Map<string, { expiresAt: number; data: unknown }>()
const RESPONSE_CACHE_TTL_MS = 3000

function getApiBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "")
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured")
  }
  return baseUrl
}

async function getJson<T>(path: string): Promise<T> {
  const requestKey = path
  const now = Date.now()
  const cachedResponse = responseCache.get(requestKey)
  if (cachedResponse && cachedResponse.expiresAt > now) {
    return cachedResponse.data as T
  }

  const existingRequest = inflightRequests.get(requestKey)
  if (existingRequest) {
    return (await existingRequest) as T
  }

  const request = (async () => {
    const response = await fetch(`${getApiBaseUrl()}${path}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = (await response.json()) as T
    responseCache.set(requestKey, { data, expiresAt: Date.now() + RESPONSE_CACHE_TTL_MS })
    return data
  })()

  inflightRequests.set(requestKey, request)

  try {
    return (await request) as T
  } finally {
    inflightRequests.delete(requestKey)
  }
}

export function getExperiences(): Promise<Experience[]> {
  return getJson<Experience[]>("/experiences")
}

export function getFeaturedProjects(): Promise<Project[]> {
  return getJson<Project[]>("/projects/featured")
}

export function getBlogPosts(): Promise<BlogPost[]> {
  return getJson<BlogPost[]>("/blog-posts")
}

export function getLatestBlogPosts(count = 1): Promise<BlogPost[]> {
  return getJson<BlogPost[]>(`/blog-posts/latest?count=${count}`)
}

export function getSkills(): Promise<SkillGroup[]> {
  return getJson<SkillGroup[]>("/skills")
}
