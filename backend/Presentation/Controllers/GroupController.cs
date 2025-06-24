using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Services;
using Services.DTOs;
using Services.Interfaces;
using Services.Services;
using Services.Validator;

namespace Presentation.Controllers;

[ApiController]
[Route("/api/groups")]

public class GroupController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IGroupService _groupService;

    public GroupController(IUserService userService, IGroupService groupService)
    {
        _userService = userService;
        _groupService = groupService;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetUserGroups()
    {
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

        var response = await _groupService.GetUserGroups(user.Id);

        if (response.IsError)
        {
            return new ObjectResult(response.ErrorMessage)
            {
                StatusCode = response.ErrorStatusCode.ToStatusCode()
            };
        }

        return Ok(response.Value);
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<IActionResult> GetGroup([FromRoute] Guid id)
    {
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

        var response = await _groupService.GetGroup(id, user.Id);

        if (response.IsError)
        {
            return new ObjectResult(response.ErrorMessage)
            {
                StatusCode = response.ErrorStatusCode.ToStatusCode()
            };
        }

        return Ok(response.Value);
    }

    [HttpGet("invite/{id}")]
    [Authorize]
    public async Task<IActionResult> GetGroupInvite([FromRoute] Guid id)
    {
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

        var response = await _groupService.GetGroupInvite(id, user.Id);

        if (response.IsError)
        {
            return new ObjectResult(response.ErrorMessage)
            {
                StatusCode = response.ErrorStatusCode.ToStatusCode()
            };
        }

        return Ok(response.Value);
    }

    [HttpPost("join/{id}")]
    [Authorize]
    public async Task<IActionResult> JoinGroup([FromRoute] Guid id)
    {
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

        var response = await _groupService.JoinGroup(id, user);

        if (response.IsError)
        {
            return new ObjectResult(response.ErrorMessage)
            {
                StatusCode = response.ErrorStatusCode.ToStatusCode()
            };
        }

        return Ok();
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateGroup([FromBody] GroupCreateRequest request)
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

        //var validate = EventValidator.ValidateEvent(eventRequest);

        //if (validate.IsError)
        //{
        //    return new ObjectResult(validate.ErrorMessage)
        //    {
        //        StatusCode = validate.ErrorStatusCode.ToStatusCode()
        //    };
        //}

        var response = await _groupService.CreateGroup(request, user);

        if (response.IsError)
        {
            return new ObjectResult(response.ErrorMessage)
            {
                StatusCode = response.ErrorStatusCode.ToStatusCode()
            };
        }

        return CreatedAtAction(nameof(GetGroup), new { id = response.Value.Id }, response.Value);
    }
}