import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const DEFAULT_TITLE = "Horizon — Location de voitures à Paris";
const DEFAULT_DESCRIPTION =
  "Horizon, location de voitures à Paris et en Île-de-France. La liberté commence à l'horizon.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Horizon",
  },
  description: DEFAULT_DESCRIPTION,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icons/favicon.svg",
    apple: "/icons/icon-192.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Horizon",
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: "Horizon",
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#080B0D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ivory text-black">{children}</body>
    </html>
  );
}
