using Domain.Enums;

namespace Services.DTOs.Event;

public class CreateEventRequest
{
    public string Name { get; set; } = "";

    public string Description { get; set; } = "";

    public DateTime StartDate { get; set; } = DateTime.Now;

    public DateTime EndDate { get; set; } = DateTime.Now;

    public string CategoryName { get; set; }
}