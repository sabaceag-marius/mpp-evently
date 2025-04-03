using Domain.Entities;
using Services.DTOs.Event;

namespace Services.Interfaces;

public interface IEventService
{
    Task<Response<IEnumerable<EventResponse>>> GetAllEvents();

    Task<Response<IEnumerable<EventResponse>>> GetFilteredEvents(FilterEventRequest filterRequest);
    Task<Response<int>> GetFilteredEventsCount(FilterEventCountRequest filterRequest);
    Task<Response<EventResponse>> GetEvent(Guid eventId);
    Task<Response<EventResponse>> CreateEvent(CreateEventRequest eventRequest);
    Task<Response<EventResponse>> UpdateEvent(Guid eventId, UpdateEventRequest eventRequest);

    Task<Response> DeleteEvent(Guid eventId);
}