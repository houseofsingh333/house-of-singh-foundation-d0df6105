## Journal Page and Entry Refinements

Four changes across three files to address all feedback.

---

### 1. Scrollable Timeline with More Years

Add years 2027 and 2028 as sample future years to demonstrate scrollability. The YEARS array becomes `[2028, 2027, 2026, 2025, 2024, 2023, 2022, 2021]`. Future years (beyond current year) will have their dots and labels faded out, showing they exist but have no content yet. The `overflow-x-auto` container with fixed `min-w-[100px] md:min-w-[140px]` per year ensures the timeline scrolls horizontally when it overflows.

### 2. Remove Excerpt/Subtext from Article Cards

Remove the excerpt paragraph from each card in the article grid. The card structure becomes:

- Image (3:4 aspect ratio)
- Date
- Title
- "Read more" link

No subtext/excerpt below thumbnails.

### 3. JournalEntry: Previous and Next Navigation

The current code already has both Previous (newer) and Next (older) navigation at the bottom. The issue is the labels -- currently "Previous" maps to newer entry and "Next" to older. This is correct chronologically (previous = before this one in the timeline = newer date, next = after this one = older date). Will verify this renders properly and both links are visible.

### 4. Sample Images and Full Post Body

Replace `coverImage: "/placeholder.svg"` with real Unsplash placeholder URLs for a few entries so thumbnails have actual photographs. Update one entry (e.g., "Winter Stillness") with a longer, multi-paragraph body text to demonstrate the full post reading experience.

---

### Technical Details

**Files to modify:**

1. `**src/pages/Journal.tsx**`
  - Add 2027, 2028 to YEARS array (faded/disabled for future years)
  - Remove excerpt `<p>` from article cards (lines 180-183)
2. `**src/lib/mock-data.ts**`
  - Replace `/placeholder.svg` cover images with Unsplash URLs for Feb 2026 entries (e.g., `https://images.unsplash.com/photo-...?w=800&q=80`)
  - Expand the `body` field for "Winter Stillness" entry with 3-4 paragraphs of editorial placeholder text
3. `**src/pages/JournalEntry.tsx**`
  - Already has prev/next -- no structural changes needed, just confirming it works as expected  
    

    ## Timeline upgrades
    1. Clear scroll affordance  
    Add a subtle right edge fade overlay on the timeline container so users instantly understand it scrolls.  
    Add a small “Scroll” hint that disappears after the first horizontal scroll.
    2. Snap and momentum  
    Add horizontal snap so each year lands cleanly when scrolling.  
    Use snap x, snap mandatory, and make each year item snap start. This makes the timeline feel premium.
    3. Active year clarity  
    When a year is selected, add a stronger visual state: slightly larger dot, bolder label, and a thin underline or pill background.  
    This reduces cognitive load when users scroll the page.
    4. Future years state that looks intentional  
    Instead of only fading future years, also disable pointer interactions and show a tiny “Coming soon” tooltip on hover.  
    This prevents users from clicking and thinking something is broken.
    5. Sticky timeline  
    Make the timeline stick to the top once the user scrolls past the hero title.  
    This keeps navigation always available while browsing entries.
    ## Article grid upgrades
    1. Better hover and tap feedback  
    On hover, slightly lift the card, add a soft shadow, and very subtle image zoom.  
    On mobile, use a pressed state on tap. It makes the grid feel responsive.
    2. Make the whole card clickable  
    Don’t rely on only “Read more.” Make the entire card a link, with “Read more” as a secondary affordance.  
    This increases usability and conversion into reading.
    3. Image loading polish  
    Add a blurred placeholder effect for images.  
    Even with mock data, it makes the site feel fast and editorial.
    4. Typography hierarchy  
    Increase date contrast slightly less than title, and limit titles to two lines with line clamp.  
    This keeps the grid clean and consistent when titles vary.
    5. Empty state that feels designed  
    If a year has no posts, show a clean empty state card:  
    “Nothing published yet” plus a short line like “New entries land here.”  
    This pairs perfectly with the faded future years.
    ## Filtering and discovery
    1. Quick filters  
    Add lightweight filters above the grid: All, Essays, Notes, Photography, Travel, Studio.  
    Even if it is mock data now, it future proofs the UX.
    2. Search input  
    Add a simple search field that filters by title and body.  
    This is the fastest perceived value upgrade for a journal.
    3. Sort toggle  
    Add “Newest” and “Oldest” toggle.  
    Small control, big clarity for users who prefer chronological browsing.
    ## Journal entry page upgrades
    1. Progress indicator  
    Add a slim reading progress bar at the top of the entry page.  
    It is a tiny detail that instantly makes the reading experience feel high end.
    2. Better prev and next clarity  
    Keep the chronological logic exactly as you described, but improve the labels visually:  
    Use “Newer entry” and “Older entry” as helper text under “Previous” and “Next.”  
    This removes confusion for every user without changing your logic.
    3. Back to journal affordance  
    Add a “Back to Journal” link near the title, plus a floating small back button on mobile.  
    It reduces bounce when people finish reading.
    4. Share and copy link  
    Add a compact share row: Copy link, Share (native if available).  
    It encourages distribution without feeling social media heavy.
    ## Micro interactions that elevate everything
    1. Smooth transitions between year selection and grid update  
    Add a subtle fade and upward motion for the grid when changing years.  
    This makes filtering feel deliberate.
    2. Keyboard accessibility  
    Make year pills focusable with arrow key navigation.  
    It is a serious quality signal for a portfolio level site.
    3. Maintain scroll position  
    When you click into an entry and go back, restore the user’s scroll position and selected year.  
    This one change makes the experience feel like a real product.
    If you want one priority order that gives maximum impact fast: make the timeline sticky with fade edges, make the whole card clickable with a premium hover, add a search field, then add reading progress on the entry page.