"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import Cal, { getCalApi } from "@calcom/embed-react";

const Booking = () => {
  useEffect(() => {
    (async function () {
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
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full will-change-[filter] backface-hidden"
      >
        <Cal
          namespace="30min"
          calLink="emirayaz/30min"
          config={{ layout: "month_view", theme: "light" }}
          className="w-full"
        />
      </motion.div>
    </section>
  );
};

export default Booking;
