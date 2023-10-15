"use client";

import { Button } from "@ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@ui/components/ui/dropdown-menu";
import { useColorStore } from "@/store/store";
import { ColorMode } from "@/types/app";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
function ColorModeDropdownMenu() {
  const [mounted, setMounted] = useState(false);
  const { colorMode, setColorMode } = useColorStore();
  const handleChangeColorMode = async (mode: ColorMode) => {
    setColorMode(mode);
    // call server to set colormode cookie
    await fetch("/api/color-mode", {
      method: "POST",
      body: JSON.stringify({ mode }),
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center justify-center gap-1.5 text-sm uppercase"
        >
          <span>{colorMode}</span>
          {/* <ChevronDownIcon className="h-3.5 w-3.5" /> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[8.75rem]">
        <DropdownMenuRadioGroup
          value={colorMode}
          onValueChange={handleChangeColorMode}
        >
          {Object.values(ColorMode).map((mode) => {
            return (
              <DropdownMenuRadioItem
                value={mode}
                key={mode}
                className="uppercase"
              >
                {mode}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ColorModeDropdownMenu;
