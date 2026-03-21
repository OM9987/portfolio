using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.Models;
using Portfolio.Api.Services;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("experiences")]
public sealed class ExperiencesController : ControllerBase
{
    private readonly IExperienceService _experienceService;

    public ExperiencesController(IExperienceService experienceService)
    {
        _experienceService = experienceService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IReadOnlyList<Experience>), StatusCodes.Status200OK)]
    public ActionResult<IReadOnlyList<Experience>> Get()
    {
        var experiences = _experienceService.GetExperiences();
        return Ok(experiences);
    }
}
