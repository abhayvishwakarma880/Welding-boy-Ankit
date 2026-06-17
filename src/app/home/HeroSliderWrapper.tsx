"use client";
import dynamic from "next/dynamic";

const HeroSlider = dynamic(() => import("./page"), {
  ssr: false,
  loading: () => (
    <section className="relative w-full h-[200px] md:h-screen overflow-hidden bg-slate-900 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900" />
    </section>
  ),
});

export default function HeroSliderWrapper() {
  return <HeroSlider />;
}
