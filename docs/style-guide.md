# Roami — Brand Style Guide

## Brand Identity

### Name
- **Full name:** Roami
- **Pronunciation:** ROH-mee
- **Origin:** From "roam" + friendly "-i" ending
- **Never:** "ROAMI", "RoAmi", "Roami." (no period)

### Tagline
- Primary: "Your world, better explored"
- Secondary: "Deals that know how you travel"

### Domain
- Primary: roami.world
- Secondary: roami.travel (redirects to primary)

### Brand Personality
- **Playful** — not corporate, not stuffy. Like a well-travelled friend.
- **Accessible** — everyone can use it, no jargon, no complexity
- **Warm** — inviting, optimistic, sunshine energy
- **Trustworthy** — transparent about preferences, honest about deals
- **Clever** — smart without being smug, helpful without being patronising

### Voice & Tone
- Conversational, second person ("you", "your")
- Short sentences. Direct. Clear.
- Contractions are fine ("you'll", "we've", "it's")
- British English spellings (colour, personalised, favourite)
- Never: corporate jargon, buzzwords, "leverage", "synergy", "disrupt"
- OK to use: "deal", "trip", "getaway", "explore", "discover"

---

## Colour Palette

### Primary Colours

| Name | Token | Hex | RGB | Use |
|------|-------|-----|-----|-----|
| Sunset | `--accent` | `#E07A5F` | 224, 122, 95 | Primary CTA, logo route, prices, key actions |
| Sunset Dark | `--accent-hover` | `#C9674E` | 201, 103, 78 | Hover states for primary actions |
| Ocean | `--teal` | `#4ECDC4` | 78, 205, 196 | Secondary accent, badges, confidence bars, step numbers |
| Ocean Dark | `--teal-hover` | `#3DB8B0` | 61, 184, 176 | Hover states for secondary actions |
| Sunshine | `--yellow` | `#FFE66D` | 255, 230, 109 | Highlights, deal scores, "new" badges, alerts |
| Sunshine Dark | `--yellow-hover` | `#F5D84E` | 245, 216, 78 | Hover states for highlights |

### Neutral Colours

| Name | Token | Hex | RGB | Use |
|------|-------|-----|-----|-----|
| Midnight | `--foreground` | `#1A1A2E` | 26, 26, 46 | Headings, primary body text |
| Driftwood | `--secondary` | `#6B7280` | 107, 114, 128 | Secondary text, captions, labels |
| Sand | `--background` | `#FBF9F6` | 251, 249, 246 | Page background |
| Cloud | `--surface` | `#FFFFFF` | 255, 255, 255 | Cards, panels, inputs |
| Pebble | `--border` | `#E8E6E3` | 232, 230, 227 | Borders, dividers |
| Dune | `--muted` | `#F3F1EE` | 243, 241, 238 | Muted backgrounds, section alternation |

### Colour Usage Rules
1. **Sunset (coral)** is the primary action colour — CTAs, prices, the logo route. Never use for error states.
2. **Ocean (teal)** is the secondary accent — confidence indicators, step numbers, secondary CTAs. Provides visual variety.
3. **Sunshine (yellow)** is for highlights only — deal score badges, "new" indicators, price drop alerts. Use sparingly.
4. **Never** use all three accent colours in the same small area — pick two max per section.
5. Section backgrounds alternate: Sand → Cloud → Dune → Sand for visual rhythm.
6. Text on Sunset background: always white (#FFFFFF).
7. Text on Ocean background: Midnight (#1A1A2E) or white depending on context.

### Colour Contrast (WCAG AA)
- Midnight on Sand: 14.5:1 ✅
- Midnight on Cloud: 16.1:1 ✅
- Driftwood on Sand: 4.8:1 ✅
- Sunset on Cloud: 3.4:1 ⚠️ (use only for large text or with Midnight text alongside)
- White on Sunset: 3.2:1 ⚠️ (acceptable for large bold text only — buttons, headings)
- Midnight on Ocean: 7.2:1 ✅

---

## Typography

### Font Stack

| Role | Font | Weights | CSS Variable | Use |
|------|------|---------|-------------|-----|
| Display | DM Sans | 600, 700, 800 | `--font-display` | Headlines (h1, h2, h3), hero text, section titles |
| Body | Inter | 400, 500, 600 | `--font-sans` | Body text, descriptions, UI labels, navigation |
| Data | JetBrains Mono | 400, 600, 700 | `--font-mono` | Prices, numbers, deal scores, data values |

### Type Scale

| Element | Font | Size (mobile → desktop) | Weight | Line Height | Letter Spacing |
|---------|------|------------------------|--------|-------------|----------------|
| Hero headline | DM Sans | 2.25rem → 3.75rem | 700-800 | 1.1 | -0.02em |
| Section heading (h2) | DM Sans | 1.875rem → 2.25rem | 700 | 1.2 | -0.01em |
| Card heading (h3) | DM Sans | 1rem → 1.125rem | 600 | 1.3 | 0 |
| Body | Inter | 1rem | 400 | 1.6 | 0 |
| Body large | Inter | 1.125rem → 1.25rem | 400 | 1.6 | 0 |
| Caption/label | Inter | 0.875rem | 500 | 1.4 | 0 |
| Small text | Inter | 0.75rem | 400 | 1.4 | 0.01em |
| Price | JetBrains Mono | 1.5rem | 700 | 1.2 | 0 |
| Data/badge | JetBrains Mono | 0.75rem → 0.875rem | 600 | 1.2 | 0 |

### Typography Rules
1. DM Sans for headlines ONLY — never for body text, labels, or UI elements
2. Inter for everything that isn't a headline or a number
3. JetBrains Mono ONLY for prices (£189), scores (94%), dates, and data values
4. Never use more than 2 fonts in the same visual block
5. Headings are always Midnight (#1A1A2E), never grey
6. Price text is always Sunset (#E07A5F) in JetBrains Mono Bold

---

## Logo

### Mark
The Roami mark is a friendly illustrated globe with a dotted travel route arcing over it, ending in a small pin. Rounded lines, 2px stroke weight.

- The globe represents the world to explore
- The dotted route represents the journey
- The pin represents the destination/deal found
- Globe uses `currentColor`, route and pin use Sunset coral

### Wordmark
"roami" in lowercase DM Sans Bold, paired with the globe mark to its left.

### Usage Rules
1. Minimum size: 24px mark, 18px wordmark
2. Clear space: at least 50% of the mark's width on all sides
3. On light backgrounds: Midnight globe + Sunset route
4. On dark/coral backgrounds: White globe + White route
5. Never: rotate, stretch, add effects, change colours beyond approved variants
6. The mark can be used alone (favicon, app icon, social). The wordmark should always include the mark.

### Favicon
The globe mark alone, at 32x32 and 16x16. Simplified at small sizes (remove latitude lines).

---

## Icons

### Style
- 24x24 viewBox, 2px stroke weight
- Rounded stroke-linecap and stroke-linejoin
- Uses `currentColor` for maximum flexibility
- Friendly, slightly imperfect — not rigidly geometric
- Consistent visual weight across the set

### Icon Colours
- Default: Midnight (#1A1A2E) or Driftwood (#6B7280)
- In accent containers: White on Sunset or Midnight on Ocean
- Interactive: Sunset on hover

### USP Icon Set
| Icon | Name | Represents |
|------|------|-----------|
| Price tag + check | PriceTagIcon | Price-first discovery |
| Calendar + dots | CalendarYearIcon | Annual portfolio/budget |
| Shield + tick | ShieldIcon | ATOL protection/trust |
| Eye + sparkle | EyeIcon | Visible preferences |
| Bell + waves | BellAlertIcon | Deal alerts |
| Layered cards | PackageIcon | Assembled packages |

---

## Components

### Cards
- Background: Cloud (#FFFFFF)
- Border-radius: 1.5rem (rounded-3xl)
- Shadow: `0 1px 3px rgba(26,26,46,0.04), 0 8px 24px rgba(26,26,46,0.06)`
- Hover shadow: `0 4px 12px rgba(26,26,46,0.06), 0 16px 40px rgba(26,26,46,0.1)`
- Hover transform: `translateY(-4px)`
- Border: 1px solid Pebble (#E8E6E3) — optional, use when cards are on white background
- Transition: all 200ms ease

### Buttons

**Primary (Sunset)**
- Background: #E07A5F → hover: #C9674E
- Text: White, Inter 500 or 600
- Border-radius: 0.75rem (rounded-xl)
- Padding: 0.75rem 2rem
- Shadow: `0 2px 8px rgba(224,122,95,0.25)`
- Hover: lift `-2px`, shadow increases

**Secondary (Outline)**
- Background: transparent → hover: Sunset with white text
- Border: 1px solid Sunset
- Text: Sunset
- Same radius and padding as primary

**Teal (Secondary accent)**
- Background: #4ECDC4 → hover: #3DB8B0
- Text: Midnight (#1A1A2E)
- Use for secondary CTAs, "Learn more", step indicators

### Badges / Pills
- Border-radius: 9999px (fully rounded)
- Padding: 0.25rem 0.75rem
- Font: Inter 500, 0.75rem
- Variants:
  - Sunset: bg coral/10%, text coral, border coral/20%
  - Ocean: bg teal/10%, text teal, border teal/20%
  - Sunshine: bg yellow/15%, text yellow-dark, border yellow/20%
  - Neutral: bg Dune, text Driftwood, border Pebble

### Form Inputs
- Background: Cloud
- Border: 1px solid Pebble → focus: 2px solid Ocean
- Border-radius: 0.75rem
- Padding: 0.75rem 1rem
- Font: Inter 400, 1rem
- Focus: teal ring (not coral — coral is for actions, teal is for attention)

---

## Spacing & Layout

### Spacing Scale
Use Tailwind's default spacing scale. Key values:
- Section padding: `py-20` (5rem top/bottom)
- Container max-width: `max-w-6xl` (72rem)
- Card gap: `gap-5` or `gap-6`
- Inner card padding: `p-5` or `p-6`

### Grid
- Mobile: 1 column
- Tablet (640px+): 2 columns
- Desktop (1024px+): 3 columns
- Gap: 1.25rem → 1.5rem

### Section Rhythm
Alternate section backgrounds for visual flow:
1. Sand (hero)
2. Sand (demo — same as hero, seamless)
3. Dune (how it works)
4. Sand (USPs)
5. Sunset (waitlist — full-bleed accent)
6. Sand (footer)

---

## Motion & Animation

### Principles
- Motion should feel **effortless** — like drifting, not snapping
- Subtle is better than dramatic
- Never animate for animation's sake

### Values
- Default transition: `200ms ease`
- Card hover: `200ms ease` on transform + shadow
- Fade in: `400ms ease` with stagger of `80ms` per item
- Page section scroll-in: optional `300ms` scale from 0.98 → 1.0
- Loading shimmer: `1.5s ease infinite` pulse

### Specific Animations
- **Search input focus:** Subtle teal glow ring, 200ms
- **Deal cards appearing:** Fade in + slide up 8px, staggered 80ms per card
- **Confidence badges:** No animation (static, not distracting)
- **Scroll indicator:** Gentle bounce, 1s infinite

---

## Imagery

### Photography Style
- Warm, natural lighting
- City scenes, not posed tourists
- Desaturated slightly to match the warm palette
- Aspect ratio: 3:2 for deal cards
- Source: Unsplash (free tier for validation)

### Decorative Elements
- **Travel routes:** Dashed lines (strokeDasharray: 6 4) in Pebble colour, connecting sections
- **Destination dots:** Small circles (4-6px) in Ocean or Sunset at route endpoints
- **Background shapes:** Soft, large circles (>300px) with 3-5% opacity Sunset or Ocean, blurred

---

## Do's and Don'ts

### Do
- Use the three-colour palette (coral, teal, yellow) for visual variety
- Keep copy conversational and British English
- Use rounded corners everywhere (minimum rounded-xl)
- Let content breathe with generous whitespace
- Use DM Sans for impact, Inter for readability
- Show prices prominently in JetBrains Mono

### Don't
- Use sharp corners or hard geometric shapes
- Use more than 2 accent colours in the same section
- Make the interface feel "techy" or "dashboard-like"
- Use stock photography with visible watermarks
- Use emoji in the UI (we have custom icons now)
- Use coral for error states (use a standard red like #EF4444)
- Refer to the product as "Holiday Portfolio" (legacy name)

---

## Implementation Reference

### Tailwind Classes Cheatsheet

| Element | Classes |
|---------|---------|
| Headline | `font-display font-bold text-foreground` |
| Body text | `text-foreground` or `text-secondary` |
| Price | `font-mono font-bold text-accent` |
| Primary button | `bg-accent hover:bg-accent-hover text-white rounded-xl px-8 py-3` |
| Card | `bg-surface rounded-3xl card-shadow hover:card-shadow-hover hover:-translate-y-1 transition-all duration-200` |
| Badge (coral) | `bg-accent/10 text-accent border border-accent/20 rounded-full px-3 py-1 text-xs font-medium` |
| Badge (teal) | `bg-teal/10 text-teal border border-teal/20 rounded-full px-3 py-1 text-xs font-medium` |
| Section (muted) | `bg-muted` |
| Input focus | `focus:ring-2 focus:ring-teal/50 focus:border-teal` |

### CSS Custom Properties
All colours available as `var(--token)` and as Tailwind classes `bg-{token}`, `text-{token}`, `border-{token}`.

### Font Classes
- `font-display` → DM Sans (headlines)
- `font-sans` → Inter (body)
- `font-mono` → JetBrains Mono (data)
