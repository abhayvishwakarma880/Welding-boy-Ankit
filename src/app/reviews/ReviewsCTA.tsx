import Link from "next/link";

export default function ReviewsCTA() {
  return (
    <section className="bg-brand py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
          Ready to Start Your Project?
        </h2>
        <p className="mt-3 text-white/80 text-sm leading-relaxed">
          Gate, grill, railing, shed ya custom fabrication work ke liye humse sampark karein.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
          <Link
            href="tel:+917905940157"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 bg-white text-brand font-bold text-sm rounded-lg shadow transition hover:bg-white/90 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call Now
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 bg-white/10 border border-white/30 text-white font-bold text-sm rounded-lg transition hover:bg-white/20 active:scale-95"
          >
            Get Free Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
