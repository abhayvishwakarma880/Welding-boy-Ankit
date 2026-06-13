const projectReviews = [
  { project: "Steel Main Gate", rating: 5, text: "Strong construction aur premium finishing. Installation process bhi smooth raha. Bilkul expected ke according kaam hua." },
  { project: "Balcony Railing", rating: 5, text: "Design modern tha aur quality expected se better mili. Measurements perfect the." },
  { project: "Parking Shed Installation", rating: 5, text: "Shed structure strong aur durable hai. Kaam professional manner me hua. Timeline bhi maintain ki gayi." },
  { project: "Shop Security Grill", rating: 5, text: "Security aur appearance dono ka perfect combination mila. Customer bahut satisfied hai." },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-brand" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProjectReviews() {
  return (
    <section className="bg-zinc-50 py-12 px-4 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 bg-brandBG-icon border border-brand rounded-full px-3 py-1 text-[10px] font-bold tracking-widest text-brand uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brand inline-block" />
            Project Reviews
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900">
            Reviews by <span className="text-brand">Project Type</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projectReviews.map((r, i) => (
            <div key={i} className="bg-white border border-zinc-200 rounded-xl p-5 flex flex-col gap-3 hover:border-brand hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <p className="text-sm font-bold text-zinc-800">{r.project}</p>
                </div>
                <Stars />
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed">"{r.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
