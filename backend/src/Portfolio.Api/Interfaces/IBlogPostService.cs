using Portfolio.Api.Models;

namespace Portfolio.Api.Interfaces;

public interface IBlogPostService
{
    IReadOnlyList<BlogPost> GetAll();
    IReadOnlyList<BlogPost> GetLatest(int count);
}
