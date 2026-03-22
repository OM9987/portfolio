using Portfolio.Api.Models;

namespace Portfolio.Api.Interfaces;

public interface IExperienceService
{
    IReadOnlyList<Experience> GetExperiences();
}
