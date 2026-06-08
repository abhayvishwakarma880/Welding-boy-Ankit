"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  image: string;
  tag?: string;
  title: string;
  highlight: string;
  subtitle: string;
}

interface HeroSliderProps {
  slides: Slide[];
  autoPlayInterval?: number;
  children?: React.ReactNode;
}

export default function HeroSlider({ slides, autoPlayInterval = 4000, children }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (idx: number) => {
      if (animating) return;
      setAnimating(true);
      setCurrent(idx);
      setTimeout(() => setAnimating(false), 600);
    },
    [animating]
  );

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = useCallback(() => goTo((current + 1) % slides.length), [current, slides.length, goTo]);

  useEffect(() => {
    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [next, autoPlayInterval]);

  return (
    <section className="relative w-full h-[420px] md:h-[520px] overflow-hidden font-sans">
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-700 ${idx === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={idx === 0}
            unoptimized
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/30" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center max-w-4xl mx-auto px-6 md:px-12 gap-5">
        {/* Badge */}
        {slides[current].tag && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/10 border border-brand/30 rounded-full w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            <span className="text-xs font-bold text-brand uppercase tracking-widest">{slides[current].tag}</span>
          </div>
        )}

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
          {slides[current].title}{" "}
          <span className="text-brand">{slides[current].highlight}</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-slate-300 max-w-xl leading-relaxed">
          {slides[current].subtitle}
        </p>

        {/* Slot for buttons */}
        {children}
      </div>

      {/* Prev / Next */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand hover:border-brand transition-all duration-300"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand hover:border-brand transition-all duration-300"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${idx === current ? "w-6 bg-brand" : "w-1.5 bg-white/40 hover:bg-white/70"}`}
          />
        ))}
      </div>
    </section>
  );
}
