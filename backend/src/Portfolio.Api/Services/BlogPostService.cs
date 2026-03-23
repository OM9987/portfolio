using Portfolio.Api.Models;
using Portfolio.Api.Interfaces;

namespace Portfolio.Api.Services;

public sealed class BlogPostService : IBlogPostService
{
    private static readonly IReadOnlyList<BlogPost> Posts =
    [
        new BlogPost
        {
            Id = "deep-time-prediction",
            Title = "The Promise of Deep Learning for Time Series Forecasting",
            Excerpt = "Time series forecasting plays a crucial role in various domains like finance, healthcare, and climate science. Traditional statistical methods such as ARIMA and exponential smoothing have been widely used, but they often struggle with complex, non-linear patterns in data.",
            Date = "2023-02-03",
            ReadingTime = "4 min read",
            MediumUrl = "https://medium.com/@omsingh1149/the-promise-of-deep-learning-for-time-series-forecasting-ff9d02932c62"
        },
        new BlogPost
        {
            Id = "api-versioning-aspnet",
            Title = "API Versioning in ASP.NET Core with .NET 8: A Practical Guide",
            Excerpt = "It explores implementing API versioning in ASP.NET Core using .NET 8, focusing on URL path versioning. It covers the importance of API versioning, setting up a .NET 8 Web API, various versioning approaches, step-by-step implementation, and best practices for robust API versioning.",
            Date = "2025-04-16",
            ReadingTime = "3 min read",
            MediumUrl = "https://medium.com/@omsingh1149/api-versioning-in-asp-net-core-with-net-8-a-practical-guide-07a2704b445e"
        }
    ];

    public IReadOnlyList<BlogPost> GetAll()
    {
        return Posts;
    }

    public IReadOnlyList<BlogPost> GetLatest(int count)
    {
        if (count <= 0)
        {
            return [];
        }

        return Posts.Take(count).ToArray();
    }
}
