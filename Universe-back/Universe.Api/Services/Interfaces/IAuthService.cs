using Universe.Api.DTOs.Auth;

namespace Universe.Api.Services.Interfaces;

public interface IAuthService
{
    Task<(bool Success, AuthResponse? Data, string? Error)> LoginAsync(LoginRequest request);
    Task<(bool Success, AuthResponse? Data, string? Error)> RefreshAsync(string refreshToken);
    Task LogoutAsync(string refreshToken);
    Task<UserProfileResponse?> GetProfileAsync(Guid userId);
}