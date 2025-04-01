using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.DTOs.Event;
using Services.Interfaces;

namespace Presentation.Controllers
{
    [Route("api/events")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventService _eventService;

        public EventController(IEventService eventService)
        {
            _eventService = eventService;
        }

        [HttpGet]
        public async Task<IActionResult> GetFilteredEvents([FromQuery] FilterEventRequest filterRequest)
        {
            var response = await _eventService.GetFilteredEvents(filterRequest);

            if (response.IsError)
            {
                return new ObjectResult(response.ErrorMessage)
                {
                    StatusCode = response.ErrorStatusCode.ToStatusCode()
                };
            }

            return Ok(response.Value);
        }
    }
}
