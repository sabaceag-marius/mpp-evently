using Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace Services.DTOs;

public class UserLoginRequest
{
    public required string UserName { get; set; }

    public required string Password { get; set; }
}

public class UserRegisterRequest
{
    public required string UserName { get; set; }

    [EmailAddress]
    public required string Email { get; set; }

    public required string Password { get; set; }

    public required string ConfirmPassword { get; set; }
}

public class UserTokenResponse
{
    public required string Token { get; set; }
}

public class UserProfileResponse
{
    public required string UserName { get; set; }

    [EmailAddress]
    public required string Email { get; set; }

    public bool TwoFactorEnabled { get; set; }
}

public class UserProfileRequest
{
    public required string UserName { get; set; }

    [EmailAddress]
    public required string Email { get; set; }

    public bool TwoFactorEnabled { get; set; }
}

public static class UserExtensions
{
    public static User ToUser(this UserRegisterRequest request)
    {
        return new User
        {
            UserName = request.UserName,
            Email = request.Email
        };
    }

    public static User ToUser(this User user, UserProfileRequest request)
    {
        user.TwoFactorEnabled = request.TwoFactorEnabled;

        return user;
    }

    public static UserProfileResponse  ToProfileResponse(this User user)
    {
        return new UserProfileResponse
        {
            UserName = user.UserName,
            Email = user.Email,
            TwoFactorEnabled = user.TwoFactorEnabled
        };
    }
}
