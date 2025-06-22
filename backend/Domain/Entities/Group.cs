using Infrastructure.Entities;

namespace Domain.Entities;

public class Group
{
    public Guid Id { get; set; }

    public required String Name { get; set; } = String.Empty;
    
    public required String Description { get; set; } = String.Empty;

    public List<User> Users { get; set; }
    public List<Event> Events { get; set; }
    public List<GroupUsers> GroupUsers { get; set; }

}