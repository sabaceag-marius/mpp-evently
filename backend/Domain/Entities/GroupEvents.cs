using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Entities;

[PrimaryKey(nameof(GroupId),nameof(EventId))]
public class GroupEvents
{
    public Guid GroupId { get; set; }
    public Guid EventId { get; set; }
    public Group Group { get; set; } = null;
    public Event Event { get; set; } = null;
}