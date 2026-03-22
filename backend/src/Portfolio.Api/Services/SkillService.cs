using Portfolio.Api.Models;
using Portfolio.Api.Interfaces;

namespace Portfolio.Api.Services;

public sealed class SkillService : ISkillService
{
    private static readonly IReadOnlyList<Skill> Skills =
    [
        new Skill
        {
            Category = "Languages",
            Items = ["C#", "Python", "JavaScript"]
        },
        new Skill
        {
            Category = "Frontend",
            Items = ["React", "Next.js", "Blazor", "Tailwind CSS"]
        },
        new Skill
        {
            Category = "Backend",
            Items = ["ASP.NET Core", "Node.js", "Express", "Microservices", "Event-Driven Architecture"]
        },
        new Skill
        {
            Category = "Database",
            Items = ["PostgreSQL", "MySQL", "MongoDB", "Redis", "RDS Proxy"]
        },
        new Skill
        {
            Category = "Cloud & DevOps",
            Items = ["AWS (Lambda, SQS, EventBridge, S3, EC2, Aurora RDS, Cloudfront )", "Docker", "CI/CD", "Nginx"]
        },
        new Skill
        {
            Category = "Observability & Performance",
            Items = ["New Relic", "Performance Optimization", "Distributed Caching", "Async Processing"]
        },
        new Skill
        {
            Category = "AI/ML",
            Items = ["Generative AI", "Deep Learning", "TensorFlow", "NLP", "Computer Vision"]
        }
    ];

    public IReadOnlyList<Skill> GetAll()
    {
        return Skills;
    }
}
