

## Redesigned Contact Page — Editorial Two-Column Layout

Transform the current single-column Typeform-style contact page into a two-column editorial experience that feels like a quiet invitation, not a SaaS onboarding flow. All existing logic (branching, autosave, review, keyboard nav) stays intact. The changes are purely layout, language, and tone.

---

### Layout Change

**Desktop (md and up):**
A side-by-side grid with the left column taking roughly 40% and the right column 60%.

- **Left column** -- static, stays fixed/sticky as user scrolls through form steps:
  - Large editorial heading: "Say hello."
  - Two paragraphs of warm subtext inviting conversation
  - This column never changes during the form flow

- **Right column** -- the interactive guided form:
  - One question per screen (unchanged behavior)
  - Soft slide-up transitions (unchanged)
  - Navigation buttons at the bottom of this column

**Mobile:**
- Heading and subtext stack at the top (shown once, then scroll away naturally)
- Form fills remaining space below
- Vertical, breathable spacing

**Review and Confirmation screens** also adopt the two-column layout on desktop.

---

### Language Adjustments

Update the question text in `contact-form-data.ts` to feel conversational and personal (first-person singular, artist-led tone):

| Current | Revised |
|---------|---------|
| "What brings you here?" | "Tell me what brings you here." |
| "What's your name?" | "What should I call you?" |
| "What's your email?" | "Where can I reach you?" |
| "Your phone number?" | "A phone number, if you'd like." |
| "What's the project called?" | "What are you working on?" |
| "Describe the project briefly." | "Tell me a little about it." |
| "What's your budget range?" | "Rough budget is perfectly fine." |
| "What's the ideal timeline?" | "Any timeline in mind?" |
| "How did you hear about us?" | "How did you find me?" |
| "What type of collaboration?" | "What kind of collaboration interests you?" |
| "Your portfolio or website?" | "Share your work, if you'd like." |
| "Instagram or social handle?" | "Where can I find you online?" |
| "Describe the collaboration idea." | "Tell me about your idea." |
| "Media outlet or organization?" | "Which outlet or organization?" |
| "Type of inquiry?" | "What kind of inquiry is this?" |
| "Tell us more about your request." | "Tell me more about your request." |
| "What's on your mind?" | "What's on your mind?" |

Helper text also shifts from "us" to "me" (e.g., "Used only to reply to you." stays, "helps us learn" becomes "helps me learn").

---

### Progress Bar

Remove the numeric "Step 2 of 6" label. Keep only the thin 2px progress bar at the top -- calm, no numbers.

---

### Confirmation Screen

Update copy:
- Heading: "Thank you for reaching out."
- Line 1: "I'll be in touch shortly."
- Link: "Explore my projects" or "Read the journal" (two gentle links instead of one)

---

### Review Screen

Update heading from "Almost there." to "Before you send." -- softer, less transactional.

---

### Technical Details

**Files to modify:**

1. **`src/pages/Contact.tsx`**
   - Replace the outer `flex flex-col items-center` layout with a two-column grid: `grid md:grid-cols-[2fr_3fr] gap-16 md:gap-24`
   - Left column: static `div` with sticky positioning (`md:sticky md:top-24 md:self-start`) containing the heading and subtext
   - Right column: the existing form step content (step renderer, navigation buttons)
   - On mobile (below md), the grid becomes single column -- heading/subtext stack above the form
   - Remove the "Step X of Y" text label (keep progress bar only)
   - Update review and confirmation phases to use the same two-column wrapper
   - The confirmation screen shows updated copy in the right column

2. **`src/lib/contact-form-data.ts`**
   - Update all `question` and `helperText` strings to the conversational phrasing listed above
   - Change "us" references to "me" throughout

3. **`src/components/contact/ReviewConfirmation.tsx`**
   - Update `ReviewScreen` heading to "Before you send."
   - Update `ConfirmationScreen` heading to "Thank you for reaching out."
   - Change body text to "I'll be in touch shortly."
   - Add a second link to `/journal` alongside the projects link

4. **No changes to `StepRenderer.tsx`** -- input components remain identical

