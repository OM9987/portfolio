using Portfolio.Api.Models;

namespace Portfolio.Api.Interfaces;

public interface ISkillService
{
    IReadOnlyList<Skill> GetAll();
}
