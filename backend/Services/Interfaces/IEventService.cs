using Domain.Entities;

namespace Services.Interfaces;

public interface IEventService
{
    Task<IEnumerable<Event>> GetAllEvents();
}