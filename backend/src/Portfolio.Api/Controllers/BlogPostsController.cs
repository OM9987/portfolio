using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.Interfaces;
using Portfolio.Api.Models;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("blog-posts")]
public sealed class BlogPostsController : ControllerBase
{
    private readonly IBlogPostService _blogPostService;

    public BlogPostsController(IBlogPostService blogPostService)
    {
        _blogPostService = blogPostService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IReadOnlyList<BlogPost>), StatusCodes.Status200OK)]
    public ActionResult<IReadOnlyList<BlogPost>> GetAll()
    {
        return Ok(_blogPostService.GetAll());
    }

    [HttpGet("latest")]
    [ProducesResponseType(typeof(IReadOnlyList<BlogPost>), StatusCodes.Status200OK)]
    public ActionResult<IReadOnlyList<BlogPost>> GetLatest([FromQuery] int count = 1)
    {
        return Ok(_blogPostService.GetLatest(count));
    }
}
