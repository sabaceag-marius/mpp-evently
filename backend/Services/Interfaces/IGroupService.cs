using Domain.Entities;
using Services.DTOs;
using Services.DTOs.Event;

namespace Services.Interfaces;

public interface IGroupService
{
    public Task<ServiceResponse<IEnumerable<GroupResponse>>> GetUserGroups(Guid userId);

    public Task<ServiceResponse<GroupResponse>> GetGroup(Guid id, Guid userId);

    public Task<ServiceResponse<GroupInviteResponse>> GetGroupInvite(Guid id, Guid userId);

    public Task<ServiceResponse> JoinGroup(Guid id, User user);

    public Task<ServiceResponse<GroupResponse>> CreateGroup(GroupCreateRequest request, User user);
    public Task<ServiceResponse> LeaveGroup(Guid id, User user);

    public Task<ServiceResponse<IEnumerable<String>>> GetGroupUsers(Guid id, Guid userId);

    Task<ServiceResponse<QueryEventResponse>> GetFilteredGroupEvents(FilterGroupEventRequest filterRequest, Guid groupId, Guid userId);

}