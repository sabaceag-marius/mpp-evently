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
    public async Task<Response<IEnumerable<EventResponse>>> GetAllEvents()
    {
        var result = await _eventRepository.GetAllDataAsync();

        return new Response<IEnumerable<EventResponse>>
        {
            Value = result.Select(e => e.ToResponse())
        };
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

    public async Task<Response<EventResponse>> GetEvent(Guid eventId)
    {
        var e = await _eventRepository.GetByIdAsync(eventId);

        if (e.Id == Guid.Empty)
        {
            return new Response<EventResponse>
            {
                IsError = true,
                ErrorStatusCode = ErrorStatusCodes.NotFound,
                ErrorMessage = "Event was not found"
            };
        }

        return new Response<EventResponse>
        {
            Value = e.ToResponse()
        };
    }

    public async Task<Response<EventResponse>> CreateEvent(CreateEventRequest eventRequest)
    {
        var eventObj = EventMapper.ToEvent(eventRequest);

        eventObj = _eventRepository.Add(eventObj);

        if (eventObj.Id == Guid.Empty)
        {
            return new Response<EventResponse>
            {
                IsError = true,
                ErrorMessage = "Couldn't add the event",
                ErrorStatusCode = ErrorStatusCodes.BadRequest
            };
        }

        return new Response<EventResponse>
        {
            Value = eventObj.ToResponse()
        };
    }

    public async Task<Response<EventResponse>> UpdateEvent(Guid eventId, UpdateEventRequest eventRequest)
    {
        var eventObj = eventRequest.ToEvent();

        await _eventRepository.UpdateAsync(eventObj);

        return new Response<EventResponse>
        {
            Value = eventObj.ToResponse()
        };
    }

    public async Task<Response> DeleteEvent(Guid eventId)
    {
        var e = await _eventRepository.GetByIdNoTracking(eventId);

        if (e.Id == Guid.Empty)
        {
            return new Response
            {
                IsError = true,
                ErrorStatusCode = ErrorStatusCodes.NotFound,
                ErrorMessage = "Event was not found"
            };
        }

        await _eventRepository.DeleteAsync(e);

        return new Response();
    }
}