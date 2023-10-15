import { Button } from "@ui/components/ui/button";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import React, { Fragment } from "react";
import SiteHeaderTabs from "./site-header-tabs";
import FluidColor from "../svg/fluid-color";
import { cn } from "@ui/lib/utils";

function SiteHeader() {
  return (
    <div className="site-padding relative z-20 mx-auto grid w-full max-w-[120rem] grid-cols-5 items-center justify-between py-2">
      <Link className="flex items-center" href="/" aria-label="Fluid Colors">
        <FluidColor className="h-6 w-6" />
        <span
          className={cn(
            "ml-2 hidden font-light tracking-wide md:block",
            "bg-gradient-to-r from-[hsl(var(--primary-500))] to-[hsl(var(--primary-700))] bg-clip-text text-transparent transition-colors dark:from-[hsl(var(--primary-600))] dark:to-[hsl(var(--primary-400))]",
          )}
        >
          Fluid Colors
        </span>
      </Link>
      <div className="col-span-3 flex items-center justify-center">
        <SiteHeaderTabs />
      </div>
      <div className="flex items-center justify-end">
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
  );
}

export default SiteHeader;
