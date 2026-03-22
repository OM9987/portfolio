using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.Interfaces;
using Portfolio.Api.Models;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("skills")]
public sealed class SkillsController : ControllerBase
{
    private readonly ISkillService _skillService;

    public SkillsController(ISkillService skillService)
    {
        _skillService = skillService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IReadOnlyList<Skill>), StatusCodes.Status200OK)]
    public ActionResult<IReadOnlyList<Skill>> Get()
    {
        return Ok(_skillService.GetAll());
    }
}
