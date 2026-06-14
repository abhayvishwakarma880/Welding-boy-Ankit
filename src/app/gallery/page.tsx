import type { Metadata } from "next";
import GalleryHero from "./GalleryHero";
import GalleryGrid from "./GalleryGrid";
import GalleryCTA from "./GalleryCTA";

export const metadata: Metadata = {
  title: "Project Gallery | Vishwakarma Welding Shop",
  description:
    "Browse our completed welding, fabrication, gate, grill and industrial projects in Kushinagar, Uttar Pradesh.",
  openGraph: {
    title: "Project Gallery | Vishwakarma Welding Shop",
    description:
      "Browse our completed welding, fabrication, gate, grill and industrial projects.",
    url: "https://vishwakarmawelding.com/gallery",
  },
};

export default function GalleryPage() {
  return (
    <main>
      <GalleryHero />
      <GalleryGrid />
      <GalleryCTA />
    </main>
  );
}
