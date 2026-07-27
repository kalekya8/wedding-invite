# Quick Start Setup

## Initial Setup (First Time)

### 1. Prerequisites

Ensure you have installed:
- Node.js 20+ (`node --version`)
- .NET 8 SDK (`dotnet --version`)
- PostgreSQL 14+ (`psql --version`)
- Git (`git --version`)

### 2. Clone Repository

```bash
git clone <repository-url>
cd wedding-invite
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

### 4. Backend Setup

```bash
cd backend
dotnet restore
```

### 5. Database Setup

**On Windows:**

```bash
# Install PostgreSQL if not already installed
# Then create the database
psql -U postgres -c "CREATE DATABASE wedding_invite_dev;"
```

**On macOS/Linux:**

```bash
createdb wedding_invite_dev
```

### 6. Apply Migrations

```bash
cd backend
dotnet ef database update
```

### 7. Configure Environment Variables

Create `backend/appsettings.Development.json`:

```json
{
  "ConnectionStrings": {
    "WeddingDatabase": "Host=localhost;Database=wedding_invite_dev;Username=postgres;Password=postgres;Port=5432"
  },
  "Jwt": {
    "SigningKey": "your-super-secret-key-min-32-chars-long-12345"
  },
  "Cors": {
    "AllowedOrigins": ["http://localhost:4200"]
  }
}
```

## Running the Application

### Option 1: Both Frontend and Backend Together

From the root directory:

```bash
npm run dev
```

This will open:
- Frontend: `http://localhost:4200`
- Backend: `http://localhost:5000`
- API Docs: `http://localhost:5000/swagger`

### Option 2: Separately

**Terminal 1 - Frontend:**
```bash
cd frontend
npm start
# Opens http://localhost:4200
```

**Terminal 2 - Backend:**
```bash
cd backend
dotnet run
# Opens http://localhost:5000
```

**Terminal 3 - Watch for changes:**
```bash
cd frontend
npm run watch
```

## Editing Configuration

### Wedding Information

Edit `frontend/src/environments/environment.ts`:

```typescript
export const environment = {
  // ... other config
  bride: {
    name: 'Lohitha Kurapati',
    bio: 'Add bride bio here',
    parents: {
      father: 'RamaRao Kurapati',
      mother: 'Rani Kurapati'
    }
  },
  groom: {
    name: 'Vivian Raj Kappala',
    bio: 'Add groom bio here',
    parents: {
      father: 'Raja Bhushan Kappala',
      mother: 'Suhasini Beulah'
    }
  },
  events: [
    {
      id: 'haldi-mehendi',
      name: 'Haldi and Mehendi',
      date: '2025-08-25',
      // ... more details
    },
    // ... other events
  ]
};
```

### Theme Configuration

The app supports three themes:
- `ivory-garden` (default)
- `moonlit-lotus`
- `modern-floral`

Set in `environment.ts`:
```typescript
selectedTheme: 'ivory-garden'
```

### Features Toggle

```typescript
export const environment = {
  enableBackgroundMusic: true,
  enablePetGuides: true,
  enableCoupleStory: false,  // Enable when story is available
  // ...
};
```

## Testing the Application

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

## Creating Test Data

### Add Invitation

Use the API to create a test invitation:

```bash
curl -X POST http://localhost:5000/api/admin/invitations \
  -H "Content-Type: application/json" \
  -d '{
    "householdName": "Smith Family",
    "primaryGuestName": "John Smith",
    "primaryGuestEmail": "john@example.com",
    "maximumGuests": 4,
    "guests": [
      {
        "fullName": "John Smith",
        "isNamedGuest": true,
        "isChild": false
      },
      {
        "fullName": "Jane Smith",
        "isNamedGuest": true,
        "isChild": false
      }
    ]
  }'
```

### RSVP Flow

1. On the website, enter the invitation code
2. Select attendance for each event
3. Choose food preferences
4. Submit RSVP
5. Save the edit token for later updates

## Troubleshooting

### Port Conflicts

If ports 4200 or 5000 are in use:

```bash
# Frontend on different port
cd frontend
ng serve --port 4201

# Backend on different port
cd backend
dotnet run --urls=http://localhost:5001
```

Update `apiBaseUrl` in `environment.ts` to match backend port.

### Database Connection Error

```bash
# Check if PostgreSQL is running
psql -U postgres -d postgres -c "SELECT 1;"

# Reset database
psql -U postgres -c "DROP DATABASE wedding_invite_dev;"
psql -U postgres -c "CREATE DATABASE wedding_invite_dev;"
cd backend
dotnet ef database update
```

### Module Not Found Errors

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Backend Build Errors

```bash
cd backend
dotnet clean
dotnet restore
dotnet build
```

## Next Steps

1. **Add Wedding Images**
   - Create `frontend/src/assets/images/` folder
   - Add hero image, gallery photos, couple photos
   - Update environment config with image paths

2. **Add More Details**
   - Update venue addresses
   - Add exact event times
   - Add food menu details
   - Update travel information

3. **Create Invitations**
   - Generate invitation codes for guests
   - Set maximum guests per household
   - Add guest names

4. **Deploy**
   - Follow `/docs/DEPLOYMENT.md`
   - Set up Vercel for frontend
   - Set up Azure Container Apps for backend
   - Configure Neon PostgreSQL

## File Structure Reference

```
wedding-invite/
├── frontend/                 # Angular SPA
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/        # Services, models, guards
│   │   │   ├── shared/      # Reusable components
│   │   │   ├── features/    # Pages and feature modules
│   │   │   └── app.component.ts
│   │   ├── environments/    # Configuration
│   │   ├── assets/          # Images, icons
│   │   └── styles.scss
│   ├── angular.json         # Build config
│   └── package.json
│
├── backend/                 # ASP.NET Core API
│   ├── WeddingInvite.API/
│   │   ├── Controllers/     # API endpoints
│   │   ├── Services/        # Business logic
│   │   ├── Models/          # Entity models
│   │   ├── Data/            # DbContext, migrations
│   │   ├── Program.cs       # Application startup
│   │   └── appsettings.json
│   ├── Dockerfile
│   └── wedding-invite.sln
│
├── docs/
│   ├── DEVELOPMENT.md       # Development guide
│   └── DEPLOYMENT.md        # Deployment guide
│
├── README.md
├── SETUP.md                 # This file
└── package.json             # Workspace config
```

## Getting Help

- Frontend issues: Check `docs/DEVELOPMENT.md`
- Deployment issues: Check `docs/DEPLOYMENT.md`
- API issues: Visit `http://localhost:5000/swagger`
- Database issues: Check PostgreSQL logs

## Support Contacts

For questions about:
- Wedding details: Contact Lohitha & Vivian
- Technical implementation: Contact the development team
- Deployment: Contact your DevOps engineer
