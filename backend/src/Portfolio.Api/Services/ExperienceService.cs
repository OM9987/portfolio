using Portfolio.Api.Models;
using Portfolio.Api.Interfaces;

namespace Portfolio.Api.Services;

public sealed class ExperienceService : IExperienceService
{
    private static readonly IReadOnlyList<Experience> Experiences =
    [
        new Experience
        {
            Id = "sportz-interactive",
            Title = "Associate Developer (.NET)",
            Company = "Sportz Interactive Pvt. Ltd",
            Period = "07/2024 - Present",
            Description = "Grew from a Junior Middleware Developer to owning backend architecture for Gaming Application. Built event-driven pipelines using AWS Lambda and SQS for scalable, real-time leaderboard processing. Optimized system performance with Redis caching, async workflows, and RDS Proxy, ensuring stability under high load. Developed and maintained ASP.NET Core APIs, real-time scoring via EventBridge, and improved observability with New Relic across AWS infrastructure."
        },
        new Experience
        {
            Id = "sayhey-kmr-and-friends",
            Title = "Data Science Intern | Core AI Team Member",
            Company = "SayHey - KMR & Friends Pvt. Ltd",
            Period = "08/2022 - 12/2022",
            Description = "Led a Government of India-awarded startup, driving projects in Transformers, Generative AI, and interactive Chatbots (RNN, LSTM, Bert). Developed personalized recommendation systems for a Mental Health app, enhancing user experience."
        }
    ];

    public IReadOnlyList<Experience> GetExperiences()
    {
        return Experiences;
    }
}
