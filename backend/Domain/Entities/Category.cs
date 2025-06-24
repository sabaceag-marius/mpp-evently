using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace Domain.Entities;

[method: SetsRequiredMembers]
public class Category()
{
    public Guid Id { get; set; } = Guid.Empty;

    [ForeignKey("User")]
    public required Guid UserId { get; set; } = Guid.Empty;
    public required string Name { get; set; } = "";
    public required string Color { get; set; } = "";
}