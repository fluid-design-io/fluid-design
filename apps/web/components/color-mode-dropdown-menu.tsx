"use client";

import { Button } from "@ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@ui/components/ui/dropdown-menu";
import { cn } from "@ui/lib/utils";
import { useColorStore } from "@/store/store";
import { ColorMode } from "@/types/app";
import { ChevronDownIcon } from "lucide-react";
function ColorModeDropdownMenu() {
  const { colorMode, setColorMode } = useColorStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center justify-center gap-1.5 text-sm uppercase"
        >
          <span>{colorMode}</span>
          <ChevronDownIcon className="h-3.5 w-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[8.75rem]">
        <DropdownMenuRadioGroup
          value={colorMode || ColorMode.HEX}
          onValueChange={setColorMode}
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
