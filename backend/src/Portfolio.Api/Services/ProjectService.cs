using Portfolio.Api.Models;

namespace Portfolio.Api.Services;

public sealed class ProjectService : IProjectService
{
    private static readonly IReadOnlyList<Project> FeaturedProjects =
    [
        new Project
        {
            Id = "turning-leaves",
            Title = "Turning Leaves Webapp",
            Description = "Seamless book shopping made easy. Explore an extensive collection, enjoy a user-friendly interface, and make secure purchases.",
            Image = "/turning-leaves.png?height=400&width=600",
            Technologies = ["ReactJS", "ExpressJS", "WebSockets", "NodeJS", "Mongoose"]
        },
        new Project
        {
            Id = "mask-detection",
            Title = "Face Mask Detection",
            Description = "Championed 'MaskDetectron' AI Guardian, safeguarding humanity one face mask at a time.",
            Image = "/placeholder.svg?height=400&width=600",
            Technologies = ["Python", "Keras", "VGG16", "OpenCV"]
        },
        new Project
        {
            Id = "ai-chatbot",
            Title = "AI Chatbot",
            Description = "Conversational AI assistant with natural language processing and machine learning capabilities.",
            Image = "/placeholder.svg?height=400&width=600",
            Technologies = ["Python", "NLP", "TensorFlow"]
        }
    ];

    public IReadOnlyList<Project> GetFeaturedProjects()
    {
        return FeaturedProjects;
    }
}
