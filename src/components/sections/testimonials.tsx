"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { riseInView } from "@/lib/animation";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar?: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Emir is a talented designer with massive potential. He’s both a developer and designer, making his skillset highly valuable for fast-moving teams.",
    name: "Emir Karabeg",
    role: "CEO, Sim.ai (YC X25)",
    avatar: "/testimonials/emir-karabeg.png",
  },
  {
    quote:
      "You’re the best dude and thanks for giving our brand so much life and recognition. Was a pleasure working with you and I’d recommend your service to any founder.",
    name: "Adi Singh",
    role: "CEO, AgentMail (YC S25)",
    avatar: "/testimonials/adi-singh.png",
  },
  {
    quote:
      "Arc’s amazing work emphasized the uniqueness of our brand while prioritizing the UX. Every customer we onboard compliments the style of our app!",
    name: "Shreyash Nigam",
    role: "CEO, Feyn (YC X25)",
    avatar: "/testimonials/shreyash-nigam.png",
  },
  {
    quote:
      "Emir was incredibly great to work with as a designer. What matters most today is strong taste combined with real product understanding, and Emir has both. Will work with again.",
    name: "Michael Ryaboy",
    role: "Serial Founder, Startclaw, Setupclaw, Rebates & more",
    avatar: "/testimonials/michael-ryaboy.png",
  },
  {
    quote:
      "Arc brought our brand to life with a world-class site that went viral on Twitter in a month. A pleasure working with them, and I’d recommend them to any founder.",
    name: "Nizzy Abi Zaher",
    role: "Co-founder, Orchid (YC X25)",
    avatar: "/testimonials/nizzy-abi-zaher.png",
  },
  {
    quote:
      "Arc handled our brand, website, product, and everything in between, down to hackathon flyers and t-shirts, all on short notice. Work that usually takes several agencies, done by one studio.",
    name: "Meet Modi",
    role: "Co-founder, AgentPhone (YC P26)",
    avatar: "/testimonials/meet-modi.png",
  },
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="scroll-mt-24 bg-white px-5 py-12 md:px-12 lg:px-24"
    >
      <h2 className="sr-only">Testimonials</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.blockquote
            key={`${t.name}-${i}`}
            {...riseInView((i % 3) * 0.08)}
            className="relative flex flex-col gap-7 overflow-hidden rounded-2xl border border-[#f6f6f6] bg-[#fafafa] p-9 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.02)] will-change-[filter] backface-hidden"
          >
            {/* Every quote reserves 4 lines so the grid stays uniform; a 5th
                line still fits before clamping on narrower desktop cards. */}
            <p className="min-h-[5.6em] text-lg font-[450] leading-[1.4] text-black line-clamp-5">
              {t.quote}
            </p>
            <footer className="mt-auto flex items-center gap-4">
              {t.avatar ? (
                <Image
                  src={t.avatar}
                  alt=""
                  width={44}
                  height={44}
                  className="size-11 shrink-0 rounded-full object-cover drop-shadow-[0px_3.667px_3.667px_rgba(3,22,47,0.1)]"
                />
              ) : (
                <span
                  aria-hidden
                  className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-base font-[550] text-primary-foreground drop-shadow-[0px_3.667px_3.667px_rgba(3,22,47,0.1)]"
                >
                  {t.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
              )}
              <div className="flex min-w-0 flex-col gap-1.5 leading-none">
                <cite className="text-base font-normal not-italic text-black">
                  {t.name}
                </cite>
                <span className="text-sm font-light leading-[1.3] text-black/75">
                  {t.role}
                </span>
              </div>
            </footer>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_-8px_12px_0px_rgba(246,246,246,0.5)]"
            />
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
