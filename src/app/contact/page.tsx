import type { Metadata } from "next";
import ContactHero from "./ContactHero";
import QuickContactCards from "./QuickContactCards";
import ContactFormSection from "./ContactFormSection";
import BusinessHours from "./BusinessHours";
import ServiceAreas from "./ServiceAreas";
import ContactMap from "./ContactMap";
import ContactCTA from "./ContactCTA";

export const metadata: Metadata = {
  title: "Contact Us | Vishwakarma Welding Shop",
  description:
    "Get in touch for welding, fabrication, gate manufacturing and custom metal work services in Kushinagar, Uttar Pradesh.",
  openGraph: {
    title: "Contact Us | Vishwakarma Welding Shop",
    description:
      "Get in touch for welding, fabrication, gate manufacturing and custom metal work services.",
    url: "https://vishwakarmawelding.com/contact",
  },
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <QuickContactCards />
      <ContactFormSection />
      <BusinessHours />
      <ServiceAreas />
      <ContactMap />
      <ContactCTA />
    </main>
  );
}
