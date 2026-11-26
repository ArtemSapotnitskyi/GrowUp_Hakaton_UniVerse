using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Universe.Api.DTOs.Auth;
using Universe.Api.Services.Interfaces;

namespace Universe.Api.Controllers;

[Route("api/auth")]
public class AuthController : BaseApiController
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login(LoginRequest request)
    {
        var (success, data, error) = await _authService.LoginAsync(request);
        if (!success) return Unauthorized(new { message = error });

        return Ok(data);
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<UserProfileResponse>> GetMe()
    {
        var profile = await _authService.GetProfileAsync(CurrentUserId);
        return profile is null ? NotFound() : Ok(profile);
    }
}