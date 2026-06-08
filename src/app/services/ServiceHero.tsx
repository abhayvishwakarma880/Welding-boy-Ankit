"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import HeroSlider from "@/src/components/common/HeroSlider";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1400&q=80",
    tag: "Our Services",
    title: "Professional Welding &",
    highlight: "Fabrication Services",
    subtitle: "Residential, Commercial aur Industrial projects ke liye high-quality welding aur custom metal work solutions.",
  },
  {
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1400&q=80",
    tag: "Gate Manufacturing",
    title: "Custom Iron &",
    highlight: "Aluminium Gates",
    subtitle: "Har design, har size — modern aur traditional gates jo aapki property ki shaan badhaayein.",
  },
  {
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=1400&q=80",
    tag: "Steel Structures",
    title: "Heavy Duty Steel",
    highlight: "Railing & Structures",
    subtitle: "Factories, warehouses aur construction projects ke liye strong MS structures aur staircase railings.",
  },
];

export default function ServiceHero() {
  return (
    <HeroSlider slides={slides}>
      <div className="flex flex-col sm:flex-row items-start gap-3 mt-2">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand text-white font-bold text-sm rounded-md shadow-lg shadow-brand/30 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Get Free Quote
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="tel:+917905940157"
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur-md text-white font-bold text-sm rounded-md border border-white/20 transition-all duration-300 hover:bg-white/20 active:scale-95"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </Link>
      </div>
    </HeroSlider>
  );
}
