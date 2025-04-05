using Domain.Common.Specifications;
using Domain.Entities;
using Domain.Enums;
using Domain.Specifications.Events;
using Services.DTOs.Event;

namespace Services.Mapper;

public static class EventMapper
{
    public static EventResponse ToResponse(this Event e)
    {
        return new EventResponse
        {
            Id = e.Id,
            Username = e.Username,
            Name = e.Name,
            Description = e.Description,
            EndDate = e.EndDate,
            StartDate = e.StartDate,
            CategoryName = e.Category.ToString()
        };
    }

    public static Specification<Event> ToSpecification(this FilterEventRequest filterRequest)
    {
        Specification<Event> specification = new AnySpecification<Event>();

        specification = specification.And(new EventSpecificationStartDate(filterRequest.StartDate));

        specification = specification.And(new EventSpecificationEndDate(filterRequest.EndDate));

        if (filterRequest.categoriesList != null)
            specification = specification.And(new EventSpecificationCategoryInList(filterRequest.categoriesList));

        return specification;
    }

    public static Specification<Event> ToSpecification(this FilterEventCountRequest filterRequest)
    {
        Specification<Event> specification = new AnySpecification<Event>();

        specification = specification.And(new EventSpecificationStartDate(filterRequest.StartDate));

        specification = specification.And(new EventSpecificationEndDate(filterRequest.EndDate));

        if (filterRequest.categoriesList != null)
            specification = specification.And(new EventSpecificationCategoryInList(filterRequest.categoriesList));

        return specification;
    }

    public static Event ToEvent(this CreateEventRequest eventRequest)
    {
        return new Event
        {
            Id = Guid.NewGuid(),
            Name = eventRequest.Name,
            Description = eventRequest.Description,
            StartDate = eventRequest.StartDate,
            EndDate = eventRequest.EndDate,
            Category = eventRequest.CategoryName.ToCategoryType()
        };
    }

    public static Event ToEvent(this UpdateEventRequest eventRequest)
    {
        return new Event
        {
            Id = eventRequest.Id,
            Name = eventRequest.Name,
            Description = eventRequest.Description,
            StartDate = eventRequest.StartDate,
            EndDate = eventRequest.EndDate,
            Category = eventRequest.CategoryName.ToCategoryType()
        };
    }
}