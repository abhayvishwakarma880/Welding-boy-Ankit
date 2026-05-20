"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { navLinks } from "./navLink";

const categories = [
  "Welding Work",
  "Steel Railing",
  "Iron Gate",
  "Window Grill",
  "Aluminium Gate",
  "Fabrication",
  "Cutting & Grinding",
  "Safety Gear",
  "Custom Orders",
  "MS Structure",
  "Staircase Railing",
  "Gate Automation",
];

export default function MainNavbar() {
  const [catOpen, setCatOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCatOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-stretch gap-4">

          {/* Logo - spans both rows */}
          <Link
            href="/"
            className="flex items-center shrink-0 py-2 pr-4 border-r border-gray-200"
          >
            <Image
              src="https://i.pinimg.com/736x/5d/33/07/5d33076e393254dfaec0af381d401008.jpg"
              alt="Shree Vishwakarma Welding"
              width={80}
              height={80}
              className="object-contain rounded"
              unoptimized
            />
          </Link>

          {/* Right side - 2 rows */}
          <div className="flex-1 flex flex-col">

            {/* Row 1: Search + Wishlist + Cart */}
            <div className="flex items-center gap-4 py-2 border-b border-gray-100">

              {/* Search */}
              <div className="flex flex-1 items-center border-2 border-orange-500 rounded-md overflow-hidden">
                <input
                  type="text"
                  placeholder="Search products, services..."
                  className="flex-1 px-4 py-2 text-sm text-gray-700 outline-none bg-white"
                />
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 text-sm font-medium transition">
                  Search
                </button>
              </div>

              {/* Wishlist */}
              <Link href="/wishlist" className="flex items-center gap-2 px-5 py-2 border border-gray-200 rounded-lg text-gray-600 hover:text-orange-500 hover:border-orange-400 transition shrink-0 min-w-[130px]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                </svg>
                <div>
                  {/* <p className="text-xs text-gray-400">My</p> */}
                  <p className="text-sm font-semibold">Wishlist</p>
                </div>
              </Link>

              {/* Cart */}
              <Link href="/cart" className="flex items-center gap-2 px-5 py-2 border border-gray-200 rounded-lg text-gray-600 hover:text-orange-500 hover:border-orange-400 transition shrink-0 min-w-[130px]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
                </svg>
                <div>
                  {/* <p className="text-xs text-gray-400">My</p> */}
                  <p className="text-sm font-semibold">Cart</p>
                </div>
              </Link>

            </div>

            {/* Row 2: All Categories + NavLinks + Hindi Brand Name */}
            <div className="flex items-center gap-1 py-1.5">

              {/* All Categories Button - Wider */}
              <div className="relative shrink-0" ref={dropdownRef}>
                <button
                  onClick={() => setCatOpen(!catOpen)}
                  className="flex items-center gap-3 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded transition cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  All Categories
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-200 ${catOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* 3-column Dropdown */}
                <div
                  className={`fixed mt-1 w-130 bg-white border border-gray-200 rounded-xl shadow-2xl z-9999 p-4 transition-all duration-300 ease-out origin-top ${
                    catOpen
                      ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
                  }`}
                  style={{
                    top: dropdownRef.current ? dropdownRef.current.getBoundingClientRect().bottom + window.scrollY : "auto",
                    left: dropdownRef.current ? dropdownRef.current.getBoundingClientRect().left : "auto",
                  }}
                >
                  <div className="grid grid-cols-3 gap-1">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCatOpen(false)}
                        className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-700 hover:bg-orange-500 hover:text-white rounded-lg transition text-left cursor-pointer"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <span className="mx-2 text-gray-300 shrink-0">|</span>

              {/* Nav Links - Expanded to fill space */}
              <div className="flex items-center gap-1 flex-1 overflow-x-auto scrollbar-hide">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    className="shrink-0 px-4 py-1.5 text-sm font-medium text-gray-600 hover:text-orange-500 transition whitespace-nowrap"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Hindi Brand Name - Prominent Brand Element */}
              {/* <div className="shrink-0 ml-2 flex items-center">
                <span className="px-4 py-2 rounded-md bg-linear-to-r from-orange-500 to-orange-600 text-white text-base md:text-lg font-bold tracking-wide shadow-sm whitespace-nowrap">
                  श्री विश्वकर्मा वेल्डिंग
                </span>
              </div> */}

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}