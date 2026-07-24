"use client";

import type { VariantProps } from "class-variance-authority";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Button, type buttonVariants } from "@/components/ui/button";
import { riseInView } from "@/lib/animation";

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];

type Cta = { label: string; href: string; variant: ButtonVariant };

const CAL_URL = "https://cal.com/team/arc-studio/intro-call";
const EMAIL_URL = "mailto:omeroztok@witharc.co";

const plans: {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctas: Cta[];
  featured: boolean;
}[] = [
  {
    name: "Partnership",
    price: "$8,000",
    period: "/month",
    description:
      "A monthly retainer with unlimited design. Direction, product thinking, design, and development in one focused partnership.",
    features: [
      "Unlimited design requests",
      "Design & development included",
      "Direct, async collaboration with founders",
      "Pause or cancel anytime",
    ],
    ctas: [
      { label: "Book a call", href: CAL_URL, variant: "secondary" },
      { label: "Send message", href: EMAIL_URL, variant: "glass" },
    ],
    featured: true,
  },
  {
    name: "One time project",
    price: "Custom",
    period: "",
    description:
      "A defined scope with a clear timeline for landing pages, brand work, or a focused product sprint.",
    features: [
      "Fixed scope & timeline",
      "Designs delivered in Figma",
      "Development available as addons",
      "Scoped and quoted on a call",
    ],
    ctas: [
      { label: "Book a call", href: CAL_URL, variant: "default" },
      { label: "Send message", href: EMAIL_URL, variant: "secondary" },
    ],
    featured: false,
  },
];

const Pricing = ({ headingAs = "h1" }: { headingAs?: "h1" | "h2" }) => {
  const MotionHeading = headingAs === "h2" ? motion.h2 : motion.h1;
  const CardHeading = headingAs === "h2" ? "h3" : "h2";
  return (
    <section
      id="pricing"
      className="scroll-mt-24 bg-white px-5 py-20 md:px-12 lg:px-24"
    >
      <MotionHeading
        {...riseInView()}
        className="text-[40px] font-semibold leading-none tracking-[-0.03em] text-black will-change-[filter] backface-hidden"
      >
        Pricing
      </MotionHeading>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            {...riseInView(i * 0.1)}
            className={`relative isolate flex flex-col overflow-hidden rounded-2xl border p-9 will-change-[filter] backface-hidden ${
              plan.featured
                ? "border-[#0a76ff] bg-primary text-white shadow-[0px_4px_8px_0px_rgba(3,22,47,0.1)]"
                : "border-[#f6f6f6] bg-[#fafafa] text-black shadow-[0px_4px_8px_0px_rgba(0,0,0,0.02)]"
            }`}
          >
            {plan.featured && (
              <Image
                src="/pricing-grid.svg"
                alt=""
                aria-hidden
                width={1100}
                height={800}
                className="pointer-events-none absolute -bottom-[66px] -left-[79px] -z-10 h-[800px] w-[1100px] max-w-none"
              />
            )}

            {/* Fixed height at lg keeps the list and buttons on the same rows across both cards, as in the Figma. */}
            <div className="flex flex-col gap-4 lg:min-h-[188px]">
              <CardHeading className="text-lg font-[550] leading-none tracking-[-0.01em]">
                {plan.name}
              </CardHeading>
              <p className="text-[40px] font-semibold leading-none tracking-[-0.03em] tabular-nums">
                {plan.price}
                {plan.period && (
                  <span
                    className={`text-lg font-light tracking-normal ${plan.featured ? "text-white/75" : "text-black/75"}`}
                  >
                    {plan.period}
                  </span>
                )}
              </p>
              <p
                className={`text-lg font-light leading-[1.4] ${plan.featured ? "text-white/75" : "text-black/75"}`}
              >
                {plan.description}
              </p>
            </div>

            <ul className="mt-12 flex flex-col gap-3 lg:mt-0">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-base leading-6"
                >
                  <Check
                    aria-hidden
                    className={`size-4 shrink-0 ${plan.featured ? "text-white" : "text-primary"}`}
                    strokeWidth={2.5}
                  />
                  <span
                    className={
                      plan.featured ? "text-white/95" : "text-black/95"
                    }
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap gap-2 pt-12">
              {plan.ctas.map((cta) => (
                <Button key={cta.label} asChild variant={cta.variant}>
                  <Link
                    href={cta.href}
                    {...(cta.href.startsWith("mailto:")
                      ? {}
                      : { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {cta.label}
                  </Link>
                </Button>
              ))}
            </div>

            <div
              aria-hidden
              className={`pointer-events-none absolute inset-0 rounded-[inherit] ${
                plan.featured
                  ? "shadow-[inset_0px_-12px_32px_0px_rgba(255,255,255,0.25),inset_0px_-4px_24px_0px_#0a76ff]"
                  : "shadow-[inset_0px_-8px_12px_0px_rgba(246,246,246,0.5)]"
              }`}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
