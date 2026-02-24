import type { Metadata } from "next";
import { FindYourWhite } from "./find-your-white";

export const metadata: Metadata = {
  title: "Find Your White",
  description:
    "Stop using #ffffff. Derive a harmonious near-white tinted with your brand color's hue.",
};

export default function FindYourWhitePage() {
  return <FindYourWhite />;
}
