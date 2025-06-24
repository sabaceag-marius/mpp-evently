using Domain.Entities;
using Domain.Interfaces;
using Services.DTOs;
using Services.DTOs.Event;
using Services.Interfaces;

namespace Services.Services;

public class GroupService : IGroupService
{
    private readonly IGroupRepository _groupRepository;

    public GroupService(IGroupRepository groupRepository)
    {
        _groupRepository = groupRepository;
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

    public async Task<ServiceResponse<GroupResponse>> GetGroupInvite(Guid id, Guid userId)
    {
        Group group = await _groupRepository.GetByIdAsync(id);

        if (group.Id == Guid.Empty)
        {
            return new ServiceResponse<GroupResponse>
            {
                IsError = true,
                ErrorStatusCode = ErrorStatusCodes.NotFound,
                ErrorMessage = "Group was not found"
            };
        }

        if (group.Users.Any(user => user.Id == userId))
        {
            return new ServiceResponse<GroupResponse>
            {
                IsError = true,
                ErrorStatusCode = ErrorStatusCodes.Unauthorized,
                ErrorMessage = "You already joined this group"
            };
        }

        return new ServiceResponse<GroupResponse>
        {
            Value = group.ToResponse()
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
}