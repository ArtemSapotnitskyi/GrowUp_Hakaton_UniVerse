namespace Universe.Api.DTOs.Auth;

public record UserProfileResponse(
    Guid Id,
    string Email,
    string FullName,
    string Nickname,
    string Role,
    Guid? UniversityId,
    string? Faculty,
    string? GroupCode,
    int? StudyYear,
    int CoinsBalance,
    int TotalCoinsEarned
);