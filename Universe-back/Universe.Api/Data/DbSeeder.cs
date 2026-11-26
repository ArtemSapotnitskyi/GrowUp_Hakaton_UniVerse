using Microsoft.EntityFrameworkCore;
using Universe.Api.Models.Common;
using Universe.Api.Models.Universities;
using Universe.Api.Models.Users;

namespace Universe.Api.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(UniverseDbContext db)
    {
        if (!await db.Universities.AnyAsync())
        {
            var universities = new List<University>
            {
                new()
                {
                    Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                    Name = "Silesian University of Technology",
                    ShortName = "PolSl",
                    Cities = "Katowice, Gliwice",
                    Country = "Poland",
                    AuthSystemName = "USOS",
                    EmailDomain = "student.polsl.pl"
                },
                new()
                {
                    Id = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                    Name = "University of Warsaw",
                    ShortName = "UW",
                    Cities = "Warsaw",
                    Country = "Poland",
                    AuthSystemName = "USOS",
                    EmailDomain = "student.uw.edu.pl"
                },
                new()
                {
                    Id = Guid.Parse("33333333-3333-3333-3333-333333333333"),
                    Name = "University of Wrocław",
                    ShortName = "UWr",
                    Cities = "Wrocław",
                    Country = "Poland",
                    AuthSystemName = "USOS",
                    EmailDomain = "uwr.edu.pl"
                },
                new()
                {
                    Id = Guid.Parse("44444444-4444-4444-4444-444444444444"),
                    Name = "University of Lodz",
                    ShortName = "UŁ",
                    Cities = "Łódź, Tomaszów Mazowiecki",
                    Country = "Poland",
                    AuthSystemName = "USOS",
                    EmailDomain = "edu.uni.lodz.pl"
                },
                new()
                {
                    Id = Guid.Parse("55555555-5555-5555-5555-555555555555"),
                    Name = "Jagiellonian University",
                    ShortName = "UJ",
                    Cities = "Kraków",
                    Country = "Poland",
                    AuthSystemName = "USOS",
                    EmailDomain = "student.uj.edu.pl"
                }
            };

            db.Universities.AddRange(universities);
            await db.SaveChangesAsync();
        }

        if (!await db.Users.AnyAsync())
        {
            var polslId = Guid.Parse("11111111-1111-1111-1111-111111111111");
            var defaultHash = BCrypt.Net.BCrypt.HashPassword("usos123");

            var users = new List<User>
            {
                new()
                {
                    Login = "as304512",
                    Email = "as304512@student.polsl.pl",
                    PasswordHash = defaultHash,
                    FullName = "Artem Sapotnitskyi",
                    Nickname = "artem_dev",
                    Role = UserRole.Student,
                    UniversityId = polslId,
                    Faculty = "Automatic Control, Electronics and Computer Science",
                    GroupCode = "INF-2026-A",
                    StudyYear = 2,
                    CoinsBalance = 233,
                    TotalCoinsEarned = 233,
                    IsLeaderboardJoined = false
                },
                new()
                {
                    Login = "jkowalski",
                    Email = "jan.kowalski@polsl.pl",
                    PasswordHash = defaultHash,
                    FullName = "dr Jan Kowalski",
                    Nickname = "prof_kowalski",
                    Role = UserRole.Teacher,
                    UniversityId = polslId,
                    Faculty = "Automatic Control, Electronics and Computer Science"
                },
                new()
                {
                    Login = "admin",
                    Email = "admin@universe.app",
                    PasswordHash = defaultHash,
                    FullName = "UniVerse Admin",
                    Nickname = "universe_admin",
                    Role = UserRole.Admin,
                    UniversityId = polslId
                },
                new()
                {
                    Login = "coffee_partner",
                    Email = "hello@campuscafe.pl",
                    PasswordHash = defaultHash,
                    FullName = "Campus Coffee Bar",
                    Nickname = "campus_coffee",
                    Role = UserRole.Partner,
                    UniversityId = polslId
                }
            };

            db.Users.AddRange(users);
            await db.SaveChangesAsync();
        }
    }
}