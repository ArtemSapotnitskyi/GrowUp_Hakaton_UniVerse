using Universe.Api.DTOs.Auth;

namespace Universe.Api.Services.Interfaces;

public interface IAuthService
{
    Task<(bool Success, AuthResponse? Data, string? Error)> LoginAsync(LoginRequest request);
    Task<UserProfileResponse?> GetProfileAsync(Guid userId);
}