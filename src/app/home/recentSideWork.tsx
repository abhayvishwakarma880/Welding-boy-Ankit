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
  const [works, setWorks]   = useState<SideWork[]>([]);
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
    scrollContainerRef.current?.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  if (works.length === 0) return null;

  return (
    <section className="bg-slate-50 relative py-10 px-6 md:px-12 overflow-hidden border border-slate-200/80 rounded-md max-w-7xl mx-4 md:mx-8 xl:mx-auto my-16 shadow-md shadow-slate-100">
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{ backgroundImage: "radial-gradient(circle, rgba(234,88,12,0.06) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[3.5px] bg-gradient-to-r from-transparent via-brand to-transparent rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-none">
            Recent <span className="text-brand relative">Side Works
              <span className="absolute bottom-1 left-0 w-full h-[6px] bg-brand/20 -z-10 rounded-full" />
            </span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Explore our latest custom projects and special fabrication works completed for our clients.
          </p>
        </div>

        <div className="relative group px-1">
          {showLeft && (
            <button onClick={() => scroll("left")}
              className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white hover:bg-brand border border-slate-200 text-slate-700 hover:text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100 md:opacity-100"
              aria-label="Previous">
              <ChevronLeft className="w-5 h-5 stroke-[2.5px]" />
            </button>
          )}
          {showRight && (
            <button onClick={() => scroll("right")}
              className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white hover:bg-brand border border-slate-200 text-slate-700 hover:text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100 md:opacity-100"
              aria-label="Next">
              <ChevronRight className="w-5 h-5 stroke-[2.5px]" />
            </button>
          )}

          <div
            ref={scrollContainerRef}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseUpLeave}
            onMouseUp={onMouseUpLeave}
            onMouseMove={onMouseMove}
            className="flex gap-6 overflow-x-auto scrollbar-none pb-6 pt-2 cursor-grab active:cursor-grabbing select-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollBehavior: "smooth" }}
          >
            {works.map((work) => (
              <Link
                key={work._id}
                href={`/side-works/${work.slug}`}
                onClick={(e) => { if (isDragging) e.preventDefault(); }}
                className="flex-none w-[280px] md:w-[310px] bg-white border border-slate-200/70 rounded-md overflow-hidden snap-center group/card transition-all duration-300 hover:shadow-2xl hover:shadow-brand/5 hover:border-brand/30 hover:-translate-y-1.5 flex flex-col"
              >
                <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden shrink-0">
                  <img
                    src={work.coverImage?.url}
                    alt={work.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
                  />
                  <span
                    className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold capitalize"
                    style={{
                      backgroundColor: work.status === "completed" ? "#10b98120" : "#f59e0b20",
                      color: work.status === "completed" ? "#10b981" : "#f59e0b",
                    }}>
                    {work.status}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-grow gap-2">
                  <h3 className="text-base font-bold text-slate-800 line-clamp-1 group-hover/card:text-brand transition-colors duration-200">
                    {work.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed flex-grow">
                    {work.shortDescription}
                  </p>

                  {(work.location?.district || work.location?.state) && (
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <MapPin className="w-3 h-3 shrink-0" />
                      {[work.location.district, work.location.state].filter(Boolean).join(", ")}
                    </div>
                  )}

                  {work.servicesUsed?.length > 0 && (
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Wrench className="w-3 h-3 shrink-0" />
                      <span className="line-clamp-1">{work.servicesUsed.slice(0, 2).join(", ")}</span>
                    </div>
                  )}

                  <div className="h-[1px] bg-slate-100 my-1" />

                  <span className="inline-flex items-center justify-center gap-1.5 rounded-md bg-brand px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-brand/20 transition-all duration-300 group-hover/card:scale-105">
                    View Project <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {works.map((_, i) => (
              <button key={i} onClick={() => scrollContainerRef.current?.scrollTo({ left: i * 330, behavior: "smooth" })}
                className="w-8 h-3 flex items-center justify-center group/dot focus:outline-none"
                aria-label={`Slide ${i + 1}`}>
                <span className="w-2 h-2 rounded-full bg-slate-200 group-hover/dot:bg-brand/50 transition-all duration-300 group-hover/dot:w-3 group-hover/dot:h-3" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
