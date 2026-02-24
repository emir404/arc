import type { Metadata } from "next";
import { FindYourBlack } from "./find-your-black";

export const metadata: Metadata = {
  title: "Find Your Black",
  description:
    "Stop using #000000. Derive a harmonious near-black tinted with your brand color's hue.",
};

export default function FindYourBlackPage() {
  return <FindYourBlack />;
}
