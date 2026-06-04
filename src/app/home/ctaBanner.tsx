"use client";

import Link from "next/link";
import { Zap } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="relative w-full py-5 overflow-hidden font-sans">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-amber-600" />

      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full mix-blend-overlay blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full mix-blend-overlay blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center flex flex-col items-center gap-8">

        {/* Row 1: Icon + Heading + Subtext */}
        <div className="flex flex-col items-center gap-3">
          <div className="p-3 bg-white/20 backdrop-blur-md rounded-full">
            <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
            Experience Premium <span className="text-yellow-100">Fabrication</span> Excellence
          </h2>
          <p className="text-sm md:text-base text-white/85 max-w-xl leading-relaxed font-medium">
            Custom-crafted metalwork with precision welding, premium materials, and flawless finishes.
          </p>
        </div>

        {/* Row 2: Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3 bg-white text-orange-600 font-bold text-sm rounded-md shadow-lg shadow-black/20 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Get Started <span>→</span>
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-7 py-3 bg-white/20 backdrop-blur-md text-white font-bold text-sm rounded-md border border-white/30 transition-all duration-300 hover:bg-white/30 active:scale-95"
          >
            Explore Products
          </Link>
        </div>

        {/* Row 3: Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center gap-5 text-white/75 text-xs pt-4 border-t border-white/20 w-full justify-center">
          <span className="flex items-center gap-1.5"><span className="text-white font-bold">✓</span> 10+ Years Experience</span>
          <span className="hidden sm:block text-white/30">|</span>
          <span className="flex items-center gap-1.5"><span className="text-white font-bold">✓</span> 500+ Satisfied Clients</span>
          <span className="hidden sm:block text-white/30">|</span>
          <span className="flex items-center gap-1.5"><span className="text-white font-bold">✓</span> Premium Quality Assured</span>
        </div>

      </div>
    </section>
  );
}
