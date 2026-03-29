namespace Portfolio.Api.Models;

public sealed class Experience
{
    public required string Id { get; init; }
    public required string Title { get; init; }
    public required string Company { get; init; }
    public required string Period { get; init; }
    public required string Description { get; init; }
}
