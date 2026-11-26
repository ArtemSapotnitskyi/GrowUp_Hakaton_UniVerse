using Universe.Api.Models.Common;
using Universe.Api.Models.Universities;
using Universe.Api.Models.Economy;

namespace Universe.Api.Models.Users;

public class User : BaseEntity
{
    public string Login { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;

    public string FullName { get; set; } = string.Empty;
    public string Nickname { get; set; } = string.Empty;
    public string? AvatarUrl { get; set; }
    public UserRole Role { get; set; } = UserRole.Student;

    public Guid? UniversityId { get; set; }
    public University? University { get; set; }
    public string? Faculty { get; set; }
    public string? GroupCode { get; set; }
    public int? StudyYear { get; set; }

    public int CoinsBalance { get; set; } = 0;
    public int TotalCoinsEarned { get; set; } = 0;
    public bool IsLeaderboardJoined { get; set; } = false;

    public ICollection<CoinTransaction> Transactions { get; set; } = new List<CoinTransaction>();
    public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
}