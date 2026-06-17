import Image from "next/image";

export default function Banner() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Banner 1 */}
          <div className="relative overflow-hidden rounded-2xl border border-zinc-200 shadow-md">

            {/* Base image */}
            <Image
              src="/images/banner/bannerOne.webp"
              alt="Steel Gate Banner"
              width={800}
              height={450}
              className="w-full h-auto object-fill"
              priority
            />

          </div>

          {/* Banner 2 */}
          <div className="overflow-hidden rounded-2xl border border-zinc-200 shadow-md">
            <Image
              src="/images/banner/bannerTwo.webp"
              alt="Welding Service Banner 2"
              width={800}
              height={450}
              className="w-full h-auto object-fill"
            />
          </div>
        </div>
      </div>
    </section>
  );
}