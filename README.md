# Wedding Invite — Digital Wedding Invitation & RSVP Platform

A premium, responsive digital wedding invitation and RSVP website for **Lohitha Kurapati** & **Vivian Raj Kappala**.

## Project Structure

```
wedding-invite/
├── frontend/          # Angular 20+ SPA
├── backend/           # ASP.NET Core Web API
├── docs/              # Architecture and deployment docs
└── README.md
```

## Tech Stack

- **Frontend:** Angular 20+, Standalone Components, SCSS, Signals, Reactive Forms
- **Backend:** ASP.NET Core 8+, Entity Framework Core, PostgreSQL
- **Database:** Neon PostgreSQL
- **Deployment:** Vercel (frontend), Azure Container Apps (backend)

## Features

- **Invitation-only RSVP** with unique invitation codes
- **Event-specific attendance** for 4 wedding events
- **Per-guest food preferences** and dietary restrictions
- **Secure edit tokens** for RSVP updates
- **Three theme presets** with light/dark mode support
- **Cinematic animations** (floating lanterns or lotus flowers)
- **Pre-wedding gallery** (up to 15 photos)
- **Pet profiles** (Leo and Tyson)
- **Admin dashboard** with analytics and CSV export
- **Travel guide** with airport and accommodation information
- **Countdown timer** to the ceremony

## Local Development

### Frontend Setup

```bash
cd frontend
npm install
npm start
# Opens http://localhost:4200
```

### Backend Setup

```bash
cd backend
dotnet restore
dotnet ef database update
dotnet run
# Runs on http://localhost:5000
```

### Start Both

```bash
npm run dev
```

## Environment Configuration

### Frontend (`frontend/src/environments/environment.ts`)

```typescript
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:5000',
  enableBackgroundMusic: true,
  enablePetGuides: true,
  enableCoupleStory: false,
  selectedTheme: 'ivory-garden',
  selectedHeroLayout: 'split-editorial',
  selectedLoadingAnimation: 'floating-lanterns',
  selectedSuccessAnimation: 'lantern-celebration',
  weddingDate: '2025-08-27',
  weddingTimezone: 'America/Chicago'
};
```

### Backend (`backend/appsettings.json`)

```json
{
  "ConnectionStrings": {
    "WeddingDatabase": "Host=localhost;Database=wedding_invite;Username=postgres;Password=password"
  },
  "Jwt": {
    "SigningKey": "your-secret-key-here-min-32-chars",
    "ExpiryMinutes": 60
  },
  "Cors": {
    "AllowedOrigins": ["http://localhost:4200", "https://yourdomain.com"]
  },
  "Admin": {
    "BootstrapEmail": "admin@example.com",
    "BootstrapPassword": "ChangeMe123!"
  }
}
```

## Database Schema

See `/backend/Migrations` for Entity Framework migrations.

Core entities:
- `Invitations` — Unique invitation codes and household info
- `InvitedGuests` — Named and unnamed guests
- `Events` — Wedding events (Haldi, Mehendi, Ceremony, Reception)
- `Venues` — Event venues with parking and accessibility
- `GuestEventResponses` — RSVP attendance and food preferences
- `RsvpSubmissions` — Complete RSVP records with edit tokens

## API Endpoints

### Public Endpoints
- `POST /api/invitations/validate` — Validate invitation code
- `GET /api/invitations/{code}` — Retrieve invitation details
- `POST /api/rsvps` — Submit RSVP
- `GET /api/rsvps/manage/{editToken}` — Retrieve RSVP for editing
- `PUT /api/rsvps/manage/{editToken}` — Update RSVP
- `GET /api/events` — Get wedding events
- `GET /api/venues` — Get venue details

### Admin Endpoints (Protected)
- `POST /api/admin/auth/login` — Admin authentication
- `GET /api/admin/dashboard` — Dashboard stats
- `GET /api/admin/invitations` — List all invitations
- `POST /api/admin/invitations` — Create invitation
- `PUT /api/admin/invitations/{id}` — Update invitation
- `GET /api/admin/rsvps` — List all RSVP responses
- `GET /api/admin/rsvps/export` — Export RSVP data as CSV
- `PUT /api/admin/events/{id}` — Update event details
- `PUT /api/admin/venues/{id}` — Update venue information

## Deployment

### Frontend (Vercel)

```bash
cd frontend
vercel deploy --prod
```

### Backend (Azure Container Apps)

```bash
cd backend
az containerapp create \
  --name wedding-invite-api \
  --resource-group my-rg \
  --image wedding-invite-api:latest
```

See `/docs/deployment.md` for detailed instructions.

## Features by Wedding Event

### Haldi & Mehendi (August 25)
- Evening celebration with activities
- Water balloons and playful festivities
- Mehendi and karaoke available

### Pellikuthuru / Pellikoduku (August 26)
- Traditional pre-wedding gathering
- Family blessings and celebrations

### Wedding Ceremony (August 27 - Morning)
- Hindu and Christian traditions united
- Central celebration event

### Reception (August 27 - Evening)
- Dinner, music, and dancing
- Celebration with the newlyweds

## Configuration

All dates, times, venues, images, and content are editable through:

1. **Frontend configuration:** `environment.ts` and component configs
2. **Backend administration:** Admin dashboard API
3. **Database:** Direct updates to Invitations, Events, and Venues

Placeholder content is used throughout for missing details.

## Security

- Invitation codes are unique and validated server-side
- RSVP edit tokens are cryptographically secure and hashed in the database
- Admin endpoints require JWT authentication
- CORS is configured to allow only authorized origins
- All inputs are validated and sanitized
- Database credentials are managed via environment variables

## Accessibility

- Semantic HTML throughout
- ARIA attributes on complex components
- Keyboard navigation support
- Reduced-motion support for animations
- Strong color contrast in all themes
- Screen-reader friendly error messages

## Performance

- Angular lazy loading for routes
- Responsive images with WebP support
- Gallery uses virtual scrolling for large image sets
- Optimized animations with GPU acceleration
- Production build with tree-shaking and minification
- Small initial JavaScript bundle

## Support

For questions or issues, contact the development team.
