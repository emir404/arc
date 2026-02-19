import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { codeToHtml } from "shiki";
import { LogoCarousel } from "@/components/ui/logo-carousel";
import { ComponentDetail } from "./component-detail";

const COMPONENTS: Record<string, { title: string; file: string; preview: React.ReactNode }> = {
  "logo-carousel": {
    title: "Logo Carousel",
    file: "src/components/ui/logo-carousel.tsx",
    preview: <LogoCarousel />,
  },
};

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

  const source = fs.readFileSync(
    path.join(process.cwd(), entry.file),
    "utf-8",
  );
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
