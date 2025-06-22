using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Services;
using Services.Interfaces;

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
}