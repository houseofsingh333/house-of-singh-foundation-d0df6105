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
  body: string; // placeholder for portable text
  coverImage: string;
}

export interface NewsletterSubscriber {
  email: string;
  subscribedAt: string;
}

export interface SiteSettings {
  spotifyPlaylistUrl: string;
  instagramUrl: string;
  homeHeroMode: "slider" | "static";
}

// --- Navigation (Studio removed from public nav) ---
export const navigation: NavItem[] = [
  { label: "Home", internalRoute: "/", order: 1 },
  { label: "About", internalRoute: "/about", order: 2 },
  { label: "Projects", internalRoute: "/projects", order: 3 },
  { label: "Journal", internalRoute: "/journal", order: 4 },
  { label: "Contact", internalRoute: "/contact", order: 5 },
];

// --- Hero Slides ---
export const heroSlides: HeroSlide[] = [
  { _id: "1", image: "/placeholder.svg", caption: "Slide One", internalLink: "/projects", order: 1 },
  { _id: "2", image: "/placeholder.svg", caption: "Slide Two", externalLink: "https://studios.houseofsingh.com", order: 2 },
  { _id: "3", image: "/placeholder.svg", caption: "Slide Three", order: 3 },
];

// --- Project Categories ---
export const projectCategories: ProjectCategory[] = [
  { _id: "cat1", title: "Design", slug: "design", order: 1 },
  { _id: "cat2", title: "Photography", slug: "photography", order: 2 },
  { _id: "cat3", title: "Collaborations", slug: "collaborations", order: 3 },
];

// --- Projects ---
export const projects: Project[] = [
  {
    _id: "p1", title: "Project Alpha", slug: "project-alpha",
    category: projectCategories[0], year: 2024, featured: true,
    description: "Placeholder description for Project Alpha.",
    gallery: [{ src: "/placeholder.svg", alt: "Alpha image 1" }],
  },
  {
    _id: "p2", title: "Project Beta", slug: "project-beta",
    category: projectCategories[1], year: 2023, featured: false,
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

// --- Journal Entries (upgraded schema) ---
export const journalEntries: JournalEntry[] = [
  { _id: "j1", title: "Exploring Light", slug: "exploring-light", publishedAt: "2024-11-15T10:00:00Z", excerpt: "A short excerpt about exploring light in photography.", body: "Full portable text body placeholder.", coverImage: "/placeholder.svg" },
  { _id: "j2", slug: "2024-10-20", publishedAt: "2024-10-20T10:00:00Z", excerpt: "An untitled journal moment.", body: "Full portable text body placeholder.", coverImage: "/placeholder.svg" },
  { _id: "j3", title: "Studio Notes", slug: "studio-notes", publishedAt: "2024-09-05T10:00:00Z", excerpt: "Notes from a day in the studio.", body: "Full portable text body placeholder.", coverImage: "/placeholder.svg" },
  { _id: "j4", title: "Autumn Walk", slug: "autumn-walk", publishedAt: "2024-08-12T10:00:00Z", excerpt: "Capturing autumn colours on a quiet walk.", body: "Full portable text body placeholder.", coverImage: "/placeholder.svg" },
];

// --- Site Settings ---
export const siteSettings: SiteSettings = {
  spotifyPlaylistUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M",
  instagramUrl: "https://instagram.com/houseofsingh",
  homeHeroMode: "slider",
};
