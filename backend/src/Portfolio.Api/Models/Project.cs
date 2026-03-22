namespace Portfolio.Api.Models;

public sealed class Project
{
    public required string Id { get; init; }
    public required string Title { get; init; }
    public required string Description { get; init; }
    public required string Image { get; init; }
    public required IReadOnlyList<string> Technologies { get; init; }
}
