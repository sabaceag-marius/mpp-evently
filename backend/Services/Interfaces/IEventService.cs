using Domain.Entities;
using Services.DTOs.Event;

namespace Services.Interfaces;

public interface IEventService
{
    Task<ServiceResponse<IEnumerable<EventResponse>>> GetAllEvents();

    Task<ServiceResponse<QueryEventResponse>> GetFilteredEvents(FilterEventRequest filterRequest, Guid userId);
    Task<ServiceResponse<int>> GetFilteredEventsCount(FilterEventCountRequest filterRequest);
    Task<ServiceResponse<EventResponse>> GetEvent(Guid eventId);
    Task<ServiceResponse<EventResponse>> CreateEvent(CreateEventRequest eventRequest);
    Task<ServiceResponse<EventResponse>> UpdateEvent(Guid eventId, UpdateEventRequest eventRequest);

    Task<ServiceResponse> DeleteEvent(Guid eventId);
}