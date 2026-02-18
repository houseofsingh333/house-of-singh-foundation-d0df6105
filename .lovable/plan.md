## Journal Timeline Fixes

Two quick changes to `src/pages/Journal.tsx`:

### 1. Remove future years (2027, 2028)

Remove 2027 and 2028 from the `YEARS` array. The array becomes `[2026, 2025, 2024, 2023, 2022, 2021]`. The scrollable `overflow-x-auto` container remains, so future years can be added back anytime by simply appending to the array.

### 2. Fix the horizontal line z-order

The timeline line currently sits above the dots because it renders before the dots in the same stacking context. Fix by moving the line behind the dots using `z-0` on the line and `z-10` (or `relative z-10`) on each dot element. This ensures dots render on top of the line visually.

---

### Technical Details

**File: `src/pages/Journal.tsx**`

- **Line 6**: Change `YEARS` from `[2028, 2027, 2026, 2025, 2024, 2023, 2022, 2021]` to `[2026, 2025, 2024, 2023, 2022, 2021]`
- **Line 98**: Add `z-0` to the horizontal line div
- **Lines 116-125**: Add `relative z-10` to each dot div so they render above the line
- Remove the `isFuture` logic branches (disabled state, "Soon" label, faded styling) since there are no future years anymore  
  
Refined Journal Timeline Fixes and Post Thumbnail Behavior
  Implement the following updates so the Journal page UI is correct, the timeline renders properly, thumbnails behave as requested, and the mock data supports Previous and Next navigation testing. Also ensure Sanity can store rich text for the entry body.
  ## A. Journal timeline fixes
  File: `src/pages/Journal.tsx`
  1. Remove future years  
  Update `YEARS` to the following:
    `[2026, 2025, 2024, 2023, 2022, 2021]`
    Keep the horizontal scrolling container (`overflow-x-auto`) so future years can be reintroduced later by extending the array.
  2. Fix horizontal line z order  
  The line must render behind dots.
    Add `z-0` to the horizontal line element.  
    Add `relative z-10` to each dot element so dots sit above the line.
  3. Remove all future year logic  
  Delete any `isFuture` logic and related disabled styling, labels, or faded states since there are no future years anymore.
  ## B. Article thumbnail styling
  Goal: All thumbnails are black and white by default, except the most recent post, which stays in color. On hover, any thumbnail becomes color.
  Implementation detail and expected behavior
  1. Default state for all cards  
  Thumbnail uses grayscale.
  2. Most recent post  
  Thumbnail remains color even without hover.
  3. Hover state for any card  
  Thumbnail becomes color on hover.
  Recommended implementation approach in `src/pages/Journal.tsx`
  1. Determine the most recent post  
  Compute `mostRecentId` from your entries array using the newest date. Do not hardcode Feb 2026. This will stay correct once data comes from Sanity.
  2. Apply conditional classes to the image element  
  For each card image, apply Tailwind filters:
    `grayscale` by default  
    `group-hover:grayscale-0` on hover  
    For the most recent post only: `grayscale-0`
  3. Use group hover on the card  
  Add `group` to the card wrapper so the image can respond to hover cleanly.
  Example class logic to apply on the image
  - Always include: `transition duration-300`
  - Always include: `grayscale group-hover:grayscale-0`
  - If this card is the most recent: also include `grayscale-0` and remove or override grayscale
  This produces exactly: black and white unless newest or hovered.
  ## C. Add more Feb 2026 posts for Previous and Next testing
  File: `src/lib/mock-data.ts`
  Add 2 or 3 entries in February 2026 so navigation is testable.
  Requirements
  1. At least 3 posts in Feb 2026  
  Example dates: Feb 06, Feb 14, Feb 22, 2026
  2. Ensure slugs are unique and ordered properly by date
  3. Provide real photo thumbnails  
  Replace `coverImage: "/placeholder.svg"` with Unsplash image URLs.
  4. Confirm previous and next behavior in `src/pages/JournalEntry.tsx`  
  Keep the existing logic. With 3 Feb entries, you should see both navigation links appear depending on which entry you open.
  Important note on navigation labels  
  Your current meaning is valid as long as your UI clarifies it:
  - Previous points to newer
  - Next points to older  
  If you want to reduce confusion later, you can optionally add small helper text under each link: “Newer entry” and “Older entry” while keeping the labels.
  ## D. Sanity CMS fields to support rich text and journal content
  When connecting to Sanity, ensure the Journal entry document includes these fields so the CMS supports a full editorial reading experience.
  Sanity document fields for journalEntry
  1. title  
  Type: string
  2. slug  
  Type: slug  
  Source: title
  3. date  
  Type: datetime or date  
  Use datetime if you care about time of day
  4. coverImage  
  Type: image  
  Include hotspot enabled
  5. excerpt  
  Type: text  
  Optional. Even if you are not showing it in the grid, it can be useful for SEO and previews.
  6. body  
  Type: array of blocks  
  This is Sanity Portable Text. It supports rich text and multiple paragraphs.
  7. tags or category  
  Type: array of strings  
  Optional for future filtering
  8. isFeatured  
  Type: boolean  
  Optional. If you want “most recent stays color” to become “featured stays color” later, this gives you flexibility.
  Rich text requirement  
  The key is field 6, body, using Portable Text blocks, not a plain string.
  ## E. Summary of files to change
  1. `src/pages/Journal.tsx`  
  Update YEARS array  
  Fix z order of timeline line and dots  
  Remove future year logic  
  Add grayscale default and hover to color for thumbnails  
  Keep most recent post thumbnail in color using computed newest date
  2. `src/lib/mock-data.ts`  
  Add 2 or 3 more Feb 2026 posts  
  Use Unsplash image URLs for coverImage  
  Ensure dates allow Previous and Next to show
  3. `src/pages/JournalEntry.tsx`  
  No structural changes required  
  Verify Previous and Next render correctly with new Feb entries
  If you want, paste your current `Journal.tsx` timeline section and the article card block and I will rewrite just those parts with the correct Tailwind classes and newest post detection, ready to drop in.