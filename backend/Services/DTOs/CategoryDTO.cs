using Domain.Entities;

namespace Services.DTOs;

public class UpdateCategoryRequest
{
    public required Guid Id { get; set; } = Guid.Empty;
    public required string Name { get; set; } = "";
    public required string Color { get; set; } = "";
}

public class AddCategoryRequest
{
    public required string Name { get; set; } = "";
    public required string Color { get; set; } = "";
}

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

    public static Category ToCategory(this UpdateCategoryRequest request, Guid userId)
    {
        return new Category
        {
            Id = request.Id,
            Color = request.Color,
            Name = request.Name,
            UserId = userId
        };
    }

    public static Category ToCategory(this AddCategoryRequest request, Guid userId)
    {
        return new Category
        {
            Id = Guid.NewGuid(),
            Color = request.Color,
            Name = request.Name,
            UserId = userId
        };
    }
}