"use client";

import { useState, useRef } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "What types of metalwork and fabrication do you offer?",
    answer:
      "We offer a wide range of fabrication services including gates, window grills, balcony railings, staircase railings, garden furniture, steel doors, and custom structural metalwork. Both residential and commercial projects are handled.",
  },
  {
    id: 2,
    question: "Do you provide on-site installation after fabrication?",
    answer:
      "Yes, we provide complete on-site installation for all our products. Our team handles everything from measurement and fabrication to delivery and final fitting at your location.",
  },
  {
    id: 3,
    question: "How long does it take to complete a custom order?",
    answer:
      "Turnaround time depends on the complexity of the project. Simple items like window grills take 3–5 days, while larger custom gates or railings typically take 7–14 days. We'll give you an exact timeline after reviewing your requirements.",
  },
  {
    id: 4,
    question: "What finishing options are available for the metalwork?",
    answer:
      "We offer powder coating, regular paint, anti-rust primer coating, and natural metallic finishes. Powder coating is our most recommended option for long-lasting durability and a premium look.",
  },
  {
    id: 5,
    question: "Can I get a custom design or do you only work with standard designs?",
    answer:
      "We specialize in fully custom fabrication. You can bring your own design, share a reference image, or work with our team to create something unique tailored to your space and style.",
  },
  {
    id: 6,
    question: "How do I get a price estimate for my project?",
    answer:
      "You can contact us via the Contact page or give us a call. Share your requirements, dimensions, and preferred finish, and we'll provide a detailed quote within 24 hours — completely free of charge.",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(null);
  const contentRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="bg-white relative py-12 px-6 md:px-12 overflow-hidden font-sans max-w-7xl mx-4 md:mx-8 xl:mx-auto mt-16 mb-0">
      {/* Accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[3.5px] bg-gradient-to-r from-transparent via-brand to-transparent rounded-full" />

      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-none">
            Frequently{" "}
            <span className="text-brand relative">
              Asked
              <span className="absolute bottom-1 left-0 w-full h-[6px] -z-10 rounded-full" />
            </span>{" "}
            Questions
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Got questions? We've got answers. If you need more help, feel free to contact us directly.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-md overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "border-brand/40 shadow-md shadow-brand/10"
                    : "border-slate-200 hover:border-brand/20"
                }`}
              >
                {/* Question Row */}
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer group focus:outline-none"
                >
                  <span
                    className={`text-sm md:text-base font-semibold transition-colors duration-200 ${
                      isOpen ? "text-brand" : "text-slate-800 group-hover:text-brand"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isOpen
                        ? "bg-brand border-brand rotate-45"
                        : "bg-white border-slate-200 group-hover:border-brand/40"
                    }`}
                  >
                    <Plus
                      className={`w-4 h-4 transition-colors duration-200 ${
                        isOpen ? "text-white" : "text-slate-500"
                      }`}
                    />
                  </span>
                </button>

                {/* Answer — smooth height animation */}
                <div
                  ref={(el) => { contentRefs.current[faq.id] = el; }}
                  style={{
                    maxHeight: isOpen
                      ? `${contentRefs.current[faq.id]?.scrollHeight ?? 300}px`
                      : "0px",
                    transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    overflow: "hidden",
                  }}
                >
                  <p className="px-5 pb-5 text-sm text-slate-500 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
