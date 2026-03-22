using Portfolio.Api.Models;

namespace Portfolio.Api.Services;

public interface IBlogPostService
{
    IReadOnlyList<BlogPost> GetAll();
    IReadOnlyList<BlogPost> GetLatest(int count);
}
