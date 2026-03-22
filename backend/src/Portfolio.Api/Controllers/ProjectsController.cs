using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.Models;
using Portfolio.Api.Services;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("projects")]
public sealed class ProjectsController : ControllerBase
{
    private readonly IProjectService _projectService;

    public ProjectsController(IProjectService projectService)
    {
        _projectService = projectService;
    }

    [HttpGet("featured")]
    [ProducesResponseType(typeof(IReadOnlyList<Project>), StatusCodes.Status200OK)]
    public ActionResult<IReadOnlyList<Project>> GetFeatured()
    {
        return Ok(_projectService.GetFeaturedProjects());
    }
}
