using Domain.Entities;
using Domain.Interfaces;
using Services.DTOs;
using Services.DTOs.Event;
using Services.Interfaces;
using Services.Mapper;

namespace Services.Services;

public class GroupService : IGroupService
{
    private readonly IGroupRepository _groupRepository;
    private readonly IEventRepository _eventRepository;

    public GroupService(IGroupRepository groupRepository, IEventRepository eventRepository)
    {
        _groupRepository = groupRepository;
        _eventRepository = eventRepository;
    }
    public async Task<ServiceResponse<IEnumerable<GroupResponse>>> GetUserGroups(Guid userId)
    {
        var groups = await _groupRepository.GetUserGroups(userId);
        return new ServiceResponse<IEnumerable<GroupResponse>>
        {
            Value = groups.Select(c => c.ToResponse())
        };
    }

    public async Task<ServiceResponse<GroupResponse>> GetGroup(Guid id, Guid userId)
    {
        Group group = await _groupRepository.GetByIdAsync(id);

        if (group.Id == Guid.Empty || group.Users.All(user => user.Id != userId))
        {
            return new ServiceResponse<GroupResponse>
            {
                IsError = true,
                ErrorStatusCode = ErrorStatusCodes.NotFound,
                ErrorMessage = "Group was not found"
            };
        }

        return new ServiceResponse<GroupResponse>
        {
            Value = group.ToResponse()
        };
    }

    public async Task<ServiceResponse<GroupInviteResponse>> GetGroupInvite(Guid id, Guid userId)
    {
        Group group = await _groupRepository.GetByIdAsync(id);

        if (group.Id == Guid.Empty)
        {
            return new ServiceResponse<GroupInviteResponse>
            {
                IsError = true,
                ErrorStatusCode = ErrorStatusCodes.NotFound,
                ErrorMessage = "Group was not found"
            };
        }

        return new ServiceResponse<GroupInviteResponse>
        {
            Value = new GroupInviteResponse
            {
                Group = group.ToResponse(),
                InGroup = group.Users.Any(user => user.Id == userId)
            }
        };
    }

    public async Task<ServiceResponse> JoinGroup(Guid id, User user)
    {
        Group group = await _groupRepository.GetByIdNoTracking(id);

        if (group.Id == Guid.Empty)
        {
            return new ServiceResponse
            {
                IsError = true,
                ErrorStatusCode = ErrorStatusCodes.NotFound,
                ErrorMessage = "Group was not found"
            };
        }

        if (group.Users.Any(u => u.Id == user.Id))
        {
            return new ServiceResponse
            {
                IsError = true,
                ErrorStatusCode = ErrorStatusCodes.Unauthorized,
                ErrorMessage = "You already joined this group"
            };
        }

        group.Users.Add(user);

        await _groupRepository.UpdateAsync(group);

        return new ServiceResponse();
    }

    public async Task<ServiceResponse<GroupResponse>> CreateGroup(GroupCreateRequest request, User user)
    {
        Group group = request.ToGroup(user);

        group = _groupRepository.Add(group);

        if (group.Id == Guid.Empty)
        {
            return new ServiceResponse<GroupResponse>
            {
                IsError = true,
                ErrorMessage = "The group could not be created",
                ErrorStatusCode = ErrorStatusCodes.BadRequest
            };
        }

        return new ServiceResponse<GroupResponse>()
        {
            Value = group.ToResponse()
        };
    }

    public async Task<ServiceResponse> LeaveGroup(Guid id, User user)
    {
        Group group = await _groupRepository.GetByIdNoTracking(id);

        if (group.Id == Guid.Empty)
        {
            return new ServiceResponse
            {
                IsError = true,
                ErrorStatusCode = ErrorStatusCodes.NotFound,
                ErrorMessage = "Group was not found"
            };
        }

        if (group.Users.All(u => u.Id != user.Id))
        {
            return new ServiceResponse
            {
                IsError = true,
                ErrorStatusCode = ErrorStatusCodes.Unauthorized,
                ErrorMessage = "You aren't in this group"
            };
        }

        group.Users.RemoveAll(u => u.Id == user.Id);

        await _groupRepository.UpdateAsync(group);

        return new ServiceResponse();
    }

    public async Task<ServiceResponse<IEnumerable<string>>> GetGroupUsers(Guid id, Guid userId)
    {
        Group group = await _groupRepository.GetByIdAsync(id);

        if (group.Id == Guid.Empty || group.Users.All(user => user.Id != userId))
        {
            return new ServiceResponse<IEnumerable<string>>
            {
                IsError = true,
                ErrorStatusCode = ErrorStatusCodes.NotFound,
                ErrorMessage = "Group was not found"
            };
        }

        return new ServiceResponse<IEnumerable<string>>
        {
            Value = group.Users.Select(user => user.UserName)
        };
    }

    public async Task<ServiceResponse<QueryEventResponse>> GetFilteredGroupEvents(FilterGroupEventRequest filterRequest, Guid groupId, Guid userId)
    {
        Group group = await _groupRepository.GetByIdAsync(groupId);

        if (group.Id == Guid.Empty || group.Users.All(user => user.Id != userId))
        {
            return new ServiceResponse<QueryEventResponse>
            {
                IsError = true,
                ErrorStatusCode = ErrorStatusCodes.NotFound,
                ErrorMessage = "Group was not found"
            };
        }

        var specification = filterRequest.ToSpecification(groupId);

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
}