"use client";

import { motion } from "motion/react";

const testimonials = [
  {
    quote:
      "Emir is a talented designer with massive potential. He\u2019s both a developer and designer, making his skillset highly valuable for fast-moving teams.",
    attribution: "\u2014 Emir Karabeg, CEO of Sim.ai",
  },
  {
    quote:
      "You\u2019re the best dude and thanks for giving our brand so much life and recognition. Was a pleasure working w you and I\u2019d recommend your service to any founder",
    attribution: "\u2014 Adi Singh, CEO of Agentmail",
  },
  {
    quote:
      "Emir\u2019s amazing work emphasized the uniqueness of our brand while prioritizing the UX. Every customer we onboard compliments the style of our app!",
    attribution: "\u2014 Shreyash Nigam, CEO of Chonkie.ai",
  },
  {
    quote:
      "I\u2019ve worked with Emir on multiple projects, and he is easily one of the best designers I know. He\u2019s a cracked, thoughtful, and relentless designer, and always a joy to work with.",
    attribution: "\u2014 Brandon McConnell, Co-founder of Fontface",
  },
  {
    quote:
      "Emir is a fantastic person and an excellent professional. He is one of the best designers I have ever worked with. His work with Tesseract is incredible, those sharp edges impress me every single day. + rep",
    attribution: "\u2014 Vicente Sanchez, Founder of Tesseract",
  },
];

const Testimonials = () => {
  return (
    <section className="flex flex-col items-center gap-16 px-2 md:px-12 lg:px-24 xl:px-32 py-16">
      {testimonials.map((t, i) => (
        <motion.blockquote
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-4 max-w-[400px] text-center will-change-[filter] backface-hidden"
        >
          <p className="font-light text-black/75 text-lg leading-[1.4]">
            {t.quote}
          </p>
          <footer className="font-normal text-black text-lg leading-[1.4]">
            {t.attribution}
          </footer>
        </motion.blockquote>
      ))}
    </section>
  );
};

export default Testimonials;
