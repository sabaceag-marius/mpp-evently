using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class CategoryRepository : ICategoryRepository
{
    private readonly AppDbContext _dbContext;

    public CategoryRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<Category>> GetAllDataAsync()
    {
        return await _dbContext.Categories.ToListAsync();
    }

    public async Task<Category?> GetByIdAsync(Guid id)
    {
        return await _dbContext.Categories.FirstOrDefaultAsync(e => e.Id == id);
    }

    public async Task<Category?> GetByIdNoTracking(Guid id)
    {
        return await _dbContext.Categories.AsNoTracking().FirstOrDefaultAsync(e => e.Id == id);
    }

    public Category? Add(Category e)
    {
        _dbContext.Add(e);

        _dbContext.SaveChanges();

        return e;
    }

    public async Task<Category?> UpdateAsync(Category c)
    {
        _dbContext.Categories.Update(c);

        await _dbContext.SaveChangesAsync();

        return c;
    }

    public async Task DeleteAsync(Category c)
    {
        _dbContext.Categories.Remove(c);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<IEnumerable<Category>> GetUserCategories(Guid userId)
    {
        return await _dbContext.Categories.Where(c => c.UserId == userId).ToListAsync();
    }

    public async Task<IEnumerable<Category>> GetCategoryRangeNoTracking(List<Guid> ids)
    {
        return await _dbContext.Categories.AsNoTracking().Where(c => ids.Any(id => id == c.Id)).ToListAsync();
    }

    public async Task<IEnumerable<Category>> UpdateAsyncRange(IEnumerable<Category> categories)
    {
        _dbContext.Categories.UpdateRange(categories);

        await _dbContext.SaveChangesAsync();

        return categories;
    }
}