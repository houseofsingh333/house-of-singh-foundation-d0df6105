# About Page Redesign

A complete rebuild of the About page following the editorial guidelines provided. The page will flow through five distinct sections, with the horizontal timeline as the emotional centerpiece.

---

## Page Structure

```text
+------------------------------------------+
|         Intro Quote (centered)           |
+------------------------------------------+
|  Founder Bio (text left, image right)    |
+------------------------------------------+
|   House of Singh (centered manifesto)    |
+------------------------------------------+
|   TEN YEARS ON (horizontal timeline)     |
+------------------------------------------+
|     WORDS SHARED (testimonial carousel)  |
+------------------------------------------+
```

---

## Section 1: Intro Quote

- Centered, full-width section with generous vertical padding
- Quote in `font-editorial` serif, large size (~2rem on mobile, ~3rem on desktop)
- "The world is filled with beauty, waiting to be seen, felt, and celebrated."
- Subtle opacity fade-in on load using existing `editorial-fade-in` utility
- No decorative elements around it

## Section 2: Founder Section

- Two-column grid: text on the left (col-span-6), portrait image on the right (col-span-5)
- Left column contains:
  - "MANINDER SINGH" as uppercase tracking-wide heading
  - Three roles stacked below (Creative Director / Multidisciplinary Designer / Photographer)
  - Two body paragraphs with the exact copy provided
- Right column: existing portrait image (`maninder-portrait.jpg`), aspect-ratio 3:4, no animation — calm and grounded
- Narrow max-width on text for editorial line length
- On mobile: image stacks above text

## Section 3: House of Singh Identity

- Single centered narrow column (max-w-2xl), manifesto feel
- "HOUSE OF SINGH" as uppercase tracked heading with horizontal rule
- Two body paragraphs with the exact copy provided
- No buttons, no CTA — purely reflective
- Generous padding top and bottom

## Section 4: Timeline — "TEN YEARS ON"

This is the interactive centerpiece of the page.

- Section header: "TEN YEARS ON" in the standard uppercase label + rule pattern
- Horizontal scrollable container using CSS `overflow-x: auto` with `scroll-snap-type: x mandatory`
- Each milestone is a card (~280px wide) with:
  - Year as the dominant typographic element (large, font-editorial)
  - Optional thumbnail image (muted/desaturated via grayscale filter)
  - Short title
  - One descriptive line
- Cards styled archivally: no heavy borders, muted colors, bg-secondary/30 on hover
- On mobile: horizontal swipe with snap
- On desktop: horizontal scroll (mouse wheel or drag)
- Built with a simple data array so future years can be added trivially
- Initial data: 2014 (Founded House of Singh), 2018 (The Sikh Turban), 2021 (Relocation to Canada) — plus a few more placeholder milestones to fill the scroll

## Section 5: Words Shared (Testimonials)

- Section header: "WORDS SHARED" with the standard label + rule pattern
- Single testimonial visible at a time, centered
- Quote text in `font-editorial` italic/light
- Name and optional role below
- Left/right arrow navigation (minimal, using lucide `ChevronLeft`/`ChevronRight`)
- No star ratings, no headshots
- Soft typography, generous whitespace
- Mock data with 3 placeholder testimonials

---

## Technical Details

- **File modified**: `src/pages/About.tsx` — complete rewrite of the page component
- **No new dependencies** — timeline uses native CSS scroll-snap, testimonial uses React state for index
- **No new files needed** — everything lives in the single About page component
- Follows existing patterns: `font-editorial` for headings, `text-muted-foreground` for body, standard section padding (`px-8 md:px-16`, `py-24 md:py-36`), uppercase tracked labels with horizontal rules
- The Disciplines section (currently section 4) will be removed as it's not part of the new spec
- The old oversized name texture and pull-quote sections are replaced by the new structure  
  
**Conflict in technical notes**  
You say no new files needed and everything lives in About.tsx, but earlier you describe multiple section patterns. Lovable can still do it, but it is cleaner to let it create small section components inside the same file or separate files. If you truly want one file, explicitly say keep helper components inside the same file.
- **Do not hard reference existing assets unless confirmed**  
`maninder-portrait.jpg` might not exist in the repo. Change that line to: use the existing portrait asset if present, otherwise create a placeholder import and I will replace it later.
- **Disciplines removal instruction is good but add one more**  
Tell it to remove any unused imports and dead code so build stays clean.
- **Timeline data**  
You listed three real milestones and said plus placeholders. Better to instruct: include the full milestone list from the existing About content if available, otherwise start with those three and keep placeholders. This prevents Lovable from inventing wrong facts.
- **Testimonials**  
You said exact copy earlier but you have not supplied testimonial copy yet. So keep testimonials as placeholders and add a note: final testimonials will be provided later.

### Upgrade that will make it feel premium

Add one sentence: timeline cards should feel like an archive strip, with subtle hover and focus states for accessibility.