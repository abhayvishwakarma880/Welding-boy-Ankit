"use client";
import { useEffect, useRef, useState } from "react";
import TopBar from "./TopBar";
import MainNavbar from "./MainNavbar";

export default function Navbar() {
  const topBarRef = useRef<HTMLDivElement>(null);
  const [fixed, setFixed] = useState(false);
  const [topBarHeight, setTopBarHeight] = useState(0);

  useEffect(() => {
    if (topBarRef.current) {
      setTopBarHeight(topBarRef.current.offsetHeight);
    }

    const onScroll = () => {
      if (topBarRef.current) {
        setFixed(window.scrollY >= topBarRef.current.offsetHeight);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ paddingTop: fixed ? topBarHeight : 0 }}>
      {/* TopBar - scrolls normally */}
      <div ref={topBarRef}>
        <TopBar />
      </div>

      {/* MainNavbar - fixed at top after TopBar scrolls away */}
      <div className={`z-50 transition-transform duration-300 ease-out ${
        fixed
          ? "fixed top-0 left-0 right-0 -translate-y-0 shadow-md"
          : "relative -translate-y-0"
      }`}
        style={fixed ? { animation: "slideDown 0.3s ease-out" } : {}}
      >
        <MainNavbar isFixed={fixed} />
      </div>
    </div>
  );
}
