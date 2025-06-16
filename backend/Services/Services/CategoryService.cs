using Domain.Entities;
using Domain.Interfaces;
using Services.DTOs;
using Services.DTOs.Event;
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

    public async Task<ServiceResponse> UpdateUserCategories(IEnumerable<UpdateCategoryRequest> request, User user)
    {
        var categories = 
            await _categoryRepository.GetCategoryRangeNoTracking(request.Select(c => c.Id).ToList());

        if (categories.Count() != request.Count() || categories.Any(c => c.UserId != user.Id))
        {
            return new ServiceResponse
            {
                IsError = true,
                ErrorStatusCode = ErrorStatusCodes.BadRequest,
                ErrorMessage = "Couldn't find all categories"
            };
        }

        var updatedCategories = request.Select(c => c.ToCategory(user.Id));

        await _categoryRepository.UpdateAsyncRange(updatedCategories);

        return new ServiceResponse();
    }

    public async Task<ServiceResponse<CategoryResponse>> CreateCategory(AddCategoryRequest request, User user)
    {
        var category = request.ToCategory(user.Id);

        category =  _categoryRepository.Add(category);

        if (category == null)
        {
            return new ServiceResponse<CategoryResponse>
            {
                IsError = true,
                ErrorMessage = "Couldn't add the category",
                ErrorStatusCode = ErrorStatusCodes.BadRequest
            };
        }

        return new ServiceResponse<CategoryResponse>
        {
            Value = category.ToResponse()
        };
    }
}