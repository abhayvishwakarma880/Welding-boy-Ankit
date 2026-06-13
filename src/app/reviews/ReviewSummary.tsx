const stats = [
  { value: "500+", label: "Projects Completed" },
  { value: "300+", label: "Happy Customers" },
  { value: "10+", label: "Years Experience" },
  { value: "100%", label: "Quality Focus" },
];

export default function ReviewSummary() {
  return (
    <section className="bg-brand py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl font-extrabold text-white leading-none">{s.value}</p>
            <p className="text-white/70 text-xs font-medium mt-1 uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
