"use client";

import { useEffect, useRef, useState } from "react";
import { Phone, Wrench, Award, Users, Quote } from "lucide-react";
import Link from "next/link";

const highlights = [
  { icon: Wrench, label: "10+ Years of Experience" },
  { icon: Award, label: "500+ Projects Completed" },
  { icon: Users, label: "Trusted by 500+ Clients" },
];

export default function FounderSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-slate-50 relative py-12 px-6 md:px-12 overflow-hidden font-sans border border-slate-200/80 rounded-md max-w-7xl mx-4 md:mx-8 xl:mx-auto my-16 shadow-md shadow-slate-100"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(234,88,12,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[3.5px] bg-gradient-to-r from-transparent via-brand to-transparent rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">

        {/* Left — Image */}
        <div
          className="relative self-stretch transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-24px)",
          }}
        >
          <div className="relative rounded-2xl overflow-hidden w-full h-full min-h-[300px] shadow-2xl shadow-slate-300/50">
            <img
              // src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=1000&fit=crop&q=80"
              src="images/banner/hero.png"
              alt="Ankit Vishwakarma - Founder"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3">
              <p className="text-white font-extrabold text-base leading-none">Ankit Vishwakarma</p>
              <p className="text-white/70 text-xs mt-1">Founder · Vishwakarma Welding</p>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Right — Introduction */}
        <div
          className="flex flex-col gap-6 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(24px)",
            transitionDelay: "0.15s",
          }}
        >
          {/* Label */}
          <div className="inline-flex items-center gap-2 w-fit px-3 py-1.5 bg-brand/5 border border-brand/20 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            <span className="text-xs font-bold text-brand uppercase tracking-wider">Meet the Founder</span>
          </div>

          {/* Name & Title */}
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Ankit{" "}
              <span className="text-brand relative">
                Vishwakarma
                {/* <span className="absolute bottom-1 left-0 w-full h-[6px] bg-brand/20 -z-10 rounded-full" /> */}
              </span>
            </h2>
            <p className="mt-1 text-sm font-semibold text-slate-400 uppercase tracking-widest">
              Founder &amp; Master Fabricator
            </p>
          </div>

          {/* Quote */}
          <div className="relative pl-5 border-l-4 border-brand">
            {/* <Quote className="absolute -top-1 -left-1 w-4 h-4 text-brand/40" /> */}
            <p className="text-sm md:text-base text-slate-600 leading-relaxed italic">
              "We don't just weld metal — we craft trust, durability, and precision into every project we touch. Every joint, every finish, every detail matters."
            </p>
          </div>

          {/* Bio */}
          <p className="text-sm text-slate-500 leading-relaxed">
            With over a decade of hands-on experience in metal fabrication and welding, Ankit Vishwakarma has built a reputation for delivering exceptional quality in every project — from ornamental gates to structural steelwork. His passion for craftsmanship and commitment to customer satisfaction is the foundation of Vishwakarma Welding.
          </p>

          {/* Highlights */}
          <div className="flex flex-col gap-2.5">
            {highlights.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand/5 border border-brand/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-brand" />
                </div>
                <span className="text-sm font-medium text-slate-700">{label}</span>
              </div>
            ))}
          </div>

          {/* Contact */}
          <Link
            href="tel:+917905940157"
            className="inline-flex items-center gap-2.5 w-fit px-5 py-3 bg-brand text-white text-sm font-bold rounded-md shadow-md shadow-brand/20 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-brand/30"
          >
            <Phone className="w-4 h-4" />
            +91 79059 40157
          </Link>
        </div>

      </div>
    </section>
  );
}
