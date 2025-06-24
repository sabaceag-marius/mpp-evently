using Domain.Enums;

namespace Services.DTOs.Event;

public class EventCreateRequest
{
    public Guid? Id {get; set;}
    public string Name { get; set; } = "";

    public string Description { get; set; } = "";

    public DateTime StartDate { get; set; } = DateTime.Now;

    public DateTime EndDate { get; set; } = DateTime.Now;
    public Guid CategoryId { get; set; }
    public Guid? GroupId { get; set; }
}