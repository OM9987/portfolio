using Portfolio.Api.Models;

namespace Portfolio.Api.Services;

public interface IExperienceService
{
    IReadOnlyList<Experience> GetExperiences();
}
