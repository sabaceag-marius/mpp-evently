using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.DTOs.Event;
using Services.Interfaces;
using Services.Services;
using Services.Validator;
using System.Security.Claims;

namespace Presentation.Controllers
{
    [Route("api/events")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventService _eventService;
        private readonly IUserService _userService;

        public EventController(IEventService eventService, IUserService userService)
        {
            _eventService = eventService;
            _userService = userService;
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

        [Authorize]
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

            var username = User.FindFirstValue(ClaimTypes.GivenName);

            var userResponse = await _userService.GetUserByNameAsync(username);

            // This shouldn't happen since we have the 'Authorize' attribute
            if (userResponse.IsError)
            {
                return new ObjectResult(userResponse.ErrorMessage)
                {
                    StatusCode = userResponse.ErrorStatusCode.ToStatusCode()
                };
            }

            var user = userResponse.Value;

            var response = await _eventService.GetFilteredEvents(filterRequest, user.Id);

            if (response.IsError)
            {
                return new ObjectResult(response.ErrorMessage)
                {
                    StatusCode = response.ErrorStatusCode.ToStatusCode()
                };
            }

            return Ok(response.Value);
        }

        [Authorize]
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

            var username = User.FindFirstValue(ClaimTypes.GivenName);

            var userResponse = await _userService.GetUserByNameAsync(username);

            // This shouldn't happen since we have the 'Authorize' attribute
            if (userResponse.IsError)
            {
                return new ObjectResult(userResponse.ErrorMessage)
                {
                    StatusCode = userResponse.ErrorStatusCode.ToStatusCode()
                };
            }

            var user = userResponse.Value;

            var response = await _eventService.GetEvent(id, user.Id);

            if (response.IsError)
            {
                return new ObjectResult(response.ErrorMessage)
                {
                    StatusCode = response.ErrorStatusCode.ToStatusCode()
                };
            }

            return Ok(response.Value);
        }

        [Authorize]
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

            var username = User.FindFirstValue(ClaimTypes.GivenName);

            var userResponse = await _userService.GetUserByNameAsync(username);

            // This shouldn't happen since we have the 'Authorize' attribute
            if (userResponse.IsError)
            {
                return new ObjectResult(userResponse.ErrorMessage)
                {
                    StatusCode = userResponse.ErrorStatusCode.ToStatusCode()
                };
            }

            var user = userResponse.Value;

            var validate = EventValidator.ValidateEvent(eventRequest);

            if (validate.IsError)
            {
                return new ObjectResult(validate.ErrorMessage)
                {
                    StatusCode = validate.ErrorStatusCode.ToStatusCode()
                };
            }

            var response = await _eventService.CreateEvent(eventRequest, user);

            if (response.IsError)
            {
                return new ObjectResult(response.ErrorMessage)
                {
                    StatusCode = response.ErrorStatusCode.ToStatusCode()
                };
            }

            return CreatedAtAction(nameof(GetEvent), new { id = response.Value.Id }, response.Value);

        }

        [Authorize]
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

            var username = User.FindFirstValue(ClaimTypes.GivenName);

            var userResponse = await _userService.GetUserByNameAsync(username);

            // This shouldn't happen since we have the 'Authorize' attribute
            if (userResponse.IsError)
            {
                return new ObjectResult(userResponse.ErrorMessage)
                {
                    StatusCode = userResponse.ErrorStatusCode.ToStatusCode()
                };
            }

            var user = userResponse.Value;

            var response = await _eventService.DeleteEvent(id, user.Id);

            if (response.IsError)
            {
                return new ObjectResult(response.ErrorMessage)
                {
                    StatusCode = response.ErrorStatusCode.ToStatusCode()
                };
            }

            return NoContent();
        }

        [Authorize]
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

            var username = User.FindFirstValue(ClaimTypes.GivenName);

            var userResponse = await _userService.GetUserByNameAsync(username);

            // This shouldn't happen since we have the 'Authorize' attribute
            if (userResponse.IsError)
            {
                return new ObjectResult(userResponse.ErrorMessage)
                {
                    StatusCode = userResponse.ErrorStatusCode.ToStatusCode()
                };
            }

            var user = userResponse.Value;

            var validate = EventValidator.ValidateEvent(id, eventRequest);

            if (validate.IsError)
            {
                return new ObjectResult(validate.ErrorMessage)
                {
                    StatusCode = validate.ErrorStatusCode.ToStatusCode()
                };
            }

            var response = await _eventService.UpdateEvent(id,eventRequest, user);

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
