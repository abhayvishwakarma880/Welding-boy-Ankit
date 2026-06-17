"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import useUserStore from "@/store/useUserStore";

// Google Translate ke liye global type
declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: new (options: object, element: string) => void;
      };
    };
    googleTranslateElementInit: () => void;
  }
}

export default function TopBar() {
  const [lang, setLang] = useState<"EN" | "HI">("EN");

  const switchLanguage = (targetLang: "EN" | "HI") => {
    if (targetLang === lang) return;
    setLang(targetLang);

    // Google Translate cookie set karke page translate hoga
    const langCode = targetLang === "HI" ? "hi" : "en";

    // Existing googtrans cookie remove karo
    document.cookie =
      "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = `googtrans=/en/${langCode}; path=/`;

    // Widget ke andar select element dhundh ke trigger karo
    const tryTranslate = () => {
      const select = document.querySelector(
        ".goog-te-combo",
      ) as HTMLSelectElement | null;
      if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event("change"));
      } else {
        setTimeout(tryTranslate, 300);
      }
    };
    tryTranslate();
  };

  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  const [mounted, setMounted] = useState(false);
  const [flash, setFlash] = useState(false);
  const [alert, setAlert] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Flash every 1.5s
    const flashInterval = setInterval(() => {
      setFlash(true);
      setTimeout(() => setFlash(false), 400);
    }, 1500);

    // Alert shake on page load after 1s
    const alertTimeout = setTimeout(() => {
      setAlert(true);
      setShowTooltip(true);
      setTimeout(() => setAlert(false), 800);
      setTimeout(() => setShowTooltip(false), 3500);
    }, 1000);

    return () => {
      clearInterval(flashInterval);
      clearTimeout(alertTimeout);
    };
  }, []);

  const btnClass =
    "flex items-center gap-1.5 px-3 py-1.5 rounded text-white text-xs font-semibold border border-white/30 hover:bg-black/20 transition cursor-pointer";

  return (
    <div className="w-full bg-brand text-white px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Phone Number - always visible */}
        <a
          href="tel:+917905940157"
          className="relative flex items-center gap-2 shrink-0 group"
        >
          {/* Alert ring on load */}
          {alert && (
            <span className="absolute -inset-2 rounded-full border-2 border-yellow-300 animate-ping z-10" />
          )}

          {/* Tooltip */}
          <div
            className={`absolute -bottom-10 left-0 z-50 transition-all duration-300 ${
              showTooltip
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-1 pointer-events-none"
            }`}
          >
            <div className="bg-gray-900 text-white text-[10px] font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              📞 Tap to call us now!
              <span className="absolute -top-1.5 left-4 w-3 h-3 bg-gray-900 rotate-45" />
            </div>
          </div>

          <span
            className={`relative flex h-6 w-6 transition-transform duration-75 ${
              alert ? "animate-bounce" : ""
            }`}
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-30" />
            <span
              className={`relative inline-flex items-center justify-center h-6 w-6 rounded-full border transition-all duration-300 ${
                alert
                  ? "bg-yellow-400 border-yellow-300 scale-125"
                  : "bg-white/20 border-white/40"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </span>
          </span>

          <span className="flex flex-col leading-tight">
            <span className="text-white/70 text-[9px] uppercase tracking-widest hidden sm:block">
              Call Us
            </span>
            <span
              className={`font-bold text-xs sm:text-sm tracking-wider transition-all duration-300 ${
                alert
                  ? "text-yellow-300 scale-110 drop-shadow-[0_0_10px_rgba(253,224,71,1)]"
                  : flash
                    ? "text-yellow-300 scale-110 drop-shadow-[0_0_6px_rgba(253,224,71,0.9)]"
                    : "text-white scale-100"
              }`}
              style={{ display: "inline-block" }}
            >
              +91 79059 40157
            </span>
          </span>

          <span className="absolute -top-1.5 -right-1 bg-green-400 text-white text-[8px] font-bold px-1 py-0.5 rounded-full animate-pulse">
            CALL
          </span>
        </a>

        {/* Marquee - hidden on mobile */}
        <div className="hidden md:block overflow-hidden flex-1 mx-6">
          <div className="whitespace-nowrap animate-marquee text-white text-xs inline-block">
            🔥 Free delivery on orders above ₹999 &nbsp;&nbsp;&nbsp; ⚡ Custom
            Welding &amp; Fabrication available &nbsp;&nbsp;&nbsp; 🛠️ Steel
            Railing, Iron Gate, Grill, Aluminium Work &nbsp;&nbsp;&nbsp; 🎉
            Special discount on bulk orders! &nbsp;&nbsp;&nbsp; 🏆 Trusted by
            500+ customers &nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </div>

        {/* Right buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Login/Profile - hidden on mobile */}
          {mounted && isLoggedIn ? (
            <Link href="/profile" className={`${btnClass} hidden sm:flex`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Profile
            </Link>
          ) : (
            <Link href="/login" className={`${btnClass} hidden sm:flex`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Login
            </Link>
          )}

          {/* Create Order - hidden on mobile */}
          <button className={`${btnClass} hidden sm:flex`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Order
          </button>

          {/* Language Toggle */}
          <div className="flex items-center gap-0.5 border border-white/30 rounded overflow-hidden">
            <button
              onClick={() => switchLanguage("EN")}
              className={`px-2.5 py-1.5 text-xs font-bold transition-all duration-200 ${
                lang === "EN"
                  ? "bg-white text-brand"
                  : "text-white hover:bg-white/10"
              }`}
            >
              EN
            </button>
            <span className="text-white/30 text-xs">|</span>
            <button
              onClick={() => switchLanguage("HI")}
              className={`px-2.5 py-1.5 text-xs font-bold transition-all duration-200 ${
                lang === "HI"
                  ? "bg-white text-brand"
                  : "text-white hover:bg-white/10"
              }`}
            >
              हि
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
