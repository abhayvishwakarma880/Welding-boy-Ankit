const reviews = [
  { name: "Ramesh Gupta", rating: 5, text: "Main gate fabrication ka kaam karwaya tha. Finishing aur welding quality bahut achhi thi. Kaam samay par complete hua.", location: "Khadda, Kushinagar" },
  { name: "Pankaj Mishra", rating: 5, text: "Balcony railing ka design hamari requirement ke according banaya gaya. Final result expected se bhi better tha.", location: "Padrauna" },
  { name: "Manoj Singh", rating: 5, text: "Parking shed fabrication ka kaam professional tareeke se complete hua. Material quality bhi achhi thi.", location: "Kasya" },
  { name: "Ashok Verma", rating: 5, text: "Purane gate ki repair karwayi thi. Kaam saaf aur majboot hua. Bahut satisfied hoon.", location: "Ramkola" },
  { name: "Santosh Yadav", rating: 5, text: "Shop security grill lagwayi thi. Design aur finishing dono bahut achhe the. Time par delivery mili.", location: "Khadda" },
  { name: "Neeraj Pandey", rating: 5, text: "Custom fabrication project diya tha. Har measurement accurately maintain kiya gaya. Bahut achha kaam.", location: "Kushinagar" },
  { name: "Suresh Kumar", rating: 5, text: "Window grill banwayi thi. Design exactly waise bana jaise bataya tha. Quality ekdum sahi hai.", location: "Khadda" },
  { name: "Rajesh Tiwari", rating: 5, text: "Staircase railing ka kaam karwaya. Finishing aur welding dono perfect the. Samay par complete hua.", location: "Padrauna" },
  { name: "Dinesh Yadav", rating: 5, text: "Factory shed ke liye steel structure banwaya. Kaam bahut strong aur durable hai. Highly recommend.", location: "Kushinagar" },
  { name: "Vinod Sharma", rating: 5, text: "Sliding gate installation ka kaam karwaya tha. Smooth operation aur strong build quality. Very happy.", location: "Kasya" },
  { name: "Arun Mishra", rating: 5, text: "Terrace ke liye safety railing banwayi. Height aur design exactly requirement ke according tha.", location: "Ramkola" },
  { name: "Pramod Singh", rating: 5, text: "Commercial property ke liye entrance gate banwaya. Large size ka kaam bhi bahut precisely kiya gaya.", location: "Khadda" },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-brand" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function CustomerReviews() {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 bg-brandBG-icon border border-brand rounded-full px-3 py-1 text-[10px] font-bold tracking-widest text-brand uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brand inline-block" />
            Customer Feedback
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900">
            Real Reviews from <span className="text-brand">Real Customers</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white border border-zinc-200 rounded-xl p-4 flex flex-col gap-3 hover:border-brand hover:shadow-md transition-all duration-200">
              <Stars count={r.rating} />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brandBG-icon flex items-center justify-center text-brand font-bold text-sm shrink-0">
                  {r.name.charAt(0)}
                </div>
                <p className="text-sm font-bold text-zinc-800">{r.name}</p>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed">"{r.text}"</p>
              <div className="flex items-center gap-1 mt-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-[11px] text-zinc-400">{r.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
