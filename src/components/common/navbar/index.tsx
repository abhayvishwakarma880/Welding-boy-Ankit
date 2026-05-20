"use client";
import { useEffect, useState } from "react";
import TopBar from "./TopBar";
import MainNavbar from "./MainNavbar";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="w-full">
      {/* Top Bar - hides on scroll */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        }`}
      >
        <TopBar />
      </div>

      {/* Main Navbar - always sticky */}
      <div className="sticky top-0 z-50">
        <MainNavbar />
      </div>
    </div>
  );
}
