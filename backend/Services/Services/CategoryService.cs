using Domain.Entities;
using Domain.Interfaces;
using Services.DTOs;
using Services.Interfaces;

namespace Services.Services;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoryService(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<ServiceResponse<IEnumerable<Category>>> GetAllCategories()
    {
        return new ServiceResponse<IEnumerable<Category>>
        {
            Value = await _categoryRepository.GetAllDataAsync()
        };
    }

    public async Task<ServiceResponse<IEnumerable<CategoryResponse>>> GetUserCategories(Guid userId)
    {
        var categories = await _categoryRepository.GetUserCategories(userId);
        return new ServiceResponse<IEnumerable<CategoryResponse>>
        {
            Value = categories.Select(c => c.ToResponse())
        };
    }

    public async Task<ServiceResponse> AddDefaultCategories(Guid userId)
    {
        var workCategory = new Category
        {
            Id = Guid.NewGuid(),
            Color = "fcba03",
            Name = "Work",
            UserId = userId
        };

        var schoolCategory = new Category
        {
            Id = Guid.NewGuid(),
            Color = "a12a32",
            Name = "School",
            UserId = userId
        };

        var personalCategory = new Category
        {
            Id = Guid.NewGuid(),
            Color = "2860bf",
            Name = "Personal",
            UserId = userId
        };

        _categoryRepository.Add(workCategory);
        _categoryRepository.Add(schoolCategory);
        _categoryRepository.Add(personalCategory);

        return new ServiceResponse();
    }
}