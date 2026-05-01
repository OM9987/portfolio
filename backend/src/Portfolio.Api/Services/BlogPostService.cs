using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using Microsoft.Extensions.Caching.Memory;
using Portfolio.Api.Interfaces;
using Portfolio.Api.Models;

namespace Portfolio.Api.Services;

public sealed class BlogPostService : IBlogPostService
{
    private const string CacheKey = "portfolio:blog-posts";
    private const string BlogEntityPk = "ENTITY#blog";
    private const string ItemSkPrefix = "ITEM#";

    private readonly IAmazonDynamoDB _dynamoDb;
    private readonly IMemoryCache _memoryCache;
    private readonly string _tableName;

    public BlogPostService(
        IAmazonDynamoDB dynamoDb,
        IMemoryCache memoryCache,
        IConfiguration configuration)
    {
        _dynamoDb = dynamoDb;
        _memoryCache = memoryCache;
        _tableName = configuration["DynamoDbTableName"]
            ?? throw new InvalidOperationException("DynamoDbTableName is not configured.");
    }

    public IReadOnlyList<BlogPost> GetAll()
    {
        return _memoryCache.GetOrCreate(CacheKey, _ => LoadBlogPostsFromDynamoDb())!;
    }

    public IReadOnlyList<BlogPost> GetLatest(int count)
    {
        if (count <= 0)
        {
            return [];
        }

        return GetAll().Take(count).ToArray();
    }

    private IReadOnlyList<BlogPost> LoadBlogPostsFromDynamoDb()
    {
        var request = new QueryRequest
        {
            TableName = _tableName,
            KeyConditionExpression = "PK = :pk AND begins_with(SK, :skPrefix)",
            ExpressionAttributeValues = new Dictionary<string, AttributeValue>
            {
                [":pk"] = new AttributeValue { S = BlogEntityPk },
                [":skPrefix"] = new AttributeValue { S = ItemSkPrefix },
            },
            ScanIndexForward = true,
        };

        var response = _dynamoDb.QueryAsync(request).GetAwaiter().GetResult();

        return response.Items.Select(item => new BlogPost
        {
            Id = GetString(item, "Id"),
            Title = GetString(item, "Title"),
            Excerpt = GetString(item, "Excerpt"),
            Date = GetString(item, "Date"),
            ReadingTime = GetString(item, "ReadingTime"),
            MediumUrl = GetString(item, "MediumUrl"),
        }).ToArray();
    }

    private static string GetString(IReadOnlyDictionary<string, AttributeValue> item, string name)
    {
        return item.TryGetValue(name, out var value) && !string.IsNullOrWhiteSpace(value.S)
            ? value.S
            : throw new InvalidOperationException($"Missing required DynamoDB attribute '{name}'.");
    }
}
