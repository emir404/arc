import React from "react";
import Logo from "@/components/ui/logo";
import Link from "next/link";

const Header = ({ minimal }: { minimal?: boolean }) => {
  return (
    <header className={`w-full px-5 md:px-12 lg:px-24 xl:px-32 items-center flex py-12 transition-colors duration-500 ${minimal ? "justify-center" : "justify-between"}`}>
      <Link href="/">
        <Logo className="size-16" />
      </Link>
      {!minimal && (
        <div className="flex items-center gap-3">
          <Link
            href="https://t.me/emirthedev"
            target="_blank"
            className="hidden md:inline-flex items-center justify-center rounded-full bg-[#f6f6f6] text-black px-5 py-2.5 text-base font-light transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-ring"
          >
            Send a message
          </Link>
          <Link
            href="https://cal.com/emirayaz"
            target="_blank"
            className="inline-flex items-center justify-center rounded-full bg-black text-white px-5 py-2.5 text-base font-light transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-ring"
          >
            Book a call
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
