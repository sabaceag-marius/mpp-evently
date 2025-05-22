using Domain.Entities;

namespace Services.DTOs;

public class CategoryResponse
{
    public required Guid Id { get; set; } = Guid.Empty;
    public required string Name { get; set; } = "";
    public required string Color { get; set; } = "";
}

public static class CategoryExtensions
{
    public static CategoryResponse ToResponse(this Category category)
    {
        return new CategoryResponse
        {
            Id = category.Id,
            Name = category.Name,
            Color = category.Color
        };
    }
}