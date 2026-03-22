using Portfolio.Api.Models;
using Portfolio.Api.Interfaces;

namespace Portfolio.Api.Services;

public sealed class ProjectService : IProjectService
{
    private static readonly IReadOnlyList<Project> FeaturedProjects =
    [
        new Project
        {
            Id = "ai-sports-engine",
            Title = "AI-Powered Sports Game Engine",
            Description = "Built a generative AI engine that creates complete sports web games from text prompts using GPT-4. Features real-time orchestration via WebSockets and dynamic theming with a full-stack architecture.",
            Image = "/placeholder.svg?height=400&width=600",
            Technologies = ["Python", "ReactJS", "NodeJS", "Flask", "MongoDB", "OpenAI", "WebSockets"],
            Category = "ai"
        },
        new Project
        {
            Id = "sales-copilot",
            Title = "AI Sales Co-Pilot",
            Description = "Developed a multi-agent AI system to auto-generate client-ready sales presentations from briefs. Integrated Google Slides API for end-to-end deck creation with high content relevance.",
            Image = "/placeholder.svg?height=400&width=600",
            Technologies = ["FastAPI", "OpenAI", "ChromaDB", "SQLite", "Google Slides API"],
            Category = "ai"
        },
        new Project
        {
            Id = "turning-leaves",
            Title = "Turning Leaves Webapp",
            Description = "Location-based book marketplace enabling seamless discovery, negotiation, and transactions with a real-time, user-friendly interface.",
            Image = "/turning-leaves.png?height=400&width=600",
            Technologies = ["ReactJS", "NodeJS", "ExpressJS", "MongoDB", "WebSockets"],
            Category = "web"
        },
        new Project
        {
            Id = "ipl-stats",
            Title = "IPL Stats Analytics Platform",
            Description = "Full-stack analytics platform delivering deep IPL insights with interactive filtering, high-performance APIs, and optimized data querying.",
            Image = "/placeholder.svg?height=400&width=600",
            Technologies = [".NET Core", "ReactJS", "PostgreSQL", "Bootstrap"],
            Category = "web"
        }
    ];

    public IReadOnlyList<Project> GetFeaturedProjects()
    {
        return FeaturedProjects;
    }
}
