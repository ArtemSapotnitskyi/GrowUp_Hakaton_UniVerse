# UniVerse Backend API

Backend service for **UniVerse** — a gamified mobile platform for university students combining smart schedules, campus navigation, AI assistance, mentorship, events, and an in-app coin economy.

---

## Tech Stack

| Component         | Technology                     |
| ----------------- | ------------------------------ |
| Framework         | .NET 10 (ASP.NET Core Web API) |
| Database          | PostgreSQL 16                  |
| ORM               | Entity Framework Core 10       |
| DbContext         | EF Core DbContext Pooling      |
| Authentication    | USOS-style Login + JWT         |
| Access Token      | 15 minutes                     |
| Refresh Token     | Sliding 30 days                |
| Validation        | FluentValidation               |
| API Documentation | Swagger (OpenAPI)              |
| API Testing       | `.http` client file            |
| Containerization  | Docker & Docker Compose        |

---

## Project Structure

```text
Universe-back/
├── Universe.Api/
│   ├── Controllers/
│   │   ├── BaseApiController.cs
│   │   └── AuthController.cs
│   │
│   ├── Data/
│   │   ├── Partials/
│   │   ├── UniverseDbContext.cs
│   │   └── DbSeeder.cs
│   │
│   ├── DTOs/
│   │   └── Auth/
│   │       ├── AuthResponse.cs
│   │       ├── LoginRequest.cs
│   │       ├── RefreshTokenRequest.cs
│   │       └── UserProfileResponse.cs
│   │
│   ├── Models/
│   │   ├── Common/
│   │   │   ├── BaseEntity.cs
│   │   │   └── UserRole.cs
│   │   ├── Economy/
│   │   │   └── CoinTransaction.cs
│   │   ├── Universities/
│   │   │   └── University.cs
│   │   └── Users/
│   │       ├── RefreshToken.cs
│   │       └── User.cs
│   │
│   ├── Services/
│   │   ├── Interfaces/
│   │   │   ├── IAuthService.cs
│   │   │   ├── ICoinService.cs
│   │   │   └── IJwtService.cs
│   │   ├── AuthService.cs
│   │   ├── CoinService.cs
│   │   └── JwtService.cs
│   │
│   ├── Validators/
│   │   └── Auth/
│   │       ├── LoginRequestValidator.cs
│   │       └── RefreshTokenRequestValidator.cs
│   │
│   ├── Properties/
│   │   └── launchSettings.json
│   │
│   ├── appsettings.json
│   ├── Program.cs
│   ├── Universe.Api.csproj
│   └── Universe.Api.http
│
├── .dockerignore
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
└── Universe.slnx
```

## Layer Overview

| Folder         | Responsibility                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------ |
| `Controllers/` | HTTP routes only. Controllers inherit from `BaseApiController` to access `CurrentUserId`.        |
| `Data/`        | `UniverseDbContext` (partial), database migrations, and initial data seeding through `DbSeeder`. |
| `DTOs/`        | Request and response records grouped by feature (`Auth/`, `Schedule/`, etc.).                    |
| `Models/`      | Database entities grouped by domain. All tables inherit from `BaseEntity`.                       |
| `Services/`    | Business logic and shared services (`ICoinService`, `IAuthService`, `IJwtService`).              |
| `Validators/`  | FluentValidation rules automatically triggered before controller actions.                        |

---

# Quick Start

## Option 1: Docker Compose (Recommended)

The recommended way to start the backend for frontend development and quick testing.

Docker Compose runs:

- PostgreSQL database.
- ASP.NET Core API.
- Automatic database migrations.
- Initial test data seeding.

### Start the application

```bash
docker compose up --build
```

### Available services

| Service    | Address                       |
| ---------- | ----------------------------- |
| Swagger UI | http://localhost:5032/swagger |
| PostgreSQL | localhost:5433                |

### Stop containers

Stop containers while keeping database data:

```bash
docker compose down
```

Stop containers and completely reset database data:

```bash
docker compose down -v
```

---

## Option 2: Local Development (.NET 10 SDK)

### Prerequisites

Make sure you have installed:

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (optional, for PostgreSQL)
- PostgreSQL 16 (if not using Docker)
- OpenSSL (for JWT secret generation)

### 1. Configure environment variables

Create a `.env` file in the repository root by copying the example:

```bash
cp .env.example .env
```

### 2. Generate a secure JWT secret

Generate a cryptographically secure JWT secret:

```bash
openssl rand -base64 48
```

Copy the generated value into `Jwt__Key` in your `.env` file.

### 3. Start PostgreSQL

You can use either a local PostgreSQL instance on port `5432` or Docker on port `5433`.

To start only the database using Docker Compose:

```bash
docker compose up -d db
```

### 4. Run the API

Navigate to the API project directory:

```bash
cd Universe.Api
```

Start the application:

```bash
dotnet run
```

Database migrations and seeding are applied automatically on startup.

### 5. Test on a mobile device

To test the API from a mobile device connected to the same local Wi-Fi network, use the `lan` launch profile:

```bash
dotnet run --launch-profile lan
```

Make sure your firewall allows incoming connections to the API port.

---

# Seeded USOS Test Accounts

Registration is disabled because authentication mirrors university USOS credentials.

All seeded accounts use the following default password:

```text
usos123
```

## Test Accounts

| Role    | USOS Login       | Email                       | Purpose                             |
| ------- | ---------------- | --------------------------- | ----------------------------------- |
| Student | `as304512`       | `as304512@student.polsl.pl` | Default student profile (233 coins) |
| Teacher | `jkowalski`      | `jan.kowalski@polsl.pl`     | QR Check-in generation              |
| Admin   | `admin`          | `admin@universe.app`        | Quests, events, and shop management |
| Partner | `coffee_partner` | `hello@campuscafe.pl`       | Partner rewards and offers          |

## Default University

| Property      | Value                                  |
| ------------- | -------------------------------------- |
| University    | Politechnika Śląska (PolSl)            |
| University ID | `11111111-1111-1111-1111-111111111111` |

> **Note:** These credentials are intended for development and testing only. Never use default test credentials in production.

---

# Core Authentication Endpoints

Base route:

```text
/api/auth
```

| Method | Endpoint            | Authorization | Description                                                                      |
| ------ | ------------------- | ------------- | -------------------------------------------------------------------------------- |
| `POST` | `/api/auth/login`   | Public        | Login using USOS login or email and password. Returns access and refresh tokens. |
| `POST` | `/api/auth/refresh` | Public        | Rotates the refresh token (sliding 30-day window) and returns a new token pair.  |
| `POST` | `/api/auth/logout`  | Public        | Revokes the provided refresh token.                                              |
| `GET`  | `/api/auth/me`      | Bearer        | Returns the current authenticated user's profile and coin balance.               |

## Authentication Flow

1. The user submits their USOS login or email and password.
2. The API validates credentials.
3. The API returns a JWT access token and a refresh token.
4. The client uses the access token to authorize protected API requests.
5. When the access token expires, the client sends the refresh token to `/api/auth/refresh`.
6. The API rotates the refresh token and returns a new token pair.
7. The client can revoke its refresh token using `/api/auth/logout`.

### Token Configuration

| Token         | Lifetime   | Purpose                               |
| ------------- | ---------- | ------------------------------------- |
| Access Token  | 15 minutes | Authorizes API requests               |
| Refresh Token | 30 days    | Obtains new access and refresh tokens |

---

# Team Development Guidelines

To allow team members to develop features in parallel without breaking the `main` branch, follow these rules.

## 1. Keep Feature Files in Dedicated Subfolders

Each feature must have its own dedicated folders and files.

Recommended structure:

```text
Models/
└── Schedule/
    └── Lesson.cs

DTOs/
└── Schedule/
    ├── CreateLessonRequest.cs
    └── LessonResponse.cs

Validators/
└── Schedule/
    └── CreateLessonRequestValidator.cs

Services/
├── Interfaces/
│   └── IScheduleService.cs
└── ScheduleService.cs

Controllers/
└── ScheduleController.cs
```

Organize files by feature rather than placing everything in shared root folders.

## 2. Database Changes — Use Partial DbContext Files

**Do not modify `UniverseDbContext.cs` directly when adding new feature tables.**

Instead, create a separate partial class inside `Data/Partials/`.

Example:

File: `Data/Partials/UniverseDbContext.Schedule.cs`

```csharp
using Microsoft.EntityFrameworkCore;
using Universe.Api.Models.Schedule;

namespace Universe.Api.Data;

public partial class UniverseDbContext
{
    public DbSet<Lesson> Lessons => Set<Lesson>();
}
```

This approach minimizes Git merge conflicts when multiple developers work on different features.

## 3. Coin Economy — Always Use ICoinService

**Never modify `User.CoinsBalance` directly.**

Always inject `ICoinService` and use its methods:

```csharp
AddCoinsAsync(...)
SpendCoinsAsync(...)
```

Example:

```csharp
public class SomeService
{
    private readonly ICoinService _coinService;

    public SomeService(ICoinService coinService)
    {
        _coinService = coinService;
    }

    // Use _coinService.AddCoinsAsync(...)
    // or _coinService.SpendCoinsAsync(...)
}
```

This ensures that coin transactions and leaderboard totals remain consistent.

## 4. Protect Endpoints Using Authorization Roles

Use the `[Authorize]` attribute to protect endpoints.

### Any authenticated user

```csharp
[Authorize]
[HttpGet]
public IActionResult GetProfile()
{
    // ...
}
```

### Specific roles

```csharp
[Authorize(Roles = "Teacher,Admin")]
[HttpPost]
public IActionResult CreateSomething()
{
    // ...
}
```

Available roles:

- `Student`
- `Teacher`
- `Admin`
- `Partner`

### Authorization Guidelines

| Attribute                              | Access                      |
| -------------------------------------- | --------------------------- |
| `[Authorize]`                          | Any authenticated user      |
| `[Authorize(Roles = "Teacher")]`       | Teachers only               |
| `[Authorize(Roles = "Admin")]`         | Administrators only         |
| `[Authorize(Roles = "Teacher,Admin")]` | Teachers and administrators |

## 5. EF Core Migrations — Avoid Conflicts

Before creating a new migration, always pull the latest changes from `main`.

```bash
git checkout main
git pull origin main
```

Then switch back to your feature branch and create the migration:

```bash
dotnet ef migrations add MigrationName
```

**Important:** Always pull the latest `main` before running `dotnet ef migrations add` to avoid conflicts in:

```text
UniverseDbContextModelSnapshot.cs
```

If multiple developers are creating migrations simultaneously, coordinate migration creation and database model changes with the team.

---

# Development Workflow

Recommended workflow for every new feature:

1. Pull the latest changes from `main`.
2. Create a dedicated feature branch.
3. Add database entities inside `Models/<Feature>/`.
4. Add DbSet declarations inside `Data/Partials/`.
5. Create request and response DTOs inside `DTOs/<Feature>/`.
6. Implement FluentValidation rules inside `Validators/<Feature>/`.
7. Implement the feature service and its interface.
8. Add the feature controller.
9. Add an EF Core migration if database changes are required.
10. Test endpoints using Swagger or the `.http` client file.
11. Commit and push your changes.
12. Open a Pull Request targeting `main`.

---

# API Documentation & Testing

Swagger UI is available at:

```text
http://localhost:5032/swagger
```

Use Swagger to:

- Explore available API endpoints.
- Inspect request and response schemas.
- Test authentication and protected endpoints.
- Verify API responses.

The project also includes:

```text
Universe.Api/Universe.Api.http
```

Use this file to organize and execute HTTP requests directly from a compatible IDE, such as JetBrains Rider or Visual Studio Code with the REST Client extension.

---

# Important Development Rules

Before submitting a Pull Request, make sure that:

- [ ] Feature files are organized into dedicated subfolders.
- [ ] New DbSet declarations are added through `Data/Partials/`.
- [ ] `UniverseDbContext.cs` has not been unnecessarily modified.
- [ ] Coin balances are managed exclusively through `ICoinService`.
- [ ] Protected endpoints use the correct authorization attributes.
- [ ] FluentValidation rules are implemented for incoming requests.
- [ ] Database migrations are up to date.
- [ ] The latest `main` changes have been integrated.
- [ ] Swagger and HTTP endpoint tests have been performed.
- [ ] No secrets or production credentials are committed to Git.

---

# Useful Commands

| Command                                  | Description                                 |
| ---------------------------------------- | ------------------------------------------- |
| `docker compose up --build`              | Build and start all services                |
| `docker compose up -d db`                | Start PostgreSQL only                       |
| `docker compose down`                    | Stop containers                             |
| `docker compose down -v`                 | Stop containers and remove database volumes |
| `dotnet run`                             | Run the API                                 |
| `dotnet run --launch-profile lan`        | Run the API for local Wi-Fi testing         |
| `dotnet build`                           | Build the solution                          |
| `dotnet ef migrations add MigrationName` | Create a database migration                 |
| `git pull origin main`                   | Pull the latest main branch                 |

---

**UniVerse Backend API** — Powering the UniVerse student experience.
