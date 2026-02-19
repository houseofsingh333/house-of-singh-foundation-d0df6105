

## Conversational Contact Page — Typeform-Style Redesign

A complete rebuild of the Contact page as a one-question-per-screen guided conversation with smart branching, autosave, review editing, and keyboard navigation.

---

### Flow Architecture

The form has a dynamic number of steps depending on which intent the user selects. Every screen shows exactly one question, centered on the viewport.

```text
Step 0: "What brings you here?"
  -> Commercial Project (6 branch questions)
  -> Collaboration (5 branch questions)
  -> Media / Feature (4 branch questions)
  -> Something Else (1 freeform question)

Steps 1-3: Contact details (shared across all branches)
  1. Full Name
  2. Email
  3. Phone (optional, skippable)

Steps 4+: Branch-specific questions (one per screen)

Review Screen: Editable summary of all answers

Confirmation Screen: Thank you + response timeframe
```

Total steps vary: 8-10 depending on branch.

---

### Visual Design (Matching Site Language)

Every screen uses a single centered column layout (max-w-xl, centered vertically and horizontally). This replaces the current split-layout approach to create the Typeform "one thing at a time" feel.

- **Typography**: `font-editorial` for question text at `text-3xl md:text-4xl lg:text-5xl font-light`
- **Helper text**: `text-xs tracking-[0.2em] uppercase text-muted-foreground`
- **Inputs**: Transparent, border-bottom-only, large text (matching existing input style from current Contact page)
- **Choice chips**: Pill-shaped buttons with `border border-border rounded-full` -- filled on selection
- **Transitions**: CSS `opacity` + `translateY` fade-up between steps using the existing `editorialSlideUp` animation
- **Progress bar**: Thin 2px line at top of viewport, using foreground color, width proportional to progress

---

### Screen-by-Screen Breakdown

**Step 0 — Intent Selection**
- Centered question: "What brings you here?"
- Four large tappable buttons stacked vertically, full-width on mobile, each with the option label in `text-2xl font-light`
- Selected state: filled background, no radio dots (cleaner than current)

**Steps 1-3 — Contact Details (one field per screen)**
- Step 1: "What's your name?" + single underline input
- Step 2: "What's your email?" + single underline input + helper "Used only to reply to you."
- Step 3: "Your phone number?" + underline input + "Skip" button alongside Next

**Steps 4+ — Branch Questions**
Each renders one question per screen. Input types vary:

| Question | Input Type |
|----------|-----------|
| Project name | Text input |
| Brief description | Textarea (3 rows) |
| Budget range | Choice chips (Under 2K / 2-5K / 5-10K / 10K+ / Not sure) |
| Timeline | Choice chips (ASAP / 2-4 weeks / 1-2 months) + date picker option |
| How did you hear about us | Dropdown (select) |
| Portfolio link | Text input (optional, skippable) |
| Social handle | Text input (optional, skippable) |
| Media outlet name | Text input |
| Type of inquiry | Dropdown |
| Deadline/event date | Date picker |
| Freeform message | Textarea |

**Review Screen**
- Clean summary grouped by section (Intent, Contact, Details)
- Each section has an "Edit" button that jumps back to that step
- After editing, user returns to review
- Submit button at bottom

**Confirmation Screen**
- Centered: "Thank you -- your message has been received."
- "We typically respond within 2 business days."
- Subtle link: "Explore our projects" linking to /projects

---

### Navigation and Keyboard

- **Next / Back buttons**: Bottom-right, matching current pill button style (rounded-full, uppercase tracking-widest)
- **Enter key**: Advances to next step when field is valid
- **Skip button**: Appears for optional fields, styled as ghost text link
- **Progress bar**: Fixed at top, thin `h-[2px] bg-foreground` bar that transitions width smoothly

---

### Autosave

- All form state saved to `localStorage` under key `hos-contact-draft`
- On mount, check for existing draft and restore if found
- Show a subtle "Draft restored" toast using the existing Sonner setup
- Clear draft on successful submission
- Include a small "Clear form" link on the first step if a draft exists

---

### Technical Details

**File: `src/pages/Contact.tsx`** (full rewrite)

The component will use:
- `useState` for `currentStep`, `intent`, and a `formData` object with all possible fields
- `useEffect` for localStorage autosave (debounced on formData changes)
- `useEffect` for Enter key listener
- `useMemo` to compute the step sequence dynamically based on selected intent
- `useCallback` for navigation handlers

**Data structure:**
```typescript
interface ContactFormData {
  intent: string;
  name: string;
  email: string;
  phone: string;
  // Commercial
  projectName: string;
  projectDescription: string;
  budget: string;
  timeline: string;
  referralSource: string;
  // Collaboration
  collabType: string;
  portfolioLink: string;
  socialHandle: string;
  collabDescription: string;
  collabTimeline: string;
  // Media
  mediaOutlet: string;
  inquiryType: string;
  deadline: string;
  mediaDescription: string;
  // Something Else
  freeformMessage: string;
}
```

**Step definition approach:**
Each step is an object `{ id, question, helperText, type, field, options?, required }`. The component builds an array of steps dynamically based on `intent`, then renders one step at a time using conditional input rendering based on `type` (text, email, tel, textarea, chips, select, date).

**Validation:** Only validate the currently visible field. Required fields block Next. Optional fields show Skip.

**Review screen:** Maps over all completed steps, groups by section, renders label-value pairs with Edit buttons that set `currentStep` to that index and set a `returnToReview` flag so after editing it jumps back to review.

**Animation:** Each step wrapper gets `key={currentStep}` and the `editorial-slide-up` class for enter animation. Steps transition with a brief opacity fade.

**Responsive:** Single-column centered layout works identically on all viewports. Inputs are full-width. Choice chips wrap naturally with `flex-wrap`. Progress bar is viewport-width. Navigation buttons stack on very small screens.

**No new dependencies required.** Uses existing date-fns, Sonner, and Radix popover/calendar for the date picker. All other inputs are native HTML styled with Tailwind.

