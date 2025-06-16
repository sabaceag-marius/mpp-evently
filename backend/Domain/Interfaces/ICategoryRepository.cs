using Domain.Entities;

namespace Domain.Interfaces;

public interface ICategoryRepository : IRepository<Category>
{
    public Task<IEnumerable<Category>> GetUserCategories(Guid userId);

    public Task<IEnumerable<Category>> GetCategoryRangeNoTracking(List<Guid> ids);

    Task<IEnumerable<Category>> UpdateAsyncRange(IEnumerable<Category> categories);
}