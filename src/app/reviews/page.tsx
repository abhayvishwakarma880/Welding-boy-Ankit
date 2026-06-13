import ReviewsHero from "./ReviewsHero";
import ReviewSummary from "./ReviewSummary";
import CustomerReviews from "./CustomerReviews";
import ProjectReviews from "./ProjectReviews";
import WhyTrustUs from "./WhyTrustUs";
import ReviewsCTA from "./ReviewsCTA";

export default function ReviewsPage() {
  return (
    <main>
      <ReviewsHero />
      <ReviewSummary />
      <CustomerReviews />
      <ProjectReviews />
      <WhyTrustUs />
      <ReviewsCTA />
    </main>
  );
}
