"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const stats = [
  { value: "200+", label: "Projects" },
  { value: "3+", label: "Years" },
  { value: "24/7", label: "Support" },
  { value: "100%", label: "Quality" },
];

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2} style={{ color: "var(--color-brand)" }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
      </svg>
    ),
    title: "Skilled Team",
    desc: "Experienced welding professionals.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2} style={{ color: "var(--color-brand)" }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "Premium Quality",
    desc: "Strong and durable materials used.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2} style={{ color: "var(--color-brand)" }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Fast Delivery",
    desc: "On-time project completion.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2} style={{ color: "var(--color-brand)" }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
    title: "Custom Solutions",
    desc: "Designed based on requirements.",
  },
];

export default function AboutSection() {
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
    <section ref={sectionRef} className="bg-white py-10 px-4 relative overflow-hidden">

      {/* Subtle orange glow top-left */}
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full blur-3xl pointer-events-none" />
      {/* Dot grid background */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(234,88,12,0.07) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Badge + Heading */}
        <div
          className="mb-6 transition-all duration-700 text-center"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}
        >
          <h2 className="text-2xl md:text-4xl font-extrabold text-zinc-900 leading-tight">
            Trusted Welding &amp;{" "}
            <span className="text-brand">Weldings Experts</span>
          </h2>
        </div>

        {/* Main Content: Image + Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">

          {/* Image */}
          <div
            className="relative rounded-2xl overflow-hidden transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-20px)", transitionDelay: "0.1s" }}
          >
            <Image
              src="/images/sliders/01.png"
              alt="Welding work"
              width={600}
              height={400}
              className="w-full h-[220px] md:h-[300px] object-cover"
              unoptimized
            />
            {/* Orange overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Stats strip over image */}
            <div className="absolute bottom-0 left-0 right-0 grid grid-cols-4 divide-x divide-white/10 bg-black/60 backdrop-blur-sm">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center py-3">
                  <span className="text-brand font-extrabold text-base md:text-lg leading-none">{stat.value}</span>
                  <span className="text-zinc-400 text-[10px] mt-0.5 uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Cards */}
          <div
            className="grid grid-cols-2 gap-3 transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(20px)", transitionDelay: "0.2s" }}
          >
            {features.map((f, i) => (
              <div
                key={f.title}
                className="bg-white border border-zinc-200 rounded-xl p-4 flex flex-col gap-2 hover:border-brand-hover hover:shadow-lg hover:shadow-orange-100 transition-all duration-300"
                style={{ transitionDelay: `${0.2 + i * 0.07}s` }}
              >
                <div className="w-8 h-8 rounded-lg bg-brandBG-icon border border-orange-100 flex items-center justify-center">
                  {f.icon}
                </div>
                <h3 className="text-zinc-800 font-semibold text-sm">{f.title}</h3>
                <p className="text-zinc-400 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

        </div>

       

      </div>
    </section>
  );
}
