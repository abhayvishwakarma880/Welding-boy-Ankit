import type { Metadata } from "next";
import ProductHero from "./ProductHero";
import FeaturedProducts from "./FeaturedProducts";
import ProductsGrid from "./ProductsGrid";
import CustomFabrication from "./CustomFabrication";
import WhyOurProducts from "./WhyOurProducts";
import ProductCTA from "./ProductCTA";

export const metadata: Metadata = {
  title: "Metal Fabrication Products | Gates, Grills, Railings & Sheds",
  description:
    "Explore our collection of steel gates, grills, railings, sheds and custom fabricated products in Kushinagar, Uttar Pradesh.",
  openGraph: {
    title: "Metal Fabrication Products | Gates, Grills, Railings & Sheds",
    description:
      "Explore our collection of steel gates, grills, railings, sheds and custom fabricated products.",
    url: "https://vishwakarmawelding.com/products",
  },
};

export default function ProductsPage() {
  return (
    <main>
      <ProductHero />
      <FeaturedProducts />
      <ProductsGrid />
      <CustomFabrication />
      <WhyOurProducts />
      <ProductCTA />
    </main>
  );
}
