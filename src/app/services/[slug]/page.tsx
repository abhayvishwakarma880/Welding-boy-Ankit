import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES, getServiceBySlug } from "../servicesData";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const url = `https://vishwakarmawelding.com/services/${service.slug}`;

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url,
      siteName: "Shree Vishwakarma Welding Shop",
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: `https://vishwakarmawelding.com${service.ogImage}`,
          width: 1920,
          height: 1080,
          alt: service.metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
      images: [`https://vishwakarmawelding.com${service.ogImage}`],
    },
    robots: { index: true, follow: true },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    provider: {
      "@type": "LocalBusiness",
      name: "Shree Vishwakarma Welding Shop",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Khadda",
        addressRegion: "Uttar Pradesh",
        addressCountry: "IN",
      },
      telephone: "+91-XXXXXXXXXX",
      url: "https://vishwakarmawelding.com",
    },
    areaServed: service.areas.map((area) => ({ "@type": "City", name: area })),
    url: `https://vishwakarmawelding.com/services/${service.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-white text-zinc-800">
        {/* ── Hero ── */}
        <section className="bg-zinc-900 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">
              Our Services
            </p>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
              {service.h1}
            </h1>
            <p className="text-zinc-300 text-base md:text-lg max-w-2xl">
              {service.metaDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="bg-brand hover:bg-brand-hover text-white font-bold px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Get Free Quote
              </Link>
              <Link
                href="/services"
                className="border border-zinc-600 hover:border-brand text-zinc-300 hover:text-brand font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
              >
                All Services
              </Link>
            </div>
          </div>
        </section>

        {/* ── Overview ── */}
        <section className="py-14 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-5 text-zinc-900">
              Overview
            </h2>
            <p className="text-zinc-600 text-base md:text-lg leading-relaxed">
              {service.overview}
            </p>
          </div>
        </section>

        {/* ── Benefits ── */}
        <section className="py-14 px-4 bg-zinc-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-zinc-900">
              Key Benefits
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {service.benefits.map((b) => (
                <div
                  key={b.title}
                  className="bg-white border border-zinc-200 rounded-xl p-5 hover:border-brand transition-colors duration-200"
                >
                  <h3 className="font-bold text-zinc-800 mb-2">{b.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ── */}
        <section className="py-14 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-zinc-900">
              Our Process
            </h2>
            <ol className="space-y-5">
              {service.process.map((p, i) => (
                <li key={p.step} className="flex gap-4 items-start">
                  <span className="shrink-0 w-9 h-9 rounded-full bg-brand text-white font-bold flex items-center justify-center text-sm">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-zinc-800">{p.step}</h3>
                    <p className="text-zinc-500 text-sm mt-1">{p.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section className="py-14 px-4 bg-zinc-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-zinc-900">
              Why Choose Us
            </h2>
            <ul className="space-y-3">
              {service.whyUs.map((point) => (
                <li key={point} className="flex items-start gap-3 text-zinc-700">
                  <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-brand/10 text-brand flex items-center justify-center text-xs font-bold">
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Areas We Serve ── */}
        <section className="py-14 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-zinc-900">
              Areas We Serve
            </h2>
            <div className="flex flex-wrap gap-3">
              {service.areas.map((area) => (
                <span
                  key={area}
                  className="bg-zinc-100 border border-zinc-200 text-zinc-700 text-sm font-medium px-4 py-2 rounded-full"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQs ── */}
        <section className="py-14 px-4 bg-zinc-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-zinc-900">
              Frequently Asked Questions
            </h2>
            <div className="space-y-5">
              {service.faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="bg-white border border-zinc-200 rounded-xl p-5"
                >
                  <h3 className="font-bold text-zinc-800 mb-2">{faq.q}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-14 px-4 bg-brand">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
              Ready to Get Started?
            </h2>
            <p className="text-brand-50 mb-7 text-base">
              Contact us today for a free consultation and quote on your project.
            </p>
            <Link
              href="/contact"
              className="bg-white text-brand font-bold px-8 py-3 rounded-lg hover:bg-zinc-100 transition-colors duration-200 inline-block"
            >
              Contact Us Now
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
