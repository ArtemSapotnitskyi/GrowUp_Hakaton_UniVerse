using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Universe.Api.Models.Users;
using Universe.Api.Services.Interfaces;

namespace Universe.Api.Services;

public class JwtService : IJwtService
{
    private readonly IConfiguration _config;

    public int RefreshTokenDays =>
        int.TryParse(_config["Jwt:RefreshTokenDays"], out var days) ? days : 30;

    private int AccessTokenMinutes =>
        int.TryParse(_config["Jwt:AccessTokenMinutes"], out var minutes) ? minutes : 15;

    public JwtService(IConfiguration config)
    {
        _config = config;
    }

    public (string Token, DateTime ExpiresAt) GenerateAccessToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
        var expiresAt = DateTime.UtcNow.AddMinutes(AccessTokenMinutes);

        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Email, user.Email),
            new(ClaimTypes.Role, user.Role.ToString()),
            new("login", user.Login),
            new("nickname", user.Nickname)
        };

        if (user.UniversityId.HasValue)
        {
            claims.Add(new Claim("universityId", user.UniversityId.Value.ToString()));
        }

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: expiresAt,
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
        );

        return (new JwtSecurityTokenHandler().WriteToken(token), expiresAt);
    }

    public string GenerateRefreshToken()
    {
        var randomBytes = RandomNumberGenerator.GetBytes(64);
        return Convert.ToBase64String(randomBytes);
    }

    public string HashToken(string token)
    {
        var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(token));
        return Convert.ToHexString(bytes);
    }
}