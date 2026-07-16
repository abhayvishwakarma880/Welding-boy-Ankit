import type { Metadata } from "next";
import GalleryHero from "./GalleryHero";
import GalleryGrid from "./GalleryGrid";
import GalleryCTA from "./GalleryCTA";
import { GALLERY_ITEMS } from "./galleryData";

const BASE_URL = "https://vishwakarmawelding.in";

export const metadata: Metadata = {
  title: "Welding & Fabrication Project Gallery | Vishwakarma Welding Works, Khadda",
  description:
    "Dekhiye hamare completed welding, gate fabrication, window grill, staircase railing aur industrial projects ki gallery. Kushinagar, Uttar Pradesh mein best welding work.",
  keywords: [
    "welding project gallery khadda",
    "gate fabrication photos kushinagar",
    "window grill work khadda",
    "staircase railing fabrication",
    "steel gate design kushinagar",
    "welding work photos uttar pradesh",
    "metal fabrication gallery",
    "industrial welding work khadda",
  ],
  alternates: {
    canonical: `${BASE_URL}/gallery`,
  },
  openGraph: {
    title: "Welding & Fabrication Project Gallery | Vishwakarma Welding Works",
    description:
      "Hamare completed welding, gate, grill aur industrial projects ki gallery dekhiye — Khadda, Kushinagar, UP.",
    url: `${BASE_URL}/gallery`,
    type: "website",
    images: [
      {
        url: `${BASE_URL}/images/gallery/tin-Shade.webp`,
        width: 1200,
        height: 630,
        alt: "Vishwakarma Welding Works Project Gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Welding & Fabrication Project Gallery | Vishwakarma Welding Works",
    description:
      "Hamare completed welding, gate, grill aur industrial projects ki gallery dekhiye — Khadda, Kushinagar, UP.",
    images: [`${BASE_URL}/images/gallery/tin-Shade.webp`],
  },
};

export default function GalleryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Vishwakarma Welding Works — Project Gallery",
    description:
      "Welding, gate fabrication, window grill, staircase railing aur industrial projects ki gallery — Khadda, Kushinagar, UP.",
    url: `${BASE_URL}/gallery`,
    image: GALLERY_ITEMS.map((item) => ({
      "@type": "ImageObject",
      name: item.title,
      description: item.description,
      contentUrl: `${BASE_URL}${item.image}`,
      keywords: item.category,
    })),
    author: {
      "@type": "LocalBusiness",
      name: "Vishwakarma Welding Works",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Khadda",
        addressRegion: "Uttar Pradesh",
        addressCountry: "IN",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <GalleryHero />
        <GalleryGrid />
        <GalleryCTA />
      </main>
    </>
  );
}
