using Domain.Entities;

namespace Domain.Interfaces;

public interface IGroupRepository : IRepository<Group>
{
    Task<IEnumerable<Group>> GetUserGroups(Guid userId);
}