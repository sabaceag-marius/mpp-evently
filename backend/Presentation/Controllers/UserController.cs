using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.DTOs;
using Services.Interfaces;
using Services.Services;
using Services.Validator;
using System.Security.Claims;
using Domain.Entities;

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

        var validationResponse = registerRequest.ValidateRegisterRequest();

        if (validationResponse.IsError)
        {
            return new ObjectResult(validationResponse.ErrorMessage)
            {
                StatusCode = validationResponse.ErrorStatusCode.ToStatusCode()
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

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetUser()
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

        return Ok(user.ToProfileResponse());
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> SaveUser(UserProfileRequest request)
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

        var response = await _userService.SaveUser(user, request);

        if (response.IsError)
        {
            return new ObjectResult(response.ErrorMessage)
            {
                StatusCode = response.ErrorStatusCode.ToStatusCode()
            };
        }

        return Ok("User saved successfully!");
    }

    [HttpPost("login/twofactor")]
    public async Task<IActionResult> LoginUser2FA([FromBody] UserLogin2FARequest loginRequest)
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

        var response = await _userService.LoginTwoFactorAuth(loginRequest);

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