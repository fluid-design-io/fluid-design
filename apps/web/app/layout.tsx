import "@ui/styles/globals.css";
import type { Metadata } from "next";
import { Comfortaa, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "ui/lib/utils";
import { ModeToggle } from "@/components/dark-mode-toggle";
import { Toaster } from "@ui/components/toaster";
import { Button } from "@ui/components/ui/button";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
});

export const metadata: Metadata = {
  title: "Fluid Colors",
  description: "Mordern color palette generator",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover, user-scalable=no",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, comfortaa.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="site-padding relative z-20 mx-auto flex w-full max-w-[120rem] items-center justify-between py-2">
            <div className="flex items-center font-comfortaa font-thin tracking-widest">
              Fluid Colors
            </div>
            <div className="flex items-center justify-end gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link
                  href="https://fluid-color.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Github"
                >
                  <Fragment>
                    <div className="sr-only">Github</div>
                    <GithubIcon className="h-5 w-5" />
                  </Fragment>
                </Link>
              </Button>
            </div>
          </div>
          {children}

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
