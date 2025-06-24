using Infrastructure.Entities;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities;

public class User : IdentityUser<Guid>
{
    public List<Group> Groups { get; set; }
    //public List<GroupUsers> GroupUsers { get; set; }

}