import type { Metadata } from "next";
import ReviewsHero from "./ReviewsHero";
import ReviewSummary from "./ReviewSummary";
import CustomerReviews from "./CustomerReviews";
import ProjectReviews from "./ProjectReviews";
import WhyTrustUs from "./WhyTrustUs";
import ReviewsCTA from "./ReviewsCTA";

export const metadata: Metadata = {
  title: "Customer Reviews | Vishwakarma Welding Shop",
  description:
    "Read customer feedback and reviews about our welding and fabrication services in Kushinagar, Uttar Pradesh.",
  openGraph: {
    title: "Customer Reviews | Vishwakarma Welding Shop",
    description:
      "Read customer feedback and reviews about our welding and fabrication services.",
    url: "https://vishwakarmawelding.com/reviews",
  },
};

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
