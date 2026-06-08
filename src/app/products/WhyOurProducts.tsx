import { ShieldCheck, Ruler, Hammer, Sparkles, IndianRupee, HeadphonesIcon } from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Premium Quality Materials",
    desc: "High quality iron, steel aur fabrication materials use kiye jaate hain.",
  },
  {
    icon: Ruler,
    title: "Custom Manufacturing",
    desc: "Customer requirement ke hisab se size aur design customize kiya jata hai.",
  },
  {
    icon: Hammer,
    title: "Strong Construction",
    desc: "Durable aur long-lasting workmanship jo years tak reliable rahe.",
  },
  {
    icon: Sparkles,
    title: "Professional Finishing",
    desc: "Clean welding aur smooth finishing har product pe.",
  },
  {
    icon: IndianRupee,
    title: "Affordable Pricing",
    desc: "Quality ke saath reasonable aur transparent cost.",
  },
  {
    icon: HeadphonesIcon,
    title: "Local Support",
    desc: "Direct workshop support aur consultation available hai.",
  },
];

export default function WhyOurProducts() {
  return (
    <section className="bg-white py-14 px-6 md:px-12 font-sans">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">
          <div className="w-12 h-[3px] bg-brand rounded-full mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Our <span className="text-brand">Products</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex flex-col gap-3 p-5 bg-slate-50 border border-slate-200/70 rounded-xl hover:border-brand/30 hover:shadow-md hover:shadow-brand/5 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-xl bg-brand/5 border border-brand/10 flex items-center justify-center group-hover:bg-brand group-hover:border-brand transition-all duration-300">
                <Icon className="w-5 h-5 text-brand group-hover:!text-white transition-colors duration-300" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 group-hover:text-brand transition-colors duration-200">
                {title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
