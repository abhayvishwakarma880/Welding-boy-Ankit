import type { Metadata } from "next";
import VideosClient from "./VideosClient";

const BASE_URL = "https://vishwakarmawelding.in";

export const metadata: Metadata = {
  title: "Welding & Fabrication Work Videos | Vishwakarma Welding Works, Khadda",
  description:
    "Dekhiye Shree Vishwakarma Welding Shop ke real welding aur fabrication kaam ke videos — steel gate manufacturing, window grill, staircase railing, industrial welding — Khadda, Kushinagar, Uttar Pradesh.",
  keywords: [
    "welding work video khadda",
    "fabrication video kushinagar",
    "steel gate manufacturing video",
    "window grill work video khadda",
    "welding shop kushinagar video",
    "metal fabrication video uttar pradesh",
    "iron gate welding video khadda",
    "industrial welding video kushinagar",
  ],
  alternates: {
    canonical: `${BASE_URL}/videos`,
  },
  openGraph: {
    title: "Welding & Fabrication Work Videos | Vishwakarma Welding Works",
    description:
      "Real welding aur fabrication kaam ke videos — gate manufacturing, grill work, staircase railing — Khadda, Kushinagar, UP.",
    url: `${BASE_URL}/videos`,
    type: "website",
    images: [
      {
        url: `${BASE_URL}/images/sliders/hero-welding-services-khadda.webp`,
        width: 1200,
        height: 630,
        alt: "Vishwakarma Welding Works — Welding & Fabrication Videos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Welding & Fabrication Work Videos | Vishwakarma Welding Works",
    description:
      "Real welding aur fabrication kaam ke videos — gate manufacturing, grill work — Khadda, Kushinagar, UP.",
    images: [`${BASE_URL}/images/sliders/hero-welding-services-khadda.webp`],
  },
};

export default function VideosPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGallery",
    name: "Vishwakarma Welding Works — Welding & Fabrication Videos",
    description:
      "Steel gate manufacturing, window grill, staircase railing aur industrial welding ke real work videos — Khadda, Kushinagar, Uttar Pradesh.",
    url: `${BASE_URL}/videos`,
    author: {
      "@type": "LocalBusiness",
      name: "Shree Vishwakarma Welding Shop",
      url: BASE_URL,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Khadda",
        addressRegion: "Uttar Pradesh",
        addressCountry: "IN",
      },
    },
    video: [
      {
        "@type": "VideoObject",
        name: "Steel Welding & Fabrication Work — Khadda, Kushinagar",
        description:
          "Shree Vishwakarma Welding Shop ke skilled welders ka real kaam — custom gates, window grills, staircase railings aur industrial fabrication, Khadda, Kushinagar.",
        thumbnailUrl: `${BASE_URL}/images/sliders/hero-welding-services-khadda.webp`,
        contentUrl: `${BASE_URL}/video/video.mp4`,
        uploadDate: "2024-01-01",
        publisher: {
          "@type": "Organization",
          name: "Shree Vishwakarma Welding Shop",
          url: BASE_URL,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <VideosClient />
      </main>
    </>
  );
}
