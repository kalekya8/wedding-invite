# Wedding Invitation Frontend - Angular

A luxury single-page wedding invitation website built with Angular 20, featuring interactive animations, responsive design, and elegant styling.

## Features

- 🎁 Interactive envelope opening animation with GSAP
- 🎨 Luxury design with sage, cream, and gold color palette
- 📱 Fully responsive (mobile, tablet, laptop, desktop)
- ✨ Smooth scroll animations and transitions
- 🎵 Floating music player with mute persistence
- ⏰ Interactive countdown with scratch card
- 💍 Event cards with glassmorphism design
- 💌 RSVP modal form with validation
- 🌸 Continuous floating petal background animation
- ♿ Accessibility features (WCAG AA)
- ⚡ Performance optimized

## Tech Stack

- **Framework**: Angular 20 (Standalone Components)
- **Language**: TypeScript 5.8
- **Styling**: SCSS with utility classes
- **Animations**: GSAP + Angular Animations
- **Fonts**: Google Fonts (Cormorant Garamond, Great Vibes, Lora, Montserrat)

## Getting Started

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm start
# or
ng serve -o
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any source files.

### Build

```bash
npm run build:prod
# or
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── sections/          # Page sections
│   │   │   │   ├── envelope/
│   │   │   │   ├── hero/
│   │   │   │   ├── countdown/
│   │   │   │   ├── events/
│   │   │   │   ├── location/
│   │   │   │   ├── rsvp/
│   │   │   │   └── footer/
│   │   │   └── shared/            # Reusable components
│   │   │       ├── navbar/
│   │   │       ├── music-player/
│   │   │       ├── particles/
│   │   │       └── gold-divider/
│   │   ├── pages/
│   │   │   └── home/
│   │   ├── models/
│   │   │   └── wedding.model.ts   # Data models
│   │   ├── app.component.ts
│   │   ├── app.routes.ts
│   │   └── app.config.ts
│   ├── assets/
│   │   ├── images/
│   │   ├── audio/
│   │   └── styles/
│   ├── styles.scss                # Global styles
│   ├── index.html
│   └── main.ts
├── angular.json
├── tsconfig.json
├── tsconfig.app.json
└── package.json
```

## Configuration

### Couple Data

Edit `src/app/models/wedding.model.ts`:

```typescript
export const COUPLE_DATA: Couple = {
  bride: {
    name: 'Lohitha',
    parents: { ... }
  },
  groom: {
    name: 'Vivian',
    parents: { ... }
  },
  waxSealInitials: 'LV'
};
```

### Wedding Details

Update in `wedding.model.ts`:
- `COUPLE_DATA` - Couple and parents names
- `WEDDING_VENUE` - Venue information and Google Maps URL
- `WEDDING_EVENTS` - All 4 wedding events
- `WEDDING_DATE` - Wedding date and time
- `COLOR_PALETTE` - Customize colors

### Add Music

Place your wedding music file at:
```
src/assets/audio/wedding-song.mp3
```

### Add Images

Create folders and add images:
```
src/assets/images/
├── couple/
├── events/
└── gallery/
```

## Styling

### Color Palette

All configured in CSS variables in `styles.scss`:
- Sage Primary: `#9CA88C`
- Sage Dark: `#7D8A71`
- Cream: `#F6F1E7`
- Gold: `#C8A24A`
- Gold Dark: `#A67C2E`

### Fonts

- **Headings**: Cormorant Garamond
- **Couple Names**: Great Vibes
- **Body Text**: Lora
- **Buttons/Nav**: Montserrat

All loaded via Google Fonts in `styles.scss`.

## Components

### Sections
- **EnvelopeComponent** - 3D envelope with wax seal
- **HeroComponent** - Couple names and wedding details
- **CountdownComponent** - Scratch card countdown
- **EventsComponent** - 4 wedding event cards
- **LocationComponent** - Venue with Google Maps
- **RsvpComponent** - RSVP form modal
- **FooterComponent** - Elegant footer

### Shared
- **NavbarComponent** - Fixed navigation with scroll detection
- **MusicPlayerComponent** - Floating music player
- **ParticlesComponent** - Continuous petal animation
- **GoldDividerComponent** - Decorative separators

## Animations

- **GSAP** - Complex 3D envelope opening sequence
- **Angular Animations** - Section transitions and fade effects
- **CSS Animations** - Continuous particle and icon animations
- **Scroll Detection** - Responsive navbar and active sections

## Responsiveness

- Mobile First approach
- Breakpoints: xs (320px), sm (640px), md (768px), lg (1024px), xl (1280px)
- No horizontal overflow
- Touch-friendly button sizes (44px minimum)
- Responsive typography and spacing

## Accessibility

- ♿ Semantic HTML structure
- ⌨️ Full keyboard navigation (Tab, Enter, Escape)
- 🎯 ARIA labels on interactive elements
- 👁️ Color contrast ≥ 4.5:1 (WCAG AA)
- 📍 Focus indicators visible
- 🚫 Respects `prefers-reduced-motion`

## Performance

- Lazy loading of components
- OnPush change detection where applicable
- Optimized animations (60 FPS)
- Hardware acceleration with GPU transforms
- Minimal bundle size

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Testing

```bash
npm test
```

Run unit tests via [Karma](https://karma-runner.github.io).

## Deployment

### Vercel

```bash
npm install -g vercel
vercel
```

### Docker

```bash
docker build -t wedding-invite:latest .
docker run -p 4200:80 wedding-invite:latest
```

### Static Hosting

```bash
npm run build
# Upload dist/ folder to your hosting
```

## Environment Variables

Create `.env` file (optional):
```
NG_APP_API_URL=https://api.yourbackend.com
NG_APP_WEDDING_DATE=2026-08-27
```

## Customization Tips

1. **Change Colors**: Edit `styles.scss` CSS variables
2. **Update Couple Data**: Edit `wedding.model.ts`
3. **Modify Fonts**: Update Google Fonts imports in `styles.scss`
4. **Add Photos**: Place in `src/assets/images/` and update components
5. **Adjust Animations**: Modify GSAP timelines in component files

## Known Issues

- Music auto-play may be blocked by browser policy (requires user gesture)
- 3D CSS transforms may have performance issues on older devices

## Future Enhancements

- Gallery with lightbox
- Video background option
- Multiple language support
- Dark mode theme toggle
- Admin dashboard for RSVP management

## Support

For issues or questions, refer to the main project README or check Angular documentation at [angular.io](https://angular.io).

## License

Private - Created for Lohitha & Vivian's Wedding

---

Built with Angular 20 • TypeScript 5.8 • GSAP • SCSS
