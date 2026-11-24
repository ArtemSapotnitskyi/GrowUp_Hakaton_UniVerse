using Universe.Api.Models.Common;
using Universe.Api.Models.Users;

namespace Universe.Api.Models.Universities;

public class University : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string ShortName { get; set; } = string.Empty;
    public string Cities { get; set; } = string.Empty;
    public string Country { get; set; } = "Poland";
    public string? LogoUrl { get; set; }
    public string AuthSystemName { get; set; } = "USOS";
    public string? EmailDomain { get; set; }
    public ICollection<User> Users { get; set; } = new List<User>();
}