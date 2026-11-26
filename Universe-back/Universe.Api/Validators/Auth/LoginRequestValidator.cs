using FluentValidation;
using Universe.Api.DTOs.Auth;

namespace Universe.Api.Validators.Auth;

public class LoginRequestValidator : AbstractValidator<LoginRequest>
{
    public LoginRequestValidator()
    {
        RuleFor(x => x.Login)
            .NotEmpty().WithMessage("Enter your USOS login or email.");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Enter your password.");
    }
}