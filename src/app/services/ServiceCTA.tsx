import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";

export default function ServiceCTA() {
  return (
    <section className="relative w-full py-14 md:py-20 overflow-hidden font-sans">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

      {/* Brand glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-brand/15 rounded-full blur-3xl pointer-events-none" />

      {/* Accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[3px] bg-gradient-to-r from-transparent via-brand to-transparent rounded-full" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center flex flex-col items-center gap-6">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/10 border border-brand/30 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
          <span className="text-xs font-bold text-brand uppercase tracking-widest">Start Your Project</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
          Ready to Start Your <span className="text-brand">Project?</span>
        </h2>

        <p className="text-sm md:text-base text-slate-400 max-w-2xl leading-relaxed">
          Gate manufacturing, welding repair, fabrication work ya custom metal solution ke liye humse sampark karein. Hamari team aapki requirement ke according suitable solution suggest karegi.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          <Link
            href="tel:+917905940157"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand text-white font-bold text-sm rounded-md shadow-lg shadow-brand/30 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Phone className="w-4 h-4" />
            Call +91 79059 40157
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur-md text-white font-bold text-sm rounded-md border border-white/20 transition-all duration-300 hover:bg-white/20 active:scale-95"
          >
            Request a Quote
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
