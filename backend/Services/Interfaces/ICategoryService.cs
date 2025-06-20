using Domain.Entities;
using Services.DTOs;

namespace Services.Interfaces;

public interface ICategoryService
{
    public Task<ServiceResponse<IEnumerable<Category>>> GetAllCategories();
    //public Task<CategoryDTO?> GetCategory(Guid id);
    public Task<ServiceResponse<IEnumerable<CategoryResponse>>> GetUserCategories(Guid userId);

    public Task<ServiceResponse> AddDefaultCategories(Guid userId);

    Task<ServiceResponse> UpdateUserCategories(IEnumerable<UpdateCategoryRequest> request, User user);

    Task<ServiceResponse<CategoryResponse>> CreateCategory(AddCategoryRequest request, User user);
}