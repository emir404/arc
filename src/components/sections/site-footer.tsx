import Link from "next/link";

const SiteFooter = () => {
  return (
    <footer className="flex flex-col items-center gap-7 px-5 md:px-12 lg:px-24 xl:px-32 py-16">
      <p className="font-light text-black/75 text-base text-center text-pretty max-w-[400px]">
        Headquartered inside your Figma. Designing for founders worldwide.
      </p>
      <nav aria-label="Legal" className="flex items-center gap-4">
        <Link
          href="/terms"
          className="inline-flex items-center py-1 text-sm font-light text-black/50 underline-offset-4 rounded-sm transition-colors hover:text-black/80 hover:underline focus-visible:outline-2 focus-visible:outline-ring"
        >
          Terms of Service
        </Link>
        <span aria-hidden className="text-black/20">
          ·
        </span>
        <Link
          href="/privacy"
          className="inline-flex items-center py-1 text-sm font-light text-black/50 underline-offset-4 rounded-sm transition-colors hover:text-black/80 hover:underline focus-visible:outline-2 focus-visible:outline-ring"
        >
          Privacy Policy
        </Link>
      </nav>
    </footer>
  );
};

export default SiteFooter;
