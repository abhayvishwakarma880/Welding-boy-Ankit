export default function ReviewsHero() {
  return (
    <section className="bg-white pt-10 pb-6 px-4 text-center border-b border-gray-100">
      <span className="inline-flex items-center gap-1.5 bg-brandBG-icon border border-brand rounded-full px-3 py-1 text-[10px] font-bold tracking-widest text-brand uppercase mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-brand inline-block" />
        Customer Reviews
      </span>
      <h1 className="text-2xl md:text-4xl font-extrabold text-zinc-900 leading-tight mt-2">
        What Our <span className="text-brand">Customers Say</span>
      </h1>
      <p className="mt-3 text-sm text-zinc-500 max-w-xl mx-auto leading-relaxed">
        Shree Vishwakarma Welding Shop ke customers ke feedback aur experiences. Quality workmanship, timely delivery aur customer satisfaction hamari sabse badi priority hai.
      </p>
    </section>
  );
}
