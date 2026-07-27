# 🎁 Wedding Invitation Frontend - Setup Guide

## Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Start Development Server
```bash
npm start
```
or
```bash
ng serve -o
```

### Step 3: Open Browser
Visit `http://localhost:4200`

**Done!** The website is running locally on port 4200.

---

## Configuration

### 1. Update Couple Data
**File**: `src/app/models/wedding.model.ts`

```typescript
export const COUPLE_DATA: Couple = {
  bride: {
    name: 'Your Bride Name',
    parents: {
      father: 'Father Name',
      mother: 'Mother Name'
    }
  },
  groom: {
    name: 'Your Groom Name',
    parents: {
      father: 'Father Name',
      mother: 'Mother Name'
    }
  },
  waxSealInitials: 'YN'  // Your initials
};

export const WEDDING_VENUE: Venue = {
  name: 'Your Venue Name',
  address: 'Your Address',
  mapsUrl: 'https://maps.app.goo.gl/YOUR_URL'
};

export const WEDDING_DATE = new Date('2026-08-27T11:07:00-05:00');
export const WEDDING_DATE_STRING = 'Your Date';
export const WEDDING_TIME = 'Your Time';
```

### 2. Add Wedding Music
Place your wedding music MP3 file at:
```
src/assets/audio/wedding-song.mp3
```
- Should be 30-60 seconds
- Must be loopable
- Format: MP3

### 3. Add Wedding Photos
Create folders and add your photos:
```
src/assets/images/
├── couple/
│   └── your-photo.jpg
├── events/
│   └── event-photos.jpg
└── gallery/
    └── gallery-photos.jpg
```

### 4. Customize Colors (Optional)
**File**: `src/styles.scss`

Edit CSS variables in `:root`:
```scss
--color-sage-primary: #9ca88c;    // Change sage color
--color-gold: #c8a24a;             // Change gold color
--color-cream: #f6f1e7;            // Change cream color
```

---

## Available Commands

```bash
# Development
npm start              # Start dev server (http://localhost:4200)
ng serve -o            # Alternative start command

# Build
npm run build:prod     # Build for production

# Testing
npm test               # Run unit tests

# Linting
ng lint                # Run ESLint
```

---

## Features Built

✅ **Interactive Envelope** - Click wax seal to open  
✅ **Luxury Design** - Sage, cream, gold palette  
✅ **Responsive Layout** - Mobile, tablet, desktop  
✅ **Navigation Bar** - Fixed with scroll detection  
✅ **Couple Details** - Names, parents, wedding info  
✅ **Countdown Timer** - Scratch card reveal  
✅ **Event Cards** - 4 wedding events  
✅ **Location Map** - Google Maps embed  
✅ **RSVP Form** - Modal with validation  
✅ **Music Player** - Floating button with mute persist  
✅ **Background Animation** - Floating petals/leaves  
✅ **Animations** - Smooth transitions and effects  
✅ **Accessibility** - Keyboard nav, ARIA labels  
✅ **Performance** - Optimized 60 FPS  

---

## Troubleshooting

### Port 4200 Already in Use

```bash
# Find and kill the process
lsof -i :4200
kill -9 <PID>

# Or use a different port
ng serve --port 4201
```

### Dependencies Installation Failed

```bash
# Clear npm cache
npm cache clean --force

# Reinstall
rm -rf node_modules
npm install
```

### Styles Not Applying

```bash
# Clear Angular cache
rm -rf .angular/cache
ng serve
```

### Music Not Playing

1. Verify file exists: `src/assets/audio/wedding-song.mp3`
2. Check browser console for errors (F12)
3. Note: Music requires user interaction to play (click any button first)

---

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── sections/         # Page sections
│   │   │   │   ├── envelope/
│   │   │   │   ├── hero/
│   │   │   │   ├── countdown/
│   │   │   │   ├── events/
│   │   │   │   ├── location/
│   │   │   │   ├── rsvp/
│   │   │   │   └── footer/
│   │   │   └── shared/           # Reusable components
│   │   │       ├── navbar/
│   │   │       ├── music-player/
│   │   │       ├── particles/
│   │   │       └── gold-divider/
│   │   ├── pages/home/           # Main page
│   │   ├── models/
│   │   │   └── wedding.model.ts  # Data configuration
│   │   ├── app.component.ts
│   │   ├── app.routes.ts
│   │   └── app.config.ts
│   ├── assets/
│   │   ├── images/              # Wedding photos
│   │   └── audio/               # Background music
│   ├── styles.scss              # Global styles
│   ├── index.html               # Main HTML
│   └── main.ts                  # Bootstrap
├── angular.json                 # Angular config
├── tsconfig.json                # TypeScript config
├── tsconfig.app.json
├── package.json                 # Dependencies
└── README.md                    # Full documentation
```

---

## Customization Guide

### Change Fonts
**File**: `src/styles.scss`

Look for Google Fonts import and replace:
```scss
@import url('https://fonts.googleapis.com/css2?family=...');
```

### Add New Event
**File**: `src/app/models/wedding.model.ts`

Add to `WEDDING_EVENTS` array:
```typescript
{
  id: 'my-event',
  name: 'My Event',
  date: 'August 28',
  time: 'Evening',
  dressCode: 'Traditional',
  description: 'Event description...'
}
```

### Modify Colors
**File**: `src/styles.scss`

Edit `:root` CSS variables or update `COLOR_PALETTE` in `wedding.model.ts`

### Change Animations
**Files**: Component files in `src/app/components/sections/`

Edit GSAP timelines and Angular animations directly in components

---

## Testing in Browser

### Mobile Test
1. Open DevTools (F12)
2. Click device toggle (📱 icon)
3. Select device (iPhone 12, iPad, etc.)
4. Test responsiveness

### Functionality Test
- [ ] Click envelope seal - opens smoothly
- [ ] Scroll - navbar sticks and changes style
- [ ] Scratch countdown card
- [ ] Click RSVP - form opens
- [ ] Click music button - toggle works
- [ ] View on mobile - everything responsive

---

## Deployment

### Build for Production
```bash
npm run build:prod
```
Output in `dist/` folder

### Deploy to Vercel
```bash
npm install -g vercel
vercel
# Follow prompts
```

### Deploy to Other Hosts
1. Run `npm run build:prod`
2. Upload `dist/wedding-invite-frontend/` to your host
3. Configure server to serve `index.html` for all routes

---

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers

---

## Next Steps

1. ✏️ Update `wedding.model.ts` with your data
2. 🎵 Add your music to `assets/audio/`
3. 📸 Add your photos to `assets/images/`
4. 🎨 Customize colors in `styles.scss` (optional)
5. 🧪 Test in browser with `npm start`
6. 📦 Build with `npm run build:prod`
7. 🚀 Deploy to Vercel or your host

---

## Support

See full documentation in `README.md`

---

**Status**: ✅ Ready to customize and deploy  
**Tech**: Angular 20 • TypeScript 5.8 • SCSS • GSAP  
**Port**: 4200
