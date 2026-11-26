using Microsoft.EntityFrameworkCore;
using Universe.Api.Data;
using Universe.Api.DTOs.Auth;
using Universe.Api.Models.Users;
using Universe.Api.Services.Interfaces;

namespace Universe.Api.Services;

public class AuthService : IAuthService
{
    private readonly UniverseDbContext _db;
    private readonly IJwtService _jwtService;

    public AuthService(UniverseDbContext db, IJwtService jwtService)
    {
        _db = db;
        _jwtService = jwtService;
    }

    public async Task<(bool Success, AuthResponse? Data, string? Error)> LoginAsync(LoginRequest request)
    {
        var identifier = request.Login.Trim().ToLowerInvariant();

        var user = await _db.Users.FirstOrDefaultAsync(u =>
            u.Login == identifier || u.Email == identifier);

        if (user is null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            return (false, null, "Invalid USOS login or password.");

        if (request.UniversityId.HasValue && user.UniversityId.HasValue && user.UniversityId != request.UniversityId)
            return (false, null, "This account belongs to a different university.");

        var authResponse = await IssueTokensAsync(user);
        return (true, authResponse, null);
    }

    public async Task<(bool Success, AuthResponse? Data, string? Error)> RefreshAsync(string refreshToken)
    {
        var tokenHash = _jwtService.HashToken(refreshToken);

        var storedToken = await _db.RefreshTokens
            .Include(rt => rt.User)
            .FirstOrDefaultAsync(rt => rt.TokenHash == tokenHash);

        if (storedToken is null || !storedToken.IsActive)
            return (false, null, "Invalid or expired refresh token.");

        // Revoke old refresh token (rotation)
        storedToken.RevokedAt = DateTime.UtcNow;

        // Issue new access token + new 30-day refresh token (sliding)
        var authResponse = await IssueTokensAsync(storedToken.User);
        return (true, authResponse, null);
    }

    public async Task LogoutAsync(string refreshToken)
    {
        var tokenHash = _jwtService.HashToken(refreshToken);

        var storedToken = await _db.RefreshTokens
            .FirstOrDefaultAsync(rt => rt.TokenHash == tokenHash);

        if (storedToken is not null && storedToken.RevokedAt is null)
        {
            storedToken.RevokedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
        }
    }

    public async Task<UserProfileResponse?> GetProfileAsync(Guid userId)
    {
        var user = await _db.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == userId);
        return user is null ? null : MapToProfile(user);
    }

    private async Task<AuthResponse> IssueTokensAsync(User user)
    {
        var (accessToken, expiresAt) = _jwtService.GenerateAccessToken(user);
        var rawRefreshToken = _jwtService.GenerateRefreshToken();

        _db.RefreshTokens.Add(new RefreshToken
        {
            UserId = user.Id,
            TokenHash = _jwtService.HashToken(rawRefreshToken),
            ExpiresAt = DateTime.UtcNow.AddDays(_jwtService.RefreshTokenDays)
        });

        await _db.SaveChangesAsync();

        return new AuthResponse(accessToken, rawRefreshToken, expiresAt, MapToProfile(user));
    }

    private static UserProfileResponse MapToProfile(User u) => new(
        u.Id,
        u.Login,
        u.Email,
        u.FullName,
        u.Nickname,
        u.AvatarUrl,
        u.Role.ToString(),
        u.UniversityId,
        u.Faculty,
        u.GroupCode,
        u.StudyYear,
        u.CoinsBalance,
        u.TotalCoinsEarned,
        u.IsLeaderboardJoined
    );
}