import React from "react";
import type { Metadata } from "next";
import LandingContent from "./landing-content";

export const metadata: Metadata = {
  title: "Landing Pages",
  description:
    "High-converting landing pages designed and built for $900/page. Custom design, fully responsive, delivered fast.",
};

const Landing = () => {
  return <LandingContent />;
};

export default Landing;
