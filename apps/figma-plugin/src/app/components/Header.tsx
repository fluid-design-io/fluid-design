import React from "react";
import FluidColor from "./fluid-color";
import { cn } from "@ui/lib/utils";

function Header() {
  return (
    <div className="flex items-center justify-center">
      <FluidColor className="h-5 w-5" />
      <span
        className={cn(
          "ml-2 font-light tracking-wide md:block",
          "bg-gradient-to-r from-blue-500 to-sky-700 bg-clip-text text-transparent dark:from-blue-600 dark:to-blue-400",
        )}
      >
        Fluid Color Palette
      </span>
    </div>
  );
}

export default Header;
