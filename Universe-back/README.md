Universe.Api/
├── Controllers/
│ ├── BaseApiController.cs # Базовий контролер (дістає UserId з токена)
│ └── AuthController.cs # Тільки роути: register, login, me
├── Data/
│ ├── UniverseDbContext.cs # Головний DbContext (Users, Universities, CoinTransactions)
│ └── Partials/ # Сюди команда додає свої DbSet без конфліктів
├── DTOs/
│ └── Auth/
│ ├── RegisterRequest.cs
│ ├── LoginRequest.cs
│ ├── AuthResponse.cs
│ └── UserProfileResponse.cs
├── Models/
│ ├── Common/
│ │ ├── BaseEntity.cs # Спільні Id, CreatedAt, UpdatedAt для всіх таблиць
│ │ └── UserRole.cs # Ролі: Student, Teacher, Admin, Partner
│ ├── University.cs # Університет
│ ├── User.cs # Користувач + баланс монет
│ └── CoinTransaction.cs # Історія всіх операцій з монетами
├── Services/
│ ├── Interfaces/
│ │ ├── IAuthService.cs
│ │ ├── IJwtService.cs
│ │ └── ICoinService.cs
│ ├── AuthService.cs # Логіка реєстрації, логіну, профілю
│ ├── JwtService.cs # Генерація JWT-токенів
│ └── CoinService.cs # Єдиний сервіс нарахування/списання монет
├── Validators/
│ └── Auth/
│ ├── RegisterRequestValidator.cs
│ └── LoginRequestValidator.cs
├── appsettings.json
├── Program.cs
└── Universe.Api.http # Швидке тестування запитів прямо з IDE
