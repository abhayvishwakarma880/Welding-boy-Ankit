export default function ServiceIntro() {
  return (
    <section className="bg-white py-14 px-6 md:px-12 font-sans">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-5">

        {/* Accent line */}
        <div className="w-12 h-[3px] bg-brand rounded-full" />

        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
          Welding &amp; Fabrication Solutions{" "}
          <span className="text-brand">Under One Roof</span>
        </h2>

        <p className="text-sm md:text-base text-slate-500 max-w-3xl leading-relaxed">
          Shree Vishwakarma Welding Shop mein hum steel, iron aur metal fabrication se jude har tarah ke kaam professional finishing ke saath complete karte hain. Chahe ghar ke liye main gate banana ho, shop shutter repair karwana ho ya industrial fabrication project karwana ho, hum quality materials aur skilled workmanship ke saath reliable service provide karte hain.
        </p>

        {/* Stats row */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-2xl">
          {[
            { value: "10+", label: "Years Experience" },
            { value: "500+", label: "Projects Done" },
            { value: "500+", label: "Happy Clients" },
            { value: "100%", label: "Quality Assured" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className="text-2xl md:text-3xl font-extrabold text-brand">{s.value}</span>
              <span className="text-xs text-slate-400 font-medium text-center">{s.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
