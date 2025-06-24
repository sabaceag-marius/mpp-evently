using Domain.Entities;
using Services.DTOs;

namespace Services.Interfaces;

public interface IGroupService
{
    public Task<ServiceResponse<IEnumerable<GroupResponse>>> GetUserGroups(Guid userId);

    public Task<ServiceResponse<GroupResponse>> GetGroup(Guid id, Guid userId);

    public Task<ServiceResponse<GroupResponse>> GetGroupInvite(Guid id, Guid userId);

    public Task<ServiceResponse> JoinGroup(Guid id, User user);

    public Task<ServiceResponse<GroupResponse>> CreateGroup(GroupCreateRequest request, User user);
}