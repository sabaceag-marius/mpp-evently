using Domain.Entities;

namespace Services.Interfaces;

public interface ICategoryService
{
    public Task<Response<IEnumerable<Category>>> GetAllCategories();
    //public Task<Category?> GetCategory(Guid id);
    //public Task<Response<IEnumerable<CategoryDto>>> GetUserCategories(User user);
}