"use client";

import { useRef, useState } from "react";

const projects = [
  {
    id: 1,
    title: "Steel Main Gate",
    location: "Lucknow, UP",
    category: "Residential",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80",
    color: "#FF6B00",
  },
  {
    id: 2,
    title: "Balcony Railing",
    location: "Kanpur, UP",
    category: "Residential",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop&q=80",
    color: "#FF6B00",
  },
  {
    id: 3,
    title: "Industrial Shed",
    location: "Noida, UP",
    category: "Industrial",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400&h=300&fit=crop&q=80",
    color: "#FF6B00",
  },
  {
    id: 4,
    title: "Window Grill",
    location: "Agra, UP",
    category: "Custom Work",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&q=80",
    color: "#FF6B00",
  },
  {
    id: 5,
    title: "Modern Staircase",
    location: "Varanasi, UP",
    category: "Residential",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=300&fit=crop&q=80",
    color: "#FF6B00",
  },
  {
    id: 6,
    title: "MS Structure",
    location: "Lucknow, UP",
    category: "Industrial",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop&q=80",
    color: "#FF6B00",
  },
];

const categoryColors: Record<string, string> = {
  Residential: "#FF6B00",
  Industrial: "#FF6B00",
  "Custom Work": "#FF6B00",
};

export default function Project() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / projects.length;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActiveIdx(Math.min(idx, projects.length - 1));
  };

  return (
    <section className="bg-white pt-[60px] pb-0 overflow-hidden font-['Barlow','Oswald',sans-serif]">
      {/* Section Header - Centered */}
      <div className="px-5 text-center">
        <h2 className="font-['Oswald',sans-serif] text-[30px] font-bold text-gray-900 m-0 leading-[1.1] tracking-[0.5px]">
          Recent Weldings{" "}
          <span className="text-[#FF6B00]">Work</span>
        </h2>
        <div className="w-9 h-[3px] bg-[#FF6B00] rounded-[2px] mx-auto mt-2 mb-[14px]" />
      </div>

      {/* Swipe Cards */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-[14px] overflow-x-auto snap-x snap-mandatory scrollbar-none px-5 pb-4 pt-2 mt-6"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {projects.map((p, i) => (
          <div
            key={p.id}
            className="flex-none w-[260px] h-[340px] rounded-[20px] overflow-hidden relative snap-center cursor-pointer transition-transform duration-200 ease-out hover:shadow-xl active:scale-[0.97] shadow-md"
          >
            <img
              src={p.image}
              alt={p.title}
              loading="lazy"
              className="w-full h-full object-cover block transition-transform duration-400 ease-out hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/45 to-black/85" />
            <div className="absolute bottom-0 left-0 right-0 p-[14px_16px_16px]">
              <span className="inline-block px-[10px] py-[3px] rounded-[20px] text-[10px] font-semibold tracking-[0.6px] uppercase bg-[#FF6B00] text-white mb-[7px]">
                {p.category}
              </span>
              <h3 className="font-['Oswald',sans-serif] text-[18px] font-semibold text-white leading-[1.2] m-0 mb-1 tracking-[0.3px]">
                {p.title}
              </h3>
              <div className="flex items-center gap-2">
                <span className="font-['Barlow',sans-serif] text-xs text-white/75 tracking-[0.2px]">
                  📍 {p.location}
                </span>
                <span className="w-[3px] h-[3px] bg-white/40 rounded-full" />
                <span className="text-[11px] text-green-400 font-medium font-['Barlow',sans-serif]">
                  ✓ {p.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-1.5 mt-1.5 pb-1">
        {projects.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIdx === i
                ? "w-5 bg-[#FF6B00] rounded-[4px]"
                : "w-1.5 bg-gray-200"
            }`}
          />
        ))}
      </div>
    </section>
  );
}