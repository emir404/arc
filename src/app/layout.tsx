import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope, Merriweather, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/sections/footer";
import { LenisWrapper } from "@/components/ui/lenis-wrapper";
import { GridPattern } from "@/components/magicui/grid-pattern";

const ManropeFont = Manrope({
  weight: ["200","300","400","500","600","700","800"],
  subsets: ["latin"],
  variable: "--font-manrope",
  display: 'swap',
  preload: true,
});

const InstrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument",
  display: 'swap',
});

const Merriweather_Font = Merriweather({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap"
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Arc Creative Studio",
  "url": "https://witharc.co",
  "logo": "https://witharc.co/logo.png",
  "description": "Arc is a global web Studio focused on blending innovation, creativity, and cutting-edge technology to craft unique, high-impact digital experiences.",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "hello@witharc.co"
  },
  "sameAs": [
    "https://instagram.com/witharc.co",
    "https://linkedin.com/company/witharcstudio"
  ]
};

export const metadata: Metadata = {
  title: {
    default: "Arc • Creative Web Studio",
    template: "%s • Arc ",
  },
  description: "Arc is a global web Studio focused on blending innovation, creativity, and cutting-edge technology to craft unique, high-impact digital experiences.",
  keywords: "web Studio, creative Studio, web development, digital experiences, UI/UX design, web design, digital innovation",
  authors: [{ name: "Arc Creative Studio" }],
  creator: "Arc Creative Studio",
  publisher: "Arc Creative Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://witharc.co",
    images: ["https://witharc.co/thumbnail.png"],
    title: "Arc - Creative Web Studio",
    description: "Arc is a global web studio focused on blending innovation, creativity, and cutting-edge technology to craft unique, high-impact digital experiences.",
    siteName: "Arc Creative Studio",
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://witharc.co/thumbnail.png"],
    title: "Arc - Creative Web Studio",
    description: "Arc is a global web studio focused on blending innovation, creativity, and cutting-edge technology to craft unique, high-impact digital experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-L6GMH3LB5W"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-L6GMH3LB5W');
          `}
        </Script>
        <Script
          defer
          data-website-id="68165f18fba37b98f0bbc62f"
          data-domain="witharc.co"
          src="https://datafa.st/js/script.js">
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${ManropeFont.variable} ${InstrumentSerif.variable} ${Merriweather_Font.variable} antialiased overflow-x-hidden bg-background font-manrope flex justify-center px-2 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-72 py-6`}
      >
        <div className="w-full max-w-[1440px] relative flex flex-col min-h-screen border-l border-r border-gray-200 gap-12 overflow-x-hidden">
          <Header/>
          <LenisWrapper>
            {children}
          </LenisWrapper>
          <Footer />
        </div>
      </body>
    </html>
  );
}
