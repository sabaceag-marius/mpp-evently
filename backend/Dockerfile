FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy all projects
COPY . .

# Restore as distinct layers
RUN dotnet restore "Presentation/Presentation.csproj"

# Build
RUN dotnet build "Presentation/Presentation.csproj" -c Release -o /app/build

# Publish
RUN dotnet publish "Presentation/Presentation.csproj" -c Release -o /app/publish

# Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Presentation.dll"]