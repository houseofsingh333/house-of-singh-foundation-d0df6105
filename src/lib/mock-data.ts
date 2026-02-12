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

export interface Project {
  _id: string;
  title: string;
  slug: string;
  category: "design" | "photography" | "collaborations";
  year: number;
  collaborators?: string;
  type?: string;
  featured: boolean;
  description: string;
  gallery: { src: string; alt: string }[];
}

export interface JournalEntry {
  _id: string;
  image: string;
  text: string;
  slug: string;
  createdAt: string;
}

export interface SiteSettings {
  spotifyPlaylistUrl: string;
  instagramUrl: string;
}

export const navigation: NavItem[] = [
  { label: "Home", internalRoute: "/", order: 1 },
  { label: "About", internalRoute: "/about", order: 2 },
  { label: "Projects", internalRoute: "/projects", order: 3 },
  { label: "Journal", internalRoute: "/journal", order: 4 },
  { label: "Studio", externalUrl: "https://studios.houseofsingh.com", order: 5 },
  { label: "Contact", internalRoute: "/contact", order: 6 },
];

export const heroSlides: HeroSlide[] = [
  { _id: "1", image: "/placeholder.svg", caption: "Slide One", internalLink: "/projects", order: 1 },
  { _id: "2", image: "/placeholder.svg", caption: "Slide Two", externalLink: "https://studios.houseofsingh.com", order: 2 },
  { _id: "3", image: "/placeholder.svg", caption: "Slide Three", order: 3 },
];

export const projects: Project[] = [
  {
    _id: "p1", title: "Project Alpha", slug: "project-alpha", category: "design",
    year: 2024, featured: true, description: "Placeholder description for Project Alpha.",
    gallery: [{ src: "/placeholder.svg", alt: "Alpha image 1" }],
  },
  {
    _id: "p2", title: "Project Beta", slug: "project-beta", category: "photography",
    year: 2023, featured: false, description: "Placeholder description for Project Beta.",
    gallery: [{ src: "/placeholder.svg", alt: "Beta image 1" }],
  },
  {
    _id: "p3", title: "Project Gamma", slug: "project-gamma", category: "collaborations",
    year: 2024, collaborators: "Studio XYZ", featured: true,
    description: "Placeholder description for Project Gamma.",
    gallery: [{ src: "/placeholder.svg", alt: "Gamma image 1" }],
  },
  {
    _id: "p4", title: "Project Delta", slug: "project-delta", category: "design",
    year: 2022, featured: false, description: "Placeholder description for Project Delta.",
    gallery: [{ src: "/placeholder.svg", alt: "Delta image 1" }],
  },
];

export const journalEntries: JournalEntry[] = [
  { _id: "j1", image: "/placeholder.svg", text: "First journal entry caption", slug: "entry-one", createdAt: "2024-11-15T10:00:00Z" },
  { _id: "j2", image: "/placeholder.svg", text: "Second journal entry caption", slug: "entry-two", createdAt: "2024-10-20T10:00:00Z" },
  { _id: "j3", image: "/placeholder.svg", text: "Third journal entry caption", slug: "entry-three", createdAt: "2024-09-05T10:00:00Z" },
  { _id: "j4", image: "/placeholder.svg", text: "Fourth journal entry caption", slug: "entry-four", createdAt: "2024-08-12T10:00:00Z" },
];

export const siteSettings: SiteSettings = {
  spotifyPlaylistUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M",
  instagramUrl: "https://instagram.com/houseofsingh",
};
