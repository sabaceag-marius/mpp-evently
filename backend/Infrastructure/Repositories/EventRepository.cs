using Domain.Common.Specifications;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

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
        return await _dbContext.Events
            .Include(e => e.User)
            .Include(e => e.Category).ToListAsync();
    }

    public async Task<Event> GetByIdAsync(Guid id)
    {
        var event_ = await _dbContext.Events
            .Include(e => e.User)
            .Include(e => e.Category)
            .FirstOrDefaultAsync(e => e.Id == id);

        if (event_ == null) return new Event();

        return event_;
    }

    public async Task<Event?> GetByIdNoTracking(Guid id)
    {
        var event_ = await _dbContext.Events
            .Include(e => e.User)
            .Include(e => e.Category).AsNoTracking().FirstOrDefaultAsync(e => e.Id == id);

        if (event_ == null) return new Event();

        return event_;
    }

    public Event? Add(Event e)
    {
        _dbContext.Add(e);

        _dbContext.SaveChanges();

        return e;
    }

    public async Task<Event?> UpdateAsync(Event group)
    {
        _dbContext.Events.Update(group);

        await _dbContext.SaveChangesAsync();

        return group;
    }

    public async Task DeleteAsync(Event e)
    {
        _dbContext.Events.Remove(e);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<IEnumerable<Event>> GetFilteredEventsAsync(Specification<Event> filters, int pageNumber, int pageSize)
    {
        return await _dbContext.Events
            .Where(filters.Expr)
            .OrderBy(e => e.StartDate)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Include(e => e.Category)
            .Include(e => e.User)
            .ToListAsync();
    }

    public async Task<IEnumerable<Event>> GetAllFilteredEventsAsync(Specification<Event> filters)
    {
        return await _dbContext.Events
            .Where(filters.Expr)
            .OrderBy(e => e.StartDate)
            .Include(e => e.Category)
            .Include(e => e.User)
            .ToListAsync();
    }

    public async Task<int> GetFilteredEventsCountAsync(Specification<Event> filters)
    {
        return await _dbContext.Events
            .Where(filters.Expr)
            .CountAsync();
    }
}