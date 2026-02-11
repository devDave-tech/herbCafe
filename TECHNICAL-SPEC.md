# Herb Café - Technical Specification

## Document Information
- **Project**: Herb Café Website
- **Version**: 1.0.0
- **Date**: February 2026
- **Status**: Phase 1 Complete

---

## 1. Overview

### 1.1 Project Description
Premium cannabis-friendly café website for Herb Café located in Langenhoven Park, Bloemfontein, South Africa. The website serves as the digital presence for the café, showcasing menu items, cannabis products, gallery, and contact information.

### 1.2 Business Requirements
- Age verification (18+) before site access
- No e-commerce (Phase 1) - WhatsApp ordering only
- Mobile-first responsive design
- Fast loading and optimized media
- Dark, moody aesthetic with vibrant green accents

---

## 2. Technology Stack

### 2.1 Core Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| Vite | 5.x | Build tool and dev server |
| Vanilla JavaScript | ES6+ | Application logic |
| Tailwind CSS | 3.x | Utility-first styling |
| HTML5 | - | Page structure |

### 2.2 Animation Libraries
| Library | Version | Purpose |
|---------|---------|---------|
| GSAP | 3.x | Scroll animations, parallax |
| Lottie Web | 5.x | Loading animation |
| Splide.js | 4.x | Partner carousel |
| GLightbox | 3.x | Image/video lightbox |

### 2.3 Deployment
- **Platform**: Netlify
- **CDN**: Cloudflare (via Netlify)
- **SSL**: Automatic via Netlify

---

## 3. Architecture

### 3.1 Application Structure
```
┌─────────────────────────────────────────────────┐
│                     Browser                      │
├─────────────────────────────────────────────────┤
│  Loader Animation → Age Gate → Page Content     │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│  │ main.js │→│ loader  │→│age-gate │           │
│  └────┬────┘ └─────────┘ └─────────┘           │
│       │                                         │
│       ▼                                         │
│  ┌─────────────────────────────────────────┐   │
│  │           Page Initialization            │   │
│  ├─────────────┬─────────────┬─────────────┤   │
│  │ navigation  │   scroll    │  whatsapp   │   │
│  │             │ animations  │             │   │
│  └─────────────┴─────────────┴─────────────┘   │
│                                                 │
│  Page-specific modules:                         │
│  ┌──────────┐ ┌──────────┐                     │
│  │ carousel │ │ gallery  │                     │
│  └──────────┘ └──────────┘                     │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 3.2 Module Responsibilities

| Module | Responsibility |
|--------|----------------|
| `main.js` | Entry point, coordinates initialization sequence |
| `loader.js` | Displays loading animation with Lottie/CSS fallback |
| `age-gate.js` | Age verification modal with localStorage persistence |
| `navigation.js` | Mobile menu toggle, scroll effects, smooth scrolling |
| `scroll-animations.js` | GSAP ScrollTrigger parallax and fade effects |
| `carousel.js` | Splide.js partner logo carousel |
| `gallery.js` | Bento masonry grid with GLightbox integration |
| `whatsapp.js` | Floating WhatsApp button with pulse animation |

---

## 4. Page Specifications

### 4.1 Homepage (`index.html`)
- **Hero Section**: Full-viewport video background with parallax
- **About Section**: Two-column layout with text and image
- **Features Section**: 4-column grid of offerings
- **Partners Section**: Infinite-scroll logo carousel
- **CTA Section**: Visit/Order call-to-action

### 4.2 Menu Page (`menu.html`)
- **Header**: Page title and description
- **Category Tabs**: Food / Drinks / All filter
- **Product Grid**: 3-column card layout
- **Cards**: Image, name, description, price, WhatsApp order button

### 4.3 Shop Page (`shop.html`)
- **Header**: Page title and description
- **Category Tabs**: Flower / Edibles / Pre-rolls / Accessories / All
- **Product Grid**: 3-column card layout
- **Cards**: Image, name, description, WhatsApp inquiry button
- **Disclaimer**: Legal compliance notice

### 4.4 Gallery Page (`gallery.html`)
- **Masonry Grid**: 4-column bento-style layout
- **Item Types**: Images and videos
- **Interactions**: Hover zoom, video preview, lightbox on click

### 4.5 Contact Page (`contact.html`)
- **Two-Column Layout**: Info section + Google Maps
- **Info Section**: Address, phone, email, hours, social links
- **Map**: Embedded Google Maps iframe
- **WhatsApp CTA**: Delivery order button

---

## 5. Styling System

### 5.1 Color Palette
```css
:root {
  --herb-green: #A4D65E;  /* Primary accent */
  --herb-dark: #1a1a1a;   /* Background */
  --herb-gray: #2D2D2D;   /* Cards/sections */
  --herb-gold: #FFD700;   /* Premium accents */
}
```

### 5.2 Typography
| Element | Font | Weight | Size (Desktop) |
|---------|------|--------|----------------|
| H1 | Bebas Neue | 400 | 96px (8rem) |
| H2 | Bebas Neue | 400 | 48px (3rem) |
| H3 | Bebas Neue | 400 | 24px (1.5rem) |
| Body | Inter | 400 | 16px (1rem) |
| Small | Inter | 400 | 14px (0.875rem) |

### 5.3 Breakpoints
| Name | Width | Target |
|------|-------|--------|
| sm | 640px | Large phones |
| md | 768px | Tablets |
| lg | 1024px | Desktop |
| xl | 1280px | Large desktop |

---

## 6. Animation Specifications

### 6.1 Loading Sequence
1. Black screen (0.5s)
2. Cup outline appears (0.8s fade-in)
3. Green liquid fills cup (1.5s)
4. Smoke particles animate (2s loop)
5. "HERB CAFÉ" text fades in (0.5s)
6. Entire scene fades out (0.5s)
7. Age gate appears (if needed)

### 6.2 Scroll Animations
| Element | Effect | Trigger |
|---------|--------|---------|
| Hero video | 30% parallax | Viewport scroll |
| Section headings | Fade-in-up 60px | 80% in viewport |
| Cards | Staggered fade-in | 80% in viewport |
| Footer columns | Staggered fade-in | 90% in viewport |

### 6.3 Micro-interactions
| Element | Effect | Duration |
|---------|--------|----------|
| Nav links | Color transition | 300ms |
| Buttons | Scale 1.05x | 300ms |
| Cards | Lift + shadow | 300ms |
| WhatsApp button | Pulse glow | 1s (every 4s) |
| Gallery items | Scale 1.02x | 300ms |

---

## 7. Data Schema

### 7.1 Menu Item
```typescript
interface MenuItem {
  name: string;
  description: string;
  price: string;        // Format: "R95"
  image: string;        // Path: "/images/menu/..."
}
```

### 7.2 Product
```typescript
interface Product {
  name: string;
  description: string;
  image: string;        // Path: "/images/shop/..."
}
```

### 7.3 Gallery Item
```typescript
interface GalleryItem {
  type: "image" | "video";
  src: string;
  alt?: string;         // For images
  poster?: string;      // For videos
}
```

### 7.4 Partner
```typescript
interface Partner {
  name: string;
  logo: string;         // Path: "/images/partners/..."
}
```

---

## 8. API Integrations

### 8.1 WhatsApp Business
- **Method**: Deep linking via `wa.me`
- **Format**: `https://wa.me/{number}?text={encoded_message}`
- **Phone Number**: Placeholder `27XXXXXXXXX` (to be replaced)

### 8.2 Google Maps
- **Method**: Embedded iframe
- **Coordinates**: Langenhoven Park area (placeholder)

---

## 9. Performance Requirements

### 9.1 Targets
| Metric | Target |
|--------|--------|
| Lighthouse Performance | 90+ |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Total Bundle Size | < 500KB |
| Hero Video | < 5MB |

### 9.2 Optimization Techniques
- Lazy loading for images (`loading="lazy"`)
- Video preload metadata only
- WebP images with fallbacks
- Minified CSS/JS in production
- Deferred non-critical JavaScript
- Asset caching via Netlify headers

---

## 10. Browser Support

| Browser | Version |
|---------|---------|
| Chrome | Last 2 versions |
| Firefox | Last 2 versions |
| Safari | Last 2 versions |
| Edge | Last 2 versions |
| Mobile Safari | iOS 14+ |
| Chrome Android | Android 10+ |

---

## 11. Security Considerations

### 11.1 Age Verification
- localStorage-based verification
- Blocks content until verified
- Persists across sessions
- Reset function available for testing

### 11.2 HTTP Headers (via Netlify)
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: no-referrer-when-downgrade
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

---

## 12. Deployment Process

### 12.1 Build Command
```bash
npm run build
```

### 12.2 Output
- Directory: `dist/`
- Minified HTML, CSS, JS
- Optimized assets
- Console logs removed

### 12.3 Netlify Configuration
- Auto-deploy on Git push
- SPA redirect rules
- Security headers
- Asset caching

---

## 13. Future Considerations (Phase 2+)

- E-commerce integration (cart, checkout)
- User accounts
- Order tracking
- Loyalty program
- Blog/News section
- Event calendar
- Online booking

---

## 14. Appendix

### A. File Checklist
See `CONTENT-CHECKLIST.md` for placeholder replacement guide.

### B. Color Conversion
```
#A4D65E = rgb(164, 214, 94) = hsl(85, 62%, 60%)
#1a1a1a = rgb(26, 26, 26) = hsl(0, 0%, 10%)
#2D2D2D = rgb(45, 45, 45) = hsl(0, 0%, 18%)
#FFD700 = rgb(255, 215, 0) = hsl(51, 100%, 50%)
```

---

*Document generated for Herb Café Website v1.0.0*
