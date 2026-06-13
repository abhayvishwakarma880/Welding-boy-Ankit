export default function BlogHero() {
  return (
    <section className="bg-white pt-10 pb-8 px-4 text-center border-b border-gray-100">
      <span className="inline-flex items-center gap-1.5 bg-brandBG-icon border border-brand rounded-full px-3 py-1 text-[10px] font-bold tracking-widest text-brand uppercase mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-brand inline-block" />
        Knowledge Center
      </span>
      <h1 className="text-2xl md:text-4xl font-extrabold text-zinc-900 leading-tight mt-2">
        Welding &amp; Fabrication <span className="text-brand">Knowledge Center</span>
      </h1>
      <p className="mt-3 text-sm text-zinc-500 max-w-xl mx-auto leading-relaxed">
        Gate manufacturing, metal fabrication, grill design, welding techniques, maintenance tips aur industry insights se judi useful jankari ek hi jagah.
      </p>

      <div className="mt-6 max-w-md mx-auto flex items-center border-2 border-brand rounded-xl overflow-hidden">
        <input
          type="text"
          placeholder="Search articles..."
          className="flex-1 px-4 py-3 text-sm text-zinc-700 outline-none bg-white"
        />
        <button className="bg-brand text-white px-5 py-3 text-sm font-semibold transition hover:bg-brand-hover shrink-0">
          Search
        </button>
      </div>
    </section>
  );
}
