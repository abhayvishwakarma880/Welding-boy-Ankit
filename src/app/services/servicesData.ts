export type ServiceData = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage: string;
  h1: string;
  overview: string;
  benefits: { title: string; desc: string }[];
  process: { step: string; desc: string }[];
  whyUs: string[];
  areas: string[];
  faqs: { q: string; a: string }[];
};

export const SERVICES: ServiceData[] = [
  {
    slug: "steel-welding",
    title: "Steel Welding",
    metaTitle: "Steel Welding Services in Khadda, Kushinagar | Vishwakarma Welding",
    metaDescription:
      "Professional steel welding services in Khadda, Kushinagar. Strong, durable and high-quality welding solutions for residential, commercial and industrial projects.",
    keywords: [
      "steel welding khadda",
      "welding services kushinagar",
      "professional welder khadda",
      "steel fabrication kushinagar",
      "welding contractor khadda",
    ],
    ogImage: "/images/sliders/01.webp",
    h1: "Steel Welding Services in Khadda, Kushinagar",
    overview:
      "Shree Vishwakarma Welding Shop provides expert steel welding services in Khadda, Kushinagar and surrounding areas. With years of hands-on experience, our skilled welders handle all types of steel welding work — from small household repairs to large commercial and industrial projects. We use modern welding techniques including MIG, TIG and arc welding to deliver strong, clean and long-lasting welds on every project.",
    benefits: [
      { title: "High Strength Welds", desc: "Our welds are tested for durability and designed to withstand heavy load and stress." },
      { title: "Precision Work", desc: "Every joint is crafted with care to ensure proper alignment, finish and strength." },
      { title: "All Steel Types", desc: "We work with mild steel, stainless steel, structural steel and more." },
      { title: "On-Time Delivery", desc: "We respect your timeline and always aim to complete projects on schedule." },
      { title: "Affordable Rates", desc: "Competitive pricing without compromising on quality of work." },
      { title: "Experienced Team", desc: "Our welders have years of experience in residential, commercial and industrial welding." },
    ],
    process: [
      { step: "Consultation", desc: "We discuss your requirement, site conditions and material specifications." },
      { step: "Material Sourcing", desc: "Quality steel materials are sourced and verified before work begins." },
      { step: "Welding & Fabrication", desc: "Precise welding is carried out using the appropriate technique for your project." },
      { step: "Quality Check", desc: "Every weld is inspected for strength, finish and safety compliance." },
      { step: "Finishing", desc: "Grinding, polishing and surface treatment to give a clean final look." },
      { step: "Delivery & Installation", desc: "Final product is delivered and installed at your site as required." },
    ],
    whyUs: [
      "10+ years of welding experience in Khadda and Kushinagar",
      "Certified and skilled welders on every project",
      "We use quality-grade steel and welding materials",
      "Transparent pricing with no hidden charges",
      "On-site welding available for your convenience",
      "Strong customer support and after-service assistance",
    ],
    areas: ["Khadda", "Kushinagar", "Siswa", "Sabaya", "Nebua Naurangia", "Ghughuli", "Kaptanganj", "Ramkola"],
    faqs: [
      { q: "What types of steel welding do you offer?", a: "We offer MIG welding, TIG welding, arc welding and structural steel welding for all residential, commercial and industrial needs." },
      { q: "Do you provide on-site welding services?", a: "Yes, we offer on-site welding services in Khadda, Kushinagar and nearby areas." },
      { q: "How long does a welding project take?", a: "Project duration depends on scope. Small repairs take a few hours while large structural work may take 2–5 days." },
      { q: "Is your welding work guaranteed?", a: "Yes, we stand behind our work and offer service support for any issues post-completion." },
      { q: "What is the cost of steel welding services?", a: "Pricing depends on the type and size of the project. Contact us for a free estimate." },
    ],
  },
  {
    slug: "metal-fabrication",
    title: "Metal Fabrication",
    metaTitle: "Metal Fabrication Services in Khadda, Kushinagar | Vishwakarma Welding",
    metaDescription:
      "Custom metal fabrication services in Khadda, Kushinagar. We design and manufacture durable steel structures, frames and fabrication projects.",
    keywords: [
      "metal fabrication khadda",
      "steel fabrication kushinagar",
      "custom metal work khadda",
      "fabrication services kushinagar",
    ],
    ogImage: "/images/sliders/02.webp",
    h1: "Metal Fabrication Services in Khadda, Kushinagar",
    overview:
      "Shree Vishwakarma Welding Shop specializes in custom metal fabrication services across Khadda and Kushinagar. We work with steel, iron and other metals to create structures, frames, supports and custom parts tailored to your exact requirements. Whether you need a simple frame or a complex industrial structure, our fabrication team delivers precision work every time.",
    benefits: [
      { title: "Custom Fabrication", desc: "Every piece is built to your exact dimensions and specifications." },
      { title: "Structural Strength", desc: "Fabricated parts are built to carry load and withstand long-term use." },
      { title: "Wide Metal Range", desc: "We work with mild steel, stainless steel, aluminium and iron." },
      { title: "Design Flexibility", desc: "We accommodate complex designs and unique structural requirements." },
      { title: "Clean Finish", desc: "Smooth surface finish with proper grinding and polishing." },
      { title: "Quick Turnaround", desc: "Efficient production process for faster project completion." },
    ],
    process: [
      { step: "Design Review", desc: "We review your drawings or help create a design based on your needs." },
      { step: "Material Selection", desc: "Appropriate metal grade and thickness is selected for your project." },
      { step: "Cutting & Shaping", desc: "Metal is cut, bent and shaped with precision equipment." },
      { step: "Welding & Assembly", desc: "Components are welded together with precision and care." },
      { step: "Surface Treatment", desc: "Grinding, buffing and surface coating applied as required." },
      { step: "Delivery", desc: "Fabricated structures are delivered and installed at your location." },
    ],
    whyUs: [
      "Custom designs built to your exact specifications",
      "Experienced fabrication team with attention to detail",
      "High-quality materials for long-lasting results",
      "Residential, commercial and industrial fabrication",
      "Competitive pricing with free consultations",
      "Serving Khadda, Kushinagar and all nearby districts",
    ],
    areas: ["Khadda", "Kushinagar", "Siswa", "Sabaya", "Nebua Naurangia", "Ghughuli", "Kaptanganj", "Ramkola"],
    faqs: [
      { q: "Can you fabricate custom-designed metal structures?", a: "Yes, we specialize in custom fabrication based on your drawings or requirements." },
      { q: "What metals do you work with?", a: "We work with mild steel, stainless steel, iron, aluminium and other common metals." },
      { q: "Do you provide fabrication for industrial use?", a: "Yes, we handle industrial-grade fabrication projects including heavy structures and machine parts." },
      { q: "Can you match a specific design or pattern?", a: "Yes, we work from customer-provided designs, sketches or dimensions." },
      { q: "What is the typical lead time for fabrication work?", a: "Most projects are completed in 3–7 working days. Larger projects may take longer." },
    ],
  },
  {
    slug: "gate-grill",
    title: "Gate & Grill",
    metaTitle: "Gate & Grill Fabrication in Khadda, Kushinagar | Vishwakarma Welding",
    metaDescription:
      "Custom steel gates and grill fabrication services in Khadda, Kushinagar. Modern, durable and secure designs for homes and businesses.",
    keywords: [
      "gate fabrication khadda",
      "steel grill khadda",
      "gate welding kushinagar",
      "grill fabrication kushinagar",
      "iron gate khadda",
      "window grill kushinagar",
    ],
    ogImage: "/images/sliders/03.webp",
    h1: "Gate & Grill Fabrication in Khadda, Kushinagar",
    overview:
      "Looking for strong and stylish gates or grills for your home or business? Shree Vishwakarma Welding Shop provides premium gate and grill fabrication services in Khadda, Kushinagar. We design and manufacture sliding gates, swing gates, window grills, staircase railings and boundary grills — all crafted with durable steel and finished with clean precision. Security and aesthetics go hand in hand with our work.",
    benefits: [
      { title: "Custom Gate Designs", desc: "Modern, traditional and ornamental gate designs crafted to your taste." },
      { title: "Window & Door Grills", desc: "Strong window grills that enhance security without blocking light." },
      { title: "Sliding & Swing Gates", desc: "Both manual and automated gate options available." },
      { title: "Rust-Resistant Coating", desc: "Anti-rust paint and powder coating for long-lasting durability." },
      { title: "Secure & Sturdy", desc: "Heavy-gauge steel used for maximum security and strength." },
      { title: "Aesthetic Designs", desc: "Decorative patterns and modern styles to enhance your property's look." },
    ],
    process: [
      { step: "Design Consultation", desc: "We discuss your preferences, size and security requirements." },
      { step: "Design Finalization", desc: "A design is finalized based on your style and budget." },
      { step: "Material Cutting", desc: "Steel is precision-cut to the required dimensions." },
      { step: "Welding & Shaping", desc: "Components are welded and shaped with care." },
      { step: "Surface Finishing", desc: "Anti-rust treatment, painting or powder coating applied." },
      { step: "Installation", desc: "Gate or grill is installed at your site with proper fitting." },
    ],
    whyUs: [
      "Years of experience in gate and grill fabrication",
      "100+ custom gate designs executed in Kushinagar",
      "Heavy-duty steel for maximum security",
      "Professional installation by trained workers",
      "Anti-rust and weather-resistant finishing",
      "Affordable pricing with free design consultation",
    ],
    areas: ["Khadda", "Kushinagar", "Siswa", "Sabaya", "Nebua Naurangia", "Ghughuli", "Kaptanganj", "Ramkola"],
    faqs: [
      { q: "Do you make custom gate designs?", a: "Yes, we create fully custom gate designs based on your style, size and security requirements." },
      { q: "What type of gates do you manufacture?", a: "We make sliding gates, swing gates, single-leaf and double-leaf gates for residential and commercial use." },
      { q: "Do you also make window and staircase grills?", a: "Yes, we fabricate window grills, door grills, staircase railings and boundary grills." },
      { q: "What finishing options are available?", a: "We offer standard painting, anti-rust coating and powder coating options." },
      { q: "Do you provide installation services?", a: "Yes, we install gates and grills at your site as part of the service." },
    ],
  },
  {
    slug: "industrial-work",
    title: "Industrial Work",
    metaTitle: "Industrial Fabrication Services in Khadda, Kushinagar | Vishwakarma Welding",
    metaDescription:
      "Heavy-duty industrial fabrication and welding solutions in Khadda, Kushinagar. Reliable services for factories, warehouses and industrial projects.",
    keywords: [
      "industrial fabrication khadda",
      "industrial welding kushinagar",
      "factory fabrication khadda",
      "heavy duty welding kushinagar",
      "industrial steel work khadda",
    ],
    ogImage: "/images/sliders/01.webp",
    h1: "Industrial Fabrication & Welding Services in Khadda, Kushinagar",
    overview:
      "Shree Vishwakarma Welding Shop delivers heavy-duty industrial fabrication and welding services to factories, warehouses and industrial units in Khadda and Kushinagar. Our team handles large-scale structural steel work, machinery supports, platform fabrication, industrial sheds and more. We understand the demands of industrial environments and deliver solutions that are built to last under tough conditions.",
    benefits: [
      { title: "Heavy-Duty Structures", desc: "We fabricate robust structures designed for heavy industrial load." },
      { title: "Factory & Warehouse Work", desc: "Structural steel, columns, beams and mezzanine floors for industrial spaces." },
      { title: "Machine Supports", desc: "Custom machine bases, supports and mounts fabricated to spec." },
      { title: "Shed Fabrication", desc: "Industrial shed and roofing structures built with quality materials." },
      { title: "Safety Compliance", desc: "All work is executed with safety standards and load-bearing calculations." },
      { title: "On-Site Execution", desc: "Our team works directly at your industrial site for large projects." },
    ],
    process: [
      { step: "Site Assessment", desc: "We visit your site to understand the scope and structural requirements." },
      { step: "Engineering Review", desc: "Load requirements and design specifications are reviewed." },
      { step: "Material Procurement", desc: "Industrial-grade steel and materials are sourced." },
      { step: "Fabrication", desc: "Structural components are cut, shaped and welded in our workshop." },
      { step: "On-Site Assembly", desc: "Components are transported and assembled at your site." },
      { step: "Inspection & Handover", desc: "Final quality check and project handover with documentation." },
    ],
    whyUs: [
      "Experienced in large-scale industrial projects",
      "Industrial-grade materials and welding techniques",
      "On-site team available for factory and warehouse work",
      "Strict safety standards followed on every project",
      "Competitive rates for bulk and long-term contracts",
      "Trusted by local businesses across Kushinagar district",
    ],
    areas: ["Khadda", "Kushinagar", "Siswa", "Sabaya", "Nebua Naurangia", "Ghughuli", "Kaptanganj", "Ramkola"],
    faqs: [
      { q: "Do you handle large industrial fabrication projects?", a: "Yes, we specialize in large-scale industrial fabrication including structural steel, sheds and factory infrastructure." },
      { q: "Can you work directly at our factory or warehouse?", a: "Yes, we deploy teams for on-site industrial fabrication and installation work." },
      { q: "What types of industrial structures do you build?", a: "We build mezzanine floors, machine supports, storage racks, sheds, columns and beams for industrial use." },
      { q: "Do you follow safety standards for industrial work?", a: "Yes, all industrial work is carried out following applicable safety and structural standards." },
      { q: "Do you take long-term industrial maintenance contracts?", a: "Yes, we offer maintenance contracts for industrial clients requiring regular welding and repair work." },
    ],
  },
  {
    slug: "repair-services",
    title: "Repair Services",
    metaTitle: "Metal Repair & Welding Services in Khadda, Kushinagar | Vishwakarma Welding",
    metaDescription:
      "Quick and professional welding repair services in Khadda, Kushinagar. Metal repairs, gate repairs, grill repairs and maintenance solutions.",
    keywords: [
      "welding repair khadda",
      "metal repair kushinagar",
      "gate repair khadda",
      "grill repair kushinagar",
      "welding maintenance khadda",
      "iron repair kushinagar",
    ],
    ogImage: "/images/sliders/02.webp",
    h1: "Metal Repair & Welding Services in Khadda, Kushinagar",
    overview:
      "Broken gate, damaged grill or cracked metal structure? Shree Vishwakarma Welding Shop provides fast and reliable metal repair and welding services across Khadda and Kushinagar. Our repair team handles all types of metal damage — cracks, breaks, corrosion and structural failure. We restore your metal structures to full strength quickly and affordably so you don't have to replace them entirely.",
    benefits: [
      { title: "Quick Repairs", desc: "Most repair work is completed the same day or within 24 hours." },
      { title: "Gate & Grill Repairs", desc: "Fix broken hinges, bent bars, rusted joints and more." },
      { title: "Structural Repair", desc: "Cracked or broken structural metal elements are welded and reinforced." },
      { title: "On-Site Service", desc: "We come to your location for repairs — no need to transport heavy items." },
      { title: "Cost-Effective", desc: "Repairing saves money compared to full replacement." },
      { title: "Long-Lasting Fix", desc: "We don't just patch — we ensure the repaired section is stronger than before." },
    ],
    process: [
      { step: "Damage Assessment", desc: "We inspect the damaged area and assess the best repair approach." },
      { step: "Surface Preparation", desc: "Rust, dirt and paint are removed to expose clean metal for welding." },
      { step: "Welding & Repair", desc: "Crack or break is welded, reinforced and reshaped as needed." },
      { step: "Grinding & Finishing", desc: "Repaired area is ground smooth and finished to blend with the original." },
      { step: "Anti-Rust Treatment", desc: "Rust-resistant primer or coating applied to prevent future damage." },
      { step: "Final Inspection", desc: "We test and verify the repair before handing it back to you." },
    ],
    whyUs: [
      "Fast response time for urgent repair needs",
      "On-site repair service in Khadda and Kushinagar",
      "Experienced team handles all types of metal damage",
      "Affordable repair pricing with no hidden costs",
      "We restore strength — not just appearance",
      "Available for residential, commercial and industrial repairs",
    ],
    areas: ["Khadda", "Kushinagar", "Siswa", "Sabaya", "Nebua Naurangia", "Ghughuli", "Kaptanganj", "Ramkola"],
    faqs: [
      { q: "Can you repair broken or cracked gates?", a: "Yes, we repair all types of gate damage including broken hinges, bent bars and cracked frames." },
      { q: "Do you offer on-site repair services?", a: "Yes, we come to your location in Khadda, Kushinagar and nearby areas for on-site metal repair." },
      { q: "How long does a typical metal repair take?", a: "Most repairs are completed within a few hours. Complex structural repairs may take 1–2 days." },
      { q: "Can you repair rusted metal structures?", a: "Yes, we remove rust, weld and reinforce the structure and apply anti-rust coating." },
      { q: "Is it better to repair or replace a damaged gate?", a: "In most cases, repair is more cost-effective. We assess the condition and give you an honest recommendation." },
    ],
  },
  {
    slug: "custom-design",
    title: "Custom Design",
    metaTitle: "Custom Metal Design & Fabrication in Khadda, Kushinagar | Vishwakarma Welding",
    metaDescription:
      "Tailor-made metal design and fabrication services in Khadda, Kushinagar. Custom gates, grills, railings and decorative metal structures.",
    keywords: [
      "custom metal design khadda",
      "custom fabrication kushinagar",
      "decorative metal work khadda",
      "custom railing kushinagar",
      "bespoke metal design khadda",
      "ornamental steel kushinagar",
    ],
    ogImage: "/images/sliders/03.webp",
    h1: "Custom Metal Design & Fabrication in Khadda, Kushinagar",
    overview:
      "Have a unique idea in mind? Shree Vishwakarma Welding Shop brings your custom metal design visions to life. From decorative gates with intricate patterns to modern staircase railings and bespoke metal furniture — we craft unique pieces tailored to your style and space. Our designers and fabricators work together to turn your concept into a strong, beautiful and long-lasting metal structure.",
    benefits: [
      { title: "Unique Designs", desc: "Every piece is crafted exclusively for you — no off-the-shelf templates." },
      { title: "Decorative Patterns", desc: "Intricate ornamental designs including floral, geometric and modern styles." },
      { title: "Custom Railings", desc: "Staircase and balcony railings designed to match your interior or exterior." },
      { title: "Metal Furniture", desc: "Custom tables, chairs, shelves and frames built in steel or iron." },
      { title: "Signage & Lettering", desc: "Metal name plates, letters and decorative signage for homes and businesses." },
      { title: "Design Consultation", desc: "We help you refine your idea into a practical and beautiful design." },
    ],
    process: [
      { step: "Concept Discussion", desc: "Share your idea, inspiration images or rough sketches with us." },
      { step: "Design Development", desc: "Our team develops a detailed design proposal for your approval." },
      { step: "Material Selection", desc: "Right metal, gauge and finish is chosen for your design." },
      { step: "Precision Fabrication", desc: "Every element is handcrafted with care and attention to detail." },
      { step: "Finishing Touches", desc: "Painting, powder coating or polishing applied to complete the look." },
      { step: "Delivery & Installation", desc: "Your custom piece is delivered and installed perfectly." },
    ],
    whyUs: [
      "We turn unique ideas into real metal structures",
      "Creative team with experience in decorative metalwork",
      "Wide range of design styles — traditional to modern",
      "High-quality finish on every custom piece",
      "Transparent pricing — no surprise costs",
      "Serving satisfied customers across Kushinagar district",
    ],
    areas: ["Khadda", "Kushinagar", "Siswa", "Sabaya", "Nebua Naurangia", "Ghughuli", "Kaptanganj", "Ramkola"],
    faqs: [
      { q: "Can I bring my own design idea for fabrication?", a: "Absolutely. We work with your sketches, images or descriptions to bring your concept to life." },
      { q: "What types of custom metalwork do you create?", a: "We create custom gates, grills, railings, furniture, signage, decorative panels and more." },
      { q: "Do you offer design consultation?", a: "Yes, our team provides free design consultation to help you finalize your idea." },
      { q: "How long does a custom design project take?", a: "Depending on complexity, most custom projects are completed in 5–10 working days." },
      { q: "What finishing options are available for custom designs?", a: "We offer standard painting, powder coating, polishing and custom colour matching." },
    ],
  },
];

export const getServiceBySlug = (slug: string): ServiceData | undefined =>
  SERVICES.find((s) => s.slug === slug);
