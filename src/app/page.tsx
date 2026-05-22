// import HeroSection from "./home/page";

import HeroSlider from "./home/page";
import ServiceSection from "./home/services";
import AboutSection from "./home/about";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSlider />
      <ServiceSection />
      <AboutSection />
    </main>
  );
}