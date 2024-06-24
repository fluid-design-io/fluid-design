"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ScrollArea, ScrollBar } from "ui/components/ui/scroll-area";
import { cn } from "ui/lib/utils";
const navItems = [
  {
    href: "/visualizer",
    name: "Landing",
  },
  {
    href: "/visualizer/testimonial",
    name: "Testimonial",
  },
  {
    href: "/visualizer/chart",
    name: "Chart",
  },
  {
    href: "/visualizer/contact",
    name: "Contact",
  },
];

function VisualizerNav() {
  const pathname = usePathname();

  return (
    <div className="relative inset-x-0 top-0 z-20 mx-auto w-full border-b">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-background to-transparent" />
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <nav className="flex items-center px-4 py-4" role="navigation">
          {navItems.map((item) => (
            <Link
              className={cn(
                "flex items-center px-4 text-muted-foreground",
                "transition-colors duration-200 hover:text-foreground/80 focus:text-foreground/80",
                {
                  "font-semibold text-foreground": pathname === item.href,
                },
              )}
              href={item.href}
              key={item.name}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <ScrollBar className="invisible" orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

export default VisualizerNav;
