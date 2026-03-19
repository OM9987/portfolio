import { BlogCard } from "@/components/blog-card"

export default function BlogPage() {
  const posts = [
    {
      id: "deep-time-prediction",
      title: "The Promise of Deep Learning for Time Series Forecasting",
      excerpt: "Time series forecasting plays a crucial role in various domains like finance, healthcare, and climate science. Traditional statistical methods such as ARIMA and exponential smoothing have been widely used, but they often struggle with complex, non-linear patterns in data.",
      date: "2023-02-03",
      readingTime: "4 min read",
      mediumUrl: "https://medium.com/@omsingh1149/the-promise-of-deep-learning-for-time-series-forecasting-ff9d02932c62"
    },
    {
      id: "api-versioning-aspnet",
      title: "API Versioning in ASP.NET Core with .NET 8: A Practical Guide",
      excerpt: "It explores implementing API versioning in ASP.NET Core using .NET 8, focusing on URL path versioning. It covers the importance of API versioning, setting up a .NET 8 Web API, various versioning approaches, step-by-step implementation, and best practices for robust API versioning.",
      date: "2025-04-16",
      readingTime: "3 min read",
      mediumUrl: "https://medium.com/@omsingh1149/api-versioning-in-asp-net-core-with-net-8-a-practical-guide-07a2704b445e"
    },
  ]

  return (
    <div className="space-y-8">
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-button terminal-button-red"></div>
          <div className="terminal-button terminal-button-yellow"></div>
          <div className="terminal-button terminal-button-green"></div>
          <div className="terminal-title">blog_posts.sh</div>
        </div>
        <div className="terminal-content">
          <p className="mb-4">
            <span className="text-primary">$</span> ls -la /articles
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  )
}

