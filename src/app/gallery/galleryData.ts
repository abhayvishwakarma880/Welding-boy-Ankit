export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

export const GALLERY_CATEGORIES = [
  "All",
  "Steel Gate",
  "Iron Gate",
  "Window Grill",
  "Staircase Railing",
  "Metal Fabrication",
  "Industrial Work",
  "Repair Work",
] as const;

export const GALLERY_ITEMS: GalleryItem[] = [
  // ── Steel Gate ──────────────────────────────────────────────
  {
    id: "g1",
    title: "Tin shed",
    description: "Tin shed industrial work",
    image: "/images/gallery/tin-Shade.webp",
    category: "Industrial Work",
  },
  {
    id: "g2",
    title: "Slider",
    description: "slider at stares work",
    image: "/images/gallery/sidi-pr-slider.webp",
    category: "Industrial Work",
  },
  {
    id: "g3",
    title: "Gate",
    description: "Home gate",
    image: "/images/gallery/gate.webp",
    category: "Iron Gate",
  },
];
