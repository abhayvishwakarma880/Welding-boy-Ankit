// import HeroSection from "./home/page";

import HeroSlider from "./home/page";
import ServiceSection from "./home/services";
import PopularWorks from "./home/popularWork";
import AboutSection from "./home/about";
import Project from "./home/projects";
import WhyChoose from "./home/whyChoose";
import Banner from "./home/banner";
import RecentSideWork from "./home/recentSideWork";
import CTABanner from "./home/ctaBanner";
import LatestArticles from "./home/latestArticles";
import FAQSection from "./home/faqSection";
import FounderSection from "./home/founderSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSlider />
      <WhyChoose />
      <ServiceSection />
      <AboutSection />
      <Project />
      <Banner />
      <PopularWorks />
      <RecentSideWork />
      <CTABanner />
      <LatestArticles />
      <FounderSection />
      <FAQSection />
    </main>
  );
}