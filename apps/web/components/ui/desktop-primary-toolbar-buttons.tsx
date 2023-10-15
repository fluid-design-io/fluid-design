"use client";

import React, { Fragment } from "react";
import primaryToolbarMenu from "./primary-toolbar-menu";
import { Button } from "@ui/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/components/tooltip";
import { usePathname } from "next/navigation";

function DesktopPreviewToolbarButtons() {
  const pathname = usePathname();
  const acitvePath = pathname.split("/")[1];
  return (
    <div className="flex h-10 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm">
      {primaryToolbarMenu.map(({ title, description, icon: Icon }) => {
        // hide "Download" if not in root path
        if (title === "Download" && acitvePath !== "") return null;
        return (
          <TooltipProvider
            key={`desktop-primary-toolbar-${title}`}
            delayDuration={250}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  aria-label={title}
                  size="icon"
                  className="flex h-8 w-8 select-none items-center rounded-sm px-1 py-1 text-sm font-medium outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="sr-only">{title}</div>
                  <Icon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="max-w-[10rem]">{description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
}

export default DesktopPreviewToolbarButtons;
