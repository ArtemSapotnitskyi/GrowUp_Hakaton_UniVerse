namespace Universe.Api.Services.Interfaces;

public interface ICoinService
{
    Task<int> AddCoinsAsync(Guid userId, int amount, string reason, string sourceModule);
    Task<(bool Success, int NewBalance, string? Error)> SpendCoinsAsync(Guid userId, int amount, string reason, string sourceModule);
}