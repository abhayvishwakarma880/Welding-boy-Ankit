// import HeroSection from "./home/page";

import HeroSlider from "./home/page";
import ServiceSection from "./home/services";
import AboutSection from "./home/about";
import Project from "./home/projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSlider />
      <ServiceSection />
      <AboutSection />
      <Project />
    </main>
  );
}