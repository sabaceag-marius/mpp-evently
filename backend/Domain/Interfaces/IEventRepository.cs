using Domain.Entities;

namespace Domain.Interfaces;

public interface IEventRepository : IRepository<Event>
{
    public Task<IEnumerable<Event>> GetFilteredEventsAsync(int pageNumber, int pageSize);
    public Task<IEnumerable<Event>> GetFilteredEventsAsync();
}