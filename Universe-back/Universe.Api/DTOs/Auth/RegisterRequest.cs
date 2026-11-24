using Universe.Api.Models.Common;

namespace Universe.Api.DTOs.Auth;

public record RegisterRequest(
    string Login,
    string Email,
    string Password,
    string FullName,
    string Nickname,
    Guid? UniversityId = null,
    string? Faculty = null,
    string? GroupCode = null,
    int? StudyYear = null,
    UserRole Role = UserRole.Student
);