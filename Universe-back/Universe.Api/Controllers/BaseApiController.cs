using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace Universe.Api.Controllers;

[ApiController]
public abstract class BaseApiController : ControllerBase
{
    protected Guid CurrentUserId
    {
        get
        {
            var id = User.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? throw new UnauthorizedAccessException("The User ID is missing from the token.");
            return Guid.Parse(id);
        }
    }
}