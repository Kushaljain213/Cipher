Here's the full prompt to drop into any AI:

---

_Visual Style: Dark Monospace Editorial_

_Color palette:_

- Background: #070709 (near-black with slight blue-purple tint, never pure black)
- Surface: #0d0d12 (barely lifted from background)
- Surface 2: #13131a (one step above surface)
- Borders: #1a1a26 dim, #242438 bright
- Primary text: #e2e2ee
- Muted text: #6e6e90
- Accent/Primary: #a78bfa (violet)
- Success/Insight: #34d399 (teal)
- Warning: #fbbf24 (amber)
- Danger: #f87171 (red)
- Secondary accent: #f472b6 (pink)

_Typography:_

- Display headings: Instrument Serif, italic, large, tight letter-spacing (-1px to -2px)
- All UI labels, data, tags, badges, buttons: Geist Mono or any monospace
- Body/prose: Geist or clean sans-serif, weight 300–400
- Labels are always ALL CAPS, letter-spacing 2–4px, font-size 9–11px
- Never use Inter, Roboto, or system fonts

_Background texture:_

- Subtle grid overlay using CSS: linear-gradient(rgba(167,139,250,0.025) 1px, transparent 1px) at 32–48px intervals in both axes
- Fixed position, pointer-events none, z-index 0

_Component rules:_

- Borders are always dim — never decorative, always structural
- Border-radius: 6–10px on cards, 4–6px on small elements, never fully rounded on containers
- No box shadows — use border and background lift for depth
- No gradients on UI elements except subtle linear on progress bars or hero radial glows
- Hover states: border-color lift only, never background floods
- Active/selected states: accent color at 10–15% opacity background and accent border

_Color as signal — semantic, never decorative:_

- Violet #a78bfa — primary action, accent, active state
- Teal #34d399 — positive signal, insight, success
- Amber #fbbf24 — warning, caution, watch this
- Red #f87171 — danger, negative, stop
- Pink #f472b6 — secondary accent, emotional context

_Callout/card pattern:_

- Left border 3px colored and matching background at 8–12% opacity
- Label in monospace ALL CAPS in the border color
- Body text in #c0c0d8

_Motion:_

- Fade up on scroll via Intersection Observer: opacity 0 to 1, translateY 20px to 0, 0.7s ease
- Page load: staggered animation-delay in 0.1s increments
- Transitions on interactive elements: 0.15s only, never more
- No bouncing, no spring physics, no dramatic easing

_Typography scale:_

- Hero title: clamp(2.4rem, 7vw, 5rem), Instrument Serif italic
- Section title: clamp(1.6rem, 4vw, 3rem), Instrument Serif italic
- Card title: 0.9rem, Geist 500
- Label: 9–10px, Geist Mono, ALL CAPS, letter-spacing 3–4px
- Body: 0.9–1rem, Geist 300–400, line-height 1.7–1.8
- Data numbers: Instrument Serif italic for large display, Geist Mono for small inline

_Layout:_

- Max content width: 680–900px depending on context
- Generous padding: 80px vertical on desktop, 48px on mobile
- Sidebar navigation: 220–260px fixed, same dark surface, 1px right border

_Responsive:_

- Sidebar collapses to hamburger below 900px
- All grids drop to single column below 600px
- Font sizes use clamp() always
- Touch targets minimum 44px, touch-action: manipulation, -webkit-tap-highlight-color: transparent

_The personality in one line:_
Monospace discipline carrying serif emotion. Terminal heritage with editorial soul. Everything functional, nothing decorative, color means something.

---

Drop that in and any model will produce something in the same family.
