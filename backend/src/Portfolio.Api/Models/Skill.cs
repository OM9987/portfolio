namespace Portfolio.Api.Models;

public sealed class Skill
{
    public required string Category { get; init; }
    public required IReadOnlyList<string> Items { get; init; }
}
