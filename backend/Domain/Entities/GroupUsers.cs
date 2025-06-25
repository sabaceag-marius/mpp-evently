using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Entities;

[PrimaryKey(nameof(GroupId), nameof(UserId))]

public class GroupUsers
{
    public Guid GroupId { get; set; }
    public Guid UserId { get; set; }
    public Group Group { get; set; } = null;
    public User User { get; set; } = null;
}