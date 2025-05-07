using Domain.Entities;

namespace Domain.Interfaces;

public interface ICategoryRepository : IRepository<Category>
{
    public Task<IEnumerable<Category>> GetUserCategories(Guid userId);
}