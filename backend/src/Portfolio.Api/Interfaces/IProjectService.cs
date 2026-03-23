using Portfolio.Api.Models;

namespace Portfolio.Api.Interfaces;

public interface IProjectService
{
    IReadOnlyList<Project> GetFeaturedProjects();
}
