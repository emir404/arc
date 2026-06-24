import type { ReactNode } from "react";
import SiteFooter from "@/components/sections/site-footer";

type LegalLayoutProps = {
  title: string;
  lastUpdated: string;
  children: ReactNode;
};

const LegalLayout = ({ title, lastUpdated, children }: LegalLayoutProps) => {
  return (
    <>
      <article className="flex flex-col px-5 md:px-12 lg:px-24 xl:px-32 pt-12 pb-20">
        <div className="mx-auto w-full max-w-[680px]">
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-black text-balance">
            {title}
          </h1>
          <p className="mt-3 text-sm font-light text-black/50">
            Last updated: {lastUpdated}
          </p>
          <div
            className="
              mt-10 flex flex-col gap-8
              [&_h2]:mb-3 [&_h2]:scroll-mt-28 [&_h2]:text-lg [&_h2]:font-medium [&_h2]:text-black
              [&_p]:font-light [&_p]:text-black/75 [&_p]:leading-[1.7] [&_p]:text-pretty
              [&_p+p]:mt-4
              [&_ul]:mt-4 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:marker:text-black/30
              [&_li]:pl-1.5 [&_li]:font-light [&_li]:text-black/75 [&_li]:leading-[1.7]
              [&_a]:text-black [&_a]:underline [&_a]:underline-offset-2 [&_a]:transition-colors hover:[&_a]:text-black/70
              [&_strong]:font-medium [&_strong]:text-black
            "
          >
            {children}
          </div>
        </div>
      </article>
      <SiteFooter />
    </>
  );
};

export default LegalLayout;
