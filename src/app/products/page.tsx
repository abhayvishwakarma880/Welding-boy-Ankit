import ProductHero from "./ProductHero";
import FeaturedProducts from "./FeaturedProducts";
import ProductsGrid from "./ProductsGrid";
import CustomFabrication from "./CustomFabrication";
import WhyOurProducts from "./WhyOurProducts";
import ProductCTA from "./ProductCTA";

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
