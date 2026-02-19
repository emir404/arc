import Link from "next/link";
import { LogoCarousel } from "@/components/ui/logo-carousel";

const COMPONENTS = [
  { slug: "logo-carousel", title: "Logo Carousel", preview: <LogoCarousel disableLinks /> },
];

export default function ComponentsPage() {
  return (
    <div className="flex flex-col w-full px-4 pb-24 md:px-12 lg:px-24 xl:px-32 gap-8">
      {COMPONENTS.map((c) => (
        <Link key={c.slug} href={`/components/${c.slug}`}>
          <div className="flex bg-neutral-100 rounded-3xl md:h-[36rem] flex items-center justify-center relative">
            <p className="font-mono text-[#909090] tracking-wider uppercase absolute top-8 left-8 font-medium">
              {c.title}
            </p>
            <div className="flex items-center justify-center">{c.preview}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
