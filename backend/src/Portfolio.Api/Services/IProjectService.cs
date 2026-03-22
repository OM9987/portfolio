using Portfolio.Api.Models;

namespace Portfolio.Api.Services;

public interface IProjectService
{
    IReadOnlyList<Project> GetFeaturedProjects();
}
