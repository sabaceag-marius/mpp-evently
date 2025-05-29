using Domain.Entities;
using Services.DTOs;

namespace Services.Interfaces;

public interface IUserService
{
    public Task<ServiceResponse<UserAuthResponse>> Register(UserRegisterRequest userRegisterRequest);

    public Task<ServiceResponse<UserAuthResponse>> Login(UserLoginRequest loginRequest);
    public Task<ServiceResponse<UserAuthResponse>> LoginTwoFactorAuth(UserLogin2FARequest loginRequest);

    public Task<ServiceResponse<User>> GetUserByNameAsync(string? username);

    public Task<ServiceResponse> SaveUser(User user, UserProfileRequest profileRequest);
}