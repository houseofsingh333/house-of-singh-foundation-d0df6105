# houseofsingh.com — Architecture Blueprint

A personal artist website for a multidisciplinary designer and photographer. An artist archive and living journal.

---

## 1. Route Structure

| Route | Type | Description |
|---|---|---|
| `/` | Page | Homepage with hero (slider or static), intro, projects preview, Spotify embed, studio redirect |
| `/about` | Page | About the artist |
| `/projects` | Page | Filterable project grid/list with category toggle |
| `/projects/[slug]` | Dynamic | Individual project with rich text + gallery |
| `/journal` | Page | Date-ordered journal feed with month/year filtering |
| `/journal/[slug]` | Dynamic | Individual journal entry |
| `/studio` | Redirect | Immediately redirects to `studios.houseofsingh.com` (not in public nav) |
| `/contact` | Page | Simple contact form that saves to Sanity |
| `/admin` | Sanity Studio | Embedded Sanity Studio (protected, not in public nav) |

---

## 2. Folder Structure

```
houseofsingh/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/page.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── journal/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── studio/page.tsx         # Redirect only, not in nav
│   ├── contact/page.tsx
│   └── admin/
│       └── [[...index]]/page.tsx  # Sanity Studio (protected)
├── components/
│   ├── layout/ (Header, NavOverlay, Footer)
│   ├── home/ (HeroSlider, IntroSection, ProjectsPreview, SpotifyEmbed, StudioRedirect)
│   ├── projects/ (ProjectGrid, ProjectList, ProjectCard, CategoryFilter, ViewToggle)
│   ├── journal/ (JournalFeed, JournalCard, DateFilter)
│   ├── contact/ (ContactForm)
│   └── shared/ (PortableText, ImageGallery)
├── sanity/
│   ├── client.ts
│   ├── queries.ts
│   ├── schema/ (index, heroSlide, project, projectCategory, journalEntry, contactSubmission, newsletterSubscriber, siteSettings, navigation)
│   └── sanity.config.ts
├── lib/utils.ts
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
- `internalLink` (string)
- `externalLink` (url)
- `order` (number, required)

### projectCategory
- `title` (string, required)
- `slug` (slug, from title)
- `order` (number)

### project
- `title` (string, required)
- `slug` (slug, from title)
- `category` (reference → projectCategory)
- `year` (number)
- `collaborators` (string)
- `type` (string)
- `featured` (boolean)
- `description` (block — portable text)
- `gallery` (array of images with alt text)

### journalEntry
- `title` (string, optional)
- `slug` (slug, from title or auto-generated from date)
- `publishedAt` (datetime)
- `excerpt` (string)
- `body` (block — portable text)
- `coverImage` (image)

### contactSubmission
- `name` (string)
- `email` (string)
- `reason` (string, options: project query / collaboration / media)
- `message` (text)
- `createdAt` (datetime, auto-populated)

### newsletterSubscriber
- `email` (string, required)
- `subscribedAt` (datetime, auto-populated)

### siteSettings (singleton)
- `spotifyPlaylistUrl` (url)
- `instagramUrl` (url)
- `homeHeroMode` (string, options: slider / static)

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
| `*[_type == "navigation"][0].items \| order(order asc)` | Ordered nav items |
| `*[_type == "heroSlide"] \| order(order asc)` | Hero slides |
| `*[_type == "siteSettings"][0]` | Site settings (includes homeHeroMode) |
| `*[_type == "projectCategory"] \| order(order asc)` | All categories for filters |
| `*[_type == "project"]{..., category->} \| order(year desc)` | All projects with category expanded |
| `*[_type == "project" && category->slug.current == $cat]` | Projects filtered by category slug |
| `*[_type == "project" && slug.current == $slug][0]{..., category->}` | Single project |
| `*[_type == "journalEntry"] \| order(publishedAt desc)` | Journal feed |
| `*[_type == "journalEntry" && slug.current == $slug][0]` | Single journal entry |

---

## 5. Notes

- Studio and Admin routes are NOT in public navigation
- `/admin` should be protected with Sanity auth + optional Vercel password
- Contact form is a simple single-step form (can expand to multi-step later)
- Hero mode (slider vs static) is CMS-controlled via siteSettings
- Categories are a standalone document type for CMS editability
- Newsletter subscriber schema ready for email capture integration
