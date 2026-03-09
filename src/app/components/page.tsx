import type { Metadata } from "next";
import Link from "next/link";
import Showreel from "@/components/sections/showreel";
import { LogoCarousel } from "@/components/ui/logo-carousel";

export const metadata: Metadata = {
  title: "Components",
  description:
    "Open-source UI components by Arc. Browse, preview, and install with the shadcn CLI.",
};

const COMPONENTS = [
  {
    slug: "logo-carousel",
    title: "Logo Carousel",
    preview: <LogoCarousel disableLinks />,
  },
  {
    slug: "showreel",
    title: "Showreel",
    preview: <Showreel compact link={null} buttonTitle="Preview" />,
  },
];

export default function ComponentsPage() {
  return (
    <div className="flex flex-col w-full px-4 pb-24 md:px-12 lg:px-24 xl:px-32 gap-8">
      {COMPONENTS.map((c) => (
        <Link key={c.slug} href={`/components/${c.slug}`}>
          <div className="flex bg-neutral-100 rounded-3xl h-[12rem] md:h-[36rem] items-center justify-center relative overflow-hidden">
            <p className="font-mono text-[#909090] tracking-wider uppercase absolute top-8 left-8 font-medium">
              {c.title}
            </p>
            <div className="flex w-full h-full items-center justify-center">
              {c.preview}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
