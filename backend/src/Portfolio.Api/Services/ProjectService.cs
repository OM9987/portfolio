using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using Microsoft.Extensions.Caching.Memory;
using Portfolio.Api.Interfaces;
using Portfolio.Api.Models;

namespace Portfolio.Api.Services;

public sealed class ProjectService : IProjectService
{
    private const string CacheKey = "portfolio:projects";
    private const string ProjectsEntityPk = "ENTITY#projects";
    private const string ItemSkPrefix = "ITEM#";

    private readonly IAmazonDynamoDB _dynamoDb;
    private readonly IMemoryCache _memoryCache;
    private readonly string _tableName;

    public ProjectService(
        IAmazonDynamoDB dynamoDb,
        IMemoryCache memoryCache,
        IConfiguration configuration)
    {
        _dynamoDb = dynamoDb;
        _memoryCache = memoryCache;
        _tableName = configuration["DynamoDbTableName"]
            ?? throw new InvalidOperationException("DynamoDbTableName is not configured.");
    }

    public IReadOnlyList<Project> GetFeaturedProjects()
    {
        return _memoryCache.GetOrCreate(CacheKey, _ => LoadProjectsFromDynamoDb())!;
    }

    private IReadOnlyList<Project> LoadProjectsFromDynamoDb()
    {
        var request = new QueryRequest
        {
            TableName = _tableName,
            KeyConditionExpression = "PK = :pk AND begins_with(SK, :skPrefix)",
            ExpressionAttributeValues = new Dictionary<string, AttributeValue>
            {
                [":pk"] = new AttributeValue { S = ProjectsEntityPk },
                [":skPrefix"] = new AttributeValue { S = ItemSkPrefix },
            },
            ScanIndexForward = true,
        };

        var response = _dynamoDb.QueryAsync(request).GetAwaiter().GetResult();

        return response.Items.Select(item => new Project
        {
            Id = GetString(item, "Id"),
            Title = GetString(item, "Title"),
            Description = GetString(item, "Description"),
            Image = GetString(item, "Image"),
            Technologies = GetStringList(item, "Technologies"),
            Category = GetString(item, "Category"),
        }).ToArray();
    }

    private static string GetString(IReadOnlyDictionary<string, AttributeValue> item, string name)
    {
        return item.TryGetValue(name, out var value) && !string.IsNullOrWhiteSpace(value.S)
            ? value.S
            : throw new InvalidOperationException($"Missing required DynamoDB attribute '{name}'.");
    }

    private static IReadOnlyList<string> GetStringList(IReadOnlyDictionary<string, AttributeValue> item, string name)
    {
        if (!item.TryGetValue(name, out var value))
        {
            return [];
        }

        if (value.L is { Count: > 0 })
        {
            return value.L
                .Where(v => !string.IsNullOrWhiteSpace(v.S))
                .Select(v => v.S)
                .ToArray();
        }

        if (value.SS is { Count: > 0 })
        {
            return value.SS.ToArray();
        }

        return [];
    }
}
