// Mock data matching Sanity schema shapes for prototyping

export interface NavItem {
  label: string;
  internalRoute?: string;
  externalUrl?: string;
  order: number;
}

export interface HeroSlide {
  _id: string;
  image: string;
  caption?: string;
  internalLink?: string;
  externalLink?: string;
  order: number;
}

export interface ProjectCategory {
  _id: string;
  title: string;
  slug: string;
  order: number;
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  year: number;
  collaborators?: string;
  type?: string;
  featured: boolean;
  description: string;
  gallery: { src: string; alt: string }[];
}

export interface JournalEntry {
  _id: string;
  title?: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  body: string;
  coverImage: string;
}

export interface SpotlightProject {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
}

export interface SiteSettings {
  spotifyPlaylistUrl: string;
  instagramUrl: string;
  homeHeroMode: "slider" | "static";
}

// --- Navigation (includes Studio as external) ---
export const navigation: NavItem[] = [
  { label: "Home", internalRoute: "/", order: 1 },
  { label: "About", internalRoute: "/about", order: 2 },
  { label: "Projects", internalRoute: "/projects", order: 3 },
  { label: "Journal", internalRoute: "/journal", order: 4 },
  { label: "Studio", externalUrl: "https://studios.houseofsingh.com", order: 5 },
  { label: "Contact", internalRoute: "/contact", order: 6 },
];

// --- Hero Slides ---
export const heroSlides: HeroSlide[] = [
  { _id: "1", image: "/placeholder.svg", caption: "Between light and structure", internalLink: "/about", order: 1 },
  { _id: "2", image: "/placeholder.svg", caption: "Quiet observations", internalLink: "/projects/project-alpha", order: 2 },
  { _id: "3", image: "/placeholder.svg", caption: "A slow archive", order: 3 },
];

// --- Project Categories ---
export const projectCategories: ProjectCategory[] = [
  { _id: "cat1", title: "Photography", slug: "photography", order: 1 },
  { _id: "cat2", title: "Design", slug: "design", order: 2 },
  { _id: "cat3", title: "Collaborations", slug: "collaborations", order: 3 },
];

// --- Projects ---
export const projects: Project[] = [
  {
    _id: "p1", title: "Project Alpha", slug: "project-alpha",
    category: projectCategories[1], year: 2024, featured: true,
    description: "Placeholder description for Project Alpha.",
    gallery: [{ src: "/placeholder.svg", alt: "Alpha image 1" }],
  },
  {
    _id: "p2", title: "Project Beta", slug: "project-beta",
    category: projectCategories[0], year: 2023, featured: false,
    description: "Placeholder description for Project Beta.",
    gallery: [{ src: "/placeholder.svg", alt: "Beta image 1" }],
  },
  {
    _id: "p3", title: "Project Gamma", slug: "project-gamma",
    category: projectCategories[2], year: 2024, collaborators: "Studio XYZ", featured: true,
    description: "Placeholder description for Project Gamma.",
    gallery: [{ src: "/placeholder.svg", alt: "Gamma image 1" }],
  },
  {
    _id: "p4", title: "Project Delta", slug: "project-delta",
    category: projectCategories[0], year: 2022, featured: false,
    description: "Placeholder description for Project Delta.",
    gallery: [{ src: "/placeholder.svg", alt: "Delta image 1" }],
  },
];

// --- Spotlight ---
export const spotlightProject: SpotlightProject = {
  _id: "sp1",
  title: "The Weight of Stillness",
  slug: "project-alpha",
  description: "A photographic study on the interplay of silence and architecture. Shot across three cities over two years.",
  image: "/placeholder.svg",
};

// --- Journal Entries ---
export const journalEntries: JournalEntry[] = [
  // 2026
  { _id: "j30", title: "Winter Stillness", slug: "winter-stillness", publishedAt: "2026-02-10T10:00:00Z", excerpt: "Silence between snowfalls, captured in monochrome.", body: "Full portable text body placeholder.", coverImage: "/placeholder.svg" },
  { _id: "j29", title: "New Beginnings", slug: "new-beginnings", publishedAt: "2026-01-08T10:00:00Z", excerpt: "Reflections on starting another year with intention.", body: "Full portable text body placeholder.", coverImage: "/placeholder.svg" },
  // 2025
  { _id: "j28", title: "Year's End", slug: "years-end", publishedAt: "2025-12-18T10:00:00Z", excerpt: "A quiet closing to a year of observation.", body: "Full portable text body placeholder.", coverImage: "/placeholder.svg" },
  { _id: "j27", title: "First Snow", slug: "first-snow", publishedAt: "2025-11-22T10:00:00Z", excerpt: "The city under its first blanket of white.", body: "Full portable text body placeholder.", coverImage: "/placeholder.svg" },
  { _id: "j26", title: "Golden Hour", slug: "golden-hour-2025", publishedAt: "2025-10-05T10:00:00Z", excerpt: "Chasing the last warm light of autumn.", body: "Full portable text body placeholder.", coverImage: "/placeholder.svg" },
  { _id: "j25", title: "Concrete Poetry", slug: "concrete-poetry", publishedAt: "2025-08-14T10:00:00Z", excerpt: "Finding verse in brutalist architecture.", body: "Full portable text body placeholder.", coverImage: "/placeholder.svg" },
  { _id: "j24", title: "Summer Archive", slug: "summer-archive", publishedAt: "2025-06-20T10:00:00Z", excerpt: "A collection of fleeting summer moments.", body: "Full portable text body placeholder.", coverImage: "/placeholder.svg" },
  { _id: "j23", title: "Studio Morning", slug: "studio-morning", publishedAt: "2025-03-11T10:00:00Z", excerpt: "Early light through studio windows.", body: "Full portable text body placeholder.", coverImage: "/placeholder.svg" },
  { _id: "j22", title: "February Fog", slug: "february-fog", publishedAt: "2025-02-04T10:00:00Z", excerpt: "Wandering through mist-covered streets.", body: "Full portable text body placeholder.", coverImage: "/placeholder.svg" },
  // 2024
  { _id: "j1", title: "Exploring Light", slug: "exploring-light", publishedAt: "2024-11-15T10:00:00Z", excerpt: "A short excerpt about exploring light in photography.", body: "Full portable text body placeholder.", coverImage: "/placeholder.svg" },
  { _id: "j2", slug: "2024-10-20", publishedAt: "2024-10-20T10:00:00Z", excerpt: "An untitled journal moment.", body: "Full portable text body placeholder.", coverImage: "/placeholder.svg" },
  { _id: "j3", title: "Studio Notes", slug: "studio-notes", publishedAt: "2024-09-05T10:00:00Z", excerpt: "Notes from a day in the studio.", body: "Full portable text body placeholder.", coverImage: "/placeholder.svg" },
  { _id: "j4", title: "Autumn Walk", slug: "autumn-walk", publishedAt: "2024-08-12T10:00:00Z", excerpt: "Capturing autumn colours on a quiet walk.", body: "Full portable text body placeholder.", coverImage: "/placeholder.svg" },
  { _id: "j5", title: "Light & Shadow", slug: "light-and-shadow", publishedAt: "2024-05-19T10:00:00Z", excerpt: "Interplay of contrast in urban spaces.", body: "Full portable text body placeholder.", coverImage: "/placeholder.svg" },
  { _id: "j6", title: "Spring Palette", slug: "spring-palette", publishedAt: "2024-03-22T10:00:00Z", excerpt: "Soft pastels emerging after the grey.", body: "Full portable text body placeholder.", coverImage: "/placeholder.svg" },
  { _id: "j7", title: "New Year Quiet", slug: "new-year-quiet", publishedAt: "2024-01-10T10:00:00Z", excerpt: "The gentle silence of January streets.", body: "Full portable text body placeholder.", coverImage: "/placeholder.svg" },
  // 2023
  { _id: "j8", title: "December Reflections", slug: "december-reflections", publishedAt: "2023-12-20T10:00:00Z", excerpt: "Looking back on a year through the lens.", body: "Full portable text body placeholder.", coverImage: "/placeholder.svg" },
  { _id: "j9", title: "Harvest Light", slug: "harvest-light", publishedAt: "2023-09-15T10:00:00Z", excerpt: "Warm tones of late September.", body: "Full portable text body placeholder.", coverImage: "/placeholder.svg" },
  { _id: "j10", title: "Midyear Notes", slug: "midyear-notes", publishedAt: "2023-06-01T10:00:00Z", excerpt: "Observations from the middle of the year.", body: "Full portable text body placeholder.", coverImage: "/placeholder.svg" },
  { _id: "j11", title: "Thaw", slug: "thaw-2023", publishedAt: "2023-03-08T10:00:00Z", excerpt: "Ice retreating, colour returning.", body: "Full portable text body placeholder.", coverImage: "/placeholder.svg" },
  // 2022
  { _id: "j12", title: "Winter Diary", slug: "winter-diary", publishedAt: "2022-12-10T10:00:00Z", excerpt: "A personal account of the coldest month.", body: "Full portable text body placeholder.", coverImage: "/placeholder.svg" },
  { _id: "j13", title: "Autumn Textures", slug: "autumn-textures", publishedAt: "2022-10-18T10:00:00Z", excerpt: "Bark, stone, and fallen leaves.", body: "Full portable text body placeholder.", coverImage: "/placeholder.svg" },
  { _id: "j14", title: "Summer in the City", slug: "summer-city", publishedAt: "2022-07-22T10:00:00Z", excerpt: "Heat rising from asphalt, long shadows.", body: "Full portable text body placeholder.", coverImage: "/placeholder.svg" },
  { _id: "j15", title: "Early Spring", slug: "early-spring-2022", publishedAt: "2022-04-02T10:00:00Z", excerpt: "First signs of green after a long winter.", body: "Full portable text body placeholder.", coverImage: "/placeholder.svg" },
  // 2021
  { _id: "j16", title: "Year in Review", slug: "year-review-2021", publishedAt: "2021-12-28T10:00:00Z", excerpt: "A visual summary of twelve months.", body: "Full portable text body placeholder.", coverImage: "/placeholder.svg" },
  { _id: "j17", title: "Quiet Observations", slug: "quiet-observations", publishedAt: "2021-09-14T10:00:00Z", excerpt: "Small moments, carefully noticed.", body: "Full portable text body placeholder.", coverImage: "/placeholder.svg" },
  { _id: "j18", title: "Solstice", slug: "solstice-2021", publishedAt: "2021-06-21T10:00:00Z", excerpt: "The longest day, the softest light.", body: "Full portable text body placeholder.", coverImage: "/placeholder.svg" },
  { _id: "j19", title: "Renewal", slug: "renewal-2021", publishedAt: "2021-03-05T10:00:00Z", excerpt: "Rediscovering familiar places with fresh eyes.", body: "Full portable text body placeholder.", coverImage: "/placeholder.svg" },
];

// --- Site Settings ---
export const siteSettings: SiteSettings = {
  spotifyPlaylistUrl: "https://open.spotify.com/embed/playlist/5siljeAcGgaINDEqVRBsAg?utm_source=generator",
  instagramUrl: "https://instagram.com/houseofsingh",
  homeHeroMode: "slider",
};
