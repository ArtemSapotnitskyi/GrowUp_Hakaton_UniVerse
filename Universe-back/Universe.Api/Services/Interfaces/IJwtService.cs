using Universe.Api.Models.Users;

namespace Universe.Api.Services.Interfaces;

public interface IJwtService
{
    (string Token, DateTime ExpiresAt) GenerateAccessToken(User user);
    string GenerateRefreshToken();
    string HashToken(string token);
    int RefreshTokenDays { get; }
}