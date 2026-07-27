# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["backend/WeddingInvite.API/WeddingInvite.API.csproj", "backend/WeddingInvite.API/"]
RUN dotnet restore "backend/WeddingInvite.API/WeddingInvite.API.csproj"
COPY backend/ ./backend/
WORKDIR "/src/backend/WeddingInvite.API"
RUN dotnet build "WeddingInvite.API.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "WeddingInvite.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000
ENV ASPNETCORE_ENVIRONMENT=Production

COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "WeddingInvite.API.dll"]
