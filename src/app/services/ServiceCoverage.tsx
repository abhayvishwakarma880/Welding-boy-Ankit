"use client";

import { useState } from "react";
import { Building2, Home, Store, Warehouse, Factory, HardHat, Briefcase, Wrench } from "lucide-react";

const coverage = [
  { icon: Home, label: "Residential Properties" },
  { icon: Store, label: "Commercial Shops" },
  { icon: Briefcase, label: "Offices" },
  { icon: Warehouse, label: "Warehouses" },
  { icon: Factory, label: "Factories" },
  { icon: Building2, label: "Industrial Units" },
  { icon: HardHat, label: "Construction Projects" },
  { icon: Wrench, label: "Repair & Maintenance" },
];

export default function ServiceCoverage() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="bg-white py-14 px-6 md:px-12 font-sans">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">
          <div className="w-12 h-[3px] bg-brand rounded-full mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            We <span className="text-brand">Serve</span>
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Har type ke property aur project ke liye hamare paas solution hai.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {coverage.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 p-5 bg-slate-50 border border-slate-200/70 rounded-xl hover:border-brand/30 hover:shadow-md hover:shadow-brand/5 hover:-translate-y-1 transition-all duration-300 group text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-brand/5 border border-brand/10 flex items-center justify-center group-hover:bg-brand group-hover:border-brand transition-all duration-300">
                <Icon className="w-5 h-5 text-brand group-hover:!text-white transition-colors duration-300" />
              </div>
              <span className="text-xs font-semibold text-slate-700 group-hover:text-brand transition-colors duration-200 leading-snug">
                {label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
