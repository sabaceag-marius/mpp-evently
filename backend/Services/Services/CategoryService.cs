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
}