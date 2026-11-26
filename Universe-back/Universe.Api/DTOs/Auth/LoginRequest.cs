namespace Universe.Api.DTOs.Auth;

public record LoginRequest(
    string Login,
    string Password,
    Guid? UniversityId = null
);