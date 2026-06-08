"use client";

import { useState } from "react";

const steps = [
  {
    number: "01",
    title: "Requirement Discussion",
    desc: "Project details aur customer requirements samjhi jaati hain.",
  },
  {
    number: "02",
    title: "Site Visit & Measurement",
    desc: "Agar zarurat ho to site visit karke accurate measurements liye jaate hain.",
  },
  {
    number: "03",
    title: "Quotation & Planning",
    desc: "Material aur work scope ke according quotation provide kiya jata hai.",
  },
  {
    number: "04",
    title: "Fabrication & Welding",
    desc: "Experienced workmanship ke saath fabrication aur welding process complete kiya jata hai.",
  },
  {
    number: "05",
    title: "Delivery & Installation",
    desc: "Project ko final finishing ke saath deliver aur install kiya jata hai.",
  },
];

export default function ServiceProcess() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="bg-white py-14 px-6 md:px-12 font-sans">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <div className="w-12 h-[3px] bg-brand rounded-full mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our <span className="text-brand">Working Process</span>
          </h2>
          <p className="mt-3 text-sm text-slate-500">Inquiry se installation tak — step by step.</p>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-4">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="flex items-start gap-5 p-5 bg-slate-50 border border-slate-200/70 rounded-xl hover:border-brand/30 hover:shadow-md hover:shadow-brand/5 transition-all duration-300 group"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Number circle */}
              <div className="w-12 h-12 rounded-full bg-brand/5 border-2 border-brand/20 flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:border-brand transition-all duration-300">
                <span
                  className="text-sm font-extrabold transition-colors duration-300"
                  style={{ color: hoveredIdx === i ? "white" : "var(--color-brand)" }}
                >
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-1 pt-1">
                <h3 className="text-sm font-bold text-slate-800 group-hover:text-brand transition-colors duration-200">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>

              {/* Connector line — all except last */}
              {i < steps.length - 1 && (
                <div className="absolute left-[2.85rem] mt-14 w-[2px] h-4 bg-brand/20 hidden" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
