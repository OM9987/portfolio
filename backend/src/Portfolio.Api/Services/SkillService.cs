using Portfolio.Api.Models;

namespace Portfolio.Api.Services;

public sealed class SkillService : ISkillService
{
    private static readonly IReadOnlyList<Skill> Skills =
    [
        new Skill { Name = "C#" },
        new Skill { Name = "C/C++" },
        new Skill { Name = "JavaScript" },
        new Skill { Name = "Python" },
        new Skill { Name = "PostgreSQL" },
        new Skill { Name = ".NET" },
        new Skill { Name = "AWS" },
        new Skill { Name = "Next.js" },
        new Skill { Name = "Node.js" },
        new Skill { Name = "TensorFlow" },
        new Skill { Name = "OpenCV" }
    ];

    public IReadOnlyList<Skill> GetAll()
    {
        return Skills;
    }
}
