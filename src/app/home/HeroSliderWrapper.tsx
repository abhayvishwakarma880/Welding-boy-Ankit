"use client";
import dynamic from "next/dynamic";

const HeroSlider = dynamic(() => import("./page"), { ssr: false });

export default function HeroSliderWrapper() {
  return <HeroSlider />;
}
