using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class GroupRepository : IGroupRepository
{
    private readonly AppDbContext _dbContext;

    public GroupRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    public async Task<IEnumerable<Group>> GetAllDataAsync()
    {
        throw new NotImplementedException();
    }

    public async Task<Group?> GetByIdAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public async Task<Group?> GetByIdNoTracking(Guid id)
    {
        throw new NotImplementedException();
    }

    public Group? Add(Group t)
    {
        throw new NotImplementedException();
    }

    public async Task<Group?> UpdateAsync(Group t)
    {
        throw new NotImplementedException();
    }

    public async Task DeleteAsync(Group t)
    {
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<Group>> GetUserGroups(Guid userId)
    {
        return await _dbContext.Groups
            .Where(g => g.Users.Any(u => u.Id == userId))
            .Include(g => g.Users) // Load all users for each group
            .ToListAsync();
    }
}