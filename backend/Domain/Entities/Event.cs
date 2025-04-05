using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using Domain.Enums;

namespace Domain.Entities;

[method: SetsRequiredMembers]
public class Event()
{
    [Key]
    public required Guid Id { get; set; } = Guid.Empty;

    public required string Name { get; set; } = "";

    public required string Username { get; set; } = "Mark";
    
    public required string Description { get; set; } = "";

    public required DateTime StartDate { get; set; } = DateTime.Now;

    public required DateTime EndDate { get; set; } = DateTime.Now;

    public CategoryType Category { get; set; }
}