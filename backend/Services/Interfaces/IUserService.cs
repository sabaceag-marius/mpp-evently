using Domain.Entities;
using Services.DTOs;

namespace Services.Interfaces;

public interface IUserService
{
    public Task<ServiceResponse<UserResponse>> Register(UserRegisterRequest userRegisterRequest);

    public Task<ServiceResponse<UserResponse>> Login(UserLoginRequest loginRequest);

    public Task<ServiceResponse<User>> GetUserByNameAsync(string? username);
}