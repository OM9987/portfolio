namespace Portfolio.Api.Models;

public sealed class BlogPost
{
    public required string Id { get; init; }
    public required string Title { get; init; }
    public required string Excerpt { get; init; }
    public required string Date { get; init; }
    public required string ReadingTime { get; init; }
    public required string MediumUrl { get; init; }
}
