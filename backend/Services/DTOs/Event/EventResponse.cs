using Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace Services.DTOs.Event;

[method: SetsRequiredMembers]
public class EventResponse()
{
    public required Guid Id { get; set; } = Guid.Empty;

    public required string Name { get; set; } = "";

    public required string Username { get; set; } = "";

    public required string Description { get; set; } = "";

    public required DateTime StartDate { get; set; } = DateTime.Now;

    public required DateTime EndDate { get; set; } = DateTime.Now;

    public required Guid CategoryId { get; set; } = Guid.Empty;
    public required string CategoryName { get; set; } = "";
    public required string CategoryColor { get; set; } = "";

    public Guid? GroupId { get; set; }
}