using Domain.Entities;

namespace Services.DTOs;

public class CategoryResponse
{
    public required string Name { get; set; } = "";
    public required string Color { get; set; } = "";
}

public static class CategoryExtensions
{
    public static CategoryResponse ToResponse(this Category category)
    {
        return new CategoryResponse
        {
            Name = category.Name,
            Color = category.Color
        };
    }
}