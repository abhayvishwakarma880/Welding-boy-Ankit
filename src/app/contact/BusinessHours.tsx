const hours = [
  { day: "Monday - Saturday", time: "08:00 AM - 07:00 PM", open: true },
  { day: "Sunday", time: "Phone Consultation Available", open: false },
];

export default function BusinessHours() {
  return (
    <section className="bg-zinc-50 py-12 px-4 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 bg-brandBG-icon border border-brand rounded-full px-3 py-1 text-[10px] font-bold tracking-widest text-brand uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brand inline-block" />
            Working Hours
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900">
            Business <span className="text-brand">Hours</span>
          </h2>
        </div>

        <div className="max-w-lg mx-auto flex flex-col gap-3">
          {hours.map((h) => (
            <div key={h.day} className="flex items-center justify-between px-5 py-4 bg-white border border-zinc-200 rounded-xl">
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${h.open ? "bg-brand" : "bg-zinc-300"}`} />
                <p className="text-sm font-semibold text-zinc-800">{h.day}</p>
              </div>
              <p className={`text-sm font-medium ${h.open ? "text-brand" : "text-zinc-400"}`}>{h.time}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
