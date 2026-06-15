"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import HeroSlider from "@/components/common/HeroSlider";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80",
    tag: "Our Products",
    title: "Premium Iron, Steel &",
    highlight: "Fabrication Products",
    subtitle:
      "Residential, Commercial aur Industrial use ke liye durable gates, grills, railings, sheds aur custom fabrication products.",
  },
  {
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1400&q=80",
    tag: "Custom Manufacturing",
    title: "Har Product",
    highlight: "Custom Size Mein",
    subtitle:
      "Har product customer requirement ke hisab se size aur design mein customize kiya ja sakta hai.",
  },
  {
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1400&q=80",
    tag: "Quality Assured",
    title: "Durable & Strong",
    highlight: "Metal Work",
    subtitle:
      "High-quality iron aur steel materials se banaye gaye products jo years tak bina kisi issue ke kaam karein.",
  },
];

export default function ProductHero() {
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
