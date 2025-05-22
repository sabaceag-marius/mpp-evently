using Microsoft.AspNetCore.Mvc;
using Services;
using Services.DTOs;
using Services.Interfaces;

namespace Presentation.Controllers;

[Route("api/users")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> RegisterUser([FromBody] UserRegisterRequest registerRequest)
    {
        if (!ModelState.IsValid)
        {
            var errorMessage = ModelState.Values
                .SelectMany(x => x.Errors)
                .First()
                .ErrorMessage;
            return new ObjectResult(new { errorMessage = errorMessage })
            {
                StatusCode = ErrorStatusCodes.BadRequest.ToStatusCode(),
            };
        }
        var response = await _userService.Register(registerRequest);

        if (response.IsError)
        {
            return new ObjectResult(response.ErrorMessage)
            {
                StatusCode = response.ErrorStatusCode.ToStatusCode()
            };
        }

        return Ok(response.Value);
    }

    [HttpPost("login")]
    public async Task<IActionResult> LoginUser([FromBody] UserLoginRequest loginRequest)
    {

        if (!ModelState.IsValid)
        {
            var errorMessage = ModelState.Values
                .SelectMany(x => x.Errors)
                .First()
                .ErrorMessage;
            return new ObjectResult(new { errorMessage = errorMessage })
            {
                StatusCode = ErrorStatusCodes.BadRequest.ToStatusCode(),
            };
        }

        var response = await _userService.Login(loginRequest);

        if (response.IsError)
        {
            return new ObjectResult(new { errorMessage = response.ErrorMessage })
            {
                StatusCode = response.ErrorStatusCode.ToStatusCode()
            };
        }

        return Ok(response.Value);
    }
}