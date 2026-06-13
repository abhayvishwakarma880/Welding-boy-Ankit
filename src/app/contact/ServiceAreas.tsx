const areas = ["Khadda", "Kushinagar", "Padrauna", "Kasya", "Ramkola", "Tamkuhi Raj", "Hata", "Nearby Areas"];

export default function ServiceAreas() {
  return (
    <section className="bg-white py-12 px-4 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 bg-brandBG-icon border border-brand rounded-full px-3 py-1 text-[10px] font-bold tracking-widest text-brand uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brand inline-block" />
            Coverage
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900">
            We <span className="text-brand">Serve</span>
          </h2>
          <p className="mt-3 text-sm text-zinc-500 max-w-xl mx-auto leading-relaxed">
            Hum residential, commercial aur industrial welding aur fabrication services Kushinagar aur aas-paas ke kshetron mein provide karte hain.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {areas.map((area) => (
            <div key={area} className="flex items-center gap-2 px-4 py-2 bg-brandBG-icon border border-brand/20 rounded-full text-sm font-semibold text-brand">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {area}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
