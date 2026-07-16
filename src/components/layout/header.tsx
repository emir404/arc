import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";

const Header = () => {
  return (
    <header className="w-full px-5 md:px-12 lg:px-24 items-center flex justify-between py-12 transition-colors duration-500">
      <Link
        href="/"
        aria-label="Arc home"
        className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        <Logo className="h-10 w-auto" />
      </Link>
      <div className="flex items-center gap-2">
        <Button asChild variant="secondary" className="hidden md:inline-flex">
          <Link
            href="https://t.me/emirthedev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Send message
          </Link>
        </Button>
        <Button asChild>
          <Link
            href="https://cal.com/team/arc-studio/intro-call"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a call
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
