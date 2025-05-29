using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.EntityFrameworkCore;
using Services.DTOs;

namespace Services.Services;

public class UserService : IUserService
{
    private readonly UserManager<User> _userManager;
    private readonly IConfiguration _configuration;
    private readonly SignInManager<User> _signInManager;

    public UserService(UserManager<User> userManager, IConfiguration configuration, SignInManager<User> signInManager)
    {
        _userManager = userManager;
        _configuration = configuration;
        _signInManager = signInManager;

    }

    public async Task<ServiceResponse<UserTokenResponse>> Register(UserRegisterRequest registerRequest)
    {
        var user = registerRequest.ToUser();

        var createdUser = await _userManager.CreateAsync(user, registerRequest.Password);

        if (!createdUser.Succeeded)
        {
            return new ServiceResponse<UserTokenResponse>
            {
                IsError = true,
                ErrorMessage = createdUser.Errors.First().Description,
                ErrorStatusCode = ErrorStatusCodes.BadRequest
            };
        }

        return new ServiceResponse<UserTokenResponse>
        {
            Value = new UserTokenResponse
            {
                Token = CreateToken(user)
            }
        };
    }

    public async Task<ServiceResponse<UserTokenResponse>> Login(UserLoginRequest loginRequest)
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == loginRequest.UserName);

        if (user == null)
        {
            return new ServiceResponse<UserTokenResponse>
            {
                IsError = true,
                ErrorMessage = "Invalid username or password!",
                ErrorStatusCode = ErrorStatusCodes.NotFound
            };
        }

        var result = await _signInManager.CheckPasswordSignInAsync(user, loginRequest.Password, false);

        if (!result.Succeeded)
        {
            return new ServiceResponse<UserTokenResponse>
            {
                IsError = true,
                ErrorMessage = "Invalid username or password!",
                ErrorStatusCode = ErrorStatusCodes.NotFound
            };
        }

        return new ServiceResponse<UserTokenResponse>
        {
            Value = new UserTokenResponse
            {
                Token = CreateToken(user)
            }
        };
    }

    public async Task<ServiceResponse<User>> GetUserByNameAsync(string? username)
    {
        var user = await _userManager.FindByNameAsync(username);

        if (user == null)
        {
            return new ServiceResponse<User>
            {
                IsError = true,
                ErrorMessage = "Unauthorized",
                ErrorStatusCode = ErrorStatusCodes.Unauthorized
            };
        }

        return new ServiceResponse<User>
        {
            Value = user
        };
    }

    public async Task<ServiceResponse> SaveUser(User user, UserProfileRequest profileRequest)
    {
        var result = await _userManager.SetTwoFactorEnabledAsync(user, profileRequest.TwoFactorEnabled);

        if (!result.Succeeded)
        {
            return new ServiceResponse
            {
                IsError = true,
                ErrorMessage = "Couldn't update user!",
                ErrorStatusCode = ErrorStatusCodes.BadRequest
            };
        }

        return new ServiceResponse();
    }

    private string CreateToken(User user)
    {
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Email, user.Email),
            new(JwtRegisteredClaimNames.GivenName, user.UserName),
        };

        var credentials = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:SigningKey"])),
            SecurityAlgorithms.HmacSha512);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(7),
            SigningCredentials = credentials,
            Issuer = _configuration["JWT:Issuer"],
            Audience = _configuration["JWT:Audience"]
        };

        var tokenHandler = new JwtSecurityTokenHandler();

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}