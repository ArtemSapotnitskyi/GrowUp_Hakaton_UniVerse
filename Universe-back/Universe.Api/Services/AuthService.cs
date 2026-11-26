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
            return (false, null, "Invalid USOS username or password.");

        if (request.UniversityId.HasValue && user.UniversityId.HasValue && user.UniversityId != request.UniversityId)
            return (false, null, "This account belongs to a different university.");

        var token = _jwtService.GenerateToken(user);
        return (true, new AuthResponse(token, MapToProfile(user)), null);
    }

    public async Task<UserProfileResponse?> GetProfileAsync(Guid userId)
    {
        var user = await _db.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == userId);
        return user is null ? null : MapToProfile(user);
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