using System.Diagnostics;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Services.DTOs;

namespace Services.Services;

public class UserService : IUserService
{
    private readonly UserManager<User> _userManager;
    private readonly IConfiguration _configuration;
    private readonly SignInManager<User> _signInManager;
    private readonly IEmailSender _emailSender;

    public UserService(UserManager<User> userManager, 
        IConfiguration configuration, 
        SignInManager<User> signInManager,
        IEmailSender emailSender)
    {
        _userManager = userManager;
        _configuration = configuration;
        _signInManager = signInManager;
        _emailSender = emailSender;
    }

    public async Task<ServiceResponse<UserAuthResponse>> Register(UserRegisterRequest registerRequest)
    {

        var user = registerRequest.ToUser();

        var createdUser = await _userManager.CreateAsync(user, registerRequest.Password);

        if (!createdUser.Succeeded)
        {
            return new ServiceResponse<UserAuthResponse>
            {
                IsError = true,
                ErrorMessage = createdUser.Errors.First().Description,
                ErrorStatusCode = ErrorStatusCodes.BadRequest
            };
        }

        return new ServiceResponse<UserAuthResponse>
        {
            Value = new UserAuthResponse
            {
                Token = CreateToken(user),
                Succeeded = false
            }
        };
    }

    public async Task<ServiceResponse<UserAuthResponse>> Login(UserLoginRequest loginRequest)
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == loginRequest.UserName);

        if (user == null)
        {
            return new ServiceResponse<UserAuthResponse>
            {
                IsError = true,
                ErrorMessage = "Invalid username or password!",
                ErrorStatusCode = ErrorStatusCodes.NotFound
            };
        }

        var result = await _signInManager.CheckPasswordSignInAsync(user, loginRequest.Password, false);

        if (!result.Succeeded)
        {
            return new ServiceResponse<UserAuthResponse>
            {
                IsError = true,
                ErrorMessage = "Invalid username or password!",
                ErrorStatusCode = ErrorStatusCodes.NotFound
            };
        }

        bool hasTwoFactorAuth = await _userManager.GetTwoFactorEnabledAsync(user);

        if (hasTwoFactorAuth)
        {

            var providers = await _userManager.GetValidTwoFactorProvidersAsync(user);

            if (!providers.Contains("Email"))
            {
                return new ServiceResponse<UserAuthResponse>
                {
                    IsError = true,
                    ErrorMessage = "Couldn't generate one time password!",
                    ErrorStatusCode = ErrorStatusCodes.BadRequest
                };
            }

            var token = await _userManager.GenerateTwoFactorTokenAsync(user, "Email");

            await _emailSender.SendEmailAsync(user.Email, "Evently 2FA", token);

            return new ServiceResponse<UserAuthResponse>
            {
                Value = new UserAuthResponse
                {
                    Token = "",
                    Succeeded = false
                }
            };
        }

        return new ServiceResponse<UserAuthResponse>
        {
            Value = new UserAuthResponse
            {
                Token = CreateToken(user),
                Succeeded = true
            }
        };
    }

    public async Task<ServiceResponse<UserAuthResponse>> LoginTwoFactorAuth(UserLogin2FARequest loginRequest)
    {
        var user = await _userManager.FindByEmailAsync(loginRequest.Email);

        if (user == null)
        {
            return new ServiceResponse<UserAuthResponse>
            {
                IsError = true,
                ErrorMessage = "Invalid email or token!",
                ErrorStatusCode = ErrorStatusCodes.NotFound
            };
        }

        var validVerification = await _userManager.VerifyTwoFactorTokenAsync(user, "Email", loginRequest.Token);

        if (!validVerification)
        {
            return new ServiceResponse<UserAuthResponse>
            {
                IsError = true,
                ErrorMessage = "Invalid email or token!",
                ErrorStatusCode = ErrorStatusCodes.NotFound
            };
        }

        return new ServiceResponse<UserAuthResponse>
        {
            Value = new UserAuthResponse
            {
                Token = CreateToken(user),
                Succeeded = true
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