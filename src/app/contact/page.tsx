import ContactHero from "./ContactHero";
import QuickContactCards from "./QuickContactCards";
import ContactFormSection from "./ContactFormSection";
import BusinessHours from "./BusinessHours";
import ServiceAreas from "./ServiceAreas";
import ContactMap from "./ContactMap";
import ContactCTA from "./ContactCTA";

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
