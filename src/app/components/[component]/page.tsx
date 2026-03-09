import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { codeToHtml } from "shiki";
import Showreel from "@/components/sections/showreel";
import { LogoCarousel } from "@/components/ui/logo-carousel";
import { ComponentDetail } from "./component-detail";

const COMPONENTS: Record<
  string,
  { title: string; description: string; file: string; preview: React.ReactNode }
> = {
  "logo-carousel": {
    title: "Logo Carousel",
    description:
      "Animated logo carousel with staggered cycling, image preloading, and reduced-motion support.",
    file: "src/components/ui/logo-carousel.tsx",
    preview: <LogoCarousel variant="dark" />,
  },
  showreel: {
    title: "Showreel",
    description:
      "Interactive showreel section with animated image transitions and custom hover cursor.",
    file: "src/components/sections/showreel.tsx",
    preview: <Showreel compact link={null} buttonTitle="Preview" />,
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ component: string }>;
}): Promise<Metadata> {
  const { component } = await params;
  const entry = COMPONENTS[component];
  if (!entry) return {};

  return {
    title: entry.title,
    description: entry.description,
  };
}

export function generateStaticParams() {
  return Object.keys(COMPONENTS).map((component) => ({ component }));
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ component: string }>;
}) {
  const { component } = await params;
  const entry = COMPONENTS[component];
  if (!entry) notFound();

  const source = fs.readFileSync(path.join(process.cwd(), entry.file), "utf-8");
  const highlightedHtml = await codeToHtml(source, {
    lang: "tsx",
    theme: "github-light-default",
  });

  return (
    <ComponentDetail
      title={entry.title}
      slug={component}
      preview={entry.preview}
      highlightedHtml={highlightedHtml}
      sourceCode={source}
    />
  );
}
