using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Identity;
using Services.DTOs.Event;
using Services.Interfaces;
using Services.Mapper;

namespace Services.Services;

public class EventService : IEventService
{
    private readonly IEventRepository _eventRepository;
    private readonly ICategoryRepository _categoryRepository;

    public EventService(IEventRepository eventRepository, ICategoryRepository categoryRepository)
    {
        _eventRepository = eventRepository;
        _categoryRepository = categoryRepository;
    }
    public async Task<ServiceResponse<IEnumerable<EventResponse>>> GetAllEvents()
    {
        var result = await _eventRepository.GetAllDataAsync();

        return new ServiceResponse<IEnumerable<EventResponse>>
        {
            Value = result.Select(e => e.ToResponse())
        };
    }

    public async Task<ServiceResponse<QueryEventResponse>> GetFilteredEvents(FilterEventRequest filterRequest,
        Guid userId)
    {
        var specification = filterRequest.ToSpecification(userId);

        IEnumerable<Event> events;
        int count = -1;

        if (filterRequest.FetchAllEvents)
        {
            events = await _eventRepository.GetAllFilteredEventsAsync(specification);
        }
        else
        {
            events = await
                _eventRepository.GetFilteredEventsAsync(specification, filterRequest.PageNumber, filterRequest.PageSize);

            count = await _eventRepository.GetFilteredEventsCountAsync(specification);
        }

        var result = new QueryEventResponse
        {
            Events = events.Select(e => e.ToResponse()),
            Count = count
        };

        return new ServiceResponse<QueryEventResponse>
        {
            Value = result
        };
    }

    public async Task<ServiceResponse<int>> GetFilteredEventsCount(FilterEventCountRequest filterRequest)
    {
        throw new NotImplementedException();
    }

    public async Task<ServiceResponse<EventResponse>> GetEvent(Guid eventId, Guid userId)
    {
        var e = await _eventRepository.GetByIdAsync(eventId);

        if (e.Id == Guid.Empty || e.UserId != userId)
        {
            return new ServiceResponse<EventResponse>
            {
                IsError = true,
                ErrorStatusCode = ErrorStatusCodes.NotFound,
                ErrorMessage = "Event was not found"
            };
        }

        return new ServiceResponse<EventResponse>
        {
            Value = e.ToResponse()
        };
    }

    public async Task<ServiceResponse<EventResponse>> CreateEvent(CreateEventRequest eventRequest, User user)
    {

        Category? category = await _categoryRepository.GetByIdAsync(eventRequest.CategoryId);

        if (category == null || category.Id == Guid.Empty)
        {
            return new ServiceResponse<EventResponse>
            {
                IsError = true,
                ErrorMessage = "The category doesn't exist",
                ErrorStatusCode = ErrorStatusCodes.BadRequest
            };
        }

        var eventObj = eventRequest.ToEvent(user.Id);

        eventObj = _eventRepository.Add(eventObj);

        if (eventObj.Id == Guid.Empty)
        {
            return new ServiceResponse<EventResponse>
            {
                IsError = true,
                ErrorMessage = "Couldn't add the event",
                ErrorStatusCode = ErrorStatusCodes.BadRequest
            };
        }

        eventObj.Category = category;
        eventObj.User = user;

        return new ServiceResponse<EventResponse>
        {
            Value = eventObj.ToResponse()
        };
    }

    public async Task<ServiceResponse<EventResponse>> UpdateEvent(Guid eventId, UpdateEventRequest eventRequest,
        User user)
    {
        Category? category = await _categoryRepository.GetByIdAsync(eventRequest.CategoryId);

        if (category == null || category.Id == Guid.Empty)
        {
            return new ServiceResponse<EventResponse>
            {
                IsError = true,
                ErrorMessage = "The category doesn't exist",
                ErrorStatusCode = ErrorStatusCodes.BadRequest
            };
        }

        var event_ = await _eventRepository.GetByIdNoTracking(eventId);

        if(event_.Id == Guid.Empty || event_.UserId != user.Id)
        {
            return new ServiceResponse<EventResponse>
            {
                IsError = true,
                ErrorStatusCode = ErrorStatusCodes.NotFound,
                ErrorMessage = "Event was not found"
            };
        }
        var eventObj = eventRequest.ToEvent(user.Id);

        try
        {
            await _eventRepository.UpdateAsync(eventObj);
        }
        catch (Exception e)
        {
            return new ServiceResponse<EventResponse>
            {
                IsError = true,
                ErrorStatusCode = ErrorStatusCodes.InternalServerError,
                ErrorMessage = e.Message
            };
        }

        eventObj.Category = category;
        eventObj.User = user;

        return new ServiceResponse<EventResponse>
        {
            Value = eventObj.ToResponse()
        };
    }

    public async Task<ServiceResponse> DeleteEvent(Guid eventId, Guid userId)
    {
        var e = await _eventRepository.GetByIdNoTracking(eventId);

        if (e.Id == Guid.Empty || e.UserId != userId)
        {
            return new ServiceResponse
            {
                IsError = true,
                ErrorStatusCode = ErrorStatusCodes.NotFound,
                ErrorMessage = "Event was not found"
            };
        }

        await _eventRepository.DeleteAsync(e);

        return new ServiceResponse();
    }
}