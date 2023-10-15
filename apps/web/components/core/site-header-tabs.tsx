"use client";

import { cn } from "@ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

function SiteHeaderTabs() {
  const pathname = usePathname();
  const acitvePath = pathname.split("/")[1];
  const tabs = [
    {
      name: "Palette",
      href: "/",
      isActive: acitvePath === "",
    },
    {
      name: "Visualizer",
      href: "/visualizer",
      isActive: acitvePath === "visualizer",
    },
    {
      name: "Code",
      href: "/code",
      isActive: acitvePath === "code",
    },
  ];
  return (
    <div className="max-w-xs">
      <div className="grid w-full grid-cols-3 items-center justify-center rounded-md border border-border bg-muted p-1 text-muted-foreground">
        {tabs.map((tab, index) => (
          <Link
            key={index}
            className={cn(
              "relative inline-flex items-center justify-center whitespace-nowrap rounded-sm px-2.5 py-[0.1875rem] text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
              "hover:text-foreground focus:text-foreground",
              tab.isActive ? "text-foreground" : "text-muted-foreground",
            )}
            href={tab.href}
          >
            <span className="relative isolate z-10">{tab.name}</span>
            {tab.isActive && (
              <motion.span
                layoutId="site-header-tab-indicator"
                className={cn(
                  "absolute inset-0 z-0 h-full w-full rounded-sm",
                  tab.isActive && "bg-background shadow",
                )}
              />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SiteHeaderTabs;
