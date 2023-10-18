"use client";

import React from "react";
import { Button } from "@ui/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/components/tooltip";

const DesktopPreviewToolbarIcon = ({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}) => {
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
            asChild
          >
            <div>
              <div className="sr-only">{title}</div>
              <Icon className="h-5 w-5" />
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p className="max-w-[10rem]">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DesktopPreviewToolbarIcon;
