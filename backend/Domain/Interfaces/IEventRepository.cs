using Domain.Common.Specifications;
using Domain.Entities;

namespace Domain.Interfaces;

public interface IEventRepository : IRepository<Event>
{
    public Task<IEnumerable<Event>> GetFilteredEventsAsync(Specification<Event> filters, int pageNumber, int pageSize);
    public Task<IEnumerable<Event>> GetAllFilteredEventsAsync(Specification<Event> filters);
    public Task<int> GetFilteredEventsCountAsync(Specification<Event> filters);
}