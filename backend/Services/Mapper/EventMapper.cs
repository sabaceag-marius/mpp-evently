using Domain.Common.Specifications;
using Domain.Entities;
using Domain.Enums;
using Domain.Specifications.Events;
using Services.DTOs;
using Services.DTOs.Event;

namespace Services.Mapper;

public static class EventMapper
{
    public static EventResponse ToResponse(this Event e)
    {
        return new EventResponse
        {
            Id = e.Id,
            Username = e.User.UserName,
            Name = e.Name,
            Description = e.Description,
            EndDate = e.EndDate,
            StartDate = e.StartDate,
            CategoryName = e.Category.Name,
            CategoryColor = e.Category.Color,
            CategoryId = e.CategoryId
        };
    }

    public static Specification<Event> ToSpecification(this FilterEventRequest filterRequest, Guid userId)
    {
        Specification<Event> specification = new EventSpecificationUser(userId);

        specification =
            specification.And(new EventSpecificationInDateRange(filterRequest.StartDate, filterRequest.EndDate));
        //specification = specification.And(new EventSpecificationStartDate(filterRequest.StartDate));

        //specification = specification.And(new EventSpecificationEndDate(filterRequest.EndDate));

        Specification<Event> categorySpecification = new NoneSpecification<Event>();

        foreach (var categoryId in filterRequest.categoryIds ?? new List<Guid>())
        {
            categorySpecification = categorySpecification.Or(new EventSpecificationCategory(categoryId));
        }

        specification = specification.And(categorySpecification);

        return specification;
    }

    public static Specification<Event> ToSpecification(this FilterGroupEventRequest filterRequest, Guid groupId)
    {
        Specification<Event> specification = new EventSpecificationGroup(groupId);

        specification =
            specification.And(new EventSpecificationInDateRange(filterRequest.StartDate, filterRequest.EndDate));

        return specification;
    }

    public static Event ToEvent(this EventCreateRequest request, Guid userId)
    {
        return new Event
        {
            Id = request.Id ?? Guid.NewGuid(),
            Name = request.Name,
            Description = request.Description,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            CategoryId = request.CategoryId,
            UserId = userId,
            GroupId = request.GroupId,
        };
    }

    public static Event ToEvent(this EventUpdateRequest request, Guid userId)
    {
        return new Event
        {
            Id = request.Id,
            Name = request.Name,
            Description = request.Description,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            CategoryId = request.CategoryId,
            UserId = userId,
        };
    }
}