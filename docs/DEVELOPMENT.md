# Development Guide

## Prerequisites

- Node.js 20+
- .NET 8 SDK
- PostgreSQL 14+
- Git

## Frontend Setup

### Installation

```bash
cd frontend
npm install
```

### Configuration

Update `src/environments/environment.ts` with your settings:

```typescript
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:5000',
  enableBackgroundMusic: true,
  enablePetGuides: true,
  enableCoupleStory: false,
  // ... other settings
};
```

### Development Server

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any source files.

### Build

```bash
npm run build
```

Build artifacts will be stored in the `dist/` directory.

## Backend Setup

### Installation

```bash
cd backend
dotnet restore
```

### Database Configuration

Update `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "WeddingDatabase": "Host=localhost;Database=wedding_invite_dev;Username=postgres;Password=password;Port=5432"
  }
}
```

### Database Migrations

Apply migrations:

```bash
dotnet ef database update
```

### Development Server

```bash
dotnet run
```

The API will run on `http://localhost:5000`.

## Running Both Together

From the root directory:

```bash
npm run dev
```

This will start both the frontend and backend in parallel.

## Testing

### Frontend Tests

```bash
cd frontend
npm test
```

### Backend Tests

```bash
cd backend
dotnet test
```

## API Documentation

Swagger documentation is available at: `http://localhost:5000/swagger`

## Database Seeding

To seed sample data, create a seed script in the backend:

```csharp
// In Program.cs
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<WeddingDbContext>();
    dbContext.Database.Migrate();
    
    // Seed data here
    if (!dbContext.Venues.Any())
    {
        dbContext.Venues.Add(new Venue
        {
            VenueName = "Sample Venue",
            Address = "123 Main St",
            GoogleMapsUrl = "https://maps.google.com",
            ParkingDetails = "Free parking available"
        });
        dbContext.SaveChanges();
    }
}
```

## Environment Variables

### Frontend

- `API_BASE_URL` — Backend API URL

### Backend

- `ASPNETCORE_ENVIRONMENT` — Development or Production
- `ConnectionStrings__WeddingDatabase` — PostgreSQL connection string
- `Jwt__SigningKey` — JWT signing key (minimum 32 characters)
- `Cors__AllowedOrigins__0` — CORS allowed origin

## Debugging

### Frontend (VSCode)

Add to `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Angular Debug",
      "url": "http://localhost:4200",
      "webRoot": "${workspaceFolder}/frontend/src",
      "sourceMapPathOverride": {
        "/src/*": "${webspaceFolder}/frontend/src/*"
      }
    }
  ]
}
```

### Backend (VSCode)

Add to `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": ".NET Core",
      "type": "coreclr",
      "request": "launch",
      "program": "${workspaceFolder}/backend/WeddingInvite.API/bin/Debug/net8.0/WeddingInvite.API.dll",
      "args": [],
      "cwd": "${workspaceFolder}/backend/WeddingInvite.API",
      "stopAtEntry": false,
      "serverReadyAction": {
        "pattern": "\\bNow listening on:\\s+(https?://\\S+)",
        "uriFormat": "{1}",
        "action": "openExternally"
      }
    }
  ]
}
```

## Code Structure

### Frontend

- `src/app/core/` — Services, models, guards, interceptors
- `src/app/shared/` — Reusable components and directives
- `src/app/features/` — Feature modules and pages
- `src/environments/` — Environment-specific configuration

### Backend

- `Models/` — Entity Framework models
- `Controllers/` — API endpoints
- `Services/` — Business logic
- `Data/` — Database context and migrations
- `Auth/` — Authentication and authorization

## Commit Convention

Use conventional commits:

```
feat: Add wedding event RSVP form
fix: Correct invitation code validation
docs: Update API documentation
style: Format SCSS files
refactor: Extract theme logic to service
```

## Troubleshooting

### Frontend

**Port 4200 already in use:**
```bash
ng serve --port 4201
```

**Module not found errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Backend

**Database connection failed:**
- Verify PostgreSQL is running
- Check connection string in `appsettings.json`
- Ensure database exists

**Migration errors:**
```bash
dotnet ef database drop
dotnet ef database update
```

## Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [ASP.NET Core Documentation](https://learn.microsoft.com/en-us/aspnet/core/)
- [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
