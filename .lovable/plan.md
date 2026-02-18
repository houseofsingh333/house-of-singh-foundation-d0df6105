

## Homepage Intro + Header State Machine

This plan creates a cinematic MP4 intro overlay, then transitions into a two-state header system controlled by scroll position.

---

### Important Note on Video Path

The file exists at `public/HOS Logo Animation.mp4` (project root public folder). In the browser this resolves to `/HOS Logo Animation.mp4`. The requested path `/images/HOS Logo Animation.mp4` does not exist. The implementation will use the correct path. If you later move the file to `public/images/`, the path can be updated in one place.

### Important Note on Crest SVG

No crest SVG file exists in the project. The implementation will use a placeholder inline SVG (a simple monogram or decorative element). You can replace it later with the actual crest asset.

---

### Architecture

```text
State 0 (Intro)          State 1 (Top)           State 2 (Scrolled)
+------------------+     +------------------+    +------------------+
| White overlay    |     | [dot]  crest  [T]|    | [=====strip=====]|
| centered video   | --> | (no background)  | -->| [dot] TEXT   [T] |
| autoplay, muted  |     | crest = 250px    |    | h-68, blur, border|
| onEnded: reveal  |     | 32px from top    |    |                  |
+------------------+     +------------------+    +------------------+
  sessionStorage          scrollY < 20            scrollY >= 60
  hos_intro_seen
```

---

### Files to Create

**1. `src/components/IntroOverlay.tsx`**

New component. Handles the video intro and reveal.

- Full-viewport fixed overlay, z-[60] (above everything)
- Three layers: white background, centered video container, optional edge mask
- Video element: autoplay, muted, playsInline, preload="auto", no controls
- Video container: 480px wide on desktop, 85vw on mobile, overflow-hidden, centered
- object-fit: cover on the video to crop excess edges
- Edge feather: radial or box-shadow inset white gradient to blend video edges into white background
- `onEnded` callback: triggers fade-out (opacity 0 over 500ms), then unmounts
- Session check: reads `sessionStorage.getItem("hos_intro_seen")`. If set, component returns null immediately
- On video end: sets `sessionStorage.setItem("hos_intro_seen", "true")`
- Respects `prefers-reduced-motion`: if enabled, skips intro entirely
- Calls `onComplete` prop when done to signal Layout

**2. `src/components/CrestPlaceholder.tsx`**

A simple inline SVG placeholder for the crest mark. Renders a decorative monogram "HOS" in an editorial style. Width controlled by prop (default 250px). This file exists solely to be swapped with the real crest asset later.

---

### Files to Modify

**3. `src/components/layout/Header.tsx`**

Complete rewrite of the header to support State 1 and State 2.

New props:
- `onMenuToggle: () => void` (existing)
- `introComplete: boolean` -- header hidden until intro finishes

State tracking:
- `scrolled` state: boolean, updated via `useEffect` with scroll listener
- Enter scrolled: `scrollY >= 60`
- Exit scrolled: `scrollY <= 20`
- Hysteresis prevents flickering

State 1 (not scrolled):
- No background strip
- Left: dot icon (nav trigger), same position as now
- Center: Crest SVG, 250px wide, 32px from top edge, fixed
- Right: theme toggle icon (sun/moon)
- All items use `fixed` positioning on same visual row

State 2 (scrolled):
- White strip: h-[68px], `bg-background/95 backdrop-blur-sm`, hairline `border-b border-border`
- Left: dot icon (nav trigger)
- Center: "HOUSE OF SINGH" text (uppercase, tracking-widest, small font)
- Right: theme toggle icon
- No "Menu" text button -- menu is only triggered by dot icon
- Smooth transition between states (opacity + translateY)

Theme toggle:
- Simple sun/moon button that toggles `dark` class on `document.documentElement`
- Uses lucide `Sun` and `Moon` icons
- Minimal styling, matching the editorial aesthetic

**4. `src/components/layout/NavOverlay.tsx`**

Add theme toggle at the top of the overlay panel:
- Position it in the close button row, right-aligned
- Same sun/moon toggle as header
- Proper aria-label: "Toggle theme"

**5. `src/components/layout/Layout.tsx`**

Integration changes:
- Add `introComplete` state, default `false`
- Check `sessionStorage` on mount -- if `hos_intro_seen` exists, set `introComplete` to `true` immediately
- Render `IntroOverlay` conditionally (only when not yet complete)
- Pass `onComplete` to `IntroOverlay` that sets `introComplete` to `true`
- Pass `introComplete` to `Header` so header waits for intro to finish before showing
- Website content (`main`, `Footer`) starts with `opacity-0` and transitions to `opacity-100` when `introComplete` becomes true (the reveal fade-in)

**6. `src/index.css`**

No structural changes needed. The existing `editorialFadeIn` keyframe and tailwind animate utilities cover the fade transitions.

---

### Behavior Summary

1. User visits `/` for the first time in a session
2. White overlay appears with centered video playing the logo animation
3. Video ends: overlay fades out (500ms), site content fades in (500ms), `sessionStorage` flag set
4. Header appears in State 1: crest centered, dot left, theme toggle right, no background
5. User scrolls past 60px: header transitions to State 2 with white strip, text logo, blur
6. User scrolls back above 20px: header returns to State 1
7. On subsequent page loads in same session: intro skipped, site loads directly in State 1
8. `prefers-reduced-motion`: intro skipped entirely

### Accessibility

- Theme toggle: `aria-label="Toggle dark mode"`
- Dot menu: `aria-label="Open menu"` (already exists)
- Video: no `aria` needed as it is decorative and auto-removes
- All keyboard focusable elements maintain tab order

