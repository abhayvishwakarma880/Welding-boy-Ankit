import dynamic from "next/dynamic";
import HeroSliderWrapper from "./home/HeroSliderWrapper";
import WhyChoose from "./home/whyChoose";
import ServiceSection from "./home/services";

// Below-fold sections — lazy loaded for faster initial load
const AboutSection    = dynamic(() => import("./home/about"));
const Project         = dynamic(() => import("./home/projects"));
const Banner          = dynamic(() => import("./home/banner"));
const PopularWorks    = dynamic(() => import("./home/popularWork"));
const RecentSideWork  = dynamic(() => import("./home/recentSideWork"));
const CTABanner       = dynamic(() => import("./home/ctaBanner"));
const LatestArticles  = dynamic(() => import("./home/latestArticles"));
const FounderSection  = dynamic(() => import("./home/founderSection"));
const FAQSection      = dynamic(() => import("./home/faqSection"));

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSliderWrapper />
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
