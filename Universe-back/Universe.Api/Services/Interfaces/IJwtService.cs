using Universe.Api.Models.Users;

namespace Universe.Api.Services.Interfaces;

public interface IJwtService
{
    string GenerateToken(User user);
}