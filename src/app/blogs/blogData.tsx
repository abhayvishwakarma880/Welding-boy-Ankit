export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  popular?: boolean;
  featured?: boolean;
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
    slug: "complete-guide-main-gate-selection",
    title: "Complete Guide to Choosing the Right Main Gate for Your Home",
    description: "Ghar ke liye sahi gate choose karte samay design, durability, material aur maintenance jaise factors ko samajhna bahut zaroori hai.",
    category: "Main Gates",
    date: "15 Jan 2025",
    readTime: "5 Min",
    image: "/images/blog/main-gate-guide.jpg",
    featured: true,
  },
  {
    slug: "top-main-gate-designs-modern-homes",
    title: "Top Main Gate Designs for Modern Homes",
    description: "Modern homes ke liye popular gate designs aur unke advantages jo aapke ghar ki look badal dete hain.",
    category: "Main Gates",
    date: "12 Jan 2025",
    readTime: "4 Min",
    image: "/images/blog/modern-gate-designs.jpg",
    popular: true,
  },
  {
    slug: "iron-vs-steel-gates-comparison",
    title: "Iron vs Steel Gates: Which One Is Better?",
    description: "Iron aur steel gate ke beech comparison aur selection guide — kaun sa material aapke liye sahi rahega.",
    category: "Main Gates",
    date: "10 Jan 2025",
    readTime: "6 Min",
    image: "/images/blog/iron-vs-steel.jpg",
    popular: true,
  },
  {
    slug: "benefits-custom-fabrication-work",
    title: "Benefits of Custom Fabrication Work",
    description: "Custom fabrication ka use karke aap apni exact requirement ke according durable aur unique metal structures banwa sakte hain.",
    category: "Fabrication",
    date: "08 Jan 2025",
    readTime: "4 Min",
    image: "/images/blog/custom-fabrication.jpg",
    popular: true,
  },
  {
    slug: "how-to-maintain-metal-gates",
    title: "How to Maintain Metal Gates for Long Life",
    description: "Gate maintenance tips aur rust prevention methods jo aapke gate ki life 2x badha dete hain.",
    category: "Maintenance",
    date: "05 Jan 2025",
    readTime: "3 Min",
    image: "/images/blog/gate-maintenance.jpg",
  },
  {
    slug: "balcony-railing-design-guide",
    title: "Choosing the Right Balcony Railing Design",
    description: "Safety aur appearance dono ko dhyan me rakhkar railing selection kaise karein — complete guide.",
    category: "Railings",
    date: "02 Jan 2025",
    readTime: "5 Min",
    image: "/images/blog/balcony-railing.jpg",
    popular: true,
  },
  {
    slug: "shed-installation-guide",
    title: "Things to Know Before Installing a Shed",
    description: "Shed installation se pehle dhyan dene wali important baatein jo aapka time aur paisa dono bachayegi.",
    category: "Sheds",
    date: "28 Dec 2024",
    readTime: "4 Min",
    image: "/images/blog/shed-installation.jpg",
  },
  {
    slug: "best-main-gate-designs-indian-homes",
    title: "Best Main Gate Designs for Indian Homes",
    description: "Indian architecture ke saath match karne wale gate designs jo traditional aur modern dono styles mein available hain.",
    category: "Main Gates",
    date: "25 Dec 2024",
    readTime: "5 Min",
    image: "/images/blog/indian-gate-designs.jpg",
  },
  {
    slug: "welding-structural-strength",
    title: "How Welding Improves Structural Strength",
    description: "Professional welding se structure ki strength aur durability kaise improve hoti hai — technical insights.",
    category: "Welding Tips",
    date: "22 Dec 2024",
    readTime: "6 Min",
    image: "/images/blog/welding-strength.jpg",
  },
  {
    slug: "choosing-security-grills",
    title: "Choosing Security Grills for Your Home",
    description: "Security grills ki selection mein design, thickness, aur locking mechanism — kya dekhna chahiye.",
    category: "Grills",
    date: "18 Dec 2024",
    readTime: "4 Min",
    image: "/images/blog/security-grills.jpg",
  },
  {
    slug: "staircase-railing-ideas",
    title: "Modern Staircase Railing Ideas",
    description: "Ghar ki seedhi ke liye modern aur durable railing designs jo look aur safety dono enhance karein.",
    category: "Railings",
    date: "15 Dec 2024",
    readTime: "3 Min",
    image: "/images/blog/staircase-railing.jpg",
  },
  {
    slug: "common-welding-mistakes",
    title: "Common Welding Mistakes to Avoid",
    description: "Welding karte samay jo galtiyan sabse zyada hoti hain aur unhe kaise avoid karein.",
    category: "Welding Tips",
    date: "12 Dec 2024",
    readTime: "5 Min",
    image: "/images/blog/welding-mistakes.jpg",
  },
  {
    slug: "fabrication-cost-factors",
    title: "Fabrication Cost Factors You Should Know",
    description: "Metal fabrication ka cost kaise decide hota hai — material, design complexity aur labor charges ka breakdown.",
    category: "Fabrication",
    date: "08 Dec 2024",
    readTime: "4 Min",
    image: "/images/blog/fabrication-cost.jpg",
  },
  {
    slug: "industrial-fabrication-basics",
    title: "Industrial Fabrication Basics",
    description: "Industrial metal fabrication kya hoti hai, kahan use hoti hai aur quality standards kya hone chahiye.",
    category: "Industrial Work",
    date: "05 Dec 2024",
    readTime: "6 Min",
    image: "/images/blog/industrial-fabrication.jpg",
  },
  {
    slug: "parking-shed-cost-guide",
    title: "Parking Shed Cost Guide: What to Expect",
    description: "Parking shed banwane mein kitna kharcha aata hai — material, size aur design ke hisab se complete breakdown.",
    category: "Sheds",
    date: "01 Dec 2024",
    readTime: "4 Min",
    image: "/images/blog/parking-shed-cost.jpg",
  },
  {
    slug: "decorative-grill-designs",
    title: "Decorative Grill Designs That Enhance Your Home",
    description: "Security ke saath saath ghar ki sundarata badhane wale decorative grill designs aur unki khasiyat.",
    category: "Grills",
    date: "28 Nov 2024",
    readTime: "3 Min",
    image: "/images/blog/decorative-grills.jpg",
  },
  {
    slug: "gate-rust-prevention-tips",
    title: "Gate Rust Prevention Tips for Long Life",
    description: "Barsaat aur nami se gate ko rust se bachane ke liye practical aur low-cost tips.",
    category: "Maintenance",
    date: "25 Nov 2024",
    readTime: "3 Min",
    image: "/images/blog/rust-prevention.jpg",
  },
  {
    slug: "industrial-shed-construction-guide",
    title: "Industrial Shed Construction: A Complete Guide",
    description: "Factory ya godown ke liye industrial shed banwane se pehle in important points ko zaroor janein.",
    category: "Industrial Work",
    date: "20 Nov 2024",
    readTime: "7 Min",
    image: "/images/blog/industrial-shed.jpg",
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
