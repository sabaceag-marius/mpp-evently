using System.Diagnostics.CodeAnalysis;
using Infrastructure.Entities;

namespace Domain.Entities;

[method: SetsRequiredMembers]
public class Group()
{
    public Guid Id { get; set; } = Guid.Empty;

    public required String Name { get; set; } = String.Empty;
    
    public required String Description { get; set; } = String.Empty;

    public List<User> Users { get; set; }

}