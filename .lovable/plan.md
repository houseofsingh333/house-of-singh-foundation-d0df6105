## Journal Page Redesign

A complete redesign of the Journal page combining Sjostrand Coffee's clean typography/spacing with Lyon Beton's editorial layout, plus an interactive collapsible year/month timeline at the top.

---

### Part 1: Collapsible Timeline Navigation

A horizontal timeline at the top of the page with years 2026 down to 2021.

**Behavior:**

- Years displayed in descending order: 2026, 2025, 2024, ... 2021
- Clicking a year expands it to reveal months (Dec, Nov, Oct... Jan) in descending order
- Only one year open at a time (accordion-style)
- On page load, 2026 opens automatically with the current month (February) selected & website code showuld always show current month automatically. so when we open 2026 jan will be faded out and feb will open with its posts on the page in our ui. If we open 2025, the dec 2025 will open and other months will be greyed out but on hover it shows they are clickable.
- When opening any past year for the first time, the most recent month (December) is pre-selected
- Selecting a month filters the articles below to show only that month's entries
- Clean, minimal styling using the existing editorial design system (uppercase labels, thin borders, font-editorial for years)

### Part 2: Article Grid (Lyon Beton layout + Sjostrand typography)

**From Sjostrand (80%):**

- Clean uppercase article titles with generous letter-spacing
- "Read more" link beneath each card
- Warm, airy spacing between cards
- Minimal text hierarchy: image, title, read more

**From Lyon Beton (20%):**

- Large hero-style first article spanning full width
- Remaining articles in a responsive 2-column grid below
- Full-bleed cover images with generous aspect ratios

**Layout structure:**

- First article of the filtered results: full-width hero card with large cover image and overlaid or below title
- Remaining articles: 2-column grid (1-column on mobile) with consistent card sizing
- Each card: cover image (aspect 4:3 or 16:10), uppercase title, excerpt, date, "Read more" link

### Part 3: Page Header

- Large serif "Journal" heading (font-editorial) inspired by Lyon Beton's oversized title
- Consistent with site's section header pattern (uppercase label + horizontal rule)

---

### Technical Details

**Files to modify:**

1. `**src/lib/mock-data.ts**` -- Add more journal entries spanning 2021-2026 with varied months so the timeline has meaningful data to display
2. `**src/pages/Journal.tsx**` -- Complete rewrite with:
  - Timeline component using state for `activeYear` and `activeMonth`
  - Year accordion using CSS transitions (max-height / overflow-hidden pattern)
  - Month pill/button row inside each expanded year
  - Filtered article grid below
  - First-load logic: detect current year/month, set as defaults
  - When a new year is clicked: auto-select December (or latest available month)

**State management:**

```
activeYear: number (default: 2026)
activeMonth: number (default: current month for current year, 12 for past years)
```

**No new dependencies required.** Uses existing date-fns, Tailwind classes, and the project's editorial design tokens (font-editorial, tracking, spacing, border patterns).