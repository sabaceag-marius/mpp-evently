using Domain.Entities;
using Services.DTOs.Event;

namespace Services.Interfaces;

public interface IEventService
{
    Task<IEnumerable<Event>> GetAllEvents();

    Task<Response<IEnumerable<EventResponse>>> GetFilteredEvents(FilterEventRequest filterRequest);
}