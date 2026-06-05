import Link from "next/link";
import { Phone, MapPin, Mail, Flame } from "lucide-react";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Products", path: "/products" },
  { name: "Gallery", path: "/gallery" },
  { name: "Reviews", path: "/reviews" },
  { name: "Contact", path: "/contact" },
  { name: "Blogs", path: "/blog" },
];

const services = [
  "Custom Gates & Grills",
  "Window & Door Grills",
  "Balcony Railings",
  "Staircase Railings",
  "Steel Furniture",
  "Structural Fabrication",
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 font-sans">

      {/* Top accent line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 grid grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Col 1 — Brand */}
        <div className="flex flex-col gap-4 col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Flame className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="leading-none">
              <p className="text-white font-extrabold text-base tracking-tight">Vishwakarma</p>
              <p className="text-orange-400 text-[11px] font-semibold uppercase tracking-widest">Welding Shop</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-500">
            Premium metal fabrication and welding services crafted with precision, durability, and passion since over a decade.
          </p>
          {/* Social placeholder */}
          <div className="flex gap-2 mt-1">
            {["FB", "IG", "WA"].map((s) => (
              <span
                key={s}
                className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 cursor-pointer"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Col 2 — Quick Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-bold text-sm uppercase tracking-widest">Quick Links</h3>
          <ul className="flex flex-col gap-2">
            {quickLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className="text-sm text-slate-500 hover:text-orange-400 transition-colors duration-200 flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-orange-500/40 group-hover:bg-orange-500 transition-colors duration-200" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Services */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-bold text-sm uppercase tracking-widest">Our Services</h3>
          <ul className="flex flex-col gap-2">
            {services.map((s) => (
              <li key={s} className="flex items-center gap-1.5 group">
                <span className="w-1 h-1 rounded-full bg-orange-500/40 group-hover:bg-orange-500 transition-colors duration-200" />
                <span className="text-sm text-slate-500 group-hover:text-orange-400 transition-colors duration-200">{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Contact */}
        <div className="flex flex-col gap-4 col-span-2 lg:col-span-1">
          <h3 className="text-white font-bold text-sm uppercase tracking-widest">Contact Us</h3>
          <div className="flex flex-col gap-4">

            <Link href="tel:+917905940157" className="flex items-start gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-300">
                <Phone className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <p className="text-[11px] text-slate-600 uppercase tracking-wider font-semibold">Phone</p>
                <p className="text-sm text-slate-400 group-hover:text-orange-400 transition-colors duration-200">+91 79059 40157</p>
              </div>
            </Link>

            <Link href="mailto:info@vishwakarmavelding.com" className="flex items-start gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-300">
                <Mail className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <p className="text-[11px] text-slate-600 uppercase tracking-wider font-semibold">Email</p>
                <p className="text-sm text-slate-400 group-hover:text-orange-400 transition-colors duration-200">info@vishwakarma.com</p>
              </div>
            </Link>

            <a href="https://maps.app.goo.gl/kKaWEiqhF2T35v1o6" target="_blank" className="flex items-start gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-300">
                <MapPin className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <p className="text-[11px] text-slate-600 uppercase tracking-wider font-semibold">Address</p>
                <p className="text-sm text-slate-400 leading-relaxed group-hover:text-orange-400 transition-colors duration-200">
                  Lakhua Chauraha, Khadda<br />
                  Kushinagar, UP — 274802
                </p>
              </div>
            </a>

          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} Vishwakarma Welding Shop. All rights reserved.</p>
          <p>Crafted with <span className="text-orange-500">♥</span> by Abhay Vishwakarma</p>
        </div>
      </div>

    </footer>
  );
}
