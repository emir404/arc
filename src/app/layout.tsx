import type { Metadata } from "next";
import localFont from "next/font/local";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";

const OverusedGroteskRoman = localFont({
  src: "/fonts/OverusedGroteskRoman.woff",
  variable: "--font-overused",
});

const InstrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  title: "Arc - Creative Web Agency",
  description: "Arc is a global web agency focused on blending innovation, creativity, and cutting-edge technology to craft unique, high-impact digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${OverusedGroteskRoman.variable} ${InstrumentSerif.variable} antialiased dark bg-background font-overused`}
      >
        {children}
      </body>
    </html>
  );
}
