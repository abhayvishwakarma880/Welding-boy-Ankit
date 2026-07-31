const BASE_URL = "https://vishwakarmawelding.in";

export interface VideoItem {
  src: string;
  category: string;
  title: string;
  description: string;
  shareUrl: string;
}

export const VIDEOS: VideoItem[] = [
  {
    src: "/video/Sliding-Tin-Shade.mp4",
    category: "Sliding Tin Shade",
    title: "Sliding Tin Shade for Rooftop Staircase — Khadda, Kushinagar",
    description: "Custom sliding tin shade fabrication for rooftop staircases (Ghat). Strong MS frame, smooth sliding system, and durable roofing designed for protection against rain and sunlight.",
    shareUrl: `${BASE_URL}/videos`,
  },
  {
    src: "/video/iron-grill.mp4",
    category: "Iron Grill",
    title: "Custom Iron Grill Fabrication — Khadda, Kushinagar",
    description: "High-quality iron window and safety grill fabrication with durable materials, precision welding, and customized designs for residential and commercial properties.",
    shareUrl: `${BASE_URL}/videos`,
  },
  {
    src: "/video/house-railing.mp4",
    category: "House Railing",
    title: "Modern House Railing Fabrication — Khadda, Kushinagar",
    description: "Custom MS and steel railing fabrication for homes with strong welding, premium finishing, and modern designs for balconies, staircases, and terraces.",
    shareUrl: `${BASE_URL}/videos`,
  },
  {
    src: "/video/welding-video.mp4",
    category: "Metal Fabrication",
    title: "Professional Metal Welding Work — Vishwakarma Welding, Khadda",
    description: "Professional metal fabrication and welding work showcasing precision techniques, quality materials, and expert craftsmanship by Vishwakarma Welding Works, Khadda, Kushinagar.",
    shareUrl: `${BASE_URL}/videos`,
  },
  {
    src: "/video/intro.mp4",
    category: "About Us",
    title: "Vishwakarma Welding Works — Welding & Fabrication Shop, Khadda",
    description: "Introduction to Vishwakarma Welding Works — your trusted welding and metal fabrication shop in Khadda, Kushinagar, Uttar Pradesh. Gates, grills, railings, sheds and more.",
    shareUrl: `${BASE_URL}/videos`,
  },
  {
    src: "/video/gate-welding.mp4",
    category: "Iron Gate",
    title: "Iron Gate Welding & Fabrication — Khadda, Kushinagar",
    description: "Step-by-step iron gate welding and fabrication process by Vishwakarma Welding Works. Custom gate designs with strong MS sections, precision welding, and smooth black finish.",
    shareUrl: `${BASE_URL}/videos`,
  },
];
