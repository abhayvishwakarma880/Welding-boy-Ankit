"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const services = [
  {
    id: 1,
    slug: "steel-welding",
    heading: "Steel Welding",
    desc: "Strong and durable welding solutions.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path d="M6 34L18 14l4 6 6-10 6 24" className="stroke-brand" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="18" cy="14" r="2.5" className="fill-brand stroke-brand" fillOpacity="0.2" strokeWidth="1.5"/>
        <path d="M26 10l3-3M29 10l-3-3" className="stroke-brand" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M30 16l1.5-1.5M31.5 16L30 14.5" className="stroke-brand" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 2,
    slug: "metal-fabrication",
    heading: "Metal Fabrication",
    desc: "Custom metal structures with precision.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <rect x="8" y="8" width="10" height="10" rx="1.5" className="stroke-brand fill-brand" strokeWidth="2" fillOpacity="0.1"/>
        <rect x="22" y="8" width="10" height="10" rx="1.5" className="stroke-brand fill-brand" strokeWidth="2" fillOpacity="0.1"/>
        <rect x="8" y="22" width="10" height="10" rx="1.5" className="stroke-brand fill-brand" strokeWidth="2" fillOpacity="0.1"/>
        <rect x="22" y="22" width="10" height="10" rx="1.5" className="stroke-brand fill-brand" strokeWidth="2" fillOpacity="0.1"/>
        <path d="M18 13h4M27 18v4M22 27h-4M13 22v-4" className="stroke-brand" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 3,
    slug: "gate-grill",
    heading: "Gate & Grill",
    desc: "Modern safety designs for properties.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <rect x="6" y="8" width="28" height="24" rx="2" className="stroke-brand" strokeWidth="2"/>
        <line x1="20" y1="8" x2="20" y2="32" className="stroke-brand" strokeWidth="2"/>
        <line x1="6" y1="14" x2="34" y2="14" className="stroke-brand" strokeWidth="1.5"/>
        <line x1="6" y1="20" x2="34" y2="20" className="stroke-brand" strokeWidth="1.5"/>
        <line x1="6" y1="26" x2="34" y2="26" className="stroke-brand" strokeWidth="1.5"/>
        <circle cx="18" cy="20" r="1.8" className="fill-brand"/>
        <circle cx="22" cy="20" r="1.8" className="fill-brand"/>
      </svg>
    ),
  },
  {
    id: 4,
    slug: "industrial-work",
    heading: "Industrial Work",
    desc: "Heavy-duty fabrication for industries.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path d="M8 32V18l8-8h8l8 8v14H8z" className="stroke-brand fill-brand" strokeWidth="2" fillOpacity="0.07"/>
        <rect x="15" y="22" width="10" height="10" rx="1" className="stroke-brand" strokeWidth="1.8"/>
        <path d="M12 18h4v4h-4zM24 18h4v4h-4z" className="stroke-brand fill-brand" strokeWidth="1.5" fillOpacity="0.1"/>
        <path d="M16 10l4-5 4 5" className="stroke-brand" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 5,
    slug: "repair-services",
    heading: "Repair Services",
    desc: "Quick maintenance and metal repairs.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path d="M28 12a8 8 0 0 0-11.3 11.3L7 33l2.8 2.8 9.7-9.7A8 8 0 0 0 28 12z" className="stroke-brand fill-brand" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fillOpacity="0.07"/>
        <path d="M25 15l-8 8" className="stroke-brand" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="27" cy="13" r="2" className="fill-brand"/>
      </svg>
    ),
  },
  {
    id: 6,
    slug: "custom-design",
    heading: "Custom Design",
    desc: "Tailored solutions based on requirements.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path d="M8 32l4-12 8-12 8 12 4 12H8z" className="stroke-brand fill-brand" strokeWidth="2" strokeLinejoin="round" fillOpacity="0.07"/>
        <path d="M20 8v24M12 20h16" className="stroke-brand" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="20" cy="20" r="4" className="stroke-brand fill-brand" strokeWidth="1.8" fillOpacity="0.15"/>
        <circle cx="20" cy="20" r="1.5" className="fill-brand"/>
      </svg>
    ),
  },
];

export default function ServiceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white py-4 md:py-10 px-4 relative overflow-hidden"
    >
      {/* Subtle dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(234,88,12,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Top brand accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand via-brand/40 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── Heading Area ── */}
        <div
          className="mb-8 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}
        >

          {/* Heading + desc — centered on mobile, left on desktop */}
          <div className="text-center">
            <div>
              <h2 className="text-[26px] md:text-[36px] font-extrabold leading-tight text-zinc-900 tracking-tight">
                Professional Welding
                <span className="text-brand"> &amp; Fabrication</span>
              </h2>
            </div>
          </div>
        </div>

        {/* ── Cards Grid ── */}
        {/* Mobile: 2 col | Desktop: 4 col (6 cards = 4+2 or 3+3 — we do 2 rows of 3 on md, 4+2 on lg via auto) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {services.map((service, index) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="group relative bg-white border border-zinc-200 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-brand-hover hover:shadow-xl hover:shadow-brand-shadow/20 hover:-translate-y-1"
              style={{
                minHeight: "160px",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${0.1 + index * 0.07}s, transform 0.5s ease ${0.1 + index * 0.07}s, box-shadow 0.3s ease, border-color 0.3s ease, translate 0.3s ease`,
              }}
            >
              {/* Top orange slide-in line on hover */}
              <div className="absolute top-0 left-0 h-[2.5px] w-0 group-hover:w-full bg-gradient-to-r from-brand to-brand-hover transition-all duration-400 rounded-t-xl" />

              {/* Top-right ambient */}
              <div className="absolute top-0 right-0 w-14 h-14 pointer-events-none bg-gradient-radial from-brand-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="p-4 flex flex-col h-full gap-3">
                {/* Icon box */}
                <div className="w-9 h-9 rounded-lg bg-brandBG-icon border border-brand flex items-center justify-center shrink-0 text-white group-hover:border-brand-200 transition-colors duration-300">
                  {service.icon}
                </div>

                {/* Text */}
                <div className="mt-auto flex flex-col gap-1">
                  <h3 className="text-[13px] md:text-[13.5px] font-semibold text-zinc-800 leading-snug group-hover:text-brand-hover transition-colors duration-200">
                    {service.heading}
                  </h3>
                  <p className="text-[10.5px] md:text-[11px] text-zinc-400 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Mobile CTA Strip ── */}
        <div
          className="mt-5 md:hidden flex items-center justify-between bg-brand-50 border border-brand-200 rounded-xl px-4 py-3"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.5s ease 0.6s, transform 0.5s ease 0.6s",
          }}
        >
          <div>
            <p className="text-[11px] text-zinc-500 leading-tight">Need a custom solution?</p>
            <p className="text-[13px] font-bold text-zinc-800">Get a free consultation</p>
          </div>
          <button className="bg-brand hover:bg-brand-hover text-white text-[11px] font-bold uppercase tracking-wide px-4 py-2 rounded-lg transition-all duration-200 active:scale-95 shrink-0">
            Contact Us
          </button>
        </div>

      </div>
    </section>
  );
}