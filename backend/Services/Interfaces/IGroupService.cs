using Services.DTOs;

namespace Services.Interfaces;

public interface IGroupService
{
    public Task<ServiceResponse<IEnumerable<GroupResponse>>> GetUserGroups(Guid userId);
}