import type { MetadataRoute } from "next";

const BASE_URL = "https://vishwakarmawelding.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/about",
          "/contact",
          "/services/",
          "/gallery",
          "/videos",
          "/blogs",
          "/blog/",
          "/products",
          "/product/",
          "/reviews",
        ],
        disallow: [
          "/api/",
          "/admin/",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
