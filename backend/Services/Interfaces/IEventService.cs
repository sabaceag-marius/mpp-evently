using Domain.Entities;
using Services.DTOs.Event;

namespace Services.Interfaces;

public interface IEventService
{
    Task<ServiceResponse<IEnumerable<EventResponse>>> GetAllEvents();

    Task<ServiceResponse<QueryEventResponse>> GetFilteredEvents(FilterEventRequest filterRequest, Guid userId);
    Task<ServiceResponse<int>> GetFilteredEventsCount(FilterEventCountRequest filterRequest);
    Task<ServiceResponse<EventResponse>> GetEvent(Guid eventId, Guid userId);
    Task<ServiceResponse<EventResponse>> CreateEvent(EventCreateRequest request, User user);
    Task<ServiceResponse<EventResponse>> UpdateEvent(Guid eventId, EventUpdateRequest request, User user);
    Task<ServiceResponse> DeleteEvent(Guid eventId, Guid userId);
}