# Luxury Wedding Invitation Website - Frontend

A complete redesign of the wedding invitation frontend as a **single-page, interactive luxury digital experience**.

## 🎯 Key Features

### 1. **Envelope Opening Animation** ✨
- Website begins with a gorgeous sage-green luxury envelope
- Click the gold wax seal with "L & V" engraving to open
- Beautiful sequential animations:
  - Wax seal cracks
  - Envelope flap opens
  - Flower petals begin floating
  - Inside envelope content reveals
  - Envelope transforms into the website

### 2. **Single-Page Design** 📄
- **No routing** - Everything is on one page
- Smooth scroll navigation to sections
- Responsive design that works on all devices

### 3. **Navigation Navbar** 🗂️
- Fades in after envelope opens
- Sticky positioning
- Smooth scroll to sections:
  - Events
  - Our Story
  - Travel
  - RSVP

### 4. **Hero Section** 💍
- Displays initials (L & V) that transform into full names
- Elegant mask reveal animations
- Beautiful tagline: "Two hearts, two families, and one beautiful journey"
- Placeholder for couple's hero photograph

### 5. **Decorative Divider** 🌉
- Brooklyn Bridge-inspired elegant line art
- Muted metallic gold color
- Appears between sections

### 6. **Interactive Scratch Card** 🎫
- Guests scratch to reveal wedding date
- Shows: "27 August 2026" and days remaining
- Realistic scratching effect

### 7. **Wedding Events Section** 📅
- Haldi & Mehendi (25 August)
- Pellikuthuru / Pellikoduku (26 August)
- Wedding Ceremony (27 August)
- Reception (27 August)

Each event displays:
- Event name
- Date & time
- Dress code
- Activities (when applicable)
- Special notes
- Individual RSVP button

### 8. **Our Story Section** 👫
- Bride and groom introduction cards
- Parents section
- Pet section (Leo Singhroy - Maltipoo, Tyson Bhalla - Nova Scotia Duck Tolling Retriever)
- Placeholder images for customization

### 9. **Travel & Accommodations** ✈️
- Venue information with map placeholder
- Nearest airport (Des Moines International Airport - DSM)
- Nearby hotels list
- Parking information
- Travel tips section

### 10. **RSVP Forms** 📝
- Separate form for each wedding event
- Collects:
  - Guest name
  - Email
  - Attendance (Yes/Maybe/No)
  - Number of plus-ones
  - Food preference
  - Dietary restrictions
  - Special notes
- Form validation

### 11. **Floating Flower Petals** 🌸
- Continuous animation throughout the page
- Slow, natural motion with soft rotation
- React to mouse/touch movement
- SVG-based petals (not emoji)

### 12. **Music Player** 🎵
- Elegant volume button in bottom-right corner
- Mute/unmute functionality
- Minimal, non-intrusive design
- Respects browser autoplay policies

### 13. **Footer** 👑
- Elegant minimal design
- "L & V" initials
- "With Love, Lohitha & Vivian"
- Wedding date

## 🎨 Design System

### Color Palette
- **Sage Green**: #7a9d5d (Primary - buttons, text)
- **Warm Cream**: #f5f1e8 (Background)
- **Ivory**: #faf8f3 (Secondary background)
- **Champagne**: #e6c956 (Highlights)
- **Muted Metallic Gold**: #d4af37 (Accents, borders)

### Typography
- **Headers**: Georgia, serif
- **Body Text**: Georgia, serif
- **Decorative**: Georgia serif fonts

### Textures & Effects
- Soft handmade paper texture throughout
- Subtle watercolor wash effects
- Botanical decorative elements
- Thin gold borders on cards

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Development Server

```bash
npm start
# or
ng serve -o
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

```bash
npm run build
# or
ng build
```

The build artifacts will be stored in the `dist/` directory.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── envelope/           # Luxury envelope with wax seal
│   │   │   ├── navbar/             # Navigation bar
│   │   │   ├── music-player/       # Background music player
│   │   │   ├── petals/             # Floating flower petals
│   │   │   ├── divider/            # Decorative divider
│   │   │   └── sections/
│   │   │       ├── hero/           # Initial names & tagline
│   │   │       ├── countdown/      # Scratch card countdown
│   │   │       ├── events/         # Wedding events cards
│   │   │       ├── story/          # Couple & family stories
│   │   │       ├── travel/         # Travel info
│   │   │       ├── rsvp/           # RSVP forms
│   │   │       └── footer/         # Footer
│   │   ├── models/
│   │   │   └── wedding.model.ts    # Data models
│   │   ├── app.component.ts        # Root component
│   │   ├── app.config.ts           # App configuration
│   │   └── app.routes.ts           # Route configuration (empty - single page)
│   ├── styles.scss                 # Global styles
│   ├── main.ts                     # Bootstrap
│   └── index.html
├── angular.json
├── package.json
└── tsconfig.json
```

## ✨ Key Implementation Details

### No Routing
- Removed `@angular/router` usage
- All navigation uses smooth scroll to section IDs
- Single HTML template in `app.component.ts`

### Animations
- Angular Animations (not GSAP)
- Smooth fade-in, slide-up, mask-reveal effects
- Respect `prefers-reduced-motion` for accessibility

### Envelope Opening Flow
1. Component starts with `envelopeOpened = false`
2. Only envelope visible with wax seal clickable
3. Click wax seal triggers state change to `opened`
4. Sequential animations:
   - Seal cracks (400ms)
   - Flap opens (800ms)
   - Inside content slides up (600ms)
5. After 1500ms, emit `onOpen` event
6. Parent component shows website content

### Component Isolation
- All components are standalone
- No shared module dependencies
- Each component is self-contained with its styles

## 🔧 Customization

### Change Wedding Details
Edit `src/app/models/wedding.model.ts`:
```typescript
export const COUPLE_DATA = { ... };
export const WEDDING_EVENTS = [ ... ];
export const WEDDING_VENUE = { ... };
```

### Replace Placeholder Images
- Update image URLs in each section component
- Maintain aspect ratios for visual consistency

### Adjust Colors
Edit `src/styles.scss` and component styles:
```scss
--color-sage-primary: #9ca88c;
--color-gold: #c8a24a;
```

### Modify Animations
- Edit trigger animations in each component
- Adjust timing and easing in transition definitions

## 📱 Responsive Design

The entire site is fully responsive:
- **Mobile** (< 768px): Single column layouts, optimized touch targets
- **Tablet** (768px - 1024px): Two-column grids where appropriate
- **Desktop** (> 1024px): Full multi-column layouts

## ♿ Accessibility

- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- Color contrast meets WCAG AA standards
- Respects `prefers-reduced-motion` preference

## 🎬 Testing Checklist

### Visual Testing
- [ ] Envelope opens smoothly
- [ ] Petals float naturally throughout
- [ ] All sections are visible
- [ ] Navigation scrolls to correct sections
- [ ] Forms are visible and functional
- [ ] Footer displays correctly

### Interaction Testing
- [ ] Wax seal is clickable
- [ ] Scratch card responds to mouse/touch
- [ ] Navbar links work
- [ ] RSVP forms accept input
- [ ] Music player mutes/unmutes
- [ ] Hover effects work on buttons

### Responsive Testing
- [ ] Mobile view is readable
- [ ] Tablet layout looks good
- [ ] Desktop view is optimal
- [ ] Touch interactions work on mobile

## 🚀 Performance Optimization

- Components are lazy-loaded via lazy evaluation
- CSS is scoped to components
- SVG assets are optimized
- Animations use CSS transforms for performance
- No external CDN dependencies (self-contained)

## 📝 Notes

- The wedding date is 27 August 2026
- Venue: Harpers by Bailey Farms, New Virginia, IA 50210
- All colors follow the approved luxury palette
- Botanical decorations continue throughout entire page
- No bright colors or neon - maintains luxury aesthetic

## 🐛 Troubleshooting

### Envelope won't open
- Check that `EnvelopeComponent` is imported in `AppComponent`
- Verify wax seal has pointer events enabled

### Petals not showing
- Check `PetalsComponent` is imported in `AppComponent`
- Verify CSS z-index is set correctly

### Scrolling not working
- Ensure section IDs match navbar link targets
- Check `scroll-behavior: smooth` in HTML

### RSVP form not submitting
- Verify form validation logic
- Check console for errors

## 📞 Support

For questions about specific components or features, refer to the inline comments in each component file.
