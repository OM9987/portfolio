using Portfolio.Api.Models;

namespace Portfolio.Api.Services;

public interface ISkillService
{
    IReadOnlyList<Skill> GetAll();
}
