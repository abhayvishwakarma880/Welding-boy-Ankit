// import HeroSection from "./home/page";

import HeroSlider from "./home/page";
import ServiceSection from "./home/services";
import AboutSection from "./home/about";
import Project from "./home/projects";
import WhyChoose from "./home/whyChoose";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSlider />
      <WhyChoose />
      <ServiceSection />
      <AboutSection />
      <Project />
    </main>
  );
}