"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

const reasons = [
  "Quality-focused workmanship",
  "Durable welding solutions",
  "Custom fabrication expertise",
  "Timely project completion",
  "Transparent pricing",
  "Professional finishing",
  "Residential & industrial experience",
  "Customer satisfaction priority",
];

export default function ServiceWhyChoose() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="bg-slate-50 py-14 px-6 md:px-12 font-sans">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">
          <div className="w-12 h-[3px] bg-brand rounded-full mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Customers Trust{" "}
            <span className="text-brand">Vishwakarma Welding Shop</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {reasons.map((reason, i) => (
            <div
              key={reason}
              className="flex items-center gap-3 p-4 bg-white border border-slate-200/70 rounded-xl hover:border-brand/30 hover:shadow-md hover:shadow-brand/5 transition-all duration-300 group"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="w-8 h-8 rounded-lg bg-brand/5 border border-brand/10 flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:border-brand transition-all duration-300">
                <CheckCircle
                  className="w-4 h-4 transition-colors duration-300"
                  style={{ color: hoveredIdx === i ? "white" : "var(--color-brand)" }}
                />
              </div>
              <span className="text-sm font-medium text-slate-700 group-hover:text-brand transition-colors duration-200">
                {reason}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
