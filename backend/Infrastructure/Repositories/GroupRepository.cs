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

    public async Task<Group> GetByIdAsync(Guid id)
    {
        return await _dbContext.Groups.Include(group => group.Users)
            .FirstOrDefaultAsync(group => group.Id == id) ?? new Group();
    }

    public async Task<Group?> GetByIdNoTracking(Guid id)
    {
        return await _dbContext.Groups.AsNoTracking().Include(group => group.Users)
            .FirstOrDefaultAsync(group => group.Id == id) ?? new Group();
    }

    public Group? Add(Group t)
    {
        // Attach existing users to prevent duplicate inserts
        foreach (var user in t.Users.Where(u => u.Id != Guid.Empty))
        {
            _dbContext.Users.Attach(user);
        }

        _dbContext.Add(t);

        _dbContext.SaveChanges();

        return t;
    }

    public async Task<Group?> UpdateAsync(Group group)
    {
        // Load the existing group with its users
        var existingGroup = await _dbContext.Groups
            .Include(g => g.Users)
            .FirstOrDefaultAsync(g => g.Id == group.Id);

        if (existingGroup == null) return new Group();

        // Update scalar properties
        existingGroup.Name = group.Name;
        existingGroup.Description = group.Description;

        // Update users by replacing the collection
        existingGroup.Users = await _dbContext.Users
            .Where(u => group.Users.Select(x => x.Id).Contains(u.Id))
            .ToListAsync();

        await _dbContext.SaveChangesAsync();
        return existingGroup;
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