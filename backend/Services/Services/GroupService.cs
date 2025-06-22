using Domain.Interfaces;
using Services.DTOs;
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
}