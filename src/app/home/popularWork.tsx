"use client";

import React, { useState, useRef, useEffect } from "react";
import { Hammer, Shield, Layers, ChevronLeft, ChevronRight, ArrowRight, Tag, Heart } from "lucide-react";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  category: "Iron" | "Steel" | "Aluminium";
  price: string;
  description: string;
  image: string;
  tag: string;
}

const productsData: Product[] = [
  // --- IRON PRODUCTS ---
  {
    id: 1,
    title: "Premium Ornamental Gate",
    category: "Iron",
    price: "₹45,000",
    description: "Elegant, high-durability wrought iron gate with anti-rust coating.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop&q=80",
    tag: "Best Seller",
  },
  {
    id: 2,
    title: "Modern Safety Window Grill",
    category: "Iron",
    price: "₹8,500",
    description: "Heavy-duty safety window grill with premium geometric patterns.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=800&fit=crop&q=80",
    tag: "High Security",
  },
  {
    id: 3,
    title: "Classic Garden Bench",
    category: "Iron",
    price: "₹12,000",
    description: "Vintage-style powder-coated iron bench for premium outdoor seating.",
    image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&h=800&fit=crop&q=80",
    tag: "Trending",
  },
  {
    id: 4,
    title: "Designer Balcony Railing",
    category: "Iron",
    price: "₹15,500",
    description: "Sophisticated wrought iron balcony railing for luxurious residential projects.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=800&fit=crop&q=80",
    tag: "Custom Made",
  },

  // --- STEEL PRODUCTS ---
  {
    id: 5,
    title: "Stainless Steel Glass Railing",
    category: "Steel",
    price: "₹1,850 per Rft",
    description: "Sleek and minimalist 304-grade steel railing with tempered glass panels.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&h=800&fit=crop&q=80",
    tag: "Top Rated",
  },
  {
    id: 6,
    title: "Steel Wooden-Finish Gate",
    category: "Steel",
    price: "₹55,000 onwards",
    description: "Ultra-modern steel entrance gate featuring premium walnut-finish metal panels.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=800&fit=crop&q=80",
    tag: "Modern Design",
  },
  {
    id: 7,
    title: "Heavy Industrial Steel Racks",
    category: "Steel",
    price: "₹15,000 onwards",
    description: "High loading capacity steel storage racks for warehouse and factories.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=800&fit=crop&q=80",
    tag: "Industrial",
  },
  {
    id: 8,
    title: "Sleek Stainless Steel Door",
    category: "Steel",
    price: "₹32,500 onwards",
    description: "Rustproof premium stainless steel safety door with smart lock option.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&h=800&fit=crop&q=80",
    tag: "Highly Durable",
  },

  // --- ALUMINIUM PRODUCTS ---
  {
    id: 9,
    title: "Acoustic Sliding Windows",
    category: "Aluminium",
    price: "₹450 per Sqft",
    description: "Double-glazed powder-coated sliding windows for complete noise insulation.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=800&fit=crop&q=80",
    tag: "Energy Efficient",
  },
  {
    id: 10,
    title: "Sleek Glass Partition System",
    category: "Aluminium",
    price: "₹38,000 onwards",
    description: "Anodized slim aluminium frame partitions for corporate and modern offices.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=800&fit=crop&q=80",
    tag: "Office Choice",
  },
  {
    id: 11,
    title: "LED Shop Display Showcase",
    category: "Aluminium",
    price: "₹19,500 onwards",
    description: "Premium anodized aluminium display case with integrated LED spotlighting.",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600&h=800&fit=crop&q=80",
    tag: "Retail Favorite",
  },
  {
    id: 12,
    title: "Modern Frosted Aluminium Door",
    category: "Aluminium",
    price: "₹16,500 onwards",
    description: "Contemporary bathroom and passage door with high-grade aluminium and frosted glass.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=800&fit=crop&q=80",
    tag: "New Arrival",
  },
];

const tabData = [
  { id: "Iron", label: "Iron", icon: Hammer, desc: "Classic Strength & Artistry" },
  { id: "Steel", label: "Steel", icon: Shield, desc: "Sleek Modernity & Durability" },
  { id: "Aluminium", label: "Aluminium", icon: Layers, desc: "Lightweight Precision & Finish" },
] as const;

export default function PopularWorks() {
  const [activeTab, setActiveTab] = useState<"Iron" | "Steel" | "Aluminium">("Iron");
  const [isSwitched, setIsSwitched] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Wishlist state
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Mouse drag-to-scroll state
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftVal = useRef(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const activeProducts = productsData.filter((p) => p.category === activeTab);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    isDown.current = true;
    setIsMouseDown(true);
    setIsDragging(false);
    
    // Disable smooth scroll during drag for instant responsiveness
    el.style.scrollBehavior = "auto";
    
    startX.current = e.pageX - el.offsetLeft;
    scrollLeftVal.current = el.scrollLeft;
  };

  const handleMouseLeave = () => {
    if (!isDown.current) return;
    isDown.current = false;
    setIsMouseDown(false);
    
    const el = scrollContainerRef.current;
    if (el) {
      el.style.scrollBehavior = "smooth";
    }
  };

  const handleMouseUp = () => {
    if (!isDown.current) return;
    isDown.current = false;
    setIsMouseDown(false);
    
    const el = scrollContainerRef.current;
    if (el) {
      el.style.scrollBehavior = "smooth";
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown.current) return;
    const el = scrollContainerRef.current;
    if (!el) return;
    
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Scroll speed multiplier
    
    if (Math.abs(walk) > 5) {
      setIsDragging(true);
    }
    
    el.scrollLeft = scrollLeftVal.current - walk;
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const toggleWishlist = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isDragging) return;
    
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Check scroll positions to show/hide navigation arrows
  const checkScrollStatus = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    
    // Allow a buffer of 5px for precision errors
    const leftScroll = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;
    
    setShowLeftArrow(leftScroll > 5);
    setShowRightArrow(leftScroll < maxScroll - 5);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollStatus);
      // Run once initially
      checkScrollStatus();
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScrollStatus);
    };
  }, [activeTab]);

  // Adjust scroll when tab changes
  useEffect(() => {
    setIsSwitched(true);
    const timer = setTimeout(() => setIsSwitched(false), 300);
    
    // Reset scroll positions
    const el = scrollContainerRef.current;
    if (el) {
      el.scrollLeft = 0;
      setShowLeftArrow(false);
      setShowRightArrow(true);
    }

    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    
    const cardWidth = 330; // approx card width + gap
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
    
    el.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-slate-50 relative py-10 px-6 md:px-12 overflow-hidden font-sans border border-slate-200/80 rounded-md max-w-7xl mx-4 md:mx-8 xl:mx-auto my-16 shadow-md shadow-slate-100">
      {/* Background visual element: grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(234,88,12,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      
      {/* Visual Accent Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[3.5px] bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- Heading Area --- */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-none">
            Popular <span className="text-orange-500 relative">Works
              <span className="absolute bottom-1 left-0 w-full h-[6px] bg-orange-200/50 -z-10 rounded-full"></span>
            </span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Explore our state-of-the-art designs made with precise welding, premium materials, and flawless finishes.
          </p>
        </div>

        {/* --- Tabs Switcher --- */}
        <div className="flex flex-col items-center justify-center mb-12">
          {/* Centered Tab Buttons */}
          <div className="flex p-1.5 bg-white border border-slate-200/80 rounded-2xl shadow-md max-w-full overflow-x-auto scrollbar-none gap-1 shrink-0">
            {tabData.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-4 md:px-6 py-3 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 whitespace-nowrap outline-none cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20 scale-105"
                      : "text-slate-600 hover:text-orange-500 hover:bg-orange-50/50"
                  }`}
                >
                  <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? "rotate-6 scale-110" : ""}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
          {/* Active Tab Subtext */}
          <p className="mt-3 text-xs font-medium text-slate-400 tracking-wide uppercase transition-all duration-300">
            {tabData.find((t) => t.id === activeTab)?.desc}
          </p>
        </div>

        {/* --- Product Slider Area --- */}
        <div className="relative group px-1">
          {/* Slide Buttons - Desktop Only */}
          {showLeftArrow && (
            <button
              onClick={() => handleScroll("left")}
              className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white hover:bg-orange-500 border border-slate-200 text-slate-700 hover:text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer opacity-0 group-hover:opacity-100 md:opacity-100"
              aria-label="Previous Products"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5px]" />
            </button>
          )}

          {showRightArrow && (
            <button
              onClick={() => handleScroll("right")}
              className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white hover:bg-orange-500 border border-slate-200 text-slate-700 hover:text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer opacity-0 group-hover:opacity-100 md:opacity-100"
              aria-label="Next Products"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5px]" />
            </button>
          )}

          {/* Cards Horizontal Container */}
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`flex gap-6 overflow-x-auto ${
              isMouseDown ? "" : "snap-x snap-mandatory"
            } scrollbar-none pb-6 pt-2 transition-opacity duration-300 cursor-grab active:cursor-grabbing select-none ${
              isSwitched ? "opacity-30" : "opacity-100"
            }`}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              scrollBehavior: "smooth",
            }}
          >
            {activeProducts.map((p) => (
              <div
                key={p.id}
                className="flex-none w-[280px] md:w-[310px] bg-white border border-slate-200/70 rounded-md overflow-hidden snap-center group/card transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/5 hover:border-orange-200 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Product Image Area */}
                <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden shrink-0">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
                  />
                  {/* Badge */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-slate-900/80 backdrop-blur-sm text-white border border-white/10 shadow-md">
                    {p.tag}
                  </span>
                  
                  {/* Overlay Gradient on Image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase text-orange-500 tracking-wider mb-2">
                    <Tag className="w-3 h-3" />
                    <span>{p.category} Fabrication</span>
                  </div>

                  <h3 className="text-base md:text-lg font-bold text-slate-800 line-clamp-1 group-hover/card:text-orange-500 transition-colors duration-200">
                    {p.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed flex-grow">
                    {p.description}
                  </p>

                  <div className="h-[1px] bg-slate-100 my-4" />

                  {/* Price and Action Buttons */}
                  <div className="mt-auto space-y-3">
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider leading-none">Price Est.</p>
                      <p className="text-base font-extrabold text-slate-900 mt-1">{p.price}</p>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Link
                        href="/contact"
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-orange-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/30 active:scale-95"
                      >
                        <span>Order Now</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>

                      <button
                        onClick={(e) => toggleWishlist(p.id, e)}
                        className={`inline-flex items-center justify-center gap-1.5 font-bold text-xs px-4 py-2.5 rounded-md transition-all duration-300 hover:scale-105 active:scale-95 border cursor-pointer select-none group/wishlist-btn ${
                          wishlist.includes(p.id)
                            ? "bg-red-500 hover:bg-red-600 border-transparent text-white shadow-md shadow-red-500/20"
                            : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900"
                        }`}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 transition-all duration-300 ${
                            wishlist.includes(p.id)
                              ? "fill-current text-white scale-110"
                              : "text-slate-400 group-hover/wishlist-btn:text-red-500 group-hover/wishlist-btn:scale-110"
                          }`}
                        />
                        <span>{wishlist.includes(p.id) ? "Wishlisted" : "Wishlist"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {activeProducts.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const el = scrollContainerRef.current;
                  if (el) {
                    el.scrollTo({
                      left: i * 330,
                      behavior: "smooth",
                    });
                  }
                }}
                className="w-8 h-3 flex items-center justify-center group/dot focus:outline-none"
                aria-label={`Go to slide ${i + 1}`}
              >
                <span className="w-2 h-2 rounded-full bg-slate-200 group-hover/dot:bg-orange-300 transition-all duration-300 group-hover/dot:w-3 group-hover/dot:h-3" />
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
