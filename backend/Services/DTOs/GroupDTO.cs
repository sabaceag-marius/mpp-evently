using Domain.Entities;

namespace Services.DTOs;

public class GroupCreateRequest
{
    public required String Name { get; set; } = String.Empty;
    public String Description { get; set; } = String.Empty;
}

public class FilterGroupEventRequest
{
    public required DateTime StartDate { get; set; }
    public required DateTime EndDate { get; set; }
    public required int PageNumber { get; set; }
    public required int PageSize { get; set; }
    public required bool FetchAllEvents { get; set; }
}


public class GroupResponse
{
    public Guid Id { get; set; }
    public String Name { get; set; }
    
    public String Description { get; set; }

    public IEnumerable<String> Usernames { get; set; }

}

public class GroupInviteResponse
{
    public bool InGroup { get; set; }

    public GroupResponse Group { get; set; }
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

    public static Group ToGroup(this GroupCreateRequest request, User user)
    {
        return new Group
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Description = request.Description,
            Users = [user],
        };
    }
}