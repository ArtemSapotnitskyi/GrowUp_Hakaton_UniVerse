using Universe.Api.Models.Common;
using Universe.Api.Models.Users;

namespace Universe.Api.Models.Economy;

public class CoinTransaction : BaseEntity
{
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;

    public int Amount { get; set; } // +50 (check-in) або -100 (shop)
    public string Reason { get; set; } = string.Empty; // History
    public string SourceModule { get; set; } = string.Empty; // "CheckIn", "Quest", "Shop", "Mentorship"
}