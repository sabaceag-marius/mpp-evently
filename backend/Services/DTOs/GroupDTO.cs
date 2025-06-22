using Domain.Entities;

namespace Services.DTOs;

public class GroupResponse
{
    public Guid Id { get; set; }
    public String Name { get; set; }
    
    public String Description { get; set; }

    public IEnumerable<String> Usernames { get; set; }

}

public static class GroupExtensions
{
    public static GroupResponse ToResponse(this Group group)
    {
        return new GroupResponse
        {
            Id = group.Id,
            Name = group.Name,
            Description = group.Description,
            Usernames = group.Users.Select(user => user.UserName),
        };
    }
}