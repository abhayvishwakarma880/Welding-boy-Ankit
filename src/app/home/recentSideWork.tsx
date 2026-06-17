"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, MapPin, Wrench } from "lucide-react";
import Link from "next/link";
import { getRecentSideWorks } from "@/apis/recentSideWorks";

interface SideWork {
  _id: string;
  slug: string;
  title: string;
  shortDescription: string;
  coverImage: { url: string };
  status: "pending" | "completed";
  location: { district: string; state: string };
  servicesUsed: string[];
  completionDate: string | null;
}

export default function RecentSideWork() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [works, setWorks]     = useState<SideWork[]>([]);
  const [showLeft, setShowLeft]   = useState(false);
  const [showRight, setShowRight] = useState(true);

  const isDown      = useRef(false);
  const startX      = useRef(0);
  const scrollLeft  = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    getRecentSideWorks({ limit: 8 })
      .then((res) => setWorks(res.data || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const check = () => {
      setShowLeft(el.scrollLeft > 5);
      setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
    };
    el.addEventListener("scroll", check);
    check();
    return () => el.removeEventListener("scroll", check);
  }, [works]);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    isDown.current = true;
    setIsDragging(false);
    el.style.scrollBehavior = "auto";
    startX.current    = e.pageX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;
  };
  const onMouseUpLeave = () => {
    isDown.current = false;
    if (scrollContainerRef.current) scrollContainerRef.current.style.scrollBehavior = "smooth";
  };
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown.current) return;
    e.preventDefault();
    const el = scrollContainerRef.current!;
    const walk = (e.pageX - el.offsetLeft - startX.current) * 1.5;
    if (Math.abs(walk) > 5) setIsDragging(true);
    el.scrollLeft = scrollLeft.current - walk;
  };

  const scroll = (dir: "left" | "right") => {
    scrollContainerRef.current?.scrollBy({ left: dir === "left" ? -272 : 272, behavior: "smooth" });
  };

  if (works.length === 0) return null;

  return (
    <section className="relative bg-slate-50 py-8 md:py-10 overflow-hidden font-sans
                        border-y border-slate-200/80 md:border md:rounded-md
                        mx-0 md:mx-8 xl:mx-auto my-10 md:my-16
                        md:shadow-md md:shadow-slate-100 max-w-7xl">

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(234,88,12,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[3px] bg-gradient-to-r from-transparent via-brand to-transparent rounded-full" />

      <div className="relative z-10">

        {/* ── Heading ─────────────────────────────────────────────────────── */}
        <div className="text-center mb-7 px-4 md:px-12">
          {/* <p className="text-[10px] md:text-xs font-extrabold uppercase tracking-[0.18em] text-brand mb-2">
            Custom Fabrication
          </p> */}
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Recent{" "}
            <span className="text-brand relative inline-block">
              Side Works
              <span className="absolute bottom-0.5 left-0 w-full h-[5px] bg-brand/15 -z-10 rounded-full" />
            </span>
          </h2>
          <p className="mt-2 text-xs md:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Our latest custom projects and special fabrication works completed for clients.
          </p>
        </div>

        {/* ── Slider ──────────────────────────────────────────────────────── */}
        <div className="relative group">

          {/* Nav arrows — desktop only */}
          {showLeft && (
            <button
              onClick={() => scroll("left")}
              className="hidden md:flex absolute left-2 top-1/2 -translate-y-[calc(50%+12px)] z-20
                         w-9 h-9 bg-white hover:bg-brand border border-slate-200
                         text-slate-600 hover:text-white rounded-full items-center justify-center
                         shadow-md transition-all duration-200 hover:scale-110 active:scale-95
                         opacity-0 group-hover:opacity-100 cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5px]" />
            </button>
          )}
          {showRight && (
            <button
              onClick={() => scroll("right")}
              className="hidden md:flex absolute right-2 top-1/2 -translate-y-[calc(50%+12px)] z-20
                         w-9 h-9 bg-white hover:bg-brand border border-slate-200
                         text-slate-600 hover:text-white rounded-full items-center justify-center
                         shadow-md transition-all duration-200 hover:scale-110 active:scale-95
                         opacity-0 group-hover:opacity-100 cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5px]" />
            </button>
          )}

          {/* Scroll container */}
          <div
            ref={scrollContainerRef}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseUpLeave}
            onMouseUp={onMouseUpLeave}
            onMouseMove={onMouseMove}
            className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-none
                       pb-4 pt-1 px-4 md:px-14
                       snap-x snap-mandatory
                       cursor-grab active:cursor-grabbing select-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollBehavior: "smooth" }}
          >
            {works.map((work) => (
              <Link
                key={work._id}
                href={`/side-works/${work.slug}`}
                onClick={(e) => { if (isDragging) e.preventDefault(); }}
                className="flex-none w-[220px] md:w-[252px] bg-white border border-slate-200/70
                           rounded-xl overflow-hidden snap-center
                           group/card transition-all duration-300
                           hover:shadow-xl hover:shadow-brand/8 hover:border-brand/25
                           hover:-translate-y-1 flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden shrink-0">
                  <img
                    src={work.coverImage?.url}
                    alt={work.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
                  />
                  {/* Status badge */}
                  <span
                    className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-black capitalize tracking-wide"
                    style={{
                      backgroundColor: work.status === "completed" ? "#10b98118" : "#f59e0b18",
                      color: work.status === "completed" ? "#10b981" : "#f59e0b",
                    }}
                  >
                    {work.status}
                  </span>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent
                                  pointer-events-none opacity-0 group-hover/card:opacity-100
                                  transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-3.5 flex flex-col flex-grow gap-1.5">
                  {/* Title */}
                  <h3 className="text-sm font-bold text-slate-800 line-clamp-1
                                 group-hover/card:text-brand transition-colors duration-200 leading-snug">
                    {work.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed flex-grow">
                    {work.shortDescription}
                  </p>

                  {/* Location */}
                  {(work.location?.district || work.location?.state) && (
                    <div className="flex items-center gap-1 text-[10px] text-slate-400">
                      <MapPin className="w-2.5 h-2.5 shrink-0" />
                      <span className="truncate">
                        {[work.location.district, work.location.state].filter(Boolean).join(", ")}
                      </span>
                    </div>
                  )}

                  {/* Services */}
                  {work.servicesUsed?.length > 0 && (
                    <div className="flex items-center gap-1 text-[10px] text-slate-400">
                      <Wrench className="w-2.5 h-2.5 shrink-0" />
                      <span className="line-clamp-1">{work.servicesUsed.slice(0, 2).join(", ")}</span>
                    </div>
                  )}

                  {/* Divider */}
                  <div className="h-px bg-slate-100 my-1" />

                  {/* CTA */}
                  <span className="inline-flex items-center justify-center gap-1 rounded-lg
                                   bg-brand px-3 py-2 text-[11px] font-bold text-white
                                   shadow-sm shadow-brand/20 transition-all duration-200
                                   group-hover/card:scale-[1.02] group-hover/card:shadow-md
                                   group-hover/card:shadow-brand/30">
                    View Project <ArrowRight className="h-3 w-3 shrink-0" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* ── End Slider ── */}

      </div>
    </section>
  );
}