

## HomeIntro Section — Editorial Monograph Redesign

Three options for the About section, all sharing the same content and structure but differing in layout proportion, image treatment, and typographic rhythm. Each follows the monograph-opening aesthetic.

---

### Shared Elements (all options)

**Content structure (top to bottom in the right column):**

1. Small uppercase name: `MANINDER SINGH` in `text-xs tracking-[0.25em] uppercase`
2. Stacked roles in `font-editorial` serif at large sizes
3. Exact paragraph copy provided
4. Minimal "About" link with arrow

**Interaction:** Intersection Observer triggers a fade-up animation (opacity 0 to 1, translateY 20px to 0, duration ~800ms, ease-out) when the section enters the viewport. Applied individually to the image and each text block with staggered delays (0ms, 100ms, 200ms, 300ms).

**Mobile:** Single column, image first (full width), text below with generous top padding.

**Removed from current version:** The section header ("About" label + horizontal rule), the blockquote, and the grayscale hover interaction on the image. The result is cleaner and quieter.

---

### Option A — Equal Split, Tall Portrait

```text
|                    |                              |
|    [Portrait]      |   MANINDER SINGH             |
|    aspect-[3/4]    |                              |
|    50% width       |   Creative Director          |
|                    |   Multidisciplinary Designer  |
|                    |   Photographer                |
|                    |                              |
|                    |   Bio paragraph...            |
|                    |                              |
|                    |   About →                     |
|                    |                              |
```

- Grid: `md:grid-cols-2 gap-16 md:gap-24`
- Image: `aspect-[3/4]`, full color, no filter, no hover effect
- Text column vertically centered with `justify-center`
- Roles at `text-2xl md:text-3xl lg:text-4xl font-light`, no opacity fade between them
- Most traditional monograph layout, clean 50/50 balance

---

### Option B — Asymmetric, Image Dominant

```text
|                         |                         |
|    [Portrait]           |   MANINDER SINGH        |
|    aspect-[3/4]         |                         |
|    7 of 12 cols         |   Creative Director     |
|                         |   Multidisciplinary...  |
|                         |   Photographer          |
|                         |                         |
|                         |   Bio paragraph...      |
|                         |                         |
|                         |   About →               |
|                         |                         |
```

- Grid: `md:grid-cols-12`, image spans 7 columns, text spans 4 columns (with 1 col gap)
- Image is the dominant element, text feels like a margin note
- Text column uses smaller role sizes: `text-xl md:text-2xl font-light`
- More photographic, gallery-wall feeling — the portrait commands attention
- Text aligns to the bottom of the image column using `items-end`

---

### Option C — Offset Overlap, Layered Depth

```text
|                    |                              |
|    [Portrait]      |                              |
|    aspect-[3/4]    |   MANINDER SINGH             |
|    5 of 12 cols    |                              |
|                    |   Creative Director          |
|         overlaps → |   Multidisciplinary Designer |
|                    |   Photographer               |
|                    |                              |
|                    |   Bio paragraph...           |
|                    |                              |
|                    |   About →                    |
```

- Grid: `md:grid-cols-12`, image spans 5 cols, text spans 5 cols starting at col 7
- Text column has a large top offset (`md:pt-32 lg:pt-44`) so it starts partway down the image
- Creates a layered, overlapping rhythm — image and text occupy different vertical zones
- Closest to the current design but stripped of all extra decoration (no section header, no blockquote, no border)
- Roles at `text-xl md:text-2xl lg:text-[1.75rem] font-light` with subtle opacity cascade (1.0, 0.8, 0.6)

---

### Technical Details

**File: `src/sections/HomeIntro.tsx`** (full rewrite)

- Remove `useState` for grayscale reveal (not needed in any option)
- Add Intersection Observer via `useRef` + `useEffect` to detect when section enters viewport
- Apply CSS classes for fade-up: `opacity-0 translate-y-5` as initial state, toggled to `opacity-100 translate-y-0` with `transition-all duration-700 ease-out`
- Stagger child elements with `delay-100`, `delay-200`, `delay-300` utility classes
- Update bio paragraph to the exact copy provided
- Change link text from "Discover" to "About"
- Remove section header (the "About" label + horizontal rule at top)
- Remove blockquote element

No new dependencies. No changes to other files.

