using Domain.Entities;
using Services.DTOs;

namespace Services.Interfaces;

public interface IUserService
{
    public Task<ServiceResponse<UserTokenResponse>> Register(UserRegisterRequest userRegisterRequest);

    public Task<ServiceResponse<UserTokenResponse>> Login(UserLoginRequest loginRequest);

    public Task<ServiceResponse<User>> GetUserByNameAsync(string? username);

    public Task<ServiceResponse> SaveUser(User user, UserProfileRequest profileRequest);
}