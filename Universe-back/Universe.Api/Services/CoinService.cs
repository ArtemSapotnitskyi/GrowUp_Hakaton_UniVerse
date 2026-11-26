using Microsoft.EntityFrameworkCore;
using Universe.Api.Data;
using Universe.Api.Models.Economy;
using Universe.Api.Services.Interfaces;

namespace Universe.Api.Services;

public class CoinService : ICoinService
{
    private readonly UniverseDbContext _db;

    public CoinService(UniverseDbContext db)
    {
        _db = db;
    }

    public async Task<int> AddCoinsAsync(Guid userId, int amount, string reason, string sourceModule)
    {
        if (amount <= 0)
            throw new ArgumentException("Amount must be greater than 0.", nameof(amount));

        var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == userId)
            ?? throw new KeyNotFoundException("User not found.");

        user.CoinsBalance += amount;
        user.TotalCoinsEarned += amount;

        _db.CoinTransactions.Add(new CoinTransaction
        {
            UserId = userId,
            Amount = amount,
            Reason = reason,
            SourceModule = sourceModule
        });

        await _db.SaveChangesAsync();
        return user.CoinsBalance;
    }

    public async Task<(bool Success, int NewBalance, string? Error)> SpendCoinsAsync(
        Guid userId,
        int amount,
        string reason,
        string sourceModule)
    {
        if (amount <= 0)
            return (false, 0, "Amount must be greater than 0.");

        var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == userId);
        if (user is null)
            return (false, 0, "User not found.");

        if (user.CoinsBalance < amount)
            return (false, user.CoinsBalance, "Insufficient coins balance.");

        user.CoinsBalance -= amount;

        _db.CoinTransactions.Add(new CoinTransaction
        {
            UserId = userId,
            Amount = -amount,
            Reason = reason,
            SourceModule = sourceModule
        });

        await _db.SaveChangesAsync();
        return (true, user.CoinsBalance, null);
    }
}