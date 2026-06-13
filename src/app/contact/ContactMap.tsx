export default function ContactMap() {
  return (
    <section className="bg-zinc-50 py-12 px-4 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 bg-brandBG-icon border border-brand rounded-full px-3 py-1 text-[10px] font-bold tracking-widest text-brand uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brand inline-block" />
            Location
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900">
            Find Our <span className="text-brand">Workshop</span>
          </h2>
          <p className="mt-3 text-sm text-zinc-500 max-w-xl mx-auto leading-relaxed">
            Workshop location aur directions ke liye map dekhein.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-zinc-200 shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.0!2d83.9!3d26.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zTGFraHVhIENoYXVyYWhhLCBLaGFkZGEsIEt1c2hpbmFnYXI!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Shree Vishwakarma Welding Shop Location"
          />
        </div>
      </div>
    </section>
  );
}
