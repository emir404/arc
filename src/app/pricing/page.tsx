import type { Metadata } from "next";
import Pricing from "@/components/sections/pricing";
import SiteFooter from "@/components/sections/site-footer";

export const metadata: Metadata = {
  title: "Arc • Pricing",
  description:
    "Simple pricing for startups: an all-inclusive design partnership from $10,000/month, or a one time project from $15,000.",
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
