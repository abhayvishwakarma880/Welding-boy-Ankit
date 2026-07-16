export type Article = {
  slug: string;
  title: string;
  description: string;       // listing page pe dikhta hai (plain text ya short HTML)
  seoDescription?: string;   // meta description — always plain text, 150-160 chars
  category: string;
  date: string;              // display format: "15 Jan 2025"
  isoDate: string;           // JSON-LD ke liye: "2025-01-15"
  readTime: string;
  image: string;
  tags?: string[];
  popular?: boolean;
  featured?: boolean;
  fullContent?: string;      // detail page ka full HTML content
};

export const categories = [
  "All",
  "Main Gates",
  "Grills",
  "Railings",
  "Sheds",
  "Fabrication",
  "Welding Tips",
  "Maintenance",
  "Industrial Work",
];

export const articles: Article[] = [
  {
    slug: "top-benefits-of-tin-shed-fabrication-for-homes-warehouses-commercial-spaces",
    title: "Top Benefits of Tin Shed Fabrication for Homes, Warehouses & Commercial Spaces",
    seoDescription: "Tin shed fabrication ke top benefits janiye — homes, warehouses aur commercial spaces ke liye durable, cost-effective roofing solution. Shree Vishwakarma Welding Shop, Khadda, Kushinagar.",
    description: "<p>Tin sheds have become one of the most popular and cost-effective roofing solutions for residential, commercial, and industrial applications. Whether you need a warehouse shed, workshop shed, parking shed, factory roofing, or agricultural shelter, a professionally fabricated tin shed offers durability, weather protection, and long-term value.</p><p>At Shree Vishwakarma Welding Shop, we specialize in designing and fabricating high-quality tin sheds that are built to withstand harsh weather conditions while maintaining structural strength and reliability.</p><h2>Why Choose a Tin Shed?</h2><p>Tin sheds are widely preferred because they provide excellent protection against sunlight, rain, and other environmental factors. Modern fabrication techniques ensure that the structure remains strong, stable, and aesthetically appealing for years.</p><h3>Key Advantages of Tin Shed Fabrication</h3><h2>Applications of Tin Sheds</h2><p>Tin sheds can be used in a variety of locations and industries due to their flexibility and strength.</p><h2>Quality Fabrication Matters</h2><p>A well-designed tin shed depends on the quality of materials, welding precision, and structural engineering. Using high-grade steel sections and quality roofing sheets ensures maximum durability and safety.</p><p>Our fabrication process focuses on:</p><h2>Why Choose Shree Vishwakarma Welding Shop?</h2><p>Shree Vishwakarma Welding Shop has extensive experience in metal fabrication and custom welding projects. We provide reliable, durable, and affordable tin shed solutions tailored to customer requirements.</p><p>Our commitment to quality workmanship, premium materials, and customer satisfaction has made us a trusted choice for fabrication and welding services.</p><h2>Conclusion</h2><p>A professionally fabricated tin shed is an excellent investment for anyone looking for a durable, economical, and versatile roofing solution. Whether you require a warehouse shed, commercial roofing structure, parking shed, or industrial shelter, choosing experienced fabrication professionals ensures long-lasting performance and value.</p><p>Contact Shree Vishwakarma Welding Shop today to discuss your custom tin shed fabrication requirements and get a solution designed specifically for your needs.</p>",
    category: "Industrial Work",
    date: "15 Jan 2025",
    isoDate: "2025-01-15",
    readTime: "5 Min",
    image: "/images/gallery/tin-Shade.webp",
    tags: ["tin shed", "shed fabrication", "industrial shed", "warehouse shed", "parking shed", "welding khadda", "fabrication kushinagar"],
    featured: true,
    popular: true,
  },
];

export const featuredArticle = articles.find((a) => a.featured)!;
export const latestArticles = articles.filter((a) => !a.featured);
export const popularArticles = articles.filter((a) => a.popular);

export const topics = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    name: "Gates",
    desc: "Residential aur commercial gate solutions.",
    category: "Main Gates",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
    name: "Grills",
    desc: "Security aur decorative grill designs.",
    category: "Grills",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    name: "Railings",
    desc: "Modern aur durable railing ideas.",
    category: "Railings",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      </svg>
    ),
    name: "Sheds",
    desc: "Parking aur industrial shed solutions.",
    category: "Sheds",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    name: "Welding",
    desc: "Professional welding knowledge.",
    category: "Welding Tips",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    name: "Fabrication",
    desc: "Custom metal fabrication guides.",
    category: "Fabrication",
  },
];
