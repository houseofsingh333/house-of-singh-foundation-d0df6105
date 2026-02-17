

## Journal Page Fixes

Three changes: scrollable timeline, updated article cards, and prev/next navigation on entry pages.

---

### 1. Scrollable Timeline (supports future years)

**Problem**: Fixed `flex justify-between` layout cannot accommodate new years without shrinking gaps.

**Solution**: Replace with a horizontally scrollable container using `overflow-x-auto` and fixed gap between year markers. Years remain as dots on a line, but the line scrolls if more years are added. This future-proofs for 2027, 2028, etc.

- Years still rendered in descending order along a horizontal line
- Each year marker has a fixed min-width (e.g., `min-w-[80px] md:min-w-[120px]`) so spacing stays consistent
- Container scrolls horizontally when years exceed viewport width
- Months order changed from descending `[12..1]` to ascending `[1..12]` (Jan to Dec)

### 2. Article Cards: Add date + short description

**Changes to each card in the grid:**
- Below the image, show the published date formatted as "10 February 2026" in small muted text
- Below the title, show the `excerpt` field (4-6 words already exist in mock data -- these serve as the short description)
- Keep "Read more" link at the bottom

**Card order**: image, date, title, excerpt, "Read more"

### 3. JournalEntry Page: Prev/Next Navigation

**Changes to `src/pages/JournalEntry.tsx`:**
- Sort all journal entries by `publishedAt` descending
- Find the current entry's index
- Determine previous (newer) and next (older) entries
- Render a prev/next navigation section at the bottom of the entry, showing:
  - Left side: previous entry title + date, linked
  - Right side: next entry title + date, linked
- Keep the "Back to journal" link above the prev/next section

---

### Technical Details

**Files to modify:**

1. **`src/pages/Journal.tsx`**
   - Change `MONTHS` array to `[1, 2, 3, ..., 12]` (ascending, Jan to Dec)
   - Replace the year container from `flex justify-between` to `flex gap-x-[80px] md:gap-x-[120px]` inside an `overflow-x-auto` scrollable wrapper
   - Add date display to each article card: `format(new Date(entry.publishedAt), "d MMMM yyyy")`
   - Add excerpt text below title in each card

2. **`src/pages/JournalEntry.tsx`**
   - Sort entries by publishedAt descending, find current index
   - Compute `prevEntry` (index - 1) and `nextEntry` (index + 1)
   - Add a bottom navigation section with two columns: prev link (left) and next link (right), each showing entry title and formatted date
   - Style consistently with site's editorial design (uppercase labels, muted text, font-editorial)

