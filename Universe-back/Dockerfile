# Build stage
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY Universe.Api/Universe.Api.csproj Universe.Api/
RUN dotnet restore Universe.Api/Universe.Api.csproj

COPY Universe.Api/ Universe.Api/
WORKDIR /src/Universe.Api
RUN dotnet publish -c Release -o /app/publish --no-restore

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 8080
ENTRYPOINT ["dotnet", "Universe.Api.dll"]