using Domain.Common.Specifications;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class EventRepository : IEventRepository
{
    private readonly AppDbContext _dbContext;

    public EventRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<Event>> GetAllDataAsync()
    {
        return await _dbContext.Event.ToListAsync();
    }

    public async Task<Event?> GetByIdAsync(Guid id)
    {
        return await _dbContext.Event.FirstOrDefaultAsync(e => e.Id == id);
    }

    public async Task<Event?> GetByIdNoTracking(Guid id)
    {
        return await _dbContext.Event.AsNoTracking().FirstOrDefaultAsync(e => e.Id == id);
    }

    public Event? Add(Event e)
    {
        _dbContext.Add(e);

        _dbContext.SaveChanges();

        return e;
    }

    public async Task<Event?> UpdateAsync(Event e)
    {
        _dbContext.Add(e);

        await _dbContext.SaveChangesAsync();

        return e;
    }

    public async Task DeleteAsync(Event e)
    {
        _dbContext.Event.Remove(e);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<IEnumerable<Event>> GetFilteredEventsAsync(Specification<Event> filters, int pageNumber, int pageSize)
    {
        return await _dbContext.Event
            .Where(filters.Expr)
            .OrderBy(e => e.StartDate)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<int> GetFilteredEventsCountAsync(Specification<Event> filters)
    {
        return await _dbContext.Event
            .Where(filters.Expr)
            .CountAsync();
    }
}