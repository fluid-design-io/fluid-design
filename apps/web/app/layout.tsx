import "@ui/styles/globals.css";
import type { Metadata, Viewport } from "next";
import { Comfortaa, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/core/theme-provider";
import { cn } from "ui/lib/utils";
import { Toaster } from "@ui/components/toaster";
import SiteHeader from "@/components/core/site-header";
import { useColorStore } from "@/store/store";
import ColorStoreInitializer from "./color-store-initializer";
import PerformanceChecker from "@/components/core/performance-checker";
import Toolbar from "@/components/core/toobar";
import StyleSheetInitializer from "./stylesheet-initializer";
import { getServerColors } from "@/lib/getServerColors";

import { Analytics } from "@vercel/analytics/react";
import SiteFooter from "@/components/core/site-footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    default: "Fluid Colors",
    template: "%s | Fluid Colors",
  },
  description: "Next-gen color palette generator",
  openGraph: {
    images: ["/og-default.jpg"],
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { baseColors, colorPalettes, colorMode, showReadability } =
    await getServerColors();
  useColorStore.setState({
    baseColors,
    colorPalettes,
    colorMode,
    showReadability,
  });
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, comfortaa.variable)}>
        <div id="skip-nav" />
        <ColorStoreInitializer
          {...{ baseColors, colorPalettes, colorMode, showReadability }}
        />
        <StyleSheetInitializer />
        <PerformanceChecker />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SiteHeader />
          <Toolbar />
          {children}
          <SiteFooter />
          <Toaster />
        </ThemeProvider>
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
