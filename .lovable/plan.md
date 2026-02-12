

# houseofsingh.com — Architecture Blueprint

A personal artist website for a multidisciplinary designer and photographer. An artist archive and living journal.

---

## 1. Route Structure

| Route | Type | Description |
|---|---|---|
| `/` | Page | Homepage with hero slider, intro, projects preview, Spotify embed, studio redirect |
| `/about` | Page | About the artist |
| `/projects` | Page | Filterable project grid/list with category toggle |
| `/projects/[slug]` | Dynamic | Individual project with rich text + gallery |
| `/journal` | Page | Date-ordered journal feed with month/year filtering |
| `/journal/[slug]` | Dynamic | Individual journal entry |
| `/studio` | Redirect | Immediately redirects to `studios.houseofsingh.com` |
| `/contact` | Page | Multi-step form that saves to Sanity |
| `/studio-sanity` | Sanity Studio | Embedded Sanity Studio (Next.js Sanity plugin) |

---

## 2. Folder Structure

```
houseofsingh/
├── app/
│   ├── layout.tsx              # Root layout, global nav, fonts
│   ├── page.tsx                # Homepage
│   ├── about/page.tsx
│   ├── projects/
│   │   ├── page.tsx            # Project listing with filters
│   │   └── [slug]/page.tsx     # Project detail
│   ├── journal/
│   │   ├── page.tsx            # Journal feed
│   │   └── [slug]/page.tsx     # Journal entry detail
│   ├── studio/page.tsx         # Redirect to external URL
│   ├── contact/page.tsx        # Multi-step contact form
│   └── studio-sanity/
│       └── [[...index]]/page.tsx  # Embedded Sanity Studio
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Logo + menu icon
│   │   ├── NavOverlay.tsx      # Left-side slide-out menu
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── HeroSlider.tsx      # CMS-driven ordered slides
│   │   ├── IntroSection.tsx
│   │   ├── ProjectsPreview.tsx
│   │   ├── SpotifyEmbed.tsx
│   │   └── StudioRedirect.tsx
│   ├── projects/
│   │   ├── ProjectGrid.tsx
│   │   ├── ProjectList.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── CategoryFilter.tsx
│   │   └── ViewToggle.tsx
│   ├── journal/
│   │   ├── JournalFeed.tsx
│   │   ├── JournalCard.tsx
│   │   └── DateFilter.tsx
│   ├── contact/
│   │   ├── ContactForm.tsx     # Multi-step controller
│   │   ├── StepReason.tsx      # Step 1: choose reason
│   │   └── StepDetails.tsx     # Step 2: dynamic fields
│   └── shared/
│       ├── PortableText.tsx    # Rich text renderer
│       └── ImageGallery.tsx
├── sanity/
│   ├── client.ts               # Sanity client config
│   ├── queries.ts              # All GROQ queries
│   ├── schema/
│   │   ├── index.ts            # Schema export barrel
│   │   ├── heroSlide.ts
│   │   ├── project.ts
│   │   ├── journalEntry.ts
│   │   ├── contactSubmission.ts
│   │   ├── siteSettings.ts
│   │   └── navigation.ts
│   └── sanity.config.ts
├── lib/
│   └── utils.ts
├── public/
├── next.config.js
├── tailwind.config.ts
└── package.json
```

---

## 3. Sanity CMS Schemas

### heroSlide
- `image` (image, required)
- `caption` (string)
- `internalLink` (string — internal route path)
- `externalLink` (url)
- `order` (number, required — manual sort)

### project
- `title` (string, required)
- `slug` (slug, from title)
- `category` (string, options: design / photography / collaborations)
- `year` (number)
- `collaborators` (string)
- `type` (string)
- `featured` (boolean)
- `description` (block — portable text / rich text)
- `gallery` (array of images with alt text)

### journalEntry
- `image` (image)
- `text` (string — short caption)
- `slug` (slug, auto-generated)
- `createdAt` (datetime, auto-populated)

### contactSubmission
- `name` (string)
- `email` (string)
- `reason` (string, options: project query / collaboration / media)
- `answers` (object — dynamic key-value pairs based on reason)
- `createdAt` (datetime, auto-populated)

### siteSettings (singleton)
- `spotifyPlaylistUrl` (url)
- `instagramUrl` (url)

### navigation (singleton)
- `items` (array of objects):
  - `label` (string)
  - `internalRoute` (string)
  - `externalUrl` (url)
  - `order` (number)

---

## 4. Key GROQ Queries

| Query | Purpose |
|---|---|
| `*[_type == "navigation"][0].items \| order(order asc)` | Fetch ordered nav items |
| `*[_type == "heroSlide"] \| order(order asc)` | Fetch hero slides in order |
| `*[_type == "project"] \| order(year desc)` | All projects |
| `*[_type == "project" && category == $cat]` | Projects filtered by category |
| `*[_type == "project" && slug.current == $slug][0]` | Single project by slug |
| `*[_type == "journalEntry"] \| order(createdAt desc)` | Journal feed |
| `*[_type == "journalEntry" && slug.current == $slug][0]` | Single journal entry |
| `*[_type == "siteSettings"][0]` | Site settings singleton |

---

## 5. Page Architecture Details

### Homepage
- **Hero**: Full-viewport slider, CMS-ordered slides, each with optional link (internal or external). Server component fetches slides.
- **Intro**: Static placeholder section for artist statement.
- **Projects Preview**: Fetch featured projects, display as a preview row/grid.
- **Spotify Embed**: Pull playlist URL from siteSettings, render iframe embed.
- **Studio Redirect**: CTA section linking to `studios.houseofsingh.com`.

### Projects Page
- Server component fetches all projects + unique categories.
- Client component handles category filter tabs and grid/list view toggle.
- Cards show image, title, category, year.

### Project Detail
- Server component fetches by slug.
- Renders portable text body + scrollable image gallery.
- Featured badge if `featured === true`.

### Journal Page
- Server component fetches entries ordered by date.
- Client component for month/year filter.
- Visual feed layout (image + short text).

### Contact Page
- Fully client-side multi-step form.
- Step 1: Select reason (project query / collaboration / media).
- Step 2: Dynamic fields change based on selected reason.
- On submit: POST to a Next.js API route that writes a `contactSubmission` document to Sanity via the mutations API.

### Navigation
- Fetched from Sanity `navigation` singleton in root layout (server component).
- Passed to `Header` and `NavOverlay` components.
- Each item renders as internal `<Link>` or external `<a>` based on which field is populated.
- `/studio` nav item uses `externalUrl` pointing to `studios.houseofsingh.com`.

---

## 6. Performance Strategy

- All listing and detail pages are **server components** by default.
- Interactive elements (filters, form, slider) are client components with `"use client"`.
- Sanity fetches use `next: { revalidate: 60 }` for ISR-style caching.
- Images served through `next/image` with Sanity image URL loader.
- No UI framework — just Tailwind CSS utility classes with minimal, neutral styling.

---

## 7. Where Content Gets Refined Later

- **Typography & visual design**: All pages use placeholder text and minimal styling. Typography system, spacing scale, and color palette to be designed after architecture is validated.
- **Hero animations/transitions**: Slider interaction patterns to be refined.
- **Gallery component**: Lightbox behavior, layout options to be designed.
- **Contact form fields**: Exact dynamic fields per reason to be defined.
- **About page content structure**: Sections and layout TBD based on content.

