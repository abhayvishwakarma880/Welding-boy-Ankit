"use client";
import { useState, useEffect } from "react";

export default function TopBar() {
  const [lang, setLang] = useState("EN");
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlash(true);
      setTimeout(() => setFlash(false), 400);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const btnClass =
    "flex items-center gap-1.5 px-4 py-2 rounded text-white text-xs font-semibold bg-gradient-to-r from-transparent to-black/0 border border-white/30 hover:from-black/40 hover:to-black/80 transition cursor-pointer";

  return (
    <div className="w-full bg-orange-500 text-white py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Phone Number - Left */}
        <a
          href="tel:+917905940157"
          className="relative flex items-center gap-2 shrink-0 mr-6 group"
        >
          {/* Ping animation badge */}
          <span className="relative flex h-7 w-7">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-30" />
            <span className="relative inline-flex items-center justify-center h-7 w-7 rounded-full bg-white/20 border border-white/40">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </span>
          </span>

          {/* Number with slide-in animation */}
          <span className="flex flex-col leading-tight">
            <span className="text-white/70 text-[10px] uppercase tracking-widest">Call Us</span>
            <span className={`font-bold text-sm tracking-wider transition-all duration-300 ${
                flash
                  ? "text-yellow-300 scale-110 drop-shadow-[0_0_6px_rgba(253,224,71,0.9)]"
                  : "text-white scale-100"
              }`} style={{ display: "inline-block" }}>
              +91 79059 40157
            </span>
          </span>

          {/* LIVE badge */}
          <span className="absolute -top-1.5 -right-1 bg-green-400 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
            CALL
          </span>
        </a>

        {/* Scrolling marquee text */}
        <div className="overflow-hidden flex-1 mx-6">
          <div className="whitespace-nowrap animate-marquee text-white text-xs inline-block">
            🔥 Free delivery on orders above ₹999 &nbsp;&nbsp;&nbsp; ⚡ Custom Welding &amp; Fabrication available &nbsp;&nbsp;&nbsp; 🛠️ Steel Railing, Iron Gate, Grill, Aluminium Work &nbsp;&nbsp;&nbsp; 📞 Call us: +91 79059 40157 &nbsp;&nbsp;&nbsp; 🎉 Special discount on bulk orders! &nbsp;&nbsp;&nbsp; 🏆 Trusted by 500+ customers &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button className={btnClass}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Login
          </button>

          <button className={btnClass}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Order
          </button>

          <button
            onClick={() => setLang(lang === "EN" ? "HI" : "EN")}
            className={btnClass}
          >
            🌐 {lang === "EN" ? "English" : "हिंदी"}
          </button>
        </div>

      </div>
    </div>
  );
}
