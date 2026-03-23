using Portfolio.Api.Interfaces;
using Portfolio.Api.Services;

namespace Portfolio.Api;

public class Startup
{
    private const string FrontendCorsPolicy = "FrontendCorsPolicy";

    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddScoped<IExperienceService, ExperienceService>();
        services.AddScoped<IProjectService, ProjectService>();
        services.AddScoped<IBlogPostService, BlogPostService>();
        services.AddScoped<ISkillService, SkillService>();
        services.AddControllers();
        services.AddCors(options =>
        {
            options.AddPolicy(FrontendCorsPolicy, builder =>
            {
                var origins = Configuration
                    .GetValue<string>("AllowedOrigins")
                    ?.Split(';', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                    ?? Array.Empty<string>();

                if (origins.Length == 0)
                {
                    // Safe local default for early development.
                    origins = ["http://localhost:3000"];
                }

                builder
                    .WithOrigins(origins)
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseHttpsRedirection();

        app.UseRouting();
        app.UseCors(FrontendCorsPolicy);

        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapGet("/", async context =>
            {
                await context.Response.WriteAsync("Welcome to running ASP.NET Core on AWS Lambda");
            });
        });
    }
}