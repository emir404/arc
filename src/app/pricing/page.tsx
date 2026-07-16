import type { Metadata } from "next";
import Pricing from "@/components/sections/pricing";
import SiteFooter from "@/components/sections/site-footer";

export const metadata: Metadata = {
  title: "Arc • Pricing",
  description:
    "Simple pricing for startups: an all-inclusive design partnership at $7,000/month, or a one time project scoped to your needs.",
};

const PricingPage = () => {
  return (
    <div className="flex flex-col">
      <Pricing />
      <SiteFooter />
    </div>
  );
};

export default PricingPage;
