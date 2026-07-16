import Image from "next/image";
import { CheckCircle } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Steel Welding",
    image: "/images/sliders/hero-welding-services-khadda.webp",
    description:
      "Strong aur durable steel welding solutions jo residential, commercial aur industrial projects ke liye suitable hain. Har joint ko proper strength aur finishing ke saath weld kiya jata hai taaki structure long-term reliable rahe.",
    includes: [
      "Steel structure welding",
      "Pipe welding",
      "Frame welding",
      "Sheet metal welding",
      "Heavy-duty welding work",
    ],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
        <path d="M6 34L18 14l4 6 6-10 6 24" className="stroke-brand" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="18" cy="14" r="2.5" className="fill-brand stroke-brand" fillOpacity="0.2" strokeWidth="1.5" />
        <path d="M26 10l3-3M29 10l-3-3" className="stroke-brand" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Metal Fabrication",
    image: "/images/sliders/hero-welding-services-khadda.webp",
    description:
      "Customer requirements ke according custom metal structures aur products design aur fabricate kiye jaate hain. Accurate measurements aur quality finishing par special focus diya jata hai.",
    includes: [
      "Custom fabrication",
      "Metal cutting",
      "Bending work",
      "Structural fabrication",
      "Fabricated assemblies",
    ],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
        <rect x="8" y="8" width="10" height="10" rx="1.5" className="stroke-brand fill-brand" strokeWidth="2" fillOpacity="0.1" />
        <rect x="22" y="8" width="10" height="10" rx="1.5" className="stroke-brand fill-brand" strokeWidth="2" fillOpacity="0.1" />
        <rect x="8" y="22" width="10" height="10" rx="1.5" className="stroke-brand fill-brand" strokeWidth="2" fillOpacity="0.1" />
        <rect x="22" y="22" width="10" height="10" rx="1.5" className="stroke-brand fill-brand" strokeWidth="2" fillOpacity="0.1" />
        <path d="M18 13h4M27 18v4M22 27h-4M13 22v-4" className="stroke-brand" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Gate & Grill Manufacturing",
    image: "/images/sliders/hero-steel-gate-fabrication.webp",
    description:
      "Homes, shops aur commercial properties ke liye attractive aur durable gates aur grills tayar kiye jaate hain. Design, size aur finishing customer requirements ke hisaab se customize ki ja sakti hai.",
    includes: [
      "Main gates",
      "Safety grills",
      "Balcony railings",
      "Boundary gates",
      "Decorative metal work",
    ],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
        <rect x="6" y="8" width="28" height="24" rx="2" className="stroke-brand" strokeWidth="2" />
        <line x1="20" y1="8" x2="20" y2="32" className="stroke-brand" strokeWidth="2" />
        <line x1="6" y1="14" x2="34" y2="14" className="stroke-brand" strokeWidth="1.5" />
        <line x1="6" y1="20" x2="34" y2="20" className="stroke-brand" strokeWidth="1.5" />
        <line x1="6" y1="26" x2="34" y2="26" className="stroke-brand" strokeWidth="1.5" />
        <circle cx="18" cy="20" r="1.8" className="fill-brand" />
        <circle cx="22" cy="20" r="1.8" className="fill-brand" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Industrial Work",
    image: "/images/sliders/hero-welding-services-khadda.webp",
    description:
      "Industrial projects ke liye fabrication, installation aur welding services provide ki jaati hain. Large-scale structures aur machinery support components par bhi kaam kiya jata hai.",
    includes: [
      "Industrial structures",
      "Support frames",
      "Machinery platforms",
      "Fabrication installations",
      "Maintenance work",
    ],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
        <path d="M8 32V18l8-8h8l8 8v14H8z" className="stroke-brand fill-brand" strokeWidth="2" fillOpacity="0.07" />
        <rect x="15" y="22" width="10" height="10" rx="1" className="stroke-brand" strokeWidth="1.8" />
        <path d="M12 18h4v4h-4zM24 18h4v4h-4z" className="stroke-brand fill-brand" strokeWidth="1.5" fillOpacity="0.1" />
        <path d="M16 10l4-5 4 5" className="stroke-brand" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Repair Services",
    image: "/images/sliders/hero-welding-services-khadda.webp",
    description:
      "Purane ya damaged metal products ko repair aur restore kiya jata hai taaki unki functionality aur strength wapas aa sake.",
    includes: [
      "Gate repair",
      "Grill repair",
      "Welding repairs",
      "Broken frame repair",
      "Structural maintenance",
    ],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
        <path d="M28 12a8 8 0 0 0-11.3 11.3L7 33l2.8 2.8 9.7-9.7A8 8 0 0 0 28 12z" className="stroke-brand fill-brand" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fillOpacity="0.07" />
        <path d="M25 15l-8 8" className="stroke-brand" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="27" cy="13" r="2" className="fill-brand" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "Custom Design Solutions",
    image: "/images/sliders/hero-grill-railing-welding.webp",
    description:
      "Customer ki requirement aur available space ke according completely customized fabrication solutions provide kiye jaate hain.",
    includes: [
      "Custom gates",
      "Designer grills",
      "Furniture frames",
      "Special fabrication projects",
      "Made-to-order metal work",
    ],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
        <path d="M8 32l4-12 8-12 8 12 4 12H8z" className="stroke-brand fill-brand" strokeWidth="2" strokeLinejoin="round" fillOpacity="0.07" />
        <path d="M20 8v24M12 20h16" className="stroke-brand" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="20" r="4" className="stroke-brand fill-brand" strokeWidth="1.8" fillOpacity="0.15" />
        <circle cx="20" cy="20" r="1.5" className="fill-brand" />
      </svg>
    ),
  },
];

export default function ServiceGrid() {
  return (
    <section className="bg-slate-50 py-14 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <div className="w-12 h-[3px] bg-brand rounded-full mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our <span className="text-brand">Services</span>
          </h2>
          <p className="mt-3 text-sm text-slate-500 max-w-xl mx-auto">
            Har tarah ka welding aur fabrication kaam ek hi jagah se.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.number}
              className="bg-white border border-slate-200/70 rounded-xl overflow-hidden flex flex-col gap-0 hover:border-brand/30 hover:shadow-xl hover:shadow-brand/5 hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative w-full h-44 overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-3 left-4 text-white text-base font-bold drop-shadow">{s.title}</span>
                {/* <span className="absolute top-3 right-3 text-3xl font-extrabold text-white/20 leading-none">{s.number}</span> */}
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-4">
              {/* Top row */}
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl bg-brand/5 border border-brand/10 flex items-center justify-center shrink-0">
                  {s.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-slate-800 group-hover:text-brand transition-colors duration-200">
                {s.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-slate-500 leading-relaxed">
                {s.description}
              </p>

              {/* Divider */}
              <div className="h-[1px] bg-slate-100" />

              {/* Includes */}
              <div className="flex flex-col gap-1.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Includes</p>
                {s.includes.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-brand shrink-0" />
                    <span className="text-xs text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
