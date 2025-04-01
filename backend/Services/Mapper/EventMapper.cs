using Domain.Common.Specifications;
using Domain.Entities;
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

        specification = specification.And(new EventSpecificationCategoryInList(filterRequest.categoriesList));

        return specification;
    }
}