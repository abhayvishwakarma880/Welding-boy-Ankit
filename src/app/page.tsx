// import HeroSection from "./home/page";

import HeroSlider from "./home/page";
import ServiceSection from "./home/services";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      <HeroSlider />
      <ServiceSection />
      {/* Hero Section */}
      {/* <section className="flex flex-col items-center justify-center h-screen text-center px-5">
        
        <h1 className="text-5xl md:text-7xl font-bold text-orange-500">
          Shree Vishwakarma Welding
        </h1>

        <p className="mt-6 text-lg md:text-2xl max-w-3xl text-gray-300">
          Steel Railing, Iron Gate, Grill, Aluminium Gate,
          Window Grill, Welding Work and Custom Fabrication.
        </p>

        <button className="mt-8 bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-xl text-lg font-semibold">
          Contact Us
        </button>

      </section> */}

    </main>
  );
}