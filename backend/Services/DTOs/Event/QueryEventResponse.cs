namespace Services.DTOs.Event;

public class QueryEventResponse
{
    public IEnumerable<EventResponse> Events { get; set; }

    public int Count { get; set; }
}