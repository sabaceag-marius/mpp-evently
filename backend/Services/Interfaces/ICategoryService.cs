using Domain.Entities;
using Services.DTOs;

namespace Services.Interfaces;

public interface ICategoryService
{
    public Task<ServiceResponse<IEnumerable<Category>>> GetAllCategories();
    //public Task<CategoryDTO?> GetCategory(Guid id);
    public Task<ServiceResponse<IEnumerable<CategoryResponse>>> GetUserCategories(Guid userId);
}