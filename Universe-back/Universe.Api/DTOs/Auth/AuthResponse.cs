namespace Universe.Api.DTOs.Auth;

public record AuthResponse(
    string Token,
    UserProfileResponse User
);