import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/sections/site-footer";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Writings",
  description:
    "Notes on design, product, and building for early-stage startups from the Arc team.",
};

const WritingsPage = () => {
  return (
    <div className="flex flex-col">
      <section className="flex flex-col items-start gap-7 bg-white px-5 py-20 md:px-12 lg:px-24">
        <h1 className="text-[40px] font-semibold leading-none tracking-[-0.03em] text-black">
          Writings
        </h1>
        <p className="max-w-[461px] text-lg font-light leading-[1.4] text-black/75 text-pretty">
          Notes on design, product, and building for early-stage startups. The
          first essays are in the works — check back soon.
        </p>
        <Button asChild variant="secondary">
          <Link href="/">Back to home</Link>
        </Button>
      </section>
      <SiteFooter />
    </div>
  );
};

export default WritingsPage;
