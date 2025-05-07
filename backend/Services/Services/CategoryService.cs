using Domain.Entities;
using Domain.Interfaces;
using Services.Interfaces;

namespace Services.Services;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoryService(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<Response<IEnumerable<Category>>> GetAllCategories()
    {
        return new Response<IEnumerable<Category>>
        {
            Value = await _categoryRepository.GetAllDataAsync()
        };
    }
}