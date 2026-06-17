"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { navLinks } from "./navLink";
import useCategoryStore from "@/store/useCategoryStore";
import useUserStore from "@/store/useUserStore";

interface Props {
  open: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

export default function MobileDrawer({ open, onClose, onLoginClick }: Props) {
  const [catOpen, setCatOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { categories } = useCategoryStore();
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  const user = useUserStore((s) => s.user);
  const logout = useUserStore((s) => s.logout);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      // document.documentElement.style.overflow = "hidden";
      document.body.style.paddingRight = "0px";
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };

    // document.body.style.overflow = open ? "hidden" : "";
    // return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-[998] transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[80vw] max-w-[320px] bg-white z-[999] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-brand">
          <span className="text-white font-bold text-base">Menu</span>
          <button onClick={onClose} className="text-white p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center border-2 border-brand rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search products, services..."
              className="flex-1 px-3 py-2 text-sm text-gray-700 outline-none"
            />
            <button className="bg-brand text-white px-4 py-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 min-h-screen overflow-y-auto bg-white overscroll-contain">

          {/* Quick actions */}
          <div className="flex gap-2 px-4 py-3 border-b border-gray-100">
            {mounted && isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  onClick={onClose}
                  className="flex-1 flex items-center justify-center gap-2 py-2 border border-brand text-brand rounded-lg text-sm font-semibold"
                >
                  <span className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center text-xs font-bold uppercase shrink-0">
                    {user?.name?.charAt(0) || "U"}
                  </span>
                  {user?.name?.split(" ")[0] || "Profile"}
                </Link>
                <button
                  onClick={() => { logout(); onClose(); }}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-semibold"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { onClose(); setTimeout(() => onLoginClick(), 300); }}
                  className="flex-1 flex items-center justify-center gap-2 py-2 border border-brand text-brand rounded-lg text-sm font-semibold"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Login
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-brand text-white rounded-lg text-sm font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Order
                </button>
              </>
            )}
          </div>

          {/* Nav Links */}
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Pages</p>
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 py-2.5 text-sm font-medium border-b border-gray-50 last:border-0 transition ${
                    isActive ? "text-brand font-semibold" : "text-gray-700 hover:text-brand"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    isActive ? "bg-brand scale-125" : "bg-brand"
                  }`} />
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Categories Accordion */}
          <div className="px-4 py-2">
            <button
              onClick={() => setCatOpen(!catOpen)}
              className="flex items-center justify-between w-full py-2.5 text-sm font-bold text-gray-700"
            >
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                All Categories
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${catOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`overflow-hidden transition-all duration-300 ${catOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="grid grid-cols-2 gap-1 pb-3">
                {categories.map((cat: { _id: string; name: string }) => (
                  <Link
                    key={cat._id}
                    href={`/products?category=${cat._id}`}
                    onClick={onClose}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-brand/10 hover:text-brand rounded-lg transition text-left"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
          <p className="text-center text-xs text-gray-400">श्री विश्वकर्मा वेल्डिंग</p>
        </div>
      </div>
    </>
  );
}
