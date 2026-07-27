FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000
ENV ASPNETCORE_ENVIRONMENT=Production

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["WeddingInvite.API/WeddingInvite.API.csproj", "WeddingInvite.API/"]
RUN dotnet restore "WeddingInvite.API/WeddingInvite.API.csproj"
COPY . .
WORKDIR "/src/WeddingInvite.API"
RUN dotnet build "WeddingInvite.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WeddingInvite.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "WeddingInvite.API.dll"]
