using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.DTOs.Event;
using Services.Interfaces;
using Services.Validator;

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
        [Route("ping")]
        public async Task<IActionResult> Ping()
        {
            return Ok();
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> GetAllEvents()
        {
            if (!ModelState.IsValid)
            {
                var errorMessage = ModelState.Values
                    .SelectMany(x => x.Errors)
                    .Select(x => x.ErrorMessage)
                    .Aggregate("", (current, next) => current + "\n" + next);
                return new ObjectResult(new { errorMessage = errorMessage })
                {
                    StatusCode = ErrorStatusCodes.BadRequest.ToStatusCode(),
                };
            }

            var response = await _eventService.GetAllEvents();

            if (response.IsError)
            {
                return new ObjectResult(response.ErrorMessage)
                {
                    StatusCode = response.ErrorStatusCode.ToStatusCode()
                };
            }

            return Ok(response.Value);
        }

        [HttpGet]
        public async Task<IActionResult> GetFilteredEvents([FromQuery] FilterEventRequest filterRequest)
        {
            if (!ModelState.IsValid)
            {
                var errorMessage = ModelState.Values
                    .SelectMany(x => x.Errors)
                    .Select(x => x.ErrorMessage)
                    .Aggregate("", (current, next) => current + "\n" + next);
                return new ObjectResult(new { errorMessage = errorMessage })
                {
                    StatusCode = ErrorStatusCodes.BadRequest.ToStatusCode(),
                };
            }

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

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetEvent([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                var errorMessage = ModelState.Values
                    .SelectMany(x => x.Errors)
                    .Select(x => x.ErrorMessage)
                    .Aggregate("", (current, next) => current + "\n" + next);
                return new ObjectResult(new { errorMessage = errorMessage })
                {
                    StatusCode = ErrorStatusCodes.BadRequest.ToStatusCode(),
                };
            }
            var response = await _eventService.GetEvent(id);

            if (response.IsError)
            {
                return new ObjectResult(response.ErrorMessage)
                {
                    StatusCode = response.ErrorStatusCode.ToStatusCode()
                };
            }

            return Ok(response.Value);
        }

        [HttpPost]
        public async Task<IActionResult> CreateEvent([FromBody] CreateEventRequest eventRequest)
        {
            if (!ModelState.IsValid)
            {
                var errorMessage = ModelState.Values
                    .SelectMany(x => x.Errors)
                    .Select(x => x.ErrorMessage)
                    .Aggregate("", (current, next) => current + "\n" + next);
                return new ObjectResult(new { errorMessage = errorMessage })
                {
                    StatusCode = ErrorStatusCodes.BadRequest.ToStatusCode(),
                };
            }

            var validate = EventValidator.ValidateEvent(eventRequest);

            if (validate.IsError)
            {
                return new ObjectResult(validate.ErrorMessage)
                {
                    StatusCode = validate.ErrorStatusCode.ToStatusCode()
                };
            }

            var response = await _eventService.CreateEvent(eventRequest);

            if (response.IsError)
            {
                return new ObjectResult(response.ErrorMessage)
                {
                    StatusCode = response.ErrorStatusCode.ToStatusCode()
                };
            }

            return CreatedAtAction(nameof(GetEvent), new { id = response.Value.Id }, response.Value);

        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteEvent([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                var errorMessage = ModelState.Values
                    .SelectMany(x => x.Errors)
                    .Select(x => x.ErrorMessage)
                    .Aggregate("", (current, next) => current + "\n" + next);
                return new ObjectResult(new { errorMessage = errorMessage })
                {
                    StatusCode = ErrorStatusCodes.BadRequest.ToStatusCode(),
                };
            }

            var response = await _eventService.DeleteEvent(id);

            if (response.IsError)
            {
                return new ObjectResult(response.ErrorMessage)
                {
                    StatusCode = response.ErrorStatusCode.ToStatusCode()
                };
            }

            return NoContent();
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateEvent([FromRoute] Guid id, [FromBody] UpdateEventRequest eventRequest)
        {
            if (!ModelState.IsValid)
            {
                var errorMessage = ModelState.Values
                    .SelectMany(x => x.Errors)
                    .Select(x => x.ErrorMessage)
                    .Aggregate("", (current, next) => current + "\n" + next);
                return new ObjectResult(new { errorMessage = errorMessage })
                {
                    StatusCode = ErrorStatusCodes.BadRequest.ToStatusCode(),
                };
            }

            var validate = EventValidator.ValidateEvent(id, eventRequest);

            if (validate.IsError)
            {
                return new ObjectResult(validate.ErrorMessage)
                {
                    StatusCode = validate.ErrorStatusCode.ToStatusCode()
                };
            }

            var response = await _eventService.UpdateEvent(id,eventRequest);

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
