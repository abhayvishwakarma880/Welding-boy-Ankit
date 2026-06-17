"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { navLinks } from "./navLink";
import MobileDrawer from "./MobileDrawer";
import useCategoryStore from "@/store/useCategoryStore";
import useWishlistStore from "@/store/useWishlistStore";
import useUserStore from "@/store/useUserStore";
import LoginModal from "@/components/common/LoginModal";

export default function MainNavbar({ isFixed = false }: { isFixed?: boolean }) {
  const [catOpen, setCatOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { categories } = useCategoryStore();
  const { wishlistIds } = useWishlistStore();
  const wishlistCount = wishlistIds.length;
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  const user = useUserStore((s) => s.user);
  const logout = useUserStore((s) => s.logout);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setCatOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="w-full bg-white border-b border-gray-200 shadow-sm">
        {/* ── MOBILE LAYOUT ── */}
        <div className="lg:hidden">
          {/* Mobile Row 1: Hamburger | Logo | Wishlist | Cart */}
          <div className="flex items-center gap-3 px-4 py-2.5">
            {/* Hamburger */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex flex-col justify-center gap-1.5 p-1 shrink-0"
              aria-label="Open menu"
            >
              <span className="block w-6 h-0.5 bg-gray-700 rounded" />
              <span className="block w-6 h-0.5 bg-gray-700 rounded" />
              <span className="block w-4 h-0.5 bg-gray-700 rounded" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex-1 flex items-center">
              <Image
                src="/logo/logo.webp"
                alt="Shree Vishwakarma Welding"
                width={48}
                height={48}
                className="object-contain rounded"
                unoptimized
              />
              <span className="ml-2 text-sm font-bold text-brand leading-tight">
                Shree Vishwakarma <br />
                Welding work
              </span>
            </Link>

            {/* Wishlist icon - mobile */}
            <Link
              href="/wishlist"
              className="relative p-2 text-gray-600 hover:text-brand transition shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart icon */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-600 hover:text-brand transition shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
                />
              </svg>
            </Link>
          </div>

          {/* Mobile Row 2: Search bar + Login/Profile button */}
          <div className="px-4 pb-2.5 flex items-center gap-2">
            {/* Search */}
            <div className="flex flex-1 items-center border-2 border-brand rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="Search products, services..."
                className="flex-1 px-3 py-2 text-sm text-gray-700 outline-none bg-white"
              />
              <button className="bg-brand text-white px-4 py-3 transition shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                  />
                </svg>
              </button>
            </div>

            {/* Login / Profile Button */}
            {mounted && isLoggedIn ? (
              <Link
                href="/profile"
                className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-brand text-white shadow-sm hover:bg-brand/90 transition"
                title={user?.name || "Profile"}
              >
                {user?.name ? (
                  <span className="text-xs font-bold uppercase">
                    {user.name.charAt(0)}
                  </span>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
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
                )}
              </Link>
            ) : (
              <button
                onClick={() => setLoginModalOpen(true)}
                className="shrink-0 flex items-center gap-1.5 px-3 py-3 bg-brand text-white text-xs font-bold rounded-md hover:bg-brand/90 transition whitespace-nowrap"
              >
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
              </button>
            )}
          </div>
        </div>

        {/* ── DESKTOP LAYOUT ── */}
        <div className="hidden lg:block">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-stretch gap-4">
              {/* Logo - spans both rows */}
              <Link
                href="/"
                className="flex items-center shrink-0 py-2 pr-4 border-r border-gray-200 transition-all duration-300"
              >
                <Image
                  src="/logo/logo.webp"
                  alt="Shree Vishwakarma Welding"
                  width={isFixed ? 36 : 80}
                  height={isFixed ? 36 : 80}
                  className="object-contain rounded transition-all duration-300"
                  unoptimized
                />
              </Link>

              {/* Right side - 2 rows */}
              <div className="flex-1 flex flex-col">
                {/* Desktop Row 1: Search + Wishlist + Cart - hidden when fixed */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isFixed
                      ? "max-h-0 opacity-0 py-0"
                      : "max-h-24 opacity-100 py-2 border-b border-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="flex flex-1 items-center border-2 border-brand rounded-md overflow-hidden">
                      <input
                        type="text"
                        placeholder="Search products, services..."
                        className="flex-1 px-4 py-2 text-sm text-gray-700 outline-none bg-white"
                      />
                      <button className="bg-brand text-white px-5 py-2 text-sm font-medium transition">
                        Search
                      </button>
                    </div>

                    {/* Wishlist - desktop row 1 */}
                    <Link
                      href="/wishlist"
                      className="relative flex items-center gap-2 px-5 py-2 border border-gray-200 rounded-lg text-gray-600 hover:text-brand hover:border-brand transition shrink-0 min-w-[130px]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                        />
                      </svg>
                      <p className="text-sm font-semibold">Wishlist</p>
                      {wishlistCount > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                          {wishlistCount}
                        </span>
                      )}
                    </Link>

                    {/* Cart */}
                    <Link
                      href="/cart"
                      className="flex items-center gap-2 px-5 py-2 border border-gray-200 rounded-lg text-gray-600 hover:text-brand hover:border-brand transition shrink-0 min-w-[130px]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
                        />
                      </svg>
                      <p className="text-sm font-semibold">Cart</p>
                    </Link>
                  </div>
                  {/* end inner flex */}
                </div>
                {/* end Row 1 wrapper */}

                {/* Desktop Row 2: All Categories + NavLinks */}
                <div className="flex items-center gap-1 py-1.5">
                  {/* All Categories Button + Dropdown */}
                  <div className="relative shrink-0" ref={dropdownRef}>
                    <button
                      onClick={() => setCatOpen(!catOpen)}
                      className="flex items-center gap-2 px-5 py-2 bg-brand text-white text-sm font-medium rounded transition cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                      All Categories
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 transition-transform duration-200 ${catOpen ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* 3-column Dropdown */}
                    <div
                      className={`absolute top-full left-0 mt-1 w-[520px] bg-white border border-gray-200 rounded-xl shadow-2xl z-[9999] p-4 transition-all duration-300 ease-out origin-top ${
                        catOpen
                          ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
                      }`}
                    >
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1">
                        Browse Categories
                      </p>
                      <div className="grid grid-cols-3 gap-1">
                        {categories.map(
                          (cat: { _id: string; name: string }) => (
                            <Link
                              key={cat._id}
                              href={`/products?category=${cat._id}`}
                              onClick={() => setCatOpen(false)}
                              className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-700 hover:bg-brand hover:text-white rounded-lg transition text-left cursor-pointer"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                              {cat.name}
                            </Link>
                          ),
                        )}
                      </div>
                    </div>
                  </div>

                  <span className="mx-2 text-gray-300 shrink-0">|</span>

                  {/* Nav Links */}
                  <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
                    {navLinks.map((link) => {
                      const isActive = pathname === link.path;
                      return (
                        <Link
                          key={link.name}
                          href={link.path}
                          className={`relative shrink-0 px-3 py-1.5 text-sm font-medium transition-colors whitespace-nowrap
                            after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-brand after:rounded-full
                            after:transition-transform after:duration-300 after:origin-left
                            ${
                              isActive
                                ? "text-brand after:scale-x-100"
                                : "text-gray-600 hover:text-brand after:scale-x-0 hover:after:scale-x-100"
                            }`}
                        >
                          {link.name}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Search box - only when fixed */}
                  <div
                    className={`transition-all duration-300 ${
                      isFixed
                        ? "w-48 opacity-100 mx-2"
                        : "w-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="flex items-center border-2 border-brand rounded-md overflow-hidden w-full">
                      <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-3 py-1.5 text-sm text-gray-700 outline-none bg-white min-w-0"
                      />
                      <button className="bg-brand text-white px-3 py-2 transition shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Wishlist + Cart — only when fixed/scrolled */}
                  <div
                    className={`flex items-center gap-2 shrink-0 transition-all duration-300 ${
                      isFixed
                        ? "opacity-100 translate-x-0 pointer-events-auto"
                        : "opacity-0 translate-x-4 pointer-events-none w-0 overflow-hidden"
                    }`}
                  >
                    <Link
                      href="/wishlist"
                      className="relative flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:text-brand hover:border-brand transition text-sm font-medium"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                        />
                      </svg>
                      Wishlist
                      {wishlistCount > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                          {wishlistCount}
                        </span>
                      )}
                    </Link>
                    <Link
                      href="/cart"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-brand text-white rounded-lg transition text-sm font-medium"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
                        />
                      </svg>
                      Cart
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onLoginClick={() => setLoginModalOpen(true)}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </>
  );
}
