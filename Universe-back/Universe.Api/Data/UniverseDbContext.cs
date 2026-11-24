using Microsoft.EntityFrameworkCore;
using Universe.Api.Models.Universities;
using Universe.Api.Models.Users;
using Universe.Api.Models.Economy;
using Universe.Api.Models.Common;

namespace Universe.Api.Data;

public partial class UniverseDbContext : DbContext
{
    public UniverseDbContext(DbContextOptions<UniverseDbContext> options) : base(options) { }

    public DbSet<University> Universities => Set<University>();
    public DbSet<User> Users => Set<User>();
    public DbSet<CoinTransaction> CoinTransactions => Set<CoinTransaction>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(UniverseDbContext).Assembly);

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasIndex(u => u.Email).IsUnique();
            entity.HasIndex(u => u.Login).IsUnique();
            entity.Property(u => u.Role).HasConversion<string>();
        });
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        foreach (var entry in ChangeTracker.Entries<BaseEntity>())
        {
            if (entry.State == EntityState.Modified)
            {
                entry.Entity.UpdatedAt = DateTime.UtcNow;
            }
        }

        return base.SaveChangesAsync(cancellationToken);
    }
}