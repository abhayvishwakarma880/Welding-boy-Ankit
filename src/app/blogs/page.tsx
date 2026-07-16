import type { Metadata } from "next";
import BlogsClient from "./BlogsClient";

export const metadata: Metadata = {
  title: "Welding & Fabrication Blog | Vishwakarma Welding Works, Khadda",
  description:
    "Expert articles on welding, fabrication, iron gates, steel railings, window grills and metal work in Kushinagar, Uttar Pradesh. Tips, guides and industry insights.",
  keywords: [
    "welding blog",
    "fabrication tips",
    "iron gate design",
    "steel railing kushinagar",
    "welding guide hindi",
    "metal fabrication articles",
    "gate design khadda",
    "welding tips kushinagar",
  ],
  alternates: {
    canonical: "https://vishwakarmawelding.in/blogs",
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: "Welding & Fabrication Blog | Vishwakarma Welding Works",
    description:
      "Expert articles on welding, fabrication, gates, grills, railings and industrial metal work in Kushinagar, UP.",
    url: "https://vishwakarmawelding.in/blogs",
    images: [
      {
        url: "https://vishwakarmawelding.in/images/gallery/tin-Shade.webp",
        width: 1200,
        height: 630,
        alt: "Vishwakarma Welding Works Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Welding & Fabrication Blog | Vishwakarma Welding Works",
    description:
      "Expert articles on welding, fabrication, gates, grills, railings and industrial metal work in Kushinagar, UP.",
    images: ["https://vishwakarmawelding.in/images/gallery/tin-Shade.webp"],
  },
};

export default function BlogsPage() {
  return <BlogsClient />;
}
