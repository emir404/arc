import React from "react";
import Logo from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full justify-between px-5 md:px-12 lg:px-24 xl:px-32 items-center flex py-12 transition-colors duration-500">
      <Link href="/">
        <Logo className="size-16" />
      </Link>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="cursor-pointer hidden md:flex" asChild>
          <Link href="https://t.me/emirthedev" target="_blank">
            Send a message
          </Link>
        </Button>
        <Button className="cursor-pointer" asChild>
          <Link href="https://cal.com/emirayaz" target="_blank">
            Book a call
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
