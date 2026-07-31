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
  {
    id: "g1",
    title: "Industrial Tin Shed Fabrication — Khadda, Kushinagar",
    description: "Heavy-duty tin shed fabricated for industrial use by Vishwakarma Welding Works, Khadda. Strong MS frame with quality roofing sheets.",
    image: "/images/gallery/tin-Shade.webp",
    category: "Industrial Work",
  },
  {
    id: "g2",
    title: "Staircase Safety Railing & Slider — Kushinagar",
    description: "Custom MS railing with sliding mechanism installed on staircase. Safe, durable and professionally welded at Vishwakarma Welding Works.",
    image: "/images/gallery/sidi-pr-slider.webp",
    category: "Staircase Railing",
  },
  {
    id: "g3",
    title: "Residential Main Gate — Iron Gate Fabrication, Khadda",
    description: "Solid iron main gate fabricated for residential property in Khadda, Kushinagar. Custom design with strong welding and smooth finish.",
    image: "/images/gallery/gate.webp",
    category: "Iron Gate",
  },
  {
    id: "g4",
    title: "MS School Bench Fabrication — Metal Sitting Stand",
    description: "Mild steel school bench and sitting stand fabricated with precision welding. Durable, rust-resistant and suitable for schools and institutions.",
    image: "/images/gallery/sitting-stand.jpeg",
    category: "Metal Fabrication",
  },
  {
    id: "g5",
    title: "Heavy Iron Main Gate — Custom Design, Kushinagar",
    description: "Custom-designed heavy iron gate for home entrance. Fabricated with high-grade MS sections and professional welding by Vishwakarma Welding Works.",
    image: "/images/gallery/lohe-ka-gate.png",
    category: "Iron Gate",
  },
  {
    id: "g6",
    title: "Window Security Grill — MS Grill Fabrication, Khadda",
    description: "Strong MS window security grill fabricated and installed for home protection. Clean finish with anti-rust coating, Khadda, Kushinagar.",
    image: "/images/gallery/grill.png",
    category: "Window Grill",
  },
  {
    id: "g7",
    title: "Decorative Window Grill Design — Kushinagar",
    description: "Decorative MS window grill with artistic pattern. Combines security and aesthetics for modern homes in Kushinagar, Uttar Pradesh.",
    image: "/images/gallery/grill-design.png",
    category: "Window Grill",
  },
  {
    id: "g8",
    title: "Modern Window Grill — Steel Fabrication, Khadda",
    description: "Modern steel window grill with geometric design. Professionally fabricated and installed by Vishwakarma Welding Works, Khadda.",
    image: "/images/gallery/grill-design-1.png",
    category: "Window Grill",
  },
  {
    id: "g9",
    title: "Designer Iron Window Grill — Home Security, Kushinagar",
    description: "Designer iron window grill providing both security and visual appeal. Custom fabrication as per customer requirement, Kushinagar UP.",
    image: "/images/gallery/grill-design-2.png",
    category: "Window Grill",
  },
  {
    id: "g10",
    title: "Iron Main Gate with Grill Pattern — Khadda",
    description: "Iron main gate with integrated grill pattern design. Sturdy construction with quality welding for long-lasting performance, Khadda.",
    image: "/images/gallery/lohe-ka-gate-2.png",
    category: "Iron Gate",
  },
  {
    id: "g11",
    title: "Custom Iron Gate Fabrication — Vishwakarma Welding, Kushinagar",
    description: "Custom iron gate fabricated to exact measurements. Premium quality MS material with smooth black finish, Kushinagar, Uttar Pradesh.",
    image: "/images/gallery/lohe-ka-gate-3.png",
    category: "Iron Gate",
  },
  {
    id: "g12",
    title: "Artistic Window Grill Design — MS Fabrication, Khadda",
    description: "Artistic MS window grill with floral pattern design. Enhances home appearance while providing strong security, fabricated in Khadda, Kushinagar.",
    image: "/images/gallery/grill-design-3.png",
    category: "Window Grill",
  },
];
