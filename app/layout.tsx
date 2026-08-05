import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Horizon — Location de voitures à Paris",
  description:
    "Horizon, location de voitures à Paris et en Île-de-France. La liberté commence à l'horizon.",
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
