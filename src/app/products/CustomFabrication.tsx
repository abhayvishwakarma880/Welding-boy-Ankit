import Link from "next/link";
import { ArrowRight } from "lucide-react";

const items = [
  "Custom Gates",
  "Custom Grills",
  "Stair Structures",
  "Industrial Frames",
  "Machine Platforms",
  "Special Fabrication Projects",
];

export default function CustomFabrication() {
  return (
    <section className="relative w-full py-14 md:py-20 overflow-hidden font-sans">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-brand/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[3px] bg-gradient-to-r from-transparent via-brand to-transparent rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* Left */}
          <div className="flex flex-col gap-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/10 border border-brand/30 rounded-full w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              <span className="text-xs font-bold text-brand uppercase tracking-widest">Custom Work</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
              Need Something <span className="text-brand">Custom?</span>
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Har project standard nahi hota. Hum customer ke drawing, dimensions aur requirement ke according custom fabrication products bhi manufacture karte hain.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand text-white font-bold text-sm rounded-md shadow-lg shadow-brand/30 transition-all duration-300 hover:scale-105 active:scale-95 w-fit"
            >
              Request Custom Design
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right — We Build list */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">We Build</p>
            <div className="grid grid-cols-2 gap-2">
              {items.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 px-4 py-3 bg-white/5 border border-white/10 rounded-xl"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                  <span className="text-sm text-slate-300 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
