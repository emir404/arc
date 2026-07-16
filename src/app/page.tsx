import type { Metadata, Viewport } from "next";
import Booking from "@/components/sections/booking";
import Hero from "@/components/sections/hero";
import Pricing from "@/components/sections/pricing";
import SiteFooter from "@/components/sections/site-footer";
import Testimonials from "@/components/sections/testimonials";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Arc \u2022 All-in-one design studio for early-stage startups",
  description:
    "Arc is the all-in-one design studio for early-stage startups. Brand, product, and web design in one partnership \u2014 trusted by 10+ Y Combinator companies.",
};

const Home = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <Testimonials />
      <Pricing headingAs="h2" />
      <Booking />
      <SiteFooter />
    </div>
  );
};

export default Home;
