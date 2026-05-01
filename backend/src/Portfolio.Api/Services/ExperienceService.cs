using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using Microsoft.Extensions.Caching.Memory;
using Portfolio.Api.Interfaces;
using Portfolio.Api.Models;

namespace Portfolio.Api.Services;

public sealed class ExperienceService : IExperienceService
{
    private const string CacheKey = "portfolio:experience";
    private const string ExperienceEntityPk = "ENTITY#experience";
    private const string ItemSkPrefix = "ITEM#";

    private readonly IAmazonDynamoDB _dynamoDb;
    private readonly IMemoryCache _memoryCache;
    private readonly string _tableName;

    public ExperienceService(
        IAmazonDynamoDB dynamoDb,
        IMemoryCache memoryCache,
        IConfiguration configuration)
    {
        _dynamoDb = dynamoDb;
        _memoryCache = memoryCache;
        _tableName = configuration["DynamoDbTableName"]
            ?? throw new InvalidOperationException("DynamoDbTableName is not configured.");
    }

    public IReadOnlyList<Experience> GetExperiences()
    {
        return _memoryCache.GetOrCreate(CacheKey, _ => LoadExperiencesFromDynamoDb())!;
    }

    private IReadOnlyList<Experience> LoadExperiencesFromDynamoDb()
    {
        var request = new QueryRequest
        {
            TableName = _tableName,
            KeyConditionExpression = "PK = :pk AND begins_with(SK, :skPrefix)",
            ExpressionAttributeValues = new Dictionary<string, AttributeValue>
            {
                [":pk"] = new AttributeValue { S = ExperienceEntityPk },
                [":skPrefix"] = new AttributeValue { S = ItemSkPrefix },
            },
            ScanIndexForward = true,
        };

        var response = _dynamoDb.QueryAsync(request).GetAwaiter().GetResult();

        return response.Items.Select(item => new Experience
        {
            Id = GetString(item, "Id"),
            Title = GetString(item, "Title"),
            Company = GetString(item, "Company"),
            Period = GetString(item, "Period"),
            Description = GetString(item, "Description"),
        }).ToArray();
    }

    private static string GetString(IReadOnlyDictionary<string, AttributeValue> item, string name)
    {
        return item.TryGetValue(name, out var value) && !string.IsNullOrWhiteSpace(value.S)
            ? value.S
            : throw new InvalidOperationException($"Missing required DynamoDB attribute '{name}'.");
    }
}
