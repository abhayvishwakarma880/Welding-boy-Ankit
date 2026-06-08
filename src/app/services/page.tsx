import ServiceHero from "./ServiceHero";
import ServiceIntro from "./ServiceIntro";
import ServiceGrid from "./ServiceGrid";
import ServiceProcess from "./ServiceProcess";
import ServiceWhyChoose from "./ServiceWhyChoose";
import ServiceCoverage from "./ServiceCoverage";
import ServiceCTA from "./ServiceCTA";

export default function ServicesPage() {
  return (
    <main>
      <ServiceHero />
      <ServiceIntro />
      <ServiceGrid />
      <ServiceProcess />
      <ServiceWhyChoose />
      <ServiceCoverage />
      <ServiceCTA />
    </main>
  );
}
