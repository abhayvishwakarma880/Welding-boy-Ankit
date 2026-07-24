"use client";

import Link from "next/link";
import { useRef, useEffect, useCallback } from "react";
import { Play, Share2 } from "lucide-react";

const BASE_URL = "https://vishwakarmawelding.in";

const videos = [
  {
    src: "/video/Sliding-Tin-Shade.mp4",
    category: "Sliding Tin Shade",
    title: "Sliding Tin Shade for Rooftop Staircase — Khadda, Kushinagar",
    description: "Custom sliding tin shade fabrication for rooftop staircases (Ghat). Strong MS frame, smooth sliding system, and durable roofing designed for protection against rain and sunlight.",
    shareUrl: `${BASE_URL}/videos`,
  },
  {
    src: "/video/house-railing.mp4",
    category: "House Railing",
    title: "Modern House Railing Fabrication — Khadda, Kushinagar",
    description: "Custom MS and steel railing fabrication for homes with strong welding, premium finishing, and modern designs for balconies, staircases, and terraces.",
    shareUrl: `${BASE_URL}/videos`,
  },
  {
    src: "/video/iron-grill.mp4",
    category: "Iron Grill",
    title: "Custom Iron Grill Fabrication — Khadda, Kushinagar",
    description: "High-quality Iron window and safety grill fabrication with durable materials, precision welding, and customized designs for residential and commercial properties.",
    shareUrl: `${BASE_URL}/videos`,
  },
];

function VideoCard({
  src,
  category,
  title,
  description,
  shareUrl,
}: {
  src: string;
  category: string;
  title: string;
  description: string;
  shareUrl: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      await navigator.share({ title, text: description, url: shareUrl }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(shareUrl).catch(() => {});
      alert("Link copied to clipboard!");
    }
  }, [title, description, shareUrl]);

  return (
    <div className="bg-white border border-slate-200/70 rounded-xl overflow-hidden shadow-sm group">
      <div className="relative w-full aspect-video overflow-hidden">
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-white text-[10px] font-semibold tracking-wide">LIVE WORK</span>
        </div>
        <video
          ref={ref}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          title={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 flex flex-col gap-1.5">
        <p className="text-[10px] font-bold text-brand uppercase tracking-widest">{category}</p>
        <h3 className="text-sm font-bold text-slate-800 leading-snug">{title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
        <button
          onClick={handleShare}
          className="mt-2 self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 text-xs font-semibold text-slate-600 hover:border-brand hover:text-brand transition-colors duration-200"
        >
          <Share2 className="w-3.5 h-3.5" />
          Share
        </button>
      </div>
    </div>
  );
}

export default function VideoSection() {
  return (
    <section
      className="bg-slate-50 py-14 px-6 md:px-12 font-sans"
      aria-label="Welding work videos — Khadda, Kushinagar"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10">

        <div className="text-center">
          <div className="w-12 h-[3px] bg-brand rounded-full mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Work in <span className="text-brand">Action</span>
          </h2>
          <p className="mt-3 text-sm text-slate-500 max-w-xl mx-auto">
            Hamare skilled welders aur fabricators ka real kaam dekho — gate manufacturing, steel welding, grill work aur bahut kuch, Khadda, Kushinagar se.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((v, i) => (
            <VideoCard key={i} {...v} />
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/videos"
            className="inline-flex items-center gap-2 px-8 py-3 bg-brand text-white font-bold text-sm rounded-md shadow-lg shadow-brand/20 hover:bg-brand-hover transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Play className="w-4 h-4 fill-white" />
            View All Videos
          </Link>
        </div>

      </div>
    </section>
  );
}
