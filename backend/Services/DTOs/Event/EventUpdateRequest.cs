namespace Services.DTOs.Event;

public class EventUpdateRequest
{
    public Guid Id { get; set; } = Guid.Empty;
    public string Name { get; set; } = "";

    public string Description { get; set; } = "";

    public DateTime StartDate { get; set; } = DateTime.Now;

    public DateTime EndDate { get; set; } = DateTime.Now;

    public Guid CategoryId { get; set; }

}