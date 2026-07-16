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
    <section className="bg-[#f9f9f9] px-5 md:px-12 lg:px-24 xl:px-32 py-16">
      <motion.div
        {...riseInView()}
        className="w-full will-change-[filter] backface-hidden"
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
