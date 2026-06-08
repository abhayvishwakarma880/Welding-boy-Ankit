const stats = [
  { value: "500+", label: "Completed Projects" },
  { value: "10+", label: "Years Experience" },
  { value: "100%", label: "Quality Focus" },
];

export default function GalleryHero() {
  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden font-sans">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[3px] bg-gradient-to-r from-transparent via-brand to-transparent rounded-full" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center flex flex-col items-center gap-6">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/10 border border-brand/30 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
          <span className="text-xs font-bold text-brand uppercase tracking-widest">Our Work</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
          Our Work <span className="text-brand">Gallery</span>
        </h1>

        {/* Description */}
        <p className="text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">
          Shree Vishwakarma Welding Shop dwara complete kiye gaye gates, grills, railings, sheds aur fabrication projects ki kuch jhalakiyan. Har project quality workmanship aur professional finishing ko darshata hai.
        </p>

        {/* Stats */}
        <div className="flex items-center gap-8 mt-2">
          {stats.map((s, i) => (
            <div key={s.label} className="flex items-center gap-8">
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl md:text-3xl font-extrabold text-brand">{s.value}</span>
                <span className="text-xs text-slate-400 font-medium whitespace-nowrap">{s.label}</span>
              </div>
              {i < stats.length - 1 && (
                <div className="w-[1px] h-8 bg-white/10" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
