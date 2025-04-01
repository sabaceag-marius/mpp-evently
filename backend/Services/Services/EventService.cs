using Domain.Entities;
using Domain.Interfaces;
using Services.DTOs.Event;
using Services.Interfaces;
using Services.Mapper;

namespace Services.Services;

public class EventService : IEventService
{
    private readonly IEventRepository _eventRepository;

    public EventService(IEventRepository eventRepository)
    {
        _eventRepository = eventRepository;
    }
    public async Task<IEnumerable<Event>> GetAllEvents()
    {
        return await _eventRepository.GetAllDataAsync();
    }

    public async Task<Response<IEnumerable<EventResponse>>> GetFilteredEvents(FilterEventRequest filterRequest)
    {
        var specification = filterRequest.ToSpecification();

        var result = await
            _eventRepository.GetFilteredEventsAsync(specification, filterRequest.PageNumber, filterRequest.PageSize);

        return new Response<IEnumerable<EventResponse>>
        {
            Value = result.Select(e => e.ToResponse())
        };
    }
}