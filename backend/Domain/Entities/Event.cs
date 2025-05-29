using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using Domain.Enums;

namespace Domain.Entities;

[method: SetsRequiredMembers]
public class Event()
{
    [Key]
    public required Guid Id { get; set; } = Guid.Empty;

    public required string Name { get; set; } = "";

    [ForeignKey("User")]

    public required Guid UserId { get; set; } = Guid.Empty;

    [ForeignKey("Category")]
    public required Guid CategoryId { get; set; } = Guid.Empty;

    public required string Description { get; set; } = "";

    public required DateTime StartDate { get; set; } = DateTime.Now;

    public required DateTime EndDate { get; set; } = DateTime.Now;

    public Category Category { get; set; }

    public User User { get; set; }
}