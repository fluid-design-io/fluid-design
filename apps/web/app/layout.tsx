import "@ui/styles/globals.css";
import type { Metadata } from "next";
import { Comfortaa, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/core/theme-provider";
import { cn } from "ui/lib/utils";
import { Toaster } from "@ui/components/toaster";
import SiteHeader from "@/components/core/site-header";
import { generateColorPalette } from "@/lib/colorCalculator";
import { BaseColorTypes, ColorMode } from "@/types/app";
import { generateBaseColors } from "@/lib/generateBaseColors";
import { useColorStore } from "@/store/store";
import ColorStoreInitializer from "./color-store-initializer";
import PerformanceChecker from "@/components/core/performance-checker";
import Toolbar from "@/components/core/toobar";
import StyleSheetInitializer from "./stylesheet-initializer";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
});

export const metadata: Metadata = {
  title: {
    default: "Fluid Colors",
    template: "%s | Fluid Colors",
  },
  description: "Mordern color palette generator",
  viewport:
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
};

const getServerColors = async () => {
  const newBaseColors = generateBaseColors();
  const cookieStore = cookies();
  const mode = cookieStore.get("colorMode");
  // short-hand
  const [primaryPalette, secondaryPalette, accentPalette, grayPalette] = [
    "primary",
    "secondary",
    "accent",
    "gray",
  ].map((color) =>
    generateColorPalette({
      color: color === "gray" ? newBaseColors.primary : newBaseColors[color],
      type: color as BaseColorTypes,
      colorMode: mode ? (mode.value as ColorMode) : ColorMode.HEX,
    }),
  );
  return {
    baseColors: newBaseColors,
    colorPalettes: {
      primary: primaryPalette,
      secondary: secondaryPalette,
      accent: accentPalette,
      gray: grayPalette,
    },
    colorMode: mode ? (mode.value as ColorMode) : ColorMode.HEX,
  };
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { baseColors, colorPalettes, colorMode } = await getServerColors();
  useColorStore.setState({
    baseColors,
    colorPalettes,
    colorMode,
  });
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, comfortaa.variable)}>
        <div id="skip-nav" />
        <ColorStoreInitializer {...{ baseColors, colorPalettes, colorMode }} />
        <StyleSheetInitializer />
        <PerformanceChecker />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SiteHeader />
          <Toolbar />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
