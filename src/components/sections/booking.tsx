"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { riseInView } from "@/lib/animation";

const Booking = () => {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: { "cal-brand": "#101010" },
          dark: { "cal-brand": "#101010" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <section aria-labelledby="booking-heading">
      <h2 id="booking-heading" className="sr-only">
        Book a call
      </h2>
      <motion.div
        {...riseInView()}
        className="overflow-hidden rounded-[12px] bg-[#f9f9f9] px-4 py-10 backface-hidden will-change-[filter] sm:px-10"
      >
        <Cal
          namespace="30min"
          calLink="team/arc-studio/intro-call"
          config={{ layout: "month_view", theme: "light" }}
          className="w-full"
        />
      </motion.div>
    </section>
  );
};

export default Booking;
