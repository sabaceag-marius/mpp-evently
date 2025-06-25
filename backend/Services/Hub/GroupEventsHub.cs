using Microsoft.AspNetCore.SignalR;
using Services.DTOs.Event;
using Services.Interfaces;

namespace Services.Hub;

public interface IGroupEventsClient
{
    Task<Guid> PingUpdateEvents(Guid groupId);
}

public class GroupEventsHub : Microsoft.AspNetCore.SignalR.Hub
{

}