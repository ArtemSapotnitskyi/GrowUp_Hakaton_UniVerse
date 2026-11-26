namespace Universe.Api.DTOs.Auth;

public record UserProfileResponse(
    Guid Id,
    string Login,
    string Email,
    string FullName,
    string Nickname,
    string? AvatarUrl,
    string Role,
    Guid? UniversityId,
    string? Faculty,
    string? GroupCode,
    int? StudyYear,
    int CoinsBalance,
    int TotalCoinsEarned,
    bool IsLeaderboardJoined
);