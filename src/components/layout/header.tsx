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
        <Link
          href={"https://t.me/emirthedev"}
          className="cursor-pointer"
          target="_blank"
        >
          <Button variant="outline" className="cursor-pointer hidden md:flex">
            Send a message
          </Button>
        </Link>
        <Link
          href={"https://cal.com/emirayaz"}
          className="cursor-pointer"
          target="_blank"
        >
          <Button className="cursor-pointer">Book a call</Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
