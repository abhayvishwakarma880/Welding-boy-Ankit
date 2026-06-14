import type { Metadata } from "next";
import ServiceHero from "./ServiceHero";
import ServiceIntro from "./ServiceIntro";
import ServiceGrid from "./ServiceGrid";
import ServiceProcess from "./ServiceProcess";
import ServiceWhyChoose from "./ServiceWhyChoose";
import ServiceCoverage from "./ServiceCoverage";
import ServiceCTA from "./ServiceCTA";

export const metadata: Metadata = {
  title: "Welding & Fabrication Services | Vishwakarma Welding Shop",
  description:
    "Steel welding, metal fabrication, gate manufacturing, industrial work, repair services and custom fabrication solutions in Kushinagar, UP.",
  openGraph: {
    title: "Welding & Fabrication Services | Vishwakarma Welding Shop",
    description:
      "Steel welding, metal fabrication, gate manufacturing, industrial work, repair services and custom fabrication solutions.",
    url: "https://vishwakarmawelding.com/services",
  },
};

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
